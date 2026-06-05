'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Card,
  Empty,
  Form,
  Grid,
  Input,
  message,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
} from 'antd';
import { ExternalLink, Pencil } from 'lucide-react';

function formatDate(value) {
  if (!value) return '수정 전';

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function CaseThumb({ item }) {
  return (
    <div
      className="h-14 w-24 shrink-0 rounded-lg border border-white/[0.08] bg-slate-800 bg-cover bg-center"
      style={item.img ? { backgroundImage: `url(${item.img})` } : undefined}
      aria-hidden="true"
    />
  );
}

function CaseSummary({ item }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <CaseThumb item={item} />
      <div className="min-w-0">
        <strong className="text-keep block truncate text-sm text-white">{item.title}</strong>
        <Tag className="mt-1" color="blue">{item.category}</Tag>
      </div>
    </div>
  );
}

function AdminCaseCards({ cases, loading, onEdit }) {
  if (loading) {
    return (
      <div className="flex min-h-[16rem] items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (cases.length === 0) {
    return <Empty description="수정할 사례가 없습니다." />;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 lg:hidden">
      {cases.map((item) => (
        <li key={item.id}>
          <Card className="h-full border-white/[0.08]">
            <article className="flex h-full flex-col gap-4">
              <CaseSummary item={item} />
              <div className="grid gap-3 text-sm">
                <div>
                  <p className="mb-1 text-xs font-bold text-slate-500">이미지 경로</p>
                  <p className="break-all text-slate-300">{item.img || '-'}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold text-slate-500">블로그 링크</p>
                  <p className="break-all text-slate-300">{item.blogHref || '-'}</p>
                </div>
              </div>
              <Button
                className="mt-auto whitespace-nowrap"
                icon={<Pencil size="1em" aria-hidden="true" />}
                onClick={() => onEdit(item)}
              >
                수정
              </Button>
            </article>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default function AdminCasesClient({ admin }) {
  const screens = Grid.useBreakpoint();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const showTable = Boolean(screens.lg);

  const loadCases = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/cases', { cache: 'no-store' });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        messageApi.error(data.message || '사례 데이터를 불러오지 못했습니다.');
        return;
      }

      setCases(data.cases || []);
    } catch {
      messageApi.error('사례 데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadCases();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadCases]);

  function openEditor(item) {
    setEditingCase(item);
    form.setFieldsValue({
      title: item.title,
      category: item.category,
      blogHref: item.blogHref,
      img: item.img,
    });
  }

  async function saveCase() {
    const values = await form.validateFields();

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/cases/${editingCase.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        messageApi.error(data.message || '사례를 수정하지 못했습니다.');
        return;
      }

      messageApi.success('사례 정보를 수정했습니다.');
      setEditingCase(null);
      await loadCases();
    } catch {
      messageApi.error('사례 수정 요청 중 문제가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  }

  const columns = [
    {
      title: '사례',
      key: 'case',
      width: 260,
      render: (_, item) => <CaseSummary item={item} />,
    },
    {
      title: '이미지 경로',
      dataIndex: 'img',
      width: 260,
      render: (value) => (
        <span className="block min-w-[14rem] break-all text-sm text-slate-300">
          {value || '-'}
        </span>
      ),
    },
    {
      title: '블로그 링크',
      dataIndex: 'blogHref',
      width: 260,
      render: (value) => (
        <span className="block min-w-[14rem] break-all text-sm text-slate-300">
          {value && value !== '#' ? value : '미연결'}
        </span>
      ),
    },
    {
      title: '수정일',
      dataIndex: 'updatedAt',
      width: 150,
      render: formatDate,
    },
    {
      title: '관리',
      key: 'actions',
      width: 110,
      render: (_, item) => (
        <Button
          className="whitespace-nowrap"
          icon={<Pencil size="1em" aria-hidden="true" />}
          onClick={() => openEditor(item)}
        >
          수정
        </Button>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
            Cases
          </p>
          <h1 className="text-balance text-keep text-3xl font-black leading-tight text-white sm:text-4xl">
            사례 페이지 수정
          </h1>
          <p className="text-pretty text-keep mt-3 text-sm leading-relaxed text-slate-400">
            {admin.name} 계정으로 성공 사례 카드의 문구와 링크를 관리합니다.
          </p>
        </div>
        <Space wrap>
          <Link
            href="/cases"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/[0.08] bg-slate-950/40 px-4 py-2 text-sm font-bold text-slate-200 transition-colors hover:bg-slate-800/80 hover:text-white"
          >
            공개 페이지 보기
            <ExternalLink size="1em" aria-hidden="true" />
          </Link>
          <Button className="whitespace-nowrap" onClick={loadCases}>새로고침</Button>
        </Space>
      </div>

      <Card className="admin-dashboard-card border-white/[0.08]">
        {!showTable ? (
          <AdminCaseCards
            cases={cases}
            loading={loading}
            onEdit={openEditor}
          />
        ) : (
          <Table
            rowKey="id"
            columns={columns}
            dataSource={cases}
            loading={loading}
            pagination={{ pageSize: 8, showSizeChanger: false }}
            tableLayout="fixed"
            scroll={{ x: 1040 }}
          />
        )}
      </Card>

      <Modal
        title="사례 정보 수정"
        open={Boolean(editingCase)}
        okText="저장"
        cancelText="취소"
        confirmLoading={saving}
        onOk={saveCase}
        onCancel={() => setEditingCase(null)}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            label="사례명"
            name="title"
            rules={[{ required: true, message: '사례명을 입력해 주세요.' }]}
          >
            <Input placeholder="예: PT샵" />
          </Form.Item>
          <Form.Item
            label="카테고리"
            name="category"
            rules={[{ required: true, message: '카테고리를 입력해 주세요.' }]}
          >
            <Input placeholder="예: 피트니스" />
          </Form.Item>
          <Form.Item label="이미지 경로" name="img">
            <Input placeholder="/cases_PT샵.jpg" />
          </Form.Item>
          <Form.Item label="블로그 링크" name="blogHref">
            <Input placeholder="https://blog.naver.com/..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
