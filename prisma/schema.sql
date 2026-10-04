-- ============================================================
-- STARTUP JIGAWA DIGITAL INNOVATION CENTER
-- Enterprise PostgreSQL DDL Schema for Supabase
-- Derived from prisma/schema.prisma
-- ============================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. CUSTOM ENUM TYPES
-- ============================================================

DO $$ BEGIN
    CREATE TYPE "ProgramStatus" AS ENUM ('DRAFT', 'UPCOMING', 'APPLICATIONS_OPEN', 'APPLICATIONS_CLOSED', 'ONGOING', 'COMPLETED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "DeliveryMode" AS ENUM ('PHYSICAL', 'VIRTUAL', 'HYBRID');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "OpportunityType" AS ENUM ('BOOTCAMP', 'FELLOWSHIP', 'INTERNSHIP', 'TRAINING', 'COMPETITION', 'STARTUP_PROGRAMME', 'CALL', 'EVENT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "ApplicationStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'SHORTLISTED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "ProductStatus" AS ENUM ('CONCEPT', 'RESEARCH', 'PROTOTYPE', 'PILOT', 'LIVE', 'PAUSED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "VerificationStatus" AS ENUM ('UNVERIFIED', 'PENDING_VERIFICATION', 'VERIFIED', 'SUPERSEDED', 'WITHDRAWN');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "ImpactCategory" AS ENUM ('TALENT', 'TECHNOLOGY', 'CIVIC', 'RESEARCH', 'ENTREPRENEURSHIP', 'PARTNERSHIPS');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "PartnerRelationshipStatus" AS ENUM ('PROPOSED', 'INFORMAL_COLLABORATION', 'MOU_PENDING', 'ACTIVE_MOU', 'CONTRACT_GRANT', 'PAST_COLLABORATION');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "EventMode" AS ENUM ('PHYSICAL', 'VIRTUAL', 'HYBRID');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'UPCOMING', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'ONGOING', 'COMPLETED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "MessageType" AS ENUM ('GENERAL', 'PARTNERSHIP', 'PROGRAM', 'MEDIA', 'TECHNOLOGY');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE "MessageStatus" AS ENUM ('NEW', 'READ', 'RESPONDED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- 2. AUTHENTICATION & RBAC
-- ============================================================

CREATE TABLE IF NOT EXISTS "roles" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "permissions" (
    "id" TEXT PRIMARY KEY,
    "action" TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "_PermissionToRole" (
    "A" TEXT NOT NULL REFERENCES "permissions"("id") ON DELETE CASCADE,
    "B" TEXT NOT NULL REFERENCES "roles"("id") ON DELETE CASCADE,
    PRIMARY KEY ("A", "B")
);
CREATE INDEX IF NOT EXISTS "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "roleId" TEXT NOT NULL REFERENCES "roles"("id"),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 3. MEDIA ASSETS
-- ============================================================

CREATE TABLE IF NOT EXISTS "media" (
    "id" TEXT PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "caption" TEXT,
    "source" TEXT,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "focalPoint" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 4. PROGRAMMES & OPPORTUNITIES
-- ============================================================

CREATE TABLE IF NOT EXISTS "program_categories" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "slug" TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "programs" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL REFERENCES "program_categories"("id"),
    "featuredImageId" TEXT REFERENCES "media"("id"),
    "deliveryMode" "DeliveryMode" NOT NULL DEFAULT 'PHYSICAL',
    "location" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "targetAudience" TEXT,
    "eligibility" TEXT,
    "prerequisites" TEXT,
    "applicationType" TEXT,
    "applicationUrl" TEXT,
    "applicationOpenDate" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "capacity" INTEGER,
    "status" "ProgramStatus" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "ogImageId" TEXT REFERENCES "media"("id"),
    "canonicalUrl" TEXT,
    "publishedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL REFERENCES "users"("id"),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "programs_status_idx" ON "programs"("status");
CREATE INDEX IF NOT EXISTS "programs_categoryId_idx" ON "programs"("categoryId");
CREATE INDEX IF NOT EXISTS "programs_featured_idx" ON "programs"("featured");
CREATE INDEX IF NOT EXISTS "programs_deadline_idx" ON "programs"("deadline");
CREATE INDEX IF NOT EXISTS "programs_publishedAt_idx" ON "programs"("publishedAt");

CREATE TABLE IF NOT EXISTS "opportunities" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "OpportunityType" NOT NULL,
    "status" "ProgramStatus" NOT NULL DEFAULT 'DRAFT',
    "location" TEXT,
    "deliveryMode" "DeliveryMode" NOT NULL DEFAULT 'PHYSICAL',
    "targetAudience" TEXT,
    "eligibility" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "applicationOpenDate" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "applicationUrl" TEXT,
    "capacity" INTEGER,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "featuredImageId" TEXT REFERENCES "media"("id"),
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "programId" TEXT REFERENCES "programs"("id"),
    "publishedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "opportunities_type_idx" ON "opportunities"("type");
CREATE INDEX IF NOT EXISTS "opportunities_status_idx" ON "opportunities"("status");
CREATE INDEX IF NOT EXISTS "opportunities_featured_idx" ON "opportunities"("featured");
CREATE INDEX IF NOT EXISTS "opportunities_deadline_idx" ON "opportunities"("deadline");
CREATE INDEX IF NOT EXISTS "opportunities_publishedAt_idx" ON "opportunities"("publishedAt");

CREATE TABLE IF NOT EXISTS "applications" (
    "id" TEXT PRIMARY KEY,
    "programId" TEXT REFERENCES "programs"("id"),
    "opportunityId" TEXT REFERENCES "opportunities"("id"),
    "applicantName" TEXT NOT NULL,
    "applicantEmail" TEXT NOT NULL,
    "applicantPhone" TEXT,
    "data" JSONB NOT NULL,
    "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "applications_programId_idx" ON "applications"("programId");
CREATE INDEX IF NOT EXISTS "applications_opportunityId_idx" ON "applications"("opportunityId");
CREATE INDEX IF NOT EXISTS "applications_status_idx" ON "applications"("status");

-- ============================================================
-- 5. INNOVATION LABS, PRODUCTS & SECTORS
-- ============================================================

CREATE TABLE IF NOT EXISTS "labs" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "description" TEXT NOT NULL,
    "focusAreas" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "outcomes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "imageId" TEXT REFERENCES "media"("id"),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "products" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "problem" TEXT,
    "approach" TEXT,
    "targetUsers" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'CONCEPT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "website" TEXT,
    "imageId" TEXT REFERENCES "media"("id"),
    "labId" TEXT REFERENCES "labs"("id"),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "products_status_idx" ON "products"("status");
CREATE INDEX IF NOT EXISTS "products_labId_idx" ON "products"("labId");

CREATE TABLE IF NOT EXISTS "sectors" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "description" TEXT NOT NULL,
    "activities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "beneficiaries" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "imageId" TEXT REFERENCES "media"("id"),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 6. IMPACT & EVIDENCE
-- ============================================================

CREATE TABLE IF NOT EXISTS "impact_metrics" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" "ImpactCategory" NOT NULL,
    "numericValue" DOUBLE PRECISION,
    "displayValue" TEXT NOT NULL,
    "unit" TEXT,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "reportingPeriodStart" TIMESTAMP(3),
    "reportingPeriodEnd" TIMESTAMP(3),
    "sourceReference" TEXT,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "verifiedById" TEXT REFERENCES "users"("id"),
    "verifiedAt" TIMESTAMP(3),
    "publicVisibility" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "impact_metrics_verificationStatus_idx" ON "impact_metrics"("verificationStatus");
CREATE INDEX IF NOT EXISTS "impact_metrics_publicVisibility_idx" ON "impact_metrics"("publicVisibility");
CREATE INDEX IF NOT EXISTS "impact_metrics_displayOrder_idx" ON "impact_metrics"("displayOrder");

CREATE TABLE IF NOT EXISTS "impact_stories" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "challenge" TEXT NOT NULL,
    "intervention" TEXT NOT NULL,
    "participants" TEXT,
    "solution" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "evidence" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "imageId" TEXT REFERENCES "media"("id"),
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "impact_stories_status_idx" ON "impact_stories"("status");
CREATE INDEX IF NOT EXISTS "impact_stories_featured_idx" ON "impact_stories"("featured");

CREATE TABLE IF NOT EXISTS "_ProgramImpactStories" (
    "A" TEXT NOT NULL REFERENCES "impact_stories"("id") ON DELETE CASCADE,
    "B" TEXT NOT NULL REFERENCES "programs"("id") ON DELETE CASCADE,
    PRIMARY KEY ("A", "B")
);
CREATE INDEX IF NOT EXISTS "_ProgramImpactStories_B_index" ON "_ProgramImpactStories"("B");

-- ============================================================
-- 7. PARTNERSHIPS
-- ============================================================

CREATE TABLE IF NOT EXISTS "partnership_categories" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "partners" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "logo" TEXT,
    "website" TEXT,
    "categoryId" TEXT NOT NULL REFERENCES "partnership_categories"("id"),
    "description" TEXT,
    "internalRelationshipStatus" "PartnerRelationshipStatus" NOT NULL DEFAULT 'PROPOSED',
    "publicRelationshipLabel" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "publicVisibility" BOOLEAN NOT NULL DEFAULT false,
    "approvalNote" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "partners_categoryId_idx" ON "partners"("categoryId");
CREATE INDEX IF NOT EXISTS "partners_publicVisibility_idx" ON "partners"("publicVisibility");

CREATE TABLE IF NOT EXISTS "_ProgramPartners" (
    "A" TEXT NOT NULL REFERENCES "partners"("id") ON DELETE CASCADE,
    "B" TEXT NOT NULL REFERENCES "programs"("id") ON DELETE CASCADE,
    PRIMARY KEY ("A", "B")
);
CREATE INDEX IF NOT EXISTS "_ProgramPartners_B_index" ON "_ProgramPartners"("B");

-- ============================================================
-- 8. RESEARCH & PUBLICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS "publication_categories" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "slug" TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "publications" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "summary" TEXT NOT NULL,
    "author" TEXT,
    "publishedDate" TIMESTAMP(3),
    "categoryId" TEXT NOT NULL REFERENCES "publication_categories"("id"),
    "coverImageId" TEXT REFERENCES "media"("id"),
    "fileUrl" TEXT,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "uploadedById" TEXT NOT NULL REFERENCES "users"("id"),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "publications_categoryId_idx" ON "publications"("categoryId");
CREATE INDEX IF NOT EXISTS "publications_status_idx" ON "publications"("status");
CREATE INDEX IF NOT EXISTS "publications_featured_idx" ON "publications"("featured");

-- ============================================================
-- 9. NEWS & EVENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS "post_categories" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "slug" TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "posts" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL REFERENCES "post_categories"("id"),
    "imageId" TEXT REFERENCES "media"("id"),
    "authorId" TEXT NOT NULL REFERENCES "users"("id"),
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "ogImageId" TEXT REFERENCES "media"("id"),
    "scheduledAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "posts_categoryId_idx" ON "posts"("categoryId");
CREATE INDEX IF NOT EXISTS "posts_status_idx" ON "posts"("status");
CREATE INDEX IF NOT EXISTS "posts_featured_idx" ON "posts"("featured");
CREATE INDEX IF NOT EXISTS "posts_publishedAt_idx" ON "posts"("publishedAt");

CREATE TABLE IF NOT EXISTS "events" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT,
    "venue" TEXT,
    "mode" "EventMode" NOT NULL DEFAULT 'PHYSICAL',
    "startDateTime" TIMESTAMP(3),
    "endDateTime" TIMESTAMP(3),
    "registrationUrl" TEXT,
    "capacity" INTEGER,
    "speakers" JSONB,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "imageId" TEXT REFERENCES "media"("id"),
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "events_status_idx" ON "events"("status");
CREATE INDEX IF NOT EXISTS "events_startDateTime_idx" ON "events"("startDateTime");
CREATE INDEX IF NOT EXISTS "events_featured_idx" ON "events"("featured");

CREATE TABLE IF NOT EXISTS "_ProgramEvents" (
    "A" TEXT NOT NULL REFERENCES "events"("id") ON DELETE CASCADE,
    "B" TEXT NOT NULL REFERENCES "programs"("id") ON DELETE CASCADE,
    PRIMARY KEY ("A", "B")
);
CREATE INDEX IF NOT EXISTS "_ProgramEvents_B_index" ON "_ProgramEvents"("B");

-- ============================================================
-- 10. COMMUNICATIONS & INQUIRIES
-- ============================================================

CREATE TABLE IF NOT EXISTS "contact_messages" (
    "id" TEXT PRIMARY KEY,
    "type" "MessageType" NOT NULL DEFAULT 'GENERAL',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "organization" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'NEW',
    "assignedToId" TEXT REFERENCES "users"("id"),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "contact_messages_type_idx" ON "contact_messages"("type");
CREATE INDEX IF NOT EXISTS "contact_messages_status_idx" ON "contact_messages"("status");

CREATE TABLE IF NOT EXISTS "newsletter_subscribers" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "confirmedAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 11. PLATFORM CONFIGURATION & AUDIT
-- ============================================================

CREATE TABLE IF NOT EXISTS "site_settings" (
    "id" TEXT PRIMARY KEY,
    "key" TEXT UNIQUE NOT NULL,
    "value" JSONB NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'string'
);

CREATE TABLE IF NOT EXISTS "navigation_items" (
    "id" TEXT PRIMARY KEY,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT REFERENCES "navigation_items"("id"),
    "visible" BOOLEAN NOT NULL DEFAULT true
);
CREATE INDEX IF NOT EXISTS "navigation_items_parentId_idx" ON "navigation_items"("parentId");
CREATE INDEX IF NOT EXISTS "navigation_items_order_idx" ON "navigation_items"("order");

CREATE TABLE IF NOT EXISTS "audit_logs" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "users"("id"),
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "audit_logs_userId_idx" ON "audit_logs"("userId");
CREATE INDEX IF NOT EXISTS "audit_logs_entityType_entityId_idx" ON "audit_logs"("entityType", "entityId");
CREATE INDEX IF NOT EXISTS "audit_logs_action_idx" ON "audit_logs"("action");
CREATE INDEX IF NOT EXISTS "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

CREATE TABLE IF NOT EXISTS "pages" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "content" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages"("slug");
CREATE INDEX IF NOT EXISTS "pages_status_idx" ON "pages"("status");

CREATE TABLE IF NOT EXISTS "page_sections" (
    "id" TEXT PRIMARY KEY,
    "pageId" TEXT NOT NULL REFERENCES "pages"("id") ON DELETE CASCADE,
    "key" TEXT NOT NULL,
    "title" TEXT,
    "content" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "page_sections_pageId_key_unique" UNIQUE ("pageId", "key")
);
CREATE INDEX IF NOT EXISTS "page_sections_pageId_idx" ON "page_sections"("pageId");
