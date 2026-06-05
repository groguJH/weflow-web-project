'use client';

import { Button } from 'antd';
import { Download } from 'lucide-react';
import { exportAdminExcel } from '@/features/admin/utils/exportAdminExcel';

const BUTTON_LABELS = {
  all: '전체 엑셀 다운로드',
  reservations: '예약 관리 다운',
  inquiries: '문의 관리 다운',
};

export default function AdminExportButtons({
  records,
  disabled,
  targets = ['all', 'reservations', 'inquiries'],
  align = 'start',
}) {
  function handleExport(target) {
    exportAdminExcel({
      reservations: records.reservations || [],
      inquiries: records.inquiries || [],
      target,
    });
  }

  return (
    <div className={`flex flex-wrap gap-2 ${align === 'end' ? 'justify-end' : ''}`}>
      {targets.map((target) => (
        <Button
          key={target}
          className="admin-export-button whitespace-nowrap"
          disabled={disabled}
          icon={<Download size="1em" className="text-[0.9375rem]" aria-hidden="true" />}
          onClick={() => handleExport(target)}
        >
          {BUTTON_LABELS[target]}
        </Button>
      ))}
    </div>
  );
}
