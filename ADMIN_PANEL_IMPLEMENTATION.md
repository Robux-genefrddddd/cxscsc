# Firebase Admin Panel - Complete Implementation

## Overview

A fully production-ready admin panel system completely integrated with Firebase Admin SDK, featuring secure user management, license management, AI configuration, real-time statistics, and system maintenance tools.

## Architecture

### Backend (Node.js/Express)

#### Firebase Admin SDK Integration (`server/lib/firebase-admin.ts`)

- **Secure initialization** with service account credentials
- **Admin verification** via idToken validation with verifyIdToken()
- **Comprehensive logging** of all admin actions to Firestore
- No use of REST Firebase API - all operations via Admin SDK

#### Secure Routes (`server/routes/admin.ts`)

All routes require:

1. **Bearer token authentication** - Valid Firebase idToken
2. **Admin verification** - Verified admin status from Firestore
3. **Input validation** - Zod schemas for all requests
4. **Rate limiting** - 10 requests/minute per user

Routes implemented:

**User Management:**

- `GET /api/admin/users` - List all users with details
- `POST /api/admin/promote-user` - Promote user to admin
- `POST /api/admin/demote-user` - Demote admin to user
- `POST /api/admin/ban-user` - Ban user with reason
- `POST /api/admin/unban-user` - Unban user
- `POST /api/admin/reset-messages` - Reset user message count
- `POST /api/admin/delete-user` - Delete user and auth
- `POST /api/admin/update-user-plan` - Change user plan
- `GET /api/admin/banned-users` - List banned users

**License Management:**

- `GET /api/admin/licenses` - List all licenses
- `POST /api/admin/create-license` - Generate new license
- `POST /api/admin/invalidate-license` - Mark license invalid
- `POST /api/admin/purge-licenses` - Delete invalid licenses

**AI Configuration:**

- `GET /api/admin/ai-config` - Get current AI settings
- `PUT /api/admin/ai-config` - Update AI model & parameters

**System Management:**

- `GET /api/admin/system-stats` - Real Firestore statistics
- `GET /api/admin/logs` - Admin action audit logs
- `POST /api/admin/clear-logs` - Archive old logs

**Verification:**

- `POST /api/admin/verify` - Check admin status

### Frontend (React)

#### Admin Dashboard Pages

**1. Users Management (`AdminUsersSection.tsx`)**

- Real-time user list from Firebase
- Expandable rows for detailed actions
- Status badges (Admin/User/Banned)
- Plan management (Free/Classic/Pro)
- Actions with confirmation modals
- Live statistics cards
- Professional UI with dark theme

**2. Licenses Management (`AdminLicensesSection.tsx`)**

- View all licenses with details
- Generate new licenses with plan selection
- Copy license keys to clipboard
- Visual status indicators (Used/Available/Invalid)
- License validity tracking

**3. AI Configuration (`AdminAIConfigSection.tsx`)**

- Set AI model (freeform text input)
- Adjust temperature (0-2 scale with visual slider)
- Configure max tokens (100-4000)
- Custom system prompt (textarea)
- Real-time validation
- Save with confirmation

**4. System Dashboard (`AdminSystemSection.tsx`)**

- Real Firestore statistics:
  - Total users & admin count
  - License usage metrics
  - Message statistics
  - User distribution charts
- 7-day activity timeline
- Distribution pie chart
- User breakdown percentages
- Auto-refresh every 60 seconds

**5. Maintenance Tools (`AdminMaintenanceSection.tsx`)**

- Clear old admin logs (with day selection)
- Purge invalid licenses
- Confirmation modals
- Action result notifications
- Timestamp tracking

## Security Implementation

### Server-Side Security

1. **Firebase Admin SDK Only**
   - No REST API calls
   - Server-side token verification
   - Service account credentials secured

2. **Token Verification**
   - Bearer token extraction from Authorization header
   - Firebase verifyIdToken() on every request
   - Token format validation with Zod
   - Rate limiting per user UID

3. **Admin Verification**
   - Check Firestore user.isAdmin field
   - Verify requester is not banned
   - Prevent self-demotion for critical operations

4. **Input Validation**
   - Zod schemas for all endpoints
   - User ID regex validation (28 chars)
   - Reason length validation (5-500 chars)
   - Plan enum validation
   - No SQL/NoSQL injection possible

5. **Audit Logging**
   - Every admin action logged to Firestore
   - Includes: admin UID, action type, target, timestamp
   - Support for log cleanup (retention policy)

6. **Rate Limiting**
   - 10 requests/minute per authenticated user
   - In-memory store (Redis for production)
   - Per-endpoint configuration
   - Returns 429 with retry-after header

### Client-Side Security

1. **Authentication Flow**
   - Firebase Auth integration
   - Admin status verified from AuthContext
   - idToken obtained from current user
   - Sent via Bearer Authorization header

2. **Protected Routes**
   - Admin panel only accessible if isAdmin=true
   - Graceful redirect for unauthorized access
   - Error messages for failed operations

3. **HTTPS Enforcement**
   - Content-Type validation (application/json)
   - CORS with origin validation
   - Security headers (CSP, HSTS, X-Frame-Options)
   - Request size limits (10MB max)

## Data Storage

### Firestore Structure

