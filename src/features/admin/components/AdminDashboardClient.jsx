'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, message, Statistic, Tabs } from 'antd';
import AdminExportButtons from '@/features/admin/components/AdminExportButtons';
import AdminRecordsTable from '@/features/admin/components/AdminRecordsTable';

function countByStatus(rows, status) {
  return rows.filter((row) => row.status === status).length;
}

export default function AdminDashboardClient({ admin }) {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [records, setRecords] = useState({ reservations: [], inquiries: [] });
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState('');

  const stats = useMemo(() => {
    const totalReservations = records.reservations.length;
    const totalInquiries = records.inquiries.length;
    return [
      { title: '예약 대기', value: countByStatus(records.reservations, 'waiting') },
      { title: '예약 완료', value: countByStatus(records.reservations, 'completed') },
      { title: '문의 진행중', value: countByStatus(records.inquiries, 'in-progress') },
      { title: '전체 접수', value: totalReservations + totalInquiries },
    ];
  }, [records]);

  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/records', { cache: 'no-store' });
      if (response.status === 401) {
        router.replace('/admin');
        return;
      }

      const data = await response.json();
      setRecords({
        reservations: data.reservations || [],
        inquiries: data.inquiries || [],
      });
    } catch {
      messageApi.error('관리 데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [messageApi, router]);

  async function runAction(key, url, options, successMessage) {
    setActionId(key);
    try {
      const response = await fetch(url, options);
      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        router.replace('/admin');
        return;
      }

      if (!response.ok) {
        messageApi.error(data.message || '처리에 실패했습니다.');
        return;
      }

      messageApi.success(successMessage);
      await loadRecords();
    } catch {
      messageApi.error('요청 처리 중 문제가 발생했습니다.');
    } finally {
      setActionId('');
    }
  }

  function updateReservation(id, status) {
    runAction(
      `${id}:${status}`,
      `/api/admin/reservations/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      },
      '예약 상태를 변경했습니다.'
    );
  }

  function deleteReservation(id) {
    runAction(
      `${id}:delete`,
      `/api/admin/reservations/${id}`,
      { method: 'DELETE' },
      '예약을 삭제했습니다.'
    );
  }

  function updateInquiry(id, status) {
    runAction(
      `${id}:${status}`,
      `/api/admin/inquiries/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      },
      '문의 상태를 변경했습니다.'
    );
  }

  function deleteInquiry(id) {
    runAction(
      `${id}:delete`,
      `/api/admin/inquiries/${id}`,
      { method: 'DELETE' },
      '문의를 삭제했습니다.'
    );
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin');
    router.refresh();
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadRecords();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadRecords]);

  return (
    <>
      {contextHolder}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
            Dashboard
          </p>
          <h1 className="text-balance text-keep text-3xl font-black leading-tight text-white sm:text-4xl">
            관리자 대시보드
          </h1>
          <p className="text-pretty text-keep mt-3 text-sm leading-relaxed text-slate-400">
            {admin.name} 계정으로 로그인 중입니다.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <AdminExportButtons
            records={records}
            disabled={loading}
            targets={['all']}
            align="end"
          />
          <div className="flex flex-wrap gap-2">
            <Button className="whitespace-nowrap" onClick={loadRecords}>새로고침</Button>
            <Button className="whitespace-nowrap" danger onClick={logout}>로그아웃</Button>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.title} className="border-white/[0.08]">
            <Statistic title={item.title} value={item.value} />
          </Card>
        ))}
      </div>

      <Card className="admin-dashboard-card border-white/[0.08]">
        <Tabs
          items={[
            {
              key: 'reservations',
              label: `예약 관리 (${records.reservations.length})`,
              children: (
                <div>
                  <div className="mb-4 flex justify-end">
                    <AdminExportButtons
                      records={records}
                      disabled={loading}
                      targets={['reservations']}
                      align="end"
                    />
                  </div>
                  <AdminRecordsTable
                    type="reservation"
                    rows={records.reservations}
                    loading={loading}
                    actionId={actionId}
                    onStatusChange={updateReservation}
                    onDelete={deleteReservation}
                  />
                </div>
              ),
            },
            {
              key: 'inquiries',
              label: `문의 관리 (${records.inquiries.length})`,
              children: (
                <div>
                  <div className="mb-4 flex justify-end">
                    <AdminExportButtons
                      records={records}
                      disabled={loading}
                      targets={['inquiries']}
                      align="end"
                    />
                  </div>
                  <AdminRecordsTable
                    type="inquiry"
                    rows={records.inquiries}
                    loading={loading}
                    actionId={actionId}
                    onStatusChange={updateInquiry}
                    onDelete={deleteInquiry}
                  />
                </div>
              ),
            },
          ]}
        />
      </Card>
    </>
  );
}
