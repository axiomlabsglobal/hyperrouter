import { GPUInstance, ProviderCategory, SLATier, InfrastructureTier, Continent } from '@/types/gpu';

// ---------------------------------------------------------------------------
// Global GPU Instance Generator — 500+ instances across 20+ providers
// ---------------------------------------------------------------------------

interface ProviderDef {
  name: string;
  category: ProviderCategory;
  affiliateTag: string;
  baseLinkTemplate: string;
  compliance: string[];
  sla: SLATier;
  infra: InfrastructureTier;
}

interface GpuChipDef {
  name: string;
  vramPerGpu: number;
  configs: number[]; // GPU counts: 1x, 2x, 4x, 8x
  basePricePerGpu: number;
}

interface RegionDef {
  label: string;
  continent: Continent;
}

// ─── PROVIDERS (20+) ───
const PROVIDERS: ProviderDef[] = [
  // Hyperscalers
  { name: "AWS", category: "Hyperscalers", affiliateTag: "aws", baseLinkTemplate: "https://console.aws.amazon.com/ec2/v2/home?region={region}#LaunchInstances:", compliance: ["SOC 2 Type II", "HIPAA", "GDPR", "ISO 27001"], sla: "99.99%", infra: "Tier 3/4 Data Center" },
  { name: "Google Cloud", category: "Hyperscalers", affiliateTag: "gcp", baseLinkTemplate: "https://console.cloud.google.com/compute/instancesAdd?zone={zone}", compliance: ["SOC 2 Type II", "GDPR", "ISO 27001"], sla: "99.99%", infra: "Tier 3/4 Data Center" },
  { name: "Microsoft Azure", category: "Hyperscalers", affiliateTag: "azure", baseLinkTemplate: "https://portal.azure.com/#create/Microsoft.VirtualMachine", compliance: ["SOC 2 Type II", "HIPAA", "GDPR", "ISO 27001"], sla: "99.99%", infra: "Tier 3/4 Data Center" },
  { name: "Oracle Cloud", category: "Hyperscalers", affiliateTag: "oci", baseLinkTemplate: "https://cloud.oracle.com/compute/instances/create", compliance: ["SOC 2 Type II", "GDPR", "ISO 27001"], sla: "99.99%", infra: "Tier 3/4 Data Center" },
  { name: "IBM Cloud", category: "Hyperscalers", affiliateTag: "ibm", baseLinkTemplate: "https://cloud.ibm.com/gen2/profiles", compliance: ["SOC 2 Type II", "HIPAA", "GDPR", "ISO 27001"], sla: "99.99%", infra: "Tier 3/4 Data Center" },

  // Specialized GPU Clouds
  { name: "CoreWeave", category: "Specialized GPU Clouds", affiliateTag: "cw", baseLinkTemplate: "https://cloud.coreweave.com/deploy?gpu={gpu}", compliance: ["SOC 2 Type II", "HIPAA"], sla: "99.99%", infra: "Tier 3/4 Data Center" },
  { name: "Lambda", category: "Specialized GPU Clouds", affiliateTag: "lambda", baseLinkTemplate: "https://cloud.lambdalabs.com/instances/launch?type={type}", compliance: ["GDPR"], sla: "99.9%", infra: "Standard Data Center" },
  { name: "RunPod", category: "Specialized GPU Clouds", affiliateTag: "rp", baseLinkTemplate: "https://runpod.io/console/deploy?gpu={gpu}", compliance: ["GDPR"], sla: "99.9%", infra: "Standard Data Center" },
  { name: "Paperspace", category: "Specialized GPU Clouds", affiliateTag: "ps", baseLinkTemplate: "https://console.paperspace.com/machines/create?machineType={type}", compliance: ["SOC 2 Type II", "GDPR"], sla: "99.9%", infra: "Standard Data Center" },
  { name: "FluidStack", category: "Specialized GPU Clouds", affiliateTag: "fs", baseLinkTemplate: "https://dashboard.fluidstack.io/deploy?gpu={gpu}", compliance: ["GDPR"], sla: "99.9%", infra: "Standard Data Center" },
  { name: "TensorDock", category: "Specialized GPU Clouds", affiliateTag: "td", baseLinkTemplate: "https://marketplace.tensordock.com/deploy?gpu={gpu}", compliance: [], sla: "99.9%", infra: "Standard Data Center" },
  { name: "Genesis Cloud", category: "Specialized GPU Clouds", affiliateTag: "gc", baseLinkTemplate: "https://console.genesiscloud.com/instances/create?type={type}", compliance: ["GDPR", "ISO 27001"], sla: "99.9%", infra: "Tier 3/4 Data Center" },
  { name: "Cudo Compute", category: "Specialized GPU Clouds", affiliateTag: "cudo", baseLinkTemplate: "https://console.cudocompute.com/deploy?gpu={gpu}", compliance: ["GDPR"], sla: "99.9%", infra: "Standard Data Center" },
  { name: "Scaleway", category: "Specialized GPU Clouds", affiliateTag: "scw", baseLinkTemplate: "https://console.scaleway.com/instance/servers/create?commercial_type={type}", compliance: ["GDPR", "ISO 27001"], sla: "99.9%", infra: "Tier 3/4 Data Center" },
  { name: "OVHcloud", category: "Specialized GPU Clouds", affiliateTag: "ovh", baseLinkTemplate: "https://manager.ovhcloud.com/public-cloud/instances/create?gpu={gpu}", compliance: ["GDPR", "ISO 27001"], sla: "99.9%", infra: "Tier 3/4 Data Center" },
  { name: "Linode (Akamai)", category: "Specialized GPU Clouds", affiliateTag: "lin", baseLinkTemplate: "https://cloud.linode.com/linodes/create?type={type}", compliance: ["SOC 2 Type II", "GDPR"], sla: "99.9%", infra: "Tier 3/4 Data Center" },
  { name: "Vultr", category: "Specialized GPU Clouds", affiliateTag: "vul", baseLinkTemplate: "https://my.vultr.com/deploy/?plan={plan}", compliance: ["SOC 2 Type II", "GDPR"], sla: "99.9%", infra: "Tier 3/4 Data Center" },
  { name: "Crusoe Energy", category: "Specialized GPU Clouds", affiliateTag: "crusoe", baseLinkTemplate: "https://console.crusoecloud.com/deploy?gpu={gpu}", compliance: ["SOC 2 Type II"], sla: "99.9%", infra: "Standard Data Center" },
  { name: "Nebius", category: "Specialized GPU Clouds", affiliateTag: "nebius", baseLinkTemplate: "https://console.nebius.ai/compute/instances/create?gpu={gpu}", compliance: ["GDPR", "ISO 27001"], sla: "99.9%", infra: "Tier 3/4 Data Center" },

  // Decentralized / Community
  { name: "Vast.ai", category: "Decentralized / Community", affiliateTag: "vast", baseLinkTemplate: "https://console.vast.ai/create/?gpu={gpu}", compliance: [], sla: "Best Effort", infra: "Community / Peer-to-Peer" },
  { name: "Salad", category: "Decentralized / Community", affiliateTag: "salad", baseLinkTemplate: "https://portal.salad.com/deploy?gpu={gpu}", compliance: [], sla: "Best Effort", infra: "Community / Peer-to-Peer" },
  { name: "Akash Network", category: "Decentralized / Community", affiliateTag: "akash", baseLinkTemplate: "https://console.akash.network/deploy?gpu={gpu}", compliance: [], sla: "Best Effort", infra: "Community / Peer-to-Peer" },
];

