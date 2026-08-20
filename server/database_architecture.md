# 🏛️ TRIDRISHTI.COM — Complete Database Architecture & Schema Specification

> **Database Engine**: MongoDB / MongoDB Atlas  
> **ORM / ODM**: Mongoose with TypeScript  
> **Integrations**: Razorpay Payments, Cloud Object Storage, Socket.IO Real-Time Stream

```
                    TRIDRISHTI.COM
                          │
                          ▼
                 React / Vite Frontend
                          │
                          │ REST API / HTTPS & WebSockets
                          ▼
                 Node.js + Express
                          │
          ┌───────────────┼────────────────┐
          ▼               ▼                ▼
      MongoDB          Razorpay        File Storage
       Atlas           Payments        Documents
          │
          ▼
   All Tridrishti Data
```

---

## 📑 Collections & Schemas Directory (16 Core Collections)

### 1. `users` (Identity, Authentication & Level Status)
Stores user authentication, level progression, KYC records, and contact attributes.
- **Fields**:
  - `_id`: `ObjectId`
  - `name`: `String` (Indexed, trimmed)
  - `email`: `String` (Unique, lowercase, trimmed)
  - `passwordHash`: `String` (bcrypt salt 10)
  - `phone`: `String` (Indexed)
  - `role`: `Enum` (`SUPER_ADMIN`, `ADMIN`, `SUPPORT`, `FINANCE`, `OPERATIONS`, `USER`)
  - `referralCode`: `String` (Unique, uppercase, index)
  - `referredBy`: `String` (Referral code of sponsor)
  - `referrerUserId`: `ObjectId -> users` (Direct ancestor reference)
  - `level`: `Number` (1: STARTER, 2: CONNECT, 3: GROW, 4: LEAD, 5: DIAMOND)
  - `levelName`: `String`
  - `pointsBalance`: `Number` (Available TRI Points, >= 0)
  - `pendingPoints`: `Number` (Points in verification hold)
  - `lifetimePointsEarned`: `Number` (Cumulative lifetime credit)
  - `lifetimePointsUsed`: `Number` (Cumulative lifetime redemption)
  - `kycStatus`: `Enum` (`NOT_SUBMITTED`, `PENDING`, `VERIFIED`, `REJECTED`)
  - `kycDocuments`: `{ panNumber, aadhaarLast4, documentUrl, verifiedAt, verificationNotes }`
  - `address`: `{ line1, line2, city, state, pincode, country }`
  - `isSuspended`: `Boolean`
  - `suspensionReason`: `String`
  - `lastLoginAt`: `Date`
  - `timestamps`: `createdAt`, `updatedAt`
- **Indexes**:
  - Unique: `{ email: 1 }`, `{ referralCode: 1 }`
  - Compound: `{ role: 1, isSuspended: 1 }`, `{ kycStatus: 1, createdAt: -1 }`, `{ level: 1, pointsBalance: -1 }`
  - Text Search: `{ name: "text", email: "text", referralCode: "text" }`

---

### 2. `rewardpointledgers` (Immutable Append-Only Audit Ledger)
Every point credit or debit produces an immutable entry with cryptographic reference.
- **Fields**:
  - `transactionId`: `String` (Unique, `TXN-TRI-...`)
  - `userId`: `ObjectId -> users`
  - `type`: `Enum` (`MEMBERSHIP_PURCHASE`, `QUALIFYING_ACTIVITY`, `REFERRAL_ACTIVITY_REWARD`, `REWARD_REDEMPTION`, `BENEFIT_CLAIM`, `ADMIN_ADJUSTMENT`, `EXPIRED`, `REFUND_REVERSAL`)
  - `amount`: `Number` (+ for credits, - for debits)
  - `balanceAfter`: `Number` (Resulting balance, >= 0)
  - `source`: `String` (`MEMBERSHIP_PURCHASE`, `COMMUNITY_ACTIVITY`, `REWARD_STORE_REDEMPTION`)
  - `description`: `String`
  - `status`: `Enum` (`COMPLETED`, `PENDING`, `REVERSED`, `EXPIRED`)
  - `adminReference`: `String` (Mandatory justification note for manual adjustments)
  - `referenceId`: `String` (Payment orderId, redemptionId, or claimId)
  - `metadata`: `Mixed`
  - `createdAt`: `Date`
