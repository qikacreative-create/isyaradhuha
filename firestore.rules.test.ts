/**
 * Security Rules Dirty Dozen Verification Suite
 * Verifies all 12 adversarial payloads defined in security_spec.md are rejected.
 */

export interface DirtyDozenTestCase {
  id: number;
  name: string;
  auth: { uid: string; email_verified: boolean } | null;
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_PAYLOADS: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: 'Unauthenticated Write',
    auth: null,
    path: '/studentProgress/user_1',
    operation: 'create',
    payload: {
      uid: 'user_1',
      studentName: 'Aisyah',
      madrasahName: 'MI Terpadu',
      stars: 10,
      characterName: 'Fatimah',
      hijabColor: '#ffffff',
      hijabStyle: 'bergo_sekolah',
      outfit: 'mi_hijau',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 2,
    name: 'Unverified Email Write',
    auth: { uid: 'user_1', email_verified: false },
    path: '/studentProgress/user_1',
    operation: 'create',
    payload: {
      uid: 'user_1',
      studentName: 'Aisyah',
      madrasahName: 'MI Terpadu',
      stars: 10,
      characterName: 'Fatimah',
      hijabColor: '#ffffff',
      hijabStyle: 'bergo_sekolah',
      outfit: 'mi_hijau',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 3,
    name: 'Cross-User Spoof Write',
    auth: { uid: 'attacker_1', email_verified: true },
    path: '/studentProgress/victim_1',
    operation: 'create',
    payload: {
      uid: 'attacker_1',
      studentName: 'Attacker',
      madrasahName: 'MI Terpadu',
      stars: 10,
      characterName: 'Fatimah',
      hijabColor: '#ffffff',
      hijabStyle: 'bergo_sekolah',
      outfit: 'mi_hijau',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 4,
    name: 'Payload UID Mismatch',
    auth: { uid: 'user_1', email_verified: true },
    path: '/studentProgress/user_1',
    operation: 'create',
    payload: {
      uid: 'user_2',
      studentName: 'Aisyah',
      madrasahName: 'MI Terpadu',
      stars: 10,
      characterName: 'Fatimah',
      hijabColor: '#ffffff',
      hijabStyle: 'bergo_sekolah',
      outfit: 'mi_hijau',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 5,
    name: 'Shadow / Ghost Field Injection',
    auth: { uid: 'user_1', email_verified: true },
    path: '/studentProgress/user_1',
    operation: 'create',
    payload: {
      uid: 'user_1',
      studentName: 'Aisyah',
      madrasahName: 'MI Terpadu',
      stars: 10,
      characterName: 'Fatimah',
      hijabColor: '#ffffff',
      hijabStyle: 'bergo_sekolah',
      outfit: 'mi_hijau',
      updatedAt: 'SERVER_TIMESTAMP',
      isAdmin: true
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 6,
    name: 'Missing Required Field',
    auth: { uid: 'user_1', email_verified: true },
    path: '/studentProgress/user_1',
    operation: 'create',
    payload: {
      uid: 'user_1',
      studentName: 'Aisyah',
      stars: 10,
      characterName: 'Fatimah',
      hijabColor: '#ffffff',
      hijabStyle: 'bergo_sekolah',
      outfit: 'mi_hijau',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 7,
    name: 'Oversized String (Resource Poisoning)',
    auth: { uid: 'user_1', email_verified: true },
    path: '/studentProgress/user_1',
    operation: 'create',
    payload: {
      uid: 'user_1',
      studentName: 'A'.repeat(250),
      madrasahName: 'MI Terpadu',
      stars: 10,
      characterName: 'Fatimah',
      hijabColor: '#ffffff',
      hijabStyle: 'bergo_sekolah',
      outfit: 'mi_hijau',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 8,
    name: 'Negative Stars',
    auth: { uid: 'user_1', email_verified: true },
    path: '/studentProgress/user_1',
    operation: 'update',
    payload: {
      uid: 'user_1',
      studentName: 'Aisyah',
      madrasahName: 'MI Terpadu',
      stars: -50,
      characterName: 'Fatimah',
      hijabColor: '#ffffff',
      hijabStyle: 'bergo_sekolah',
      outfit: 'mi_hijau',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 9,
    name: 'Excessive Stars Overflow',
    auth: { uid: 'user_1', email_verified: true },
    path: '/studentProgress/user_1',
    operation: 'update',
    payload: {
      uid: 'user_1',
      studentName: 'Aisyah',
      madrasahName: 'MI Terpadu',
      stars: 999999999,
      characterName: 'Fatimah',
      hijabColor: '#ffffff',
      hijabStyle: 'bergo_sekolah',
      outfit: 'mi_hijau',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 10,
    name: 'Invalid Enum Value',
    auth: { uid: 'user_1', email_verified: true },
    path: '/studentProgress/user_1',
    operation: 'update',
    payload: {
      uid: 'user_1',
      studentName: 'Aisyah',
      madrasahName: 'MI Terpadu',
      stars: 20,
      characterName: 'Fatimah',
      hijabColor: '#ffffff',
      hijabStyle: 'invalid_style',
      outfit: 'mi_hijau',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 11,
    name: 'Forged Client Timestamp',
    auth: { uid: 'user_1', email_verified: true },
    path: '/studentProgress/user_1',
    operation: 'update',
    payload: {
      uid: 'user_1',
      studentName: 'Aisyah',
      madrasahName: 'MI Terpadu',
      stars: 20,
      characterName: 'Fatimah',
      hijabColor: '#ffffff',
      hijabStyle: 'bergo_sekolah',
      outfit: 'mi_hijau',
      updatedAt: '2020-01-01T00:00:00Z'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 12,
    name: 'Unauthorized Cross-User Read',
    auth: { uid: 'user_2', email_verified: true },
    path: '/studentProgress/user_1',
    operation: 'get',
    expectedResult: 'PERMISSION_DENIED'
  }
];
