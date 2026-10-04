# Startup Jigawa Ltd — Digital Innovation Center Platform

Official web platform and Content Management System for **Startup Jigawa Ltd** (RC 7256149), Dutse, Jigawa State, Nigeria.

---

## 🏛️ Institutional Architecture

Built according to the official PRD, TRD, UI/UX Specification, and Organizational Profile:
- **Framework**: Next.js 16+ (App Router, Turbopack, Server Components)
- **Styling**: Tailwind CSS v4 with bespoke institutional design tokens (`#265728` Primary Green, `#c28829` Accent Gold, `#0a0a0a` Charcoal)
- **Database & Storage**: Supabase (PostgreSQL + Supabase Storage)
- **Data Integrity**: Monitoring, Evaluation & Learning (MEL) verification flags on all impact metrics
- **Deployment**: Vercel-ready with zero build warnings

---

## 📂 Public Routes & Architecture

| Route | Purpose | Status |
|---|---|---|
| `/` | Institutional Homepage (12 comprehensive sections) | ✅ Production-ready |
| `/about` | Institutional Profile, RC 7256149, 9-year history, governance | ✅ Production-ready |
| `/programs` | Flagship training programs & digital academy pathways | ✅ Dynamic + EmptyState |
| `/opportunities` | Open calls, fellowships, bootcamps, and competitions | ✅ Dynamic + EmptyState |
| `/innovation` | 4 Innovation Labs, Product Portfolio, 10-Step Pathway | ✅ Production-ready |
| `/sectors` | 5 Core Development Sectors overview | ✅ Production-ready |
| `/sectors/[slug]` | Deep-dives into AgriTech, HealthTech, EduTech, GovTech, Commerce | ✅ Static params generated |
| `/impact` | Verified impact metrics, M&E 4-level verification protocol | ✅ Production-ready |
| `/research` | Publications, policy briefs, and baseline studies repository | ✅ Dynamic + EmptyState |
| `/news-events` | Central newsroom, official press statements & events | ✅ Dynamic + EmptyState |
| `/partners` | Intergovernmental, federal, multilateral & civil society partners | ✅ Production-ready |
| `/contact` | 5 category contact forms with API endpoint | ✅ Production-ready |
| `/privacy` | Nigeria Data Protection Act (NDPA 2023) privacy policy | ✅ Production-ready |
| `/terms` | Intellectual property, open-access citation & governance terms | ✅ Production-ready |
| `/admin/login` | Staff portal entry with audit logging notice | ✅ Production-ready |

---

## 🚀 Environment Variables

Copy `.env.example` to `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# PostgreSQL (Direct connection for Prisma)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Official Site Config
NEXT_PUBLIC_SITE_URL="https://www.startupjigawa.com"
```

---

## 🛡️ Non-Negotiable Operational Constraints Enforced

1. **No Fake / Seeded Data**: Where dynamic CMS collections have no records yet, elegant, official `EmptyState` components are displayed.
2. **Impact Verification**: Impact metrics require explicit `VERIFIED` status flags before public visibility.
3. **Honest Product Status**: All products explicitly display lifecycle stages (`PILOT`, `PROTOTYPE`, `CONCEPT`) and never falsely default to `LIVE`.
4. **Institutional Stature**: Grounded in 9 years of real delivery in Dutse, Jigawa State (RC 7256149).
