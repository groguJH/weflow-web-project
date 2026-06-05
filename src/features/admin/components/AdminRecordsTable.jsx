'use client';

import { Button, Card, Empty, Grid, Popconfirm, Space, Spin, Table, Tag } from 'antd';

const STATUS_META = {
  waiting: { label: '대기', color: 'default' },
  'in-progress': { label: '진행중', color: 'processing' },
  completed: { label: '완료', color: 'success' },
};

function StatusTag({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.waiting;
  return <Tag color={meta.color}>{meta.label}</Tag>;
}

function formatDate(value) {
  if (!value) return '-';

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatSchedule(row) {
  if (!row.preferredDate && !row.preferredTime) return '-';
  return `${row.preferredDate || '-'} ${row.preferredTime || ''}`;
}

function RecordActions({ row, isReservation, actionId, onStatusChange, onDelete }) {
  return (
    <Space wrap size={[8, 8]}>
      {!isReservation && row.status !== 'in-progress' && (
        <Button
          size="small"
          className="whitespace-nowrap"
          loading={actionId === `${row.id}:in-progress`}
          onClick={() => onStatusChange(row.id, 'in-progress')}
        >
          진행중
        </Button>
      )}
      {row.status !== 'completed' && (
        <Button
          type="primary"
          size="small"
          className="whitespace-nowrap"
          loading={actionId === `${row.id}:completed`}
          onClick={() => onStatusChange(row.id, 'completed')}
        >
          완료
        </Button>
      )}
      <Popconfirm
        title={`${isReservation ? '예약' : '문의'} 데이터를 삭제할까요?`}
        okText="삭제"
        cancelText="취소"
        okButtonProps={{ danger: true }}
        onConfirm={() => onDelete(row.id)}
      >
        <Button
          danger
          size="small"
          className="whitespace-nowrap"
          loading={actionId === `${row.id}:delete`}
        >
          삭제
        </Button>
      </Popconfirm>
    </Space>
  );
}

function InfoItem({ label, children, wide = false }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <div className="text-pretty text-keep text-sm leading-relaxed text-slate-200">
        {children || '-'}
      </div>
    </div>
  );
}

function AdminRecordCards({
  type,
  rows,
  loading,
  actionId,
  onStatusChange,
  onDelete,
}) {
  const isReservation = type === 'reservation';

  if (loading) {
    return (
      <div className="flex min-h-[16rem] items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (rows.length === 0) {
    return <Empty description="관리할 데이터가 없습니다." />;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:hidden">
      {rows.map((row) => (
        <li key={row.id}>
          <Card className="h-full border-white/[0.08]">
            <article className="flex h-full flex-col gap-5">
              <header className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-keep text-lg font-black leading-tight text-white">
                    {row.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    {row.phone}
                  </p>
                </div>
                <StatusTag status={row.status} />
              </header>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoItem label="제작 종류">{row.type}</InfoItem>
                <InfoItem label="업종">{row.industry}</InfoItem>
                <InfoItem label={isReservation ? '희망 일정' : '유입'}>
                  {isReservation ? formatSchedule(row) : row.source}
                </InfoItem>
                <InfoItem label="접수일">{formatDate(row.createdAt)}</InfoItem>
                <InfoItem label="요청사항" wide>
                  {row.request}
                </InfoItem>
              </div>

              <footer className="mt-auto border-t border-white/[0.08] pt-4">
                <RecordActions
                  row={row}
                  isReservation={isReservation}
                  actionId={actionId}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                />
              </footer>
            </article>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default function AdminRecordsTable({
  type,
  rows,
  loading,
  actionId,
  onStatusChange,
  onDelete,
}) {
  const screens = Grid.useBreakpoint();
  const isReservation = type === 'reservation';
  const showTable = Boolean(screens.xl);
  const columns = [
    {
      title: '상태',
      dataIndex: 'status',
      width: 92,
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: '이름',
      dataIndex: 'name',
      width: 108,
      render: (value) => <strong className="text-white">{value}</strong>,
    },
    {
      title: '연락처',
      dataIndex: 'phone',
      width: 140,
    },
    {
      title: '제작 종류',
      dataIndex: 'type',
      width: 180,
    },
    {
      title: '업종',
      dataIndex: 'industry',
      width: 130,
    },
    ...(isReservation
      ? [
          {
            title: '희망 일정',
            key: 'schedule',
            width: 170,
            render: (_, row) => formatSchedule(row),
          },
        ]
      : [
          {
            title: '유입',
            dataIndex: 'source',
            width: 150,
          },
        ]),
    {
      title: '요청사항',
      dataIndex: 'request',
      width: 340,
      render: (value) => (
        <p className="text-pretty text-keep min-w-[18rem] max-w-[22rem] text-sm leading-[1.7] text-slate-300">
          {value || '-'}
        </p>
      ),
    },
    {
      title: '접수일',
      dataIndex: 'createdAt',
      width: 170,
      render: formatDate,
    },
    {
      title: '관리',
      key: 'actions',
      width: isReservation ? 140 : 220,
      render: (_, row) => (
        <RecordActions
          row={row}
          isReservation={isReservation}
          actionId={actionId}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ),
    },
  ];

  if (!showTable) {
    return (
      <AdminRecordCards
        type={type}
        rows={rows}
        loading={loading}
        actionId={actionId}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    );
  }

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={rows}
      loading={loading}
      pagination={{ pageSize: 8, showSizeChanger: false }}
      tableLayout="fixed"
      scroll={{ x: isReservation ? 1330 : 1410 }}
    />
  );
}