- **Indexes**:
  - Unique: `{ transactionId: 1 }`
  - Compound: `{ userId: 1, createdAt: -1 }`, `{ type: 1, createdAt: -1 }`, `{ status: 1, createdAt: -1 }`
  - Text Search: `{ description: "text", source: "text", transactionId: "text" }`

---

### 3. `networknodes` (Materialized Hierarchy Community Tree)
Enables sub-millisecond sub-tree queries using the Materialized Path pattern.
- **Fields**:
  - `userId`: `ObjectId -> users` (Unique)
  - `parentId`: `ObjectId -> users`
  - `ancestors`: `[ObjectId -> users]` (Array of all upline ancestors)
  - `path`: `String` (`",rootId,parentId,userId,"`)
  - `depth`: `Number` (Tree level from root)
  - `directChildCount`: `Number`
  - `totalTeamSize`: `Number`
  - `activeTeamSize`: `Number`
  - `cumulativeTeamPoints`: `Number`
  - `timestamps`: `createdAt`, `updatedAt`
- **Indexes**:
  - Unique: `{ userId: 1 }`
  - Compound: `{ parentId: 1 }`, `{ ancestors: 1 }`, `{ path: 1 }`, `{ depth: 1 }`

---

### 4. `payments` (Razorpay Transactions & GST Tax Invoicing)
Tracks verified payment orders, HMAC-SHA256 signatures, and digital tax invoices.
- **Fields**:
  - `orderId`: `String` (Razorpay `order_...`, Unique)
  - `paymentId`: `String` (Razorpay `pay_...`)
  - `signature`: `String` (HMAC-SHA256 signature)
  - `invoiceNumber`: `String` (Unique, e.g. `INV-TRI-2026-00892`)
  - `userId`: `ObjectId -> users`
  - `planId`: `ObjectId -> membershipplans`
  - `amount`: `Number` (In INR)
  - `currency`: `String` (`INR`)
  - `status`: `Enum` (`CREATED`, `AUTHORIZED`, `CAPTURED`, `FAILED`, `REFUNDED`)
  - `gateway`: `String` (`RAZORPAY`)
  - `pointsCredited`: `Number`
  - `taxBreakdown`: `{ baseAmount, gstAmount, gstRate }`
  - `verifiedAt`: `Date`
  - `refundReason`: `String`
  - `refundedAt`: `Date`
- **Indexes**:
  - Unique: `{ orderId: 1 }`, `{ invoiceNumber: 1 }`
  - Compound: `{ userId: 1, createdAt: -1 }`, `{ status: 1, createdAt: -1 }`

---

### 5. `membershipplans` (Membership Tier Catalog)
- **Fields**: `name`, `code`, `price`, `description`, `triPointsReward`, `features`, `goodiesIncluded`, `benefitsSummary`, `isActive`, `isFeatured`, `order`.
- **Indexes**: `{ code: 1, isActive: 1 }`, `{ order: 1 }`

---

### 6. `rewardproducts` (Reward Marketplace Catalog)
- **Fields**: `title`, `description`, `category`, `pointsRequired`, `stock`, `imageUrl`, `isActive`, `isFeatured`, `minLevelRequired`.
- **Indexes**: `{ category: 1, isActive: 1 }`, `{ minLevelRequired: 1 }`, `{ pointsRequired: 1 }`

---

### 7. `rewardredemptions` (Merchandise Orders & Logistics)
- **Fields**: `redemptionId`, `userId`, `productId`, `productSnapshot`, `pointsSpent`, `shippingAddress: { fullName, phone, addressLine1, city, state, pincode }`, `status: PENDING/PROCESSING/SHIPPED/DELIVERED/CANCELLED`, `trackingNumber`, `courierPartner`, `dispatchedAt`, `deliveredAt`.
- **Indexes**: `{ redemptionId: 1 }`, `{ userId: 1, createdAt: -1 }`, `{ status: 1, createdAt: -1 }`

---

### 8. `benefits` (Curated Member Utilities & Welfare)
- **Fields**: `title`, `category` (Healthcare/Education/Insurance/Assistance), `description`, `eligibility`, `minLevelRequired`, `documentsRequired`, `howToClaim`, `providerInfo`, `isActive`.
- **Indexes**: `{ category: 1, minLevelRequired: 1, isActive: 1 }`