// ─── GPU CHIPS ───
const GPU_CHIPS: GpuChipDef[] = [
  { name: "H200 141GB", vramPerGpu: 141, configs: [1, 4, 8], basePricePerGpu: 4.50 },
  { name: "H100 SXM 80GB", vramPerGpu: 80, configs: [1, 2, 4, 8], basePricePerGpu: 3.49 },
  { name: "H100 PCIe 80GB", vramPerGpu: 80, configs: [1, 2, 4, 8], basePricePerGpu: 3.19 },
  { name: "B200 192GB", vramPerGpu: 192, configs: [1, 8], basePricePerGpu: 5.80 },
  { name: "A100 80GB SXM", vramPerGpu: 80, configs: [1, 2, 4, 8], basePricePerGpu: 2.21 },
  { name: "A100 80GB PCIe", vramPerGpu: 80, configs: [1, 2, 4], basePricePerGpu: 1.99 },
  { name: "A100 40GB", vramPerGpu: 40, configs: [1, 2, 4, 8], basePricePerGpu: 1.39 },
  { name: "L40S 48GB", vramPerGpu: 48, configs: [1, 2, 4], basePricePerGpu: 1.15 },
  { name: "RTX 6000 Ada 48GB", vramPerGpu: 48, configs: [1, 2], basePricePerGpu: 1.05 },
  { name: "RTX A6000 48GB", vramPerGpu: 48, configs: [1, 2, 4], basePricePerGpu: 0.79 },
  { name: "RTX 4090 24GB", vramPerGpu: 24, configs: [1, 2, 4], basePricePerGpu: 0.44 },
  { name: "RTX 3090 24GB", vramPerGpu: 24, configs: [1, 2, 4], basePricePerGpu: 0.24 },
  { name: "RTX 3080 10GB", vramPerGpu: 10, configs: [1, 2], basePricePerGpu: 0.13 },
  { name: "V100 32GB", vramPerGpu: 32, configs: [1, 2, 4, 8], basePricePerGpu: 0.80 },
  { name: "T4 16GB", vramPerGpu: 16, configs: [1, 2, 4], basePricePerGpu: 0.35 },
  { name: "MI300X 192GB", vramPerGpu: 192, configs: [1, 4, 8], basePricePerGpu: 3.95 },
  { name: "MI250 128GB", vramPerGpu: 128, configs: [1, 4, 8], basePricePerGpu: 1.40 },
  { name: "TPU v5e", vramPerGpu: 16, configs: [1, 4, 8], basePricePerGpu: 1.20 },
  { name: "TPU v4", vramPerGpu: 32, configs: [4, 8], basePricePerGpu: 3.22 },
];

