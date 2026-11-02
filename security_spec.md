# Security Specification — Bintang Belajar SD & MI (`isyaradhuha`)

## 1. Data Invariants
1. **Default Deny**: All paths not explicitly matched are denied for both `read` and `write`.
2. **Ownership & Identity Binding**: A document at `/studentProgress/{userId}` can ONLY be read, created, updated, or deleted by the authenticated user whose `request.auth.uid == userId` AND `request.resource.data.uid == request.auth.uid`.
3. **Verified Email**: Write operations require `request.auth.token.email_verified == true`.
4. **Strict Schema & Key Whitelisting**: `StudentProgress` documents must contain only the exact required keys (`uid`, `studentName`, `madrasahName`, `stars`, `characterName`, `hijabColor`, `hijabStyle`, `outfit`, `updatedAt`). Shadow/ghost fields are strictly rejected.
5. **Volumetric & Boundary Constraints**:
   - `userId` and `uid`: matches `^[a-zA-Z0-9_\-]+$`, length `1..128`
   - `studentName`: string, length `1..100`
   - `madrasahName`: string, length `1..120`
   - `stars`: int/number, `0 <= stars <= 100000`
   - `characterName`: string, length `1..60`
   - `hijabColor`: string, length `4..20`
   - `hijabStyle`: enum `['bergo_sekolah', 'pashmina_santri', 'kerudung_rabbani', 'hijab_syari']`
   - `outfit`: enum `['mi_hijau', 'sd_merah', 'pramuka', 'batik', 'jas_lab']`
   - `updatedAt`: must equal `request.time` (server timestamp).

## 2. The "Dirty Dozen" Payloads (All Must Return `PERMISSION_DENIED`)
1. **Unauthenticated Write**: `auth = null`, creating `/studentProgress/user_1`.
2. **Unverified Email Write**: `auth = { uid: 'user_1', token: { email_verified: false } }`, creating `/studentProgress/user_1`.
3. **Cross-User Spoof Write**: `auth.uid = 'attacker_1'`, writing to `/studentProgress/victim_1`.
4. **Payload UID Mismatch**: `auth.uid = 'user_1'` writing to `/studentProgress/user_1` with `data.uid = 'user_2'`.
5. **Shadow / Ghost Field Injection**: Including `"isAdmin": true` in `/studentProgress/user_1`.
6. **Missing Required Field**: Omitting `madrasahName` on create.
7. **Oversized String (Resource Poisoning)**: `studentName` with 500 characters (`> 100`).
8. **Negative Stars**: `stars: -50`.
9. **Excessive Stars Overflow**: `stars: 999999999`.
10. **Invalid Enum Value**: `hijabStyle: 'invalid_style'`.
11. **Forged Client Timestamp**: `updatedAt: timestamp('2020-01-01T00:00:00Z')` instead of `request.time`.
12. **Unauthorized Cross-User Read (PII / Progress Scraping)**: `auth.uid = 'user_2'` attempting `get` or `list` on `/studentProgress/user_1`.
