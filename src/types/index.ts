export interface Milestone {
  phase: string;
  percentage: number;
  description: string;
  deliverables: string[];
}

export interface ServiceDeliverable {
  id: string;
  title: string;
  category: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  turnaroundDays: number;
  turnaroundText: string;
  startingPrice: number;
  imageUrl: string;
  imageAlt: string;
  scope?: string;
  revisions?: number;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
    avatarAlt: string;
    rating: number;
    acceptanceRate: string;
  };
  overview: string;
  milestones: Milestone[];
  includedItems: string[];
}

export type FreelancerAvailability = 'Available Now' | 'Available Next Week' | 'Booked';

export interface Specialist {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  avatarAlt: string;
  badge: string;
  bio: string;
  hourlyRate: number;
  verified: boolean;
  availability?: FreelancerAvailability;
  portfolio: {
    url: string;
    alt: string;
    title: string;
  }[];
  pastClients: string[];
  skills: string[];
  avgResponseTime: string;
  completedEscrows: number;
}

export interface CategoryData {
  id: number;
  code: string;
  title: string;
  tagline: string;
  practitionersCount: string;
  deliveryFrom: string;
  avgEngagement: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
}

export interface ProjectAccelerator {
  id: string;
  title: string;
  description: string;
  icon: string;
  specialistsCount: number;
  specializationKey: string;
}

export interface ProjectBrief {
  id: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  deadlineDays: number;
  requiredSkills: string[];
  category: string;
  status: 'Matching' | 'Reviewing Proposals' | 'Contract Active' | 'Archived';
  createdAt: string;
  clientName?: string;
}

export interface ReviewItem {
  id: string;
  serviceId: string;
  serviceTitle: string;
  authorName: string;
  authorRole: string;
  rating: number;
  content: string;
  createdAt: string;
  status: 'published' | 'flagged' | 'hidden';
  flagReason?: string;
}

export interface EscrowTransaction {
  id: string;
  orderNumber: string;
  serviceTitle: string;
  clientName: string;
  specialistName: string;
  amount: number;
  platformFee: number;
  escrowFee: number;
  totalPaid: number;
  status: 'Funded in Multi-Sig' | 'Milestone 1 Released' | 'Completed' | 'Disputed' | 'Refunded';
  currentMilestone: string;
  fundedAt: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: 'Client' | 'Specialist' | 'Admin' | 'System';
  action: string;
  details: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Security Alert';
}

export interface ReportItem {
  id: string;
  targetType: 'service' | 'specialist' | 'review' | 'message';
  targetId: string;
  targetName: string;
  reportedBy: string;
  reason: string;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
}

export interface PlatformSettings {
  commissionPercent: number;
  clientEscrowFeePercent: number;
  minEscrowHoldDays: number;
  emailProviderConfigured: boolean;
  emailProviderName: string;
}

export interface CookiePreferences {
  strictlyNecessary: boolean;
  analytics: boolean;
  marketing: boolean;
  hasConsented: boolean;
}