---

### 9. `benefitclaims` (Benefit Claim Applications & Reimbursements)
- **Fields**: `claimId`, `userId`, `benefitId`, `benefitTitle`, `category`, `claimAmount`, `disbursedAmount`, `disbursementReference`, `documents`, `userNotes`, `adminFeedback`, `status: SUBMITTED/UNDER_VERIFICATION/IN_REVIEW/APPROVED/REJECTED/DISBURSED`.
- **Indexes**: `{ claimId: 1 }`, `{ userId: 1, createdAt: -1 }`, `{ status: 1, createdAt: -1 }`

---

### 10. `educationapplications` (Education Support Grants)
- **Fields**: `applicationId`, `userId`, `studentName`, `relation`, `institution`, `courseName`, `annualFee`, `requestedGrantAmount`, `approvedAmount`, `academicPerformance`, `financialBackgroundNote`, `status: SUBMITTED/APPROVED/REJECTED/DISBURSED`.
- **Indexes**: `{ applicationId: 1 }`, `{ userId: 1, createdAt: -1 }`

---

### 11. `insuranceapplications` (Licensed Partner Insurance Leads)
- **Fields**: `applicationId`, `userId`, `insuranceType`, `sumInsured`, `nomineeDetails`, `partnerName`, `status: SUBMITTED/CONTACTED/UNDERWRITING/POLICY_ISSUED`.
- **Indexes**: `{ applicationId: 1 }`, `{ userId: 1, createdAt: -1 }`

---

### 12. `impactprojects` (Social & Humanitarian Projects)
- **Fields**: `title`, `category`, `description`, `location`, `targetBeneficiaries`, `currentBeneficiaries`, `booksDonated`, `campsConducted`, `volunteersJoined`, `imageUrls`, `status: ACTIVE/COMPLETED/UPCOMING`, `partnerNGO`.
- **Indexes**: `{ status: 1, createdAt: -1 }`

---

### 13. `supporttickets` (Grievance & Member Helpdesk)
- **Fields**: `ticketId`, `userId`, `userName`, `userEmail`, `subject`, `category`, `priority`, `status: OPEN/ASSIGNED/IN_PROGRESS/WAITING/RESOLVED/CLOSED`, `messages: [{ senderId, senderName, senderRole, message, createdAt }]`.
- **Indexes**: `{ ticketId: 1 }`, `{ userId: 1, updatedAt: -1 }`, `{ status: 1 }`

---

### 14. `contactmessages` (Public Website Inquiries)
- **Fields**: `name`, `email`, `phone`, `subject`, `message`, `status: UNREAD/READ/IN_PROGRESS/REPLIED/ARCHIVED`, `adminReplyNote`, `repliedBy`, `repliedAt`, `ipAddress`.
- **Indexes**: `{ email: 1 }`, `{ status: 1, createdAt: -1 }`

---

### 15. `ruleconfigs` (Dynamic Rules Engine)
- **Fields**: `key: String (Unique)`, `category`, `name`, `description`, `value: Mixed`, `dataType: number/string/boolean/json`, `lastModifiedBy`, `updatedAt`.
- **Indexes**: `{ key: 1 }`, `{ category: 1 }`

---

### 16. `auditlogs` (Cryptographic & Security Audit Trail)
- **Fields**: `action: String`, `performedBy: ObjectId`, `performedByName: String`, `performedByRole: String`, `targetResource: String`, `targetId: String`, `details: String`, `changes: Mixed`, `ipAddress: String`, `userAgent: String`, `timestamp: Date`.
- **Indexes**: `{ performedBy: 1, timestamp: -1 }`, `{ action: 1, timestamp: -1 }`, `{ targetResource: 1, targetId: 1 }`

---

## 🔒 Security & Data Integrity Features

1. **Immutable Ledger Guarantees**: Point balances are strictly computed and verified via append-only ledger records with non-negative constraints (`min: 0`).
2. **Anti-Circulation & Anti-Pyramid Compliance**: Tree traversal checks verify that rewards cannot be recycled recursively or paid out for head-hunting recruitment.
3. **Automated Index Synchronization**: The `initializeDatabaseIndexes()` module automatically creates and optimizes all 16 collections and compound indexes on MongoDB Atlas upon server boot.
