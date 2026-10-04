STARTUP JIGAWA
Digital Innovation Center Website
Technical Requirements Document
Document
Version
Prepared for
Date
TECHNICAL REQUIREMENTS DOCUMENT (TRD)
1.0
Startup Jigawa Ltd
20 September 2026
Brand basis: Deep Green #265728, Black #000000, Off-white #F7F7F7, White #FFFFFF.
Source basis: Startup Jigawa Ltd Company Profile, 2026. Product and technical recommendations in this document are 
proposed specifications unless explicitly stated as source-derived institutional facts.
Page 1
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
Document Purpose
This TRD translates the approved product requirements into an implementable engineering 
specification. It defines the recommended architecture, data model, security controls, CMS model, 
integrations, performance targets, development workflow, testing expectations and deployment 
approach.
Engineering status
The technology stack below is a recommended baseline for approval. The organizational profile defines 
institutional content and operating principles, but it does not prescribe a software stack.
1. Technical Goals
• Deliver a fast, mobile-first, SEO-friendly institutional website.
• Keep public content and admin workflows in one maintainable platform for Phase 1.
• Allow structured content relationships across programs, opportunities, products, sectors, research, 
impact and partners.
• Protect participant/application data and restrict administrative actions through RBAC.
• Make verification state explicit for sensitive public claims such as impact metrics and partnership 
status.
• Support progressive scaling without prematurely introducing microservices.
2. Proposed Technology Baseline
Layer
Recommendation
Web framework
Next.js 16+ with TypeScript
UI
Database
ORM
Authentication
Object storage
Transactional email
Monitoring
Tailwind CSS + accessible reusable 
component primitives
PostgreSQL
Prisma ORM
Auth.js or approved managed auth
S3-compatible / Supabase Storage / 
Cloudinary
Resend, Postmark or approved SMTP
Sentry + platform logs
Rationale
Strong SSR/SSG/ISR options, SEO, routing, 
server components and consolidated full
stack delivery.
Fast design-system implementation while 
preserving custom Startup Jigawa identity.
Reliable relational model for programs, 
relationships, submissions, users and 
audit trails.
Clear schema, migrations, type safety and 
maintainable developer onboarding.
Secure admin sessions, password/reset 
flows and future MFA capability.
Keep media and documents outside the 
relational database.
Application receipts, contact confirmation 
and internal alerts.
Frontend/server error visibility and 
release diagnostics.
Page 2
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
Layer
Recommendation
Rationale
Analytics
GA4 or approved privacy-conscious 
analytics
Measure content, opportunity and 
engagement outcomes.
3. Architecture
Phase 1 should use a modular monolith: one Next.js application containing public rendering, 
API/server actions and the admin CMS, backed by PostgreSQL and external object storage/email 
services. This avoids unnecessary operational overhead while keeping domain boundaries explicit in 
code.
Component
Responsibility
Public Web
Server-rendered/static/ISR pages, search, 
program/opportunity discovery, publications, forms.
Admin CMS
Application Layer
PostgreSQL
Object Storage/CDN
Email Provider
Monitoring/Analytics
3.1 Logical Request Flow
Authenticated content management, review, verification, 
media and submission workflows.
Validation, authorization, business rules, content lifecycle 
and integration orchestration.
Structured content, users/permissions, submissions, 
relational links and audit logs.
Images, reports, PDFs and other uploaded assets.
Transactional confirmations and internal notifications.
Error reporting, performance, usage and conversion 
tracking.
Browser -> CDN / Next.js -> Server Component or Route Handler -> Domain Service -> Prisma -> 
PostgreSQL. Media is delivered from optimized object storage/CDN. Admin mutations pass 
authentication, authorization, schema validation, domain validation and audit logging before 
persistence.
4. Repository and Code Organization
Recommended high-level structure:
src/app/(public), src/app/admin, src/app/api, src/components, src/features, src/lib, src/services, 
src/server, src/types, src/config, prisma, tests. Business logic should live in feature/domain services 
rather than page components.
• Use feature folders for programs, opportunities, products, impact, publications, partners and 
submissions.
• Keep authorization checks server-side even when the UI hides restricted controls.
• Centralize validation schemas and avoid duplicating field rules across client/server.
• Use typed DTOs/view models for data crossing server/client boundaries.
• Do not expose database models directly as public API contracts.
Page 3
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
Page 4
5. Environment Model
Environment Purpose Data policy
Local Developer implementation and 
automated testing. Synthetic/non-sensitive seed data only.
Preview / Staging QA, content review and stakeholder 
approval.
Sanitized representative data; no 
production secrets in client bundles.
Production Public website and operational CMS.
Approved live data with backup, 
monitoring and restricted privileged 
access.
6. Core Data Model
Entity Purpose
User / Role / Permission Admin identity, RBAC and publishing authority.
Page / PageSection Structured static content and editable landing sections.
Program / ProgramCategory Programs, lifecycle, dates, eligibility and related content.
Application / ApplicationField Internal application submissions and configurable fields.
Opportunity Calls, fellowships, internships, competitions and other 
actionable opportunities.
Event Event content, registration link, dates, venue and status.
Lab Portfolio clusters/labs.
Product Product story, target users, lifecycle status and links.
Sector Core institutional sectors.
ImpactMetric / ImpactStory Verified metrics, reporting periods and narrative evidence.
Partner / PartnershipCategory Partner identity and internal relationship state.
Publication / PublicationCategory Reports, briefs, guides, case studies and downloads.
Post / PostCategory Newsroom content.
Media Assets, alt text, captions, attribution and metadata.
NewsletterSubscriber Consent-based subscriptions.
ContactMessage Categorized enquiries and workflow status.
SiteSetting / NavigationItem Global site configuration.
AuditLog Traceable sensitive administrative changes.
7. Key Entity Specifications
7.1 Program
Field group
Identity
Delivery
Application
Audience
Lifecycle
SEO
Governance
7.2 Product
Required fields / behavior
id, title, slug, summary, rich description, categoryId, 
featuredImageId.
deliveryMode, location, startDate, endDate.
applicationType, applicationUrl, applicationOpenDate, 
deadline, capacity when applicable.
targetAudience, eligibility, prerequisites.
status, featured, publishedAt, archivedAt.
seoTitle, seoDescription, ogImageId, canonicalUrl override.
createdBy, updatedBy, review/approval fields where 
workflow enabled.
Product lifecycle enum: CONCEPT, RESEARCH, PROTOTYPE, PILOT, LIVE, PAUSED, ARCHIVED. Public 
UI must display only an approved status label; default should not be LIVE.
7.3 ImpactMetric
Recommended fields: id, name, category, numericValue/displayValue, unit, reportingPeriodStart/End, 
sourceReference, verificationStatus, verifiedBy, verifiedAt, publicVisibility, displayOrder. Verification 
state should be independent from draft/published content state.
7.4 Partner
Recommended fields: name, logo, website, category, description, internalRelationshipStatus, 
publicRelationshipLabel, start/end dates when relevant, publicVisibility, approvalNote. Internal status 
must never leak unintentionally to public output.
8. API and Server Action Design
The public site does not require a broad public API in Phase 1. Use server components for read-heavy 
pages and server actions/route handlers for controlled mutations. If APIs are exposed, version 
contracts and apply explicit authentication/authorization.
Pattern
Use
Server Components
Read public content directly through server-side services 
with caching.
Server Actions
Route Handlers
Authenticated CMS mutations and straightforward form 
submissions where suitable.
Webhook endpoints, file-signing, exports, external 
integration callbacks and API-style needs.
Page 5
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
Pattern
Use
Background jobs
Email, large exports, image processing or scheduled 
publication if execution platform requires.
• All mutations validate input with Zod or equivalent.
• Authorization occurs on the server after authentication.
• Use idempotency/replay protection for integration endpoints where applicable.
• Return safe error messages to users and detailed diagnostics only to server logs.
• Rate-limit public submission endpoints.
9. Authentication and RBAC
Admin access should use secure, server-managed sessions with HttpOnly, Secure and SameSite cookies. 
Passwords, if locally managed, must be hashed with a modern adaptive algorithm. MFA should be 
supported as a future hardening option.
Control
Authentication
Authorization
Least privilege
Session controls
Admin routes
Audit
Requirement
Email/password or approved identity provider; password 
reset; session expiry.
Permission checks at service/mutation layer, not UI-only.
Roles receive only required permissions.
Secure cookie attributes, invalidation on password/reset or 
role change where feasible.
No indexing; authentication gate before protected data is 
fetched.
Role/permission changes and destructive/publish actions 
logged.
10. Content Workflow and Verification
Content lifecycle and evidence verification are separate concerns. A published page can contain only 
approved public fields, while impact/partner/product data can carry independent verification/status 
flags.
• Content state: Draft -> Review -> Approved -> Published -> Archived.
• Impact verification: Unverified -> Pending Verification -> Verified -> Superseded/Withdrawn.
• Partner relationship: internal enum plus separately approved public label.
• Product status: explicit lifecycle enum, never inferred from existence of a URL.
• Publication status: Draft, Published, Archived; avoid public placeholder downloads.
11. Search
Phase 1 should use PostgreSQL full-text search or database-backed indexed search across programs, 
opportunities, products, events, posts and publications. Results should respect public visibility, 
publication state and date/status rules.
Page 6
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
• Weighted fields: title > summary > body/keywords.
• Filter by content type and selected category/status where useful.
• Do not index admin-only or unpublished content.
• Return concise snippets and direct links.
• Consider external search only when content volume or relevance requirements justify it.
12. Media and Document Storage
• Store binary files in object storage/CDN, not PostgreSQL.
• Validate MIME type, extension and size server-side.
• Generate responsive image variants or use provider optimization.
• Prefer AVIF/WebP when supported, with fallback.
• Store alt text, caption, source/credit and focal information where useful.
• Use signed URLs for private applicant attachments rather than public bucket access.
• Separate public publication assets from private application uploads.
13. Forms and Applications
Flow
Contact
Newsletter
Program application
External application
Technical behavior
Validate -> spam/rate checks -> persist or route -> send 
confirmation -> notify internal owner.
Consent capture -> normalized email -> deduplicate -> 
confirmation/subscribe workflow.
Render configured fields -> validate -> store securely -> 
confirmation -> admin review/export.
Track outbound click where appropriate; clearly state user is 
leaving the site.
Application attachments should use private storage and short-lived signed access. Sensitive fields 
should be minimized and retention rules defined before launch.
14. Email and Notification Integration
• Use transactional templates stored/versioned in code or an approved provider.
• User-facing messages: application receipt, contact receipt, newsletter confirmation where 
implemented.
• Internal messages: new application, partnership enquiry, form delivery failures where relevant.
• Avoid sending sensitive application contents in email; link authorized staff to the CMS instead.
• Implement retry/error logging for provider failures.
Page 7
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
Page 8
15. SEO and Discoverability
Requirement Implementation
Metadata Per-page title, description, Open Graph/Twitter image and 
canonical URL.
Sitemap Dynamic XML sitemap of public pages/content only.
Robots robots.txt and noindex rules for admin, preview and private 
pages.
Structured data Organization, Article, Event, Course where appropriate, 
WebSite and BreadcrumbList.
URLs Human-readable slugs; stable routes; redirects for changed 
slugs where possible.
Social preview Consistent branded OG images for major content types.
16. Performance Engineering
The organization profile explicitly recognizes connectivity constraints in parts of Jigawa. Performance 
is therefore a product requirement, not cosmetic optimization.
Area Requirement
Rendering Prefer static generation/ISR for stable public content; server 
rendering only when freshness requires it.
Images Responsive sizes, modern formats, lazy-load below fold, 
width/height to prevent layout shift.
JavaScript Keep public pages server-heavy; avoid shipping admin 
libraries and nonessential client components.
Fonts Self-host or efficiently preload a minimal font set; use robust 
fallbacks.
Caching Use CDN and framework caches with explicit invalidation 
after publish.
Database Index slugs, statuses, dates, foreign keys and search columns; 
avoid N+1 query patterns.
Pagination Paginate/limit long content lists and admin submissions.
Target quality goals: strong Core Web Vitals on representative mobile connections; Lighthouse 
Performance/Accessibility/Best Practices at or above 90 where practical, and SEO at or above 95 for key 
public templates. These are engineering targets, not absolute guarantees for every page/device.
17. Security Requirements
ID Requirement
SEC-001 HTTPS only in production; secure headers including HSTS 
after validation.
ID
Requirement
SEC-002
SEC-003
SEC-004
SEC-005
SEC-006
SEC-007
SEC-008
SEC-009
SEC-010
SEC-011
SEC-012
Server-side authorization for every protected mutation and 
private read.
Schema validation and sanitization for all user-controlled 
input.
Rate limiting and bot/spam controls for public forms.
CSRF protections appropriate to chosen session/action 
architecture.
Parameterized ORM queries; no raw SQL from user input.
Strict upload allowlist; executable files blocked; private 
storage for applicant files.
Secrets held in environment/secret manager, never in 
repository or client bundle.
Audit logs for publish/delete/role/verification changes.
Dependency vulnerability monitoring and timely patching.
No sensitive data in analytics, URLs, error messages or 
application logs.
Backup/restore process tested before launch and periodically 
thereafter.
18. Privacy and Data Protection
Startup Jigawa’s profile treats privacy, data protection, cybersecurity and ethical data collection as core 
operating principles. The web platform should operationalize those commitments.
• Collect the minimum data necessary for each form.
• Provide purpose-specific consent/privacy notices.
• Define retention periods for contact messages, applications and attachments.
• Limit access to applications by role.
• Provide a documented process for correction/deletion/export requests where applicable.
• Encrypt data in transit; rely on managed encryption at rest and secure backups.
• Separate analytics identifiers from sensitive program data.
• Review any future civic-data feature under a dedicated privacy/security assessment.
Institutional source references: Company Profile sections 17, 25 and 26.
19. Observability and Auditability
Signal
Requirement
Errors
Capture server/client exceptions with release/environment 
context.
Logs
Structured production logs for critical operations; redact 
secrets and personal data.
Page 9
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
Signal
Requirement
Availability
Basic uptime monitoring for production domain and critical 
API/form endpoints.
Audit
Analytics
20. Backups and Recovery
Immutable or append-oriented records for selected admin 
actions.
Track public engagement and conversions without collecting 
unnecessary personal data.
• Automated database backup at least daily in production.
• Recommended retention: minimum 7 days; 30 days preferred subject to hosting cost and policy.
• Object storage versioning/replication or periodic backup for critical media/publications.
• Document restore procedure and test restoration before public launch.
• Create manual snapshot before major migration or risky release.
21. CI/CD and Deployment
Recommended workflow: pull request -> lint/typecheck/unit tests -> build -> preview deployment -> 
review/QA -> merge -> production deployment -> smoke test -> monitoring. Database migrations must 
be reviewed and applied through controlled deployment steps.
Gate
Minimum check
Code quality
Formatting/lint, TypeScript check, unit tests.
Build
Security
Preview QA
Production smoke
Rollback
22. Testing Strategy
Test type
Unit
Integration
End-to-end
Accessibility
Production build succeeds without critical warnings.
Dependency scan and secret detection where available.
Core flows, responsive layouts and content review.
Homepage, major routes, admin login, contact form and 
representative content.
Known procedure to revert application and handle database 
migration risk.
Scope
Validation, permissions, status rules, utility functions and 
domain logic.
Database/service behavior, content lifecycle, forms, email 
adapters and storage adapters.
Browse opportunity, submit form, admin login, publish 
content, download publication and search.
Automated checks plus manual keyboard/focus/label review 
Page 10
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
Test type
Scope
on key templates.
Performance
Representative homepage, program, opportunity and article 
templates.
Security
Content QA
Authorization boundary tests, upload validation and form 
abuse scenarios.
Broken links, missing alt text, stale dates/status and 
unverified claims.
23. Database and Query Standards
• Use database constraints for uniqueness and required relationships where appropriate.
• Use transactions for multi-entity mutations that must succeed/fail together.
• Index frequent filters: status, publishedAt, deadline, categoryId, foreign keys and slugs.
• Avoid fetching rich bodies/media relations for cards when summary projections are sufficient.
• Track createdAt/updatedAt and actor fields for admin-managed entities.
• Use soft archive/status for institutional records when deletion would remove evidence/history.
• Hard-delete only when required and authorized, with special handling for user submissions and 
retention policy.
24. Accessibility Technical Requirements
• Semantic landmarks and heading hierarchy.
• Keyboard-operable navigation, menus, filters, dialogs and forms.
• Visible focus state meeting contrast requirements.
• Form labels, descriptions and error association.
• Alt text required in CMS for meaningful public images.
• Reduced-motion preference respected.
• No color-only communication for status/error/success.
• Tables used for tabular data only, with appropriate headers.
25. Content Migration
Migration should be treated as a controlled content project rather than copying the profile verbatim. 
The profile contains due-diligence notes and placeholders that are not intended for public display.
Step
Action
Inventory
List current website pages, company profile content, 
program records, media and downloadable files.
Map
Verify
Assign each content item to the new content model.
Confirm claims, partner status, leadership, product status 
and impact figures.
Page 11
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
Step
Action
Rewrite for web
Load
Review
Redirect
Shorten and structure long institutional text for scanning 
while preserving meaning.
Import/create CMS entries with metadata, alt text and 
relationships.
Content owner approves each major section.
Map legacy URLs where existing search traffic/backlinks 
matter.
26. Technical Risks and Mitigations
Risk
Mitigation
Overbuilt CMS
Start with required structured modules; avoid universal 
page-builder complexity at launch.
Stale/unverified content
Slow mobile experience
Sensitive application data exposure
Permission drift
Hosting/provider lock-in
Scope expansion
Verification flags, named content owners, review dates and 
editorial workflow.
Server-first rendering, strict image/media budget and 
lightweight components.
Private storage, RBAC, minimal data collection, safe logs and 
retention policy.
Centralized permission matrix and audit log; periodic admin
role review.
Use portable Postgres, standard object-storage abstractions 
and adapter boundaries.
Maintain Phase 1/Phase 2 boundaries in backlog and 
acceptance criteria.
27. Technical Acceptance Criteria
• Production build deploys reproducibly from version control through approved pipeline.
• Admin authentication and RBAC prevent unauthorized content or submission access.
• Core CMS entities can be created, reviewed, published, updated and archived.
• Public pages render correctly without requiring client-side JavaScript for basic content visibility.
• Forms validate server-side, rate-limit abuse, store/route correctly and provide confirmation.
• Private uploads are inaccessible through unauthenticated public URLs.
• Sitemap, metadata, canonical handling and noindex rules operate as designed.
• Error monitoring, backups and audit logs are enabled and tested.
• Key templates meet agreed responsive, accessibility and performance thresholds.
• Critical launch content has no placeholder “TO BE INSERTED” material from the source profile.
Page 12
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0
Appendix A - Recommended Permission Vocabulary
Examples: page.read/write/publish, program.create/edit/publish/archive, opportunity.manage, 
application.view/export/status, post.create/edit/publish, publication.manage, 
impact.edit/verify/publish, partner.edit/approve, media.manage, user.manage, role.manage, 
settings.manage, audit.view.
Page 13
TECHNICAL REQUIREMENTS DOCUMENT (TRD)  |  Startup Jigawa Ltd  |  v1.0