export type ProviderCategory = "Hyperscalers" | "Specialized GPU Clouds" | "Decentralized / Community";

export type SLATier = "99.99%" | "99.9%" | "Best Effort";
export type InfrastructureTier = "Tier 3/4 Data Center" | "Standard Data Center" | "Community / Peer-to-Peer";
export type Continent = "North America" | "Europe" | "Asia Pacific" | "Global";

export interface GPUInstance {
  id: string;
  provider: string;
  providerCategory: ProviderCategory;
  gpuName: string;
  price: number;
  region: string;
  continent: Continent;
  availability: "On-Demand" | "Spot";
  vram: string;
  recommended: boolean;
  affiliateLink: string;
  affiliateTag: string;
  badges: string[];
  promoted: boolean;
  compliance: string[];
  sla: SLATier;
  infrastructureTier: InfrastructureTier;
  alternativeCount: number;
}
