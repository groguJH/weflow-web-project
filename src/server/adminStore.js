import { promises as fs } from 'fs';
import path from 'path';
import { CASES_PAGE, getCaseSlug } from '@/data/casesText';

export const ADMIN_SESSION_COOKIE = 'weflow_admin_session';

const DB_PATH = path.join(process.cwd(), 'src', 'server', 'adminDb.json');
const RESERVATION_STATUSES = new Set(['waiting', 'completed']);
const INQUIRY_STATUSES = new Set(['waiting', 'in-progress', 'completed']);
const CASE_FIELDS = ['title', 'category', 'blogHref', 'img'];

async function readDb() {
  const content = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(content);
}

async function writeDb(db) {
  await fs.writeFile(DB_PATH, `${JSON.stringify(db, null, 2)}\n`, 'utf8');
  return db;
}

function sanitizeAdmin(admin) {
  if (!admin) return null;
  return {
    id: admin.id,
    username: admin.username,
    name: admin.name,
    role: admin.role,
  };
}

function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeCaseItem(item, index) {
  const normalized = {
    id: item.id || `case-${String(index + 1).padStart(3, '0')}`,
    title: item.title || '',
    category: item.category || '',
    blogHref: item.blogHref || '#',
    img: item.img || '',
    updatedAt: item.updatedAt || null,
  };

  return {
    ...normalized,
    slug: getCaseSlug({ ...normalized, slug: item.slug }),
  };
}

function getCaseSource(db) {
  const cases = Array.isArray(db.cases) && db.cases.length > 0
    ? db.cases
    : CASES_PAGE.cases;

  return cases.map(normalizeCaseItem);
}

export async function verifyAdmin(username, password) {
  const db = await readDb();
  const admin = db.admins.find(
    (item) => item.username === username && item.password === password
  );

  return admin ? sanitizeAdmin(admin) : null;
}

export async function getAdminBySession(sessionToken) {
  if (!sessionToken) return null;

  const db = await readDb();
  const admin = db.admins.find((item) => item.sessionToken === sessionToken);

  return admin ? sanitizeAdmin(admin) : null;
}

export async function getSessionTokenForAdmin(adminId) {
  const db = await readDb();
  return db.admins.find((item) => item.id === adminId)?.sessionToken ?? null;
}

export async function getAdminRecords() {
  const db = await readDb();
  return {
    reservations: db.reservations,
    inquiries: db.inquiries,
  };
}

export async function getCaseItems() {
  const db = await readDb();
  return getCaseSource(db);
}

export async function updateCaseItem(id, payload) {
  const db = await readDb();
  const cases = getCaseSource(db);
  const caseItem = cases.find((item) => item.id === id);

  if (!caseItem) return null;

  CASE_FIELDS.forEach((field) => {
    if (payload[field] !== undefined) {
      const value = String(payload[field] || '').trim();
      caseItem[field] = field === 'blogHref' ? value || '#' : value;
    }
  });

  caseItem.updatedAt = new Date().toISOString();
  db.cases = cases;

  await writeDb(db);
  return caseItem;
}

export async function addInquiry(payload) {
  const db = await readDb();
  const inquiry = {
    id: createId('inq'),
    status: 'waiting',
    source: payload.source || '무료진단 폼',
    name: payload.name || '',
    phone: payload.phone || '',
    type: payload.type || '',
    industry: payload.industry || '',
    request: payload.request || '',
    createdAt: new Date().toISOString(),
  };

  db.inquiries.unshift(inquiry);
  await writeDb(db);
  return inquiry;
}

export async function addReservation(payload) {
  const db = await readDb();
  const reservation = {
    id: createId('rsv'),
    status: 'waiting',
    name: payload.name || '',
    phone: payload.phone || '',
    type: payload.type || '',
    industry: payload.industry || '',
    preferredDate: payload.preferredDate || '',
    preferredTime: payload.preferredTime || '',
    request: payload.request || '',
    createdAt: new Date().toISOString(),
  };

  db.reservations.unshift(reservation);
  await writeDb(db);
  return reservation;
}

export async function updateReservationStatus(id, status) {
  if (!RESERVATION_STATUSES.has(status)) {
    return null;
  }

  const db = await readDb();
  const reservation = db.reservations.find((item) => item.id === id);
  if (!reservation) return null;

  reservation.status = status;
  reservation.updatedAt = new Date().toISOString();
  await writeDb(db);
  return reservation;
}

export async function deleteReservation(id) {
  const db = await readDb();
  const nextReservations = db.reservations.filter((item) => item.id !== id);
  const deleted = nextReservations.length !== db.reservations.length;
  if (!deleted) return false;

  db.reservations = nextReservations;
  await writeDb(db);
  return true;
}

export async function updateInquiryStatus(id, status) {
  if (!INQUIRY_STATUSES.has(status)) {
    return null;
  }

  const db = await readDb();
  const inquiry = db.inquiries.find((item) => item.id === id);
  if (!inquiry) return null;

  inquiry.status = status;
  inquiry.updatedAt = new Date().toISOString();
  await writeDb(db);
  return inquiry;
}

export async function deleteInquiry(id) {
  const db = await readDb();
  const nextInquiries = db.inquiries.filter((item) => item.id !== id);
  const deleted = nextInquiries.length !== db.inquiries.length;
  if (!deleted) return false;

  db.inquiries = nextInquiries;
  await writeDb(db);
  return true;
}
