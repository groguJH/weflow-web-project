const STATUS_LABELS = {
  waiting: '대기',
  'in-progress': '진행중',
  completed: '완료',
};

const RESERVATION_COLUMNS = [
  { label: '상태', value: (row) => STATUS_LABELS[row.status] || row.status },
  { label: '이름', value: (row) => row.name },
  { label: '연락처', value: (row) => row.phone },
  { label: '제작 종류', value: (row) => row.type },
  { label: '업종', value: (row) => row.industry },
  { label: '희망 날짜', value: (row) => row.preferredDate },
  { label: '희망 시간', value: (row) => row.preferredTime },
  { label: '요청사항', value: (row) => row.request },
  { label: '접수일', value: (row) => formatDate(row.createdAt) },
  { label: '수정일', value: (row) => formatDate(row.updatedAt) },
];

const INQUIRY_COLUMNS = [
  { label: '상태', value: (row) => STATUS_LABELS[row.status] || row.status },
  { label: '유입', value: (row) => row.source },
  { label: '이름', value: (row) => row.name },
  { label: '연락처', value: (row) => row.phone },
  { label: '제작 종류', value: (row) => row.type },
  { label: '업종', value: (row) => row.industry },
  { label: '요청사항', value: (row) => row.request },
  { label: '접수일', value: (row) => formatDate(row.createdAt) },
  { label: '수정일', value: (row) => formatDate(row.updatedAt) },
];

function formatDate(value) {
  if (!value) return '';

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatFileDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}${month}${day}_${hour}${minute}`;
}

function escapeXml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function cell(value) {
  return `<Cell><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`;
}

function buildWorksheet(name, rows, columns) {
  const header = `<Row>${columns.map((column) => cell(column.label)).join('')}</Row>`;
  const body = rows
    .map((row) => (
      `<Row>${columns.map((column) => cell(column.value(row))).join('')}</Row>`
    ))
    .join('');

  return `
    <Worksheet ss:Name="${escapeXml(name)}">
      <Table>
        ${header}
        ${body}
      </Table>
    </Worksheet>
  `;
}

function buildWorkbook(sheets) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook
  xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:html="http://www.w3.org/TR/REC-html40">
  ${sheets.map((sheet) => buildWorksheet(sheet.name, sheet.rows, sheet.columns)).join('')}
</Workbook>`;
}

function downloadWorkbook(workbook, fileName) {
  const blob = new Blob([workbook], {
    type: 'application/vnd.ms-excel;charset=utf-8',
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.URL.revokeObjectURL(url);
}

export function exportAdminExcel({ reservations = [], inquiries = [], target = 'all' }) {
  const sheets = [];

  if (target === 'all' || target === 'reservations') {
    sheets.push({
      name: '예약 관리',
      rows: reservations,
      columns: RESERVATION_COLUMNS,
    });
  }

  if (target === 'all' || target === 'inquiries') {
    sheets.push({
      name: '문의 관리',
      rows: inquiries,
      columns: INQUIRY_COLUMNS,
    });
  }

  const fileLabel = {
    all: '전체관리',
    reservations: '예약관리',
    inquiries: '문의관리',
  }[target];

  downloadWorkbook(
    buildWorkbook(sheets),
    `WEFLOW_${fileLabel}_${formatFileDate()}.xls`
  );
}