// ─── GLOBAL REGIONS ───
const REGIONS: RegionDef[] = [
  // North America
  { label: "🇺🇸 us-east-1 (N. Virginia)", continent: "North America" },
  { label: "🇺🇸 us-west-2 (Oregon)", continent: "North America" },
  { label: "🇺🇸 us-central-1 (Iowa)", continent: "North America" },
  { label: "🇨🇦 ca-central-1 (Montreal)", continent: "North America" },
  
  // Europe
  { label: "🇩🇪 eu-central-1 (Frankfurt)", continent: "Europe" },
  { label: "🇮🇪 eu-west-1 (Ireland)", continent: "Europe" },
  { label: "🇬🇧 eu-west-2 (London)", continent: "Europe" },
  { label: "🇫🇷 eu-west-3 (Paris)", continent: "Europe" },
  { label: "🇸🇪 eu-north-1 (Stockholm)", continent: "Europe" },

  // Asia Pacific
  { label: "🇰🇷 ap-northeast-2 (Seoul)", continent: "Asia Pacific" },
  { label: "🇸🇬 ap-southeast-1 (Singapore)", continent: "Asia Pacific" },
  { label: "🇯🇵 ap-northeast-1 (Tokyo)", continent: "Asia Pacific" },
  { label: "🇹🇼 ap-east-1 (Taipei)", continent: "Asia Pacific" },
  { label: "🇮🇳 ap-south-1 (Mumbai)", continent: "Asia Pacific" },
  { label: "🇦🇺 ap-southeast-2 (Sydney)", continent: "Asia Pacific" },
  
  // Global
  { label: "🌍 Global (Distributed)", continent: "Global" },
];

