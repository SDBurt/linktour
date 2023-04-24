export interface SimpleLinkProps {
  key: string;
  url: string;
}

export interface LinkProps {
  id?: string;
  domain: string;
  key: string;
  url: string;

  title: string | null;
  description: string | null;

  clicks: number;

  public: boolean;
  publicStats: boolean;

  createdAt: Date;
  updatedAt: Date;

  userId: string;
}

// export interface ProjectProps {
//   id: string;
//   name: string;
//   slug: string;
//   domain: string;
//   domainVerified: boolean;
//   logo?: string;
//   ownerUsageLimit?: number;
//   ownerExceededUsage?: boolean;
//   users?: {
//     role: string;
//   }[];
// }

export interface ProjectProps {
  id: string;
  name: string;
  slug: string;
  domain: string;
  userId: string;
  links?: { id: string }[];
}

export interface UsageProps {
  usage: number;
  usageLimit: number;
  projectCount?: number;
  billingCycleStart?: number;
  ownerUsageLimit?: number;
  ownerExceededUsage?: boolean;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  stripeId: string;
  usageLimit: number;
  joinedAt?: Date;
  projects?: { projectId: string }[];
}

export type DomainVerificationStatusProps =
  | "Valid Configuration"
  | "Invalid Configuration"
  | "Pending Verification"
  | "Domain Not Found"
  | "Unknown Error";

export interface RootDomainProps {
  target: string;
  rewrite?: boolean;
}