```
users/
  {uid}/
    email: string
    displayName: string
    plan: "Free" | "Classic" | "Pro"
    isAdmin: boolean
    isBanned: boolean
    bannedAt: timestamp (optional)
    bannedBy: uid (optional)
    banReason: string (optional)
    messagesUsed: number
    messagesLimit: number
    createdAt: timestamp

licenses/
  {licenseKey}/
    key: string
    plan: string
    valid: boolean
    createdBy: uid
    createdAt: timestamp
    usedBy: uid (optional)
    usedAt: timestamp (optional)

settings/
  ai_config/
    model: string
    temperature: number
    maxTokens: number
    systemPrompt: string

admin_logs/
  {logId}/
    adminUid: string
    action: string
    data: object
    timestamp: timestamp
```

## Features

### User Management

✅ List all users with pagination  
✅ Promote/demote admin status  
✅ Ban users with reasons  
✅ Reset message quotas  
✅ Delete user (both Auth & Firestore)  
✅ Change user plan with limits  
✅ View banned users

### License System

✅ Generate licenses with validity period  
✅ Track license usage  
✅ Invalidate licenses  
✅ Purge invalid licenses  
✅ Real-time license statistics

### AI Management

✅ Configure AI model dynamically  
✅ Adjust temperature for randomness  
✅ Set token limits  
✅ Custom system prompts  
✅ Real-time config updates used by chat API

### System Monitoring

✅ Real Firestore statistics  
✅ User distribution charts  
✅ 7-day activity timeline  
✅ License usage metrics  
✅ Message statistics  
✅ Auto-refresh every 60 seconds

### Maintenance Tools

✅ Clear logs by age  
✅ Purge invalid licenses  
✅ Admin action audit trails  
✅ Timestamp tracking  
✅ Confirmation dialogs

## UI/UX Design

### Professional SaaS Style

- Dark theme (Tailwind dark)
- Minimal design with proper spacing
- No emojis or playful elements
- Professional icons (Lucide React)
- Smooth transitions and hover states
- Responsive layout (4-column grid)
- Clean typography hierarchy

### Components

- Tabbed navigation with icons
- Expandable rows for actions
- Confirmation modals for destructive actions
- Live status badges
- Progress bars for metrics
- Line/bar/pie charts with Recharts
- Color-coded metrics (blue/purple/emerald/red)
- Toast notifications for feedback

### Accessibility

- Clear labels and descriptions
- Disabled states for loading/invalid
- Keyboard navigation support
- ARIA labels on buttons
- Semantic HTML structure

## Production Checklist

Before deploying to production:

1. **Firebase Setup**
   - [ ] Set FIREBASE_SERVICE_ACCOUNT_KEY env var
   - [ ] Create Firestore indexes
   - [ ] Enable Firebase Auth
   - [ ] Set appropriate Firestore rules

2. **Environment Variables**
   - [ ] FIREBASE_SERVICE_ACCOUNT_KEY (base64 or JSON string)
   - [ ] CORS_ORIGINS (allowed domains)
   - [ ] APP_URL (for security headers)

3. **Firestore Rules**

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /admin_logs/{document=**} {
         allow read, write: if request.auth != null && request.auth.token.admin == true;
       }
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.token.admin == true;
         allow read, write: if request.auth.uid == userId;
       }
       match /licenses/{document=**} {
         allow read: if request.auth != null && request.auth.token.admin == true;
         allow write: if request.auth != null && request.auth.token.admin == true;
       }
       match /settings/{document=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.token.admin == true;
       }
     }
   }
   ```

4. **Rate Limiting**
   - [ ] Use Redis for production rate limiting
   - [ ] Configure per-endpoint limits
   - [ ] Monitor for abuse patterns

5. **Monitoring**
   - [ ] Set up error tracking (Sentry)
   - [ ] Monitor admin_logs collection size
   - [ ] Set log retention policy
   - [ ] Alert on suspicious activity

6. **Testing**
   - [ ] Verify all admin routes
   - [ ] Test error scenarios
   - [ ] Load test admin operations
   - [ ] Security audit

## API Examples

### Promote User

```bash
curl -X POST http://localhost:8080/api/admin/promote-user \
  -H "Authorization: Bearer {idToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "vSXTJhVmF3VhF8EzrqFcVIXwYoN"
  }'
```

### Create License

```bash
curl -X POST http://localhost:8080/api/admin/create-license \
  -H "Authorization: Bearer {idToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "plan": "Pro",
    "validityDays": 365
  }'
```

### Update AI Config

```bash
curl -X PUT http://localhost:8080/api/admin/ai-config \
  -H "Authorization: Bearer {idToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "temperature": 0.7,
    "maxTokens": 2048,
    "systemPrompt": "You are a helpful assistant..."
  }'
```

## Troubleshooting

### Firebase Not Initialized

- Check FIREBASE_SERVICE_ACCOUNT_KEY environment variable
- Ensure service account has proper permissions
- Check Firestore is enabled in project

### Admin Routes Return 401

- Verify idToken is valid
- Check user exists in Firestore with isAdmin=true
- Verify token not expired
- Check rate limit status

### Statistics Not Updating

- Clear browser cache
- Check Firestore data exists
- Verify timestamps are in correct format
- Check network requests in DevTools

## Future Enhancements

- [ ] Two-factor authentication for admin actions
- [ ] IP-based access restrictions
- [ ] Email notifications for critical actions
- [ ] Admin activity dashboard with charts
- [ ] Bulk user operations
- [ ] User export to CSV
- [ ] License batch generation
- [ ] Automatic log archival to Cloud Storage