// ─── Seeded pseudo-random for deterministic builds ───
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── GENERATOR ───
export function generateGlobalInstances(): GPUInstance[] {
  // Use a new seed to completely refresh the deterministic data distribution
  const rand = seededRandom(9999);
  const instances: GPUInstance[] = [];
  let idCounter = 0;

  // Promoted instances (always first)
  instances.push({
    id: `promo-${idCounter++}`,
    provider: "CoreWeave",
    providerCategory: "Specialized GPU Clouds",
    gpuName: "8x H100 SXM 80GB",
    price: 27.92,
    region: "🇺🇸 us-east-1 (N. Virginia)",
    continent: "North America",
    availability: "On-Demand",
    vram: "80GB",
    recommended: false,
    affiliateLink: "https://cloud.coreweave.com/deploy?gpu=H100_SXM&region=LGA1",
    affiliateTag: "cw",
    badges: ["SOC2", "HIPAA"],
    promoted: true,
    compliance: ["SOC 2 Type II", "HIPAA"],
    sla: "99.99%",
    infrastructureTier: "Tier 3/4 Data Center",
    alternativeCount: 22,
  });
  instances.push({
    id: `promo-${idCounter++}`,
    provider: "RunPod",
    providerCategory: "Specialized GPU Clouds",
    gpuName: "1x A100 80GB PCIe",
    price: 1.64,
    region: "🇩🇪 eu-central-1 (Frankfurt)",
    continent: "Europe",
    availability: "On-Demand",
    vram: "80GB",
    recommended: false,
    affiliateLink: "https://runpod.io/console/deploy?template=pytorch&gpu=A100_80GB",
    affiliateTag: "rp",
    badges: [],
    promoted: true,
    compliance: ["GDPR"],
    sla: "99.9%",
    infrastructureTier: "Standard Data Center",
    alternativeCount: 31,
  });

  // Generate organic instances: Iterate through Regions first to guarantee diversity
  for (const region of REGIONS) {
    // Pick ~75% of providers for each region to ensure a robust hybrid mix
    const regionProviders = PROVIDERS.filter(() => rand() > 0.25);
    
    for (const provider of regionProviders) {
      // Pick ~50% of GPU chips for this provider in this region
      const providerGpus = GPU_CHIPS.filter(() => rand() > 0.5); 
      
      for (const gpu of providerGpus) {
        const selectedConfigs = gpu.configs.filter(() => rand() > 0.4);
        if (selectedConfigs.length === 0) selectedConfigs.push(gpu.configs[0]);

        for (const count of selectedConfigs) {
          // Price variance: ±25% from base, more for decentralized
          const variance = provider.category === "Decentralized / Community"
            ? 0.5 + rand() * 1.0
            : 0.85 + rand() * 0.35;
          const price = Math.round(gpu.basePricePerGpu * count * variance * 100) / 100;

          // Spot availability: higher chance for decentralized
          const isSpot = provider.category === "Decentralized / Community"
            ? rand() > 0.3
            : rand() > 0.82;

          // VRAM output normalization: show base capacity per GPU (e.g., 10GB, 141GB)
          const vramStr = `${gpu.vramPerGpu}GB`;
          const gpuName = `${count}x ${gpu.name}`;

          instances.push({
            id: `gen-${idCounter++}`,
            provider: provider.name,
            providerCategory: provider.category,
            gpuName,
            price: Math.max(0.08, price),
            region: region.label,
            continent: region.continent,
            availability: isSpot ? "Spot" : "On-Demand",
            vram: vramStr,
            recommended: rand() > 0.92,
            affiliateLink: provider.baseLinkTemplate.replace('{gpu}', gpu.name.split(' ')[0]).replace('{type}', gpu.name.replace(/ /g, '_')),
            affiliateTag: provider.affiliateTag,
            badges: provider.category === "Decentralized / Community" ? ["Community Risk"] : [],
            promoted: false,
            compliance: provider.compliance,
            sla: provider.sla,
            infrastructureTier: provider.infra,
            alternativeCount: Math.floor(rand() * 80) + 2,
          });
        }
      }
    }
  }

  return instances;
}

// Pre-generated singleton
let _cachedInstances: GPUInstance[] | null = null;
export function getGlobalInstances(): GPUInstance[] {
  if (!_cachedInstances) {
    _cachedInstances = generateGlobalInstances();
  }
  return _cachedInstances;
}
