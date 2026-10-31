import fs from 'fs/promises';
import path from 'path';

export interface EnquiryRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  businessEmail: string;
  companyName?: string;
  phoneNumber?: string;
  serviceRequired: string;
  siteLocation?: string;
  equipmentModel?: string;
  requirementDescription: string;
  consent: boolean;
  status: 'NEW' | 'REVIEWING' | 'QUOTED' | 'CLOSED';
  notes: Array<{
    date: string;
    author: string;
    text: string;
  }>;
  emailStatus: 'SENT' | 'QUEUED_LOCAL' | 'FAILED';
  sourceIp?: string;
}

export interface ResourceRequestRecord {
  id: string;
  createdAt: string;
  resourceTitle: string;
  businessEmail: string;
  fullName?: string;
}

interface DatabaseSchema {
  enquiries: EnquiryRecord[];
  resourceRequests: ResourceRequestRecord[];
  settings: {
    lastUpdated: string;
    version: string;
  };
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

const INITIAL_DB: DatabaseSchema = {
  enquiries: [
    {
      id: 'ETS-2026-1001',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      fullName: 'Vikram Malhotra',
      businessEmail: 'v.malhotra@cloudcorp.in',
      companyName: 'CloudCorp Data Systems',
      phoneNumber: '+91 98112 34567',
      serviceRequired: 'Maintenance Contracts (AMC & CAMC)',
      siteLocation: 'Sector 62, Noida',
      equipmentModel: '2x 160kVA Riello Master HP Online UPS',
      requirementDescription:
        'Seeking comprehensive CAMC contract including OEM spare parts and quarterly thermal imaging inspections for primary server hall.',
      consent: true,
      status: 'REVIEWING',
      notes: [
        {
          date: new Date(Date.now() - 86400000).toISOString(),
          author: 'Engineering Lead',
          text: 'Site survey scheduled for Friday. Requested Single Line Diagram (SLD) from facility manager.',
        },
      ],
      emailStatus: 'SENT',
      sourceIp: '127.0.0.1',
    },
    {
      id: 'ETS-2026-1002',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      fullName: 'Dr. Anita Desai',
      businessEmail: 'a.desai@metrolifehealth.org',
      companyName: 'MetroLife Healthcare Center',
      phoneNumber: '+91 99201 88765',
      serviceRequired: 'Battery Impedance & Capacity Testing',
      siteLocation: 'Patparganj, Delhi',
      equipmentModel: '64x 12V 150Ah SMF VRLA Battery Bank',
      requirementDescription:
        'Annual cell-level internal impedance measurement and timed discharge testing required for ICU and surgical emergency backup bank.',
      consent: true,
      status: 'NEW',
      notes: [],
      emailStatus: 'SENT',
      sourceIp: '127.0.0.1',
    },
  ],
  resourceRequests: [
    {
      id: 'REQ-1001',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      resourceTitle: 'SNMP Integration Overview',
      businessEmail: 'techlead@noidadatacenter.com',
      fullName: 'Amit Saxena',
    },
  ],
  settings: {
    lastUpdated: new Date().toISOString(),
    version: '1.0.0',
  },
};

/**
 * Ensure database file and directory exist.
 */
async function ensureDb(): Promise<void> {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      await fs.writeFile(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Failed to ensure database file:', error);
  }
}

/**
 * Read full database.
 */
export async function readDb(): Promise<DatabaseSchema> {
  await ensureDb();
  try {
    const raw = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(raw) as DatabaseSchema;
  } catch (error) {
    console.error('Error reading db.json, returning initial fallback:', error);
    return INITIAL_DB;
  }
}

/**
 * Write database atomically via a temporary file.
 */
export async function writeDb(data: DatabaseSchema): Promise<void> {
  await ensureDb();
  data.settings.lastUpdated = new Date().toISOString();
  const tmpFile = `${DB_FILE}.${Date.now()}.tmp`;
  await fs.writeFile(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
  await fs.rename(tmpFile, DB_FILE);
}

/**
 * Query enquiries with optional filters.
 */
export async function getEnquiries(filters?: {
  status?: string;
  service?: string;
  search?: string;
}): Promise<EnquiryRecord[]> {
  const db = await readDb();
  let list = db.enquiries;

  if (filters?.status && filters.status !== 'ALL') {
    list = list.filter((e) => e.status === filters.status);
  }

  if (filters?.service && filters.service !== 'ALL') {
    list = list.filter((e) => e.serviceRequired.toLowerCase().includes(filters.service!.toLowerCase()));
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (e) =>
        e.id.toLowerCase().includes(q) ||
        e.fullName.toLowerCase().includes(q) ||
        e.businessEmail.toLowerCase().includes(q) ||
        (e.companyName && e.companyName.toLowerCase().includes(q)) ||
        (e.siteLocation && e.siteLocation.toLowerCase().includes(q))
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Find enquiry by ID.
 */
export async function getEnquiryById(id: string): Promise<EnquiryRecord | null> {
  const db = await readDb();
  return db.enquiries.find((e) => e.id === id) || null;
}

/**
 * Create a new enquiry record.
 */
export async function createEnquiry(
  input: Omit<EnquiryRecord, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'notes' | 'emailStatus'>
): Promise<EnquiryRecord> {
  const db = await readDb();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const id = `ETS-2026-${randomSuffix}`;
  const now = new Date().toISOString();

  const newRecord: EnquiryRecord = {
    ...input,
    id,
    createdAt: now,
    updatedAt: now,
    status: 'NEW',
    notes: [],
    emailStatus: 'QUEUED_LOCAL',
  };

  db.enquiries.unshift(newRecord);
  await writeDb(db);
  return newRecord;
}

/**
 * Update enquiry status or append notes.
 */
export async function updateEnquiry(
  id: string,
  updates: {
    status?: EnquiryRecord['status'];
    note?: { author: string; text: string };
    emailStatus?: EnquiryRecord['emailStatus'];
  }
): Promise<EnquiryRecord | null> {
  const db = await readDb();
  const idx = db.enquiries.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  const current = db.enquiries[idx];
  if (updates.status) {
    current.status = updates.status;
  }
  if (updates.emailStatus) {
    current.emailStatus = updates.emailStatus;
  }
  if (updates.note) {
    current.notes.push({
      date: new Date().toISOString(),
      author: updates.note.author,
      text: updates.note.text,
    });
  }
  current.updatedAt = new Date().toISOString();

  db.enquiries[idx] = current;
  await writeDb(db);
  return current;
}

/**
 * Log a technical whitepaper / resource request.
 */
export async function createResourceRequest(data: {
  resourceTitle: string;
  businessEmail: string;
  fullName?: string;
}): Promise<ResourceRequestRecord> {
  const db = await readDb();
  const record: ResourceRequestRecord = {
    id: `REQ-${Date.now().toString().slice(-5)}`,
    createdAt: new Date().toISOString(),
    resourceTitle: data.resourceTitle,
    businessEmail: data.businessEmail,
    fullName: data.fullName,
  };

  db.resourceRequests.unshift(record);
  await writeDb(db);
  return record;
}
