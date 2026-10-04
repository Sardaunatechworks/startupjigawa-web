// Types for Startup Jigawa Platform

export type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'SUPERSEDED';
export type ProgramStatus = 'DRAFT' | 'UPCOMING' | 'OPEN' | 'CLOSED' | 'ONGOING' | 'COMPLETED' | 'ARCHIVED';
export type OpportunityType = 'BOOTCAMP' | 'FELLOWSHIP' | 'INTERNSHIP' | 'TRAINING' | 'COMPETITION' | 'CALL' | 'EVENT';
export type OpportunityStatus = 'DRAFT' | 'UPCOMING' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
export type ProductStatus = 'CONCEPT' | 'RESEARCH' | 'PROTOTYPE' | 'PILOT' | 'LIVE' | 'PAUSED' | 'ARCHIVED';
export type PartnerInternalStatus = 'PROPOSED' | 'INFORMAL' | 'MOU_PENDING' | 'ACTIVE_MOU' | 'CONTRACT' | 'PAST';
export type EventMode = 'PHYSICAL' | 'VIRTUAL' | 'HYBRID';
export type EventStatus = 'UPCOMING' | 'HAPPENING_NOW' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED';
export type PostStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';
export type ContactType = 'GENERAL' | 'PARTNERSHIP' | 'PROGRAM' | 'MEDIA' | 'TECHNOLOGY';
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'CONTENT_MANAGER' | 'PROGRAM_MANAGER' | 'RESEARCH_EDITOR' | 'COMMUNICATIONS_OFFICER' | 'REVIEWER';

export interface Program {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  deliveryMode: string;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  deadline?: string | null;
  status: ProgramStatus;
  featured: boolean;
  targetAudience?: string | null;
  eligibility?: string | null;
  coverImage?: string | null;
  curriculum?: string | null;
  outcomes?: string[] | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  slug: string;
  summary: string;
  type: OpportunityType;
  status: OpportunityStatus;
  deadline: string;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  applicationUrl?: string | null;
  programId?: string | null;
  featured: boolean;
  eligibility?: string | null;
  publishedAt?: string | null;
}

export interface InnovationLab {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  focusAreas: string[];
  capabilities: string[];
  leadName?: string | null;
  leadTitle?: string | null;
  iconName?: string | null;
  featuredProducts?: Product[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  targetUsers: string;
  labSlug?: string | null;
  externalUrl?: string | null;
  featured: boolean;
}

export interface DevelopmentSector {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  overview: string;
  challengesAddressed: string[];
  keyInitiatives: string[];
  beneficiaryGroups: string[];
  iconName?: string | null;
}

export interface ImpactMetric {
  id: string;
  name: string;
  category: string;
  numericValue?: number | null;
  displayValue: string;
  unit: string;
  reportingPeriodStart?: string | null;
  reportingPeriodEnd?: string | null;
  sourceReference?: string | null;
  verificationStatus: VerificationStatus;
  publicVisibility: boolean;
  displayOrder: number;
}

export interface ImpactStory {
  id: string;
  title: string;
  slug: string;
  summary: string;
  challenge: string;
  intervention: string;
  participants: string;
  solution: string;
  outcome: string;
  evidenceReference?: string | null;
  programName?: string | null;
  coverImage?: string | null;
  featured: boolean;
  publishedAt?: string | null;
}

export interface Partner {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  category: string; // Government, Development Partner, Academic, Civil Society, Private Sector
  publicRelationshipLabel: string;
  description?: string | null;
  publicVisibility: boolean;
  featured: boolean;
}

export interface Publication {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  authors: string[];
  publishedDate: string;
  coverImageUrl?: string | null;
  fileUrl?: string | null;
  fileSizeBytes?: number | null;
  downloadCount: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImageUrl?: string | null;
  authorName: string;
  status: PostStatus;
  publishedAt?: string | null;
  readTimeMinutes?: number;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  type: string;
  venue?: string | null;
  mode: EventMode;
  startDateTime: string;
  endDateTime?: string | null;
  registrationUrl?: string | null;
  capacity?: number | null;
  status: EventStatus;
  speakers?: Array<{ name: string; title: string; organization?: string }>;
}

export interface ContactSubmission {
  id?: string;
  type: ContactType;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject?: string;
  message: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  profilePic?: string | null;
  initial?: string;
  department?: string;
  contactEmail?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  displayOrder: number;
}

