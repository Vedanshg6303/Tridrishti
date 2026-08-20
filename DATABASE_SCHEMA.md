# 🗄️ TRIDRISHTI.COM — Official Database Schema & Collections Reference

> **Database**: MongoDB / MongoDB Atlas  
> **Index Synchronization**: Automated on server start via [`initDatabase.ts`](file:///Users/vedanshgupta/.gemini/antigravity/scratch/TRIDRISHTI_PLATFORM_OFFICIAL/server/src/config/initDatabase.ts)

---

## 📑 16 Production Collections Summary

```
1. users                 -> User identity, KYC data, referral code, points balance, level status
2. rewardpointledgers    -> Immutable append-only transaction ledger with cryptographic TXN IDs
3. networknodes          -> Materialized path hierarchy tree for fast downline traversal
4. payments              -> Razorpay orders, HMAC-SHA256 signatures, GST tax invoices (INV-TRI-...)
5. membershipplans       -> Plans catalog (₹100 Entry Activation, PRO ₹500, ELITE ₹1,000)
6. rewardproducts        -> Merchandise marketplace catalog (hoodies, earbuds, smartwatches)
7. rewardredemptions     -> Member merchandise orders, shipping addresses, courier AWB tracking
8. benefits              -> Welfare perks catalog (telehealth passes, diagnostic vouchers)
9. benefitclaims         -> Medical & welfare claims triage queue, disbursement txn refs
10. educationapplications -> Higher secondary & college tuition scholarships queue
11. insuranceapplications -> Licensed insurer leads (Care Health, HDFC Life)
12. impactprojects       -> Community social projects (Vidya Jyoti, Arogya Sanjeevani)
13. supporttickets       -> Member helpdesk ticketing & conversation message threads
14. contactmessages      -> Public website inquiry messages & admin reply workflow
15. ruleconfigs          -> Dynamic rules engine (entry fee, 10 coins payout, tier thresholds)
16. auditlogs            -> Cryptographic security audit stream (admin actions, IP, user-agent)
```

---

## ⚡ Indexing Strategy

- **Unique Indexes**: `users.email`, `users.referralCode`, `rewardpointledgers.transactionId`, `payments.orderId`, `payments.invoiceNumber`, `ruleconfigs.key`.
- **Compound Performance Indexes**:
  - `users`: `{ role: 1, isSuspended: 1 }`, `{ kycStatus: 1, createdAt: -1 }`, `{ level: 1, pointsBalance: -1 }`
  - `rewardpointledgers`: `{ userId: 1, createdAt: -1 }`, `{ type: 1, createdAt: -1 }`, `{ status: 1, createdAt: -1 }`
  - `networknodes`: `{ parentId: 1 }`, `{ ancestors: 1 }`, `{ path: 1 }`
  - `payments`: `{ userId: 1, createdAt: -1 }`, `{ status: 1, createdAt: -1 }`
  - `contactmessages`: `{ status: 1, createdAt: -1 }`, `{ email: 1 }`
  - `auditlogs`: `{ performedBy: 1, timestamp: -1 }`, `{ action: 1, timestamp: -1 }`
