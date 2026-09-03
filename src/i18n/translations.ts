"use client";

// ---------------------------------------------------------------------------
// i18n Translation Dictionaries — 5 Languages
// Keys are used across all UI components via the useI18n() hook.
// ---------------------------------------------------------------------------

export type Locale = "en" | "ko" | "ja" | "de" | "es" | "fr";

export interface TranslationDict {
  // Navbar
  "nav.instances": string;
  "nav.pricing": string;
  "nav.api": string;
  "nav.docs": string;
  "nav.login": string;
  "nav.signup": string;

  // Search Bar
  "search.label": string;
  "search.placeholder": string;
  "search.allGpus": string;
  "search.anyVram": string;
  "search.anyRegion": string;
  "search.button": string;
  "search.liveInventory": string;
  "search.allCounts": string;
  "filter.tier34": string;
  "filter.standardDc": string;
  "filter.community": string;
  "filter.noSla": string;
  "filter.uptime9999": string;
  "filter.uptime999": string;
  "search.stats": string;
  "search.noModels": string;

  // Filter Sidebar
  "filter.availability": string;
  "filter.includeSpot": string;
  "filter.maxPrice": string;
  "filter.globalRegions": string;
  "filter.region": string;
  "filter.enterprise": string;
  "filter.compliance": string;
  "filter.infraTier": string;
  "filter.sla": string;
  "filter.providers": string;
  "filter.all": string;
  "filter.hyperscalers": string;
  "filter.specialized": string;
  "filter.decentralized": string;

  // Region names
  "region.northAmerica": string;
  "region.europe": string;
  "region.asiaPacific": string;
  "region.global": string;

  // Results
  "results.searching": string;
  "results.promoted": string;
  "results.results": string;
  "results.priceAsc": string;
  "results.priceDesc": string;
  "results.noResults": string;
  "results.noResultsHint": string;
  "results.failed": string;
  "results.failedHint": string;
  "results.showRealCost": string;
  "results.realCostDesc": string;

  // Table Columns
  "col.provider": string;
  "col.gpu": string;
  "col.vram": string;
  "col.region": string;
  "col.type": string;
  "col.sla": string;
  "col.compliance": string;
  "col.price": string;

  // GPU Card
  "gpu.rent": string;
  "gpu.ad": string;
  "gpu.similar": string;
  "gpu.acrossRegions": string;

  // Alert Creator
  "alert.create": string;
  "alert.title": string;

  // Error
  "error.title": string;
  "error.description": string;
  "error.retry": string;

  // Auth & Compliance
  "auth.continueGoogle": string;
  "auth.terms": string;
  "auth.signupDisclaimer": string;
  "compliance.title": string;
  "compliance.subtitle": string;
  "compliance.earTitle": string;
  "compliance.earDesc": string;
  "compliance.aupTitle": string;
  "compliance.aupDesc": string;
  "compliance.amlTitle": string;
  "compliance.amlDesc": string;
  "compliance.proceed": string;
  "compliance.cancel": string;
  "compliance.acknowledge": string;

  // Footer
  "footer.product": string;
  "footer.gpuSearch": string;
  "footer.pricing": string;
  "footer.apiDocs": string;
  "footer.docs": string;
  "footer.resources": string;
  "footer.gettingStarted": string;
  "footer.apiReference": string;
  "footer.status": string;
  "footer.contactSales": string;
  "footer.company": string;
  "footer.about": string;
  "footer.blog": string;
  "footer.careers": string;
  "footer.github": string;
  "footer.legal": string;
  "footer.aup": string;
  "footer.ear": string;
  "footer.aml": string;
  "footer.privacyPolicy": string;
  "footer.terms": string;
  "footer.slogan": string;
  "footer.allSystemsNormal": string;
  "footer.disclaimer": string;
  "footer.copyright": string;
  "pricing.title": string;
  "pricing.subtitle": string;
  "pricing.starter": string;
  "pricing.starterDesc": string;
  "pricing.pro": string;
  "pricing.proDesc": string;
  "pricing.enterprise": string;
  "pricing.enterpriseDesc": string;
  "alert.desc": string;
  "legal.aup.title": string;
  "legal.ear.title": string;
  "legal.aml.title": string;
  "legal.privacy.title": string;
  "legal.terms.title": string;
  "legal.contentPlaceholder": string;

}

const en: TranslationDict = {
  "nav.instances": "Instances",
  "nav.pricing": "Pricing",
  "nav.api": "API",
  "nav.docs": "Docs",
  "nav.login": "Log in",
  "nav.signup": "Sign up",

  "search.label": "Search",
  "search.placeholder": "Search GPU...",
  "search.allGpus": "All GPUs",
  "search.anyVram": "Any VRAM",
  "search.anyRegion": "Any Region",
  "search.button": "Search",
  "search.liveInventory": "Live Inventory",
  "search.allCounts": "All Counts",
  "filter.tier34": "Tier 3/4 Data Center",
  "filter.standardDc": "Standard Data Center",
  "filter.community": "Community / Peer-to-Peer",
  "filter.noSla": "No SLA",
  "filter.uptime9999": "99.99% Uptime",
  "filter.uptime999": "99.9% Uptime",
  "search.stats": "19 providers · 40+ instances indexed",
  "search.noModels": "No models found.",

  "filter.availability": "Availability",
  "filter.includeSpot": "Include Spot",
  "filter.maxPrice": "Max $/hr",
  "filter.globalRegions": "Global Regions",
  "filter.region": "Region",
  "filter.enterprise": "Enterprise",
  "filter.compliance": "Compliance",
  "filter.infraTier": "Infra Tier",
  "filter.sla": "SLA",
  "filter.providers": "Providers",
  "filter.all": "All",
  "filter.hyperscalers": "Hyperscalers",
  "filter.specialized": "Specialized",
  "filter.decentralized": "Decentralized",

  "region.northAmerica": "North America",
  "region.europe": "Europe",
  "region.asiaPacific": "Asia Pacific",
  "region.global": "Global",

  "results.searching": "Searching...",
  "results.promoted": "promoted",
  "results.results": "results",
  "results.priceAsc": "Price ↑",
  "results.priceDesc": "Price ↓",
  "results.noResults": "No instances found",
  "results.noResultsHint": "Adjust filters or search criteria.",
  "results.failed": "Failed to load instances",
  "results.failedHint": "Try again later or adjust your filters.",
  "results.showRealCost": "Show Real Cost",
  "results.realCostDesc": "Includes est. 1TB storage and network egress (~23%).",

  "col.provider": "Provider",
  "col.gpu": "GPU",
  "col.vram": "VRAM",
  "col.region": "Region",
  "col.type": "Type",
  "col.sla": "SLA",
  "col.compliance": "Compliance",
  "col.price": "Price",

  "gpu.rent": "Rent",
  "gpu.ad": "Ad",
  "gpu.similar": "similar",
  "gpu.acrossRegions": "instances across other regions.",

  "alert.create": "Create Availability Alert",
  "alert.title": "Set Alert",

  "error.title": "Something went wrong",
  "error.description": "Unable to load pricing data for this region. Please try again.",
  "error.retry": "Try again",

  "auth.continueGoogle": "Continue with Google",
  "auth.terms": "By continuing, you agree to our Terms of Service and Privacy Policy.",
  "auth.signupDisclaimer": "By signing up, you automatically agree to EAR regulations and AUP.",

  "compliance.title": "Compliance Gateway",
  "compliance.subtitle": "Required before proceeding",
  "compliance.earTitle": "US Export Control & Sanctions (EAR/OFAC)",
  "compliance.earDesc": "I confirm that I am not located in a sanctioned country and will not use resources on behalf of sanctioned entities.",
  "compliance.aupTitle": "Acceptable Use Policy (AUP)",
  "compliance.aupDesc": "I agree not to use resources for crypto mining, DDoS, hacking, or illegal AI training.",
  "compliance.amlTitle": "Aggregator Disclaimer (AML/Liability)",
  "compliance.amlDesc": "HyperRouter is a metasearch engine. The vendor holds liability for payment and infrastructure.",
  "compliance.proceed": "Accept & Continue",
  "compliance.cancel": "Cancel",
  "compliance.acknowledge": "Acknowledge",

  "footer.product": "Product",
  "footer.gpuSearch": "GPU Meta-Search",
  "footer.pricing": "Pricing",
  "footer.apiDocs": "API Docs",
  "footer.docs": "Documentation",
  "footer.resources": "Resources",
  "footer.gettingStarted": "Getting Started",
  "footer.apiReference": "API Reference",
  "footer.status": "Status",
  "footer.contactSales": "Contact Sales",
  "footer.company": "Company",
  "footer.about": "About",
  "footer.blog": "Blog",
  "footer.careers": "Careers",
  "footer.github": "GitHub",
  "footer.legal": "Legal & Compliance",
  "footer.aup": "Acceptable Use (AUP)",
  "footer.ear": "Export Control (EAR)",
  "footer.aml": "Terms of Aggregation",
  "footer.privacyPolicy": "Privacy Policy",
  "footer.terms": "Terms of Service",
  "footer.slogan": "Global GPU compute metasearch.\nCompare. Deploy. Save.",
  "footer.allSystemsNormal": "All systems normal",
  "footer.disclaimer": "HyperRouter operates strictly as an independent search aggregator. We do not provision compute resources, process payments, or manage infrastructure. Users are solely responsible for complying with all applicable local and international laws, including U.S. Export Administration Regulations (EAR) and OFAC sanctions. By using this site, you acknowledge that all transactions and identity verifications (KYC/AML) are handled directly by the respective third-party cloud providers.",
  "footer.copyright": "© 2026 HyperRouter, Inc. All rights reserved.",
  "pricing.title": "Simple, Transparent Pricing",
  "pricing.subtitle": "HyperRouter is currently in public beta. All routing features are free to use.",
  "pricing.starter": "Starter",
  "pricing.starterDesc": "Personal. Inventory search, basic alerts (3).",
  "pricing.pro": "Pro Team",
  "pricing.proDesc": "Startup. Real-time Slack/Discord webhooks (20), team sharing.",
  "pricing.enterprise": "Enterprise API",
  "pricing.enterpriseDesc": "Enterprise. Unlimited real-time routing API, 30s tracking.",
  "alert.desc": "Get notified when new instances are available.",
  "legal.aup.title": "Acceptable Use Policy",
  "legal.ear.title": "EAR / OFAC Compliance",
  "legal.aml.title": "AML / KYC Policy",
  "legal.privacy.title": "Privacy Policy",
  "legal.terms.title": "Terms of Service",
  "legal.contentPlaceholder": "This is a placeholder for the legal document content. HyperRouter operates strictly as an independent search aggregator. All terms apply as per local and international laws.",

};

const ko: TranslationDict = {
  ...en,
  "nav.instances": "인스턴스",
  "nav.pricing": "요금",
  "nav.api": "API",
  "nav.docs": "문서",
  "nav.login": "로그인",
  "nav.signup": "회원가입",

  "search.label": "검색",
  "search.placeholder": "GPU 검색...",
  "search.allGpus": "전체 GPU",
  "search.anyVram": "전체 VRAM",
  "search.anyRegion": "전체 리전",
  "search.button": "검색",
  "search.liveInventory": "실시간 재고",
  "search.allCounts": "전체 개수",
  "filter.tier34": "티어 3/4 데이터센터",
  "filter.standardDc": "표준 데이터센터",
  "filter.community": "커뮤니티 / P2P",
  "filter.noSla": "SLA 없음",
  "filter.uptime9999": "99.99% 가동률",
  "filter.uptime999": "99.9% 가동률",
  "search.stats": "19개 공급사 · 40+ 인스턴스 인덱싱",
  "search.noModels": "모델을 찾을 수 없습니다.",

  "filter.availability": "가용성",
  "filter.includeSpot": "스팟 포함",
  "filter.maxPrice": "최대 $/hr",
  "filter.globalRegions": "글로벌 리전",
  "filter.region": "리전",
  "filter.enterprise": "엔터프라이즈",
  "filter.compliance": "컴플라이언스",
  "filter.infraTier": "인프라 등급",
  "filter.sla": "SLA",
  "filter.providers": "공급사",
  "filter.all": "전체",
  "filter.hyperscalers": "하이퍼스케일러",
  "filter.specialized": "전문 벤더사",
  "filter.decentralized": "분산형 (커뮤니티)",

  "region.northAmerica": "북미",
  "region.europe": "유럽",
  "region.asiaPacific": "아시아 태평양",
  "region.global": "글로벌",

  "results.searching": "검색 중...",
  "results.promoted": "프로모션",
  "results.results": "건",
  "results.priceAsc": "가격 ↑",
  "results.priceDesc": "가격 ↓",
  "results.noResults": "인스턴스를 찾을 수 없습니다",
  "results.noResultsHint": "필터 또는 검색 조건을 조정하세요.",
  "results.failed": "인스턴스 로드 실패",
  "results.failedHint": "잠시 후 다시 시도하거나 필터를 조정하세요.",
  "results.showRealCost": "실제 TCO 비용 보기",
  "results.realCostDesc": "네트워크 송출 및 스토리지 1TB 예상 오버헤드(~23%) 포함.",

  "col.provider": "공급사",
  "col.gpu": "GPU",
  "col.vram": "VRAM",
  "col.region": "리전",
  "col.type": "유형",
  "col.sla": "SLA",
  "col.compliance": "인증",
  "col.price": "가격",

  "gpu.rent": "대여",
  "gpu.ad": "광고",
  "gpu.similar": "유사",
  "gpu.acrossRegions": "개 인스턴스가 다른 리전에 있습니다.",

  "alert.create": "가용성 알림 생성",
  "alert.title": "알림 설정",

  "error.title": "오류가 발생했습니다",
  "error.description": "해당 리전의 가격 데이터를 불러올 수 없습니다. 다시 시도해주세요.",
  "error.retry": "다시 시도",

  "auth.continueGoogle": "Google로 계속하기",
  "auth.terms": "계속하면 서비스 약관 및 개인정보 처리방침에 동의하는 것입니다.",
  "auth.signupDisclaimer": "가입 시 EAR 규제 및 AUP에 자동 동의하는 것으로 간주합니다.",

  "compliance.title": "컴플라이언스 게이트웨이",
  "compliance.subtitle": "계속하기 전에 동의가 필요합니다",
  "compliance.earTitle": "미국 수출 통제 및 제재 (EAR/OFAC)",
  "compliance.earDesc": "본인은 제재 대상 국가 소속이 아니며, 제재 대상 기업을 대신하여 인프라를 사용하지 않음을 확인합니다.",
  "compliance.aupTitle": "적정 사용 정책 (AUP)",
  "compliance.aupDesc": "본 자원을 암호화폐 채굴, DDoS, 해킹 또는 불법 AI 모델 학습에 사용하지 않을 것에 동의합니다.",
  "compliance.amlTitle": "중개자 면책 조항 (AML/책임)",
  "compliance.amlDesc": "HyperRouter는 단순 중개 검색 엔진이며, 실제 결제 및 인프라 제공 책임은 해당 벤더사에게 있습니다.",
  "compliance.proceed": "동의 및 계속",
  "compliance.cancel": "취소",
  "compliance.acknowledge": "확인",

  "footer.product": "제품",
  "footer.gpuSearch": "GPU 메타검색",
  "footer.pricing": "요금",
  "footer.apiDocs": "API 문서",
  "footer.docs": "문서",
  "footer.resources": "리소스",
  "footer.gettingStarted": "시작하기",
  "footer.apiReference": "API 참조",
  "footer.status": "상태",
  "footer.contactSales": "영업팀 문의",
  "footer.company": "회사",
  "footer.about": "소개",
  "footer.blog": "블로그",
  "footer.careers": "채용",
  "footer.github": "GitHub",
  "footer.legal": "법적 고지 및 규제",
  "footer.aup": "적정 사용 정책 (AUP)",
  "footer.ear": "수출 통제 (EAR)",
  "footer.aml": "중개자 면책 (AML)",
  "footer.privacyPolicy": "개인정보 처리방침",
  "footer.terms": "서비스 이용약관",
  "footer.slogan": "글로벌 GPU 클라우드 메타검색.\n비교. 배포. 절약.",
  "footer.allSystemsNormal": "모든 시스템 정상 동작",
  "footer.disclaimer": "HyperRouter는 독립적인 중개 검색 엔진입니다. 당사는 컴퓨팅 인프라를 직접 제공하거나 결제를 처리하지 않습니다. 사용자는 미국 수출 통제 규정(EAR/OFAC) 등 현지 및 국제 법률을 준수할 책임이 있으며, 모든 결제 및 신원 확인(KYC/AML)은 각 클라우드 벤더사에서 직접 처리합니다.",
  "footer.copyright": "© 2026 HyperRouter, Inc. 모든 권리 보유.",
  "pricing.title": "단순하고 투명한 요금제",
  "pricing.subtitle": "HyperRouter는 현재 베타 테스트 중입니다. 모든 라우팅 기능은 무료로 제공됩니다.",
  "pricing.starter": "스타터 (Starter)",
  "pricing.starterDesc": "개인용. 인벤토리 검색, 기본 알림(3개).",
  "pricing.pro": "프로 팀 (Pro Team)",
  "pricing.proDesc": "스타트업용. 실시간 Slack/Discord 웹훅(20개), 팀 계정 공유.",
  "pricing.enterprise": "엔터프라이즈 API (Enterprise)",
  "pricing.enterpriseDesc": "기업용. 실시간 라우팅 API 무제한, 30초 단위 초밀착 추적.",
  "alert.desc": "새 인스턴스가 등록되면 알림을 받습니다.",
  "legal.aup.title": "허용 가능한 사용 정책 (AUP)",
  "legal.ear.title": "EAR / OFAC 컴플라이언스",
  "legal.aml.title": "AML / KYC 정책",
  "legal.privacy.title": "개인정보 처리방침",
  "legal.terms.title": "이용약관",
  "legal.contentPlaceholder": "법적 문서의 임시 텍스트입니다. HyperRouter는 독립적인 중개 검색 엔진으로 운영되며, 관련 국내외 법률에 따라 모든 약관이 적용됩니다.",

};

const ja: TranslationDict = {
  ...en,
  "nav.instances": "インスタンス",
  "nav.pricing": "料金",
  "nav.api": "API",
  "nav.docs": "ドキュメント",
  "nav.login": "ログイン",
  "nav.signup": "新規登録",

  "search.label": "検索",
  "search.placeholder": "GPU検索...",
  "search.allGpus": "全GPU",
  "search.anyVram": "全VRAM",
  "search.anyRegion": "全リージョン",
  "search.button": "検索",
  "search.liveInventory": "ライブインベントリ",
  "search.allCounts": "すべての数",
  "filter.tier34": "ティア3/4データセンター",
  "filter.standardDc": "標準データセンター",
  "filter.community": "コミュニティ / P2P",
  "filter.noSla": "SLAなし",
  "filter.uptime9999": "99.99% 稼働率",
  "filter.uptime999": "99.9% 稼働率",
  "search.stats": "19プロバイダー · 40以上のインスタンス",
  "search.noModels": "モデルが見つかりません。",

  "filter.availability": "可用性",
  "filter.includeSpot": "スポット含む",
  "filter.maxPrice": "最大$/hr",
  "filter.globalRegions": "グローバルリージョン",
  "filter.region": "リージョン",
  "filter.enterprise": "エンタープライズ",
  "filter.compliance": "コンプライアンス",
  "filter.infraTier": "インフラ階層",
  "filter.sla": "SLA",
  "filter.providers": "プロバイダー",
  "filter.all": "全て",
  "filter.hyperscalers": "ハイパースケーラー",
  "filter.specialized": "特化型ベンダー",
  "filter.decentralized": "分散型 (コミュニティ)",

  "region.northAmerica": "北米",
  "region.europe": "ヨーロッパ",
  "region.asiaPacific": "アジア太平洋",
  "region.global": "グローバル",

  "results.searching": "検索中...",
  "results.promoted": "プロモ",
  "results.results": "件",
  "results.priceAsc": "価格 ↑",
  "results.priceDesc": "価格 ↓",
  "results.noResults": "インスタンスが見つかりません",
  "results.noResultsHint": "フィルターや検索条件を変更してください。",
  "results.failed": "インスタンスの読み込みに失敗しました",
  "results.failedHint": "後でもう一度お試しください。",

  "col.provider": "プロバイダー",
  "col.gpu": "GPU",
  "col.vram": "VRAM",
  "col.region": "リージョン",
  "col.type": "タイプ",
  "col.sla": "SLA",
  "col.compliance": "認証",
  "col.price": "価格",

  "gpu.rent": "レンタル",
  "gpu.ad": "広告",
  "gpu.similar": "類似",
  "gpu.acrossRegions": "件が他のリージョンにあります。",

  "alert.create": "可用性アラートを作成",
  "alert.title": "アラート設定",

  "error.title": "エラーが発生しました",
  "error.description": "このリージョンの価格データを読み込めません。再試行してください。",
  "error.retry": "再試行",

  "auth.continueGoogle": "Googleで続行",
  "auth.terms": "続行すると利用規約およびプライバシーポリシーに同意したことになります。",
  "auth.signupDisclaimer": "登録により、EAR規制およびAUPに自動的に同意したとみなされます。",

  "compliance.title": "コンプライアンスゲートウェイ",
  "compliance.subtitle": "続行する前に同意が必要です",
  "compliance.earTitle": "米国輸出管理および制裁 (EAR/OFAC)",
  "compliance.earDesc": "私は制裁対象国に所在しておらず、制裁対象企業のためにリソースを使用しないことを確認します。",
  "compliance.aupTitle": "利用規定 (AUP)",
  "compliance.aupDesc": "暗号通貨のマイニング、DDoS、ハッキング、または違法なAI学習にリソースを使用しないことに同意します。",
  "compliance.amlTitle": "仲介者の免責事項 (AML/責任)",
  "compliance.amlDesc": "HyperRouterは検索エンジンであり、決済およびインフラの責任はベンダーにあります。",
  "compliance.proceed": "続行",
  "compliance.cancel": "キャンセル",
  "compliance.acknowledge": "確認",

  "footer.product": "製品",
  "footer.gpuSearch": "GPU メタ検索",
  "footer.pricing": "料金",
  "footer.apiDocs": "API ドキュメント",
  "footer.docs": "ドキュメント",
  "footer.resources": "リソース",
  "footer.gettingStarted": "はじめに",
  "footer.apiReference": "API リファレンス",
  "footer.status": "ステータス",
  "footer.contactSales": "営業へのお問い合わせ",
  "footer.company": "会社",
  "footer.about": "概要",
  "footer.blog": "ブログ",
  "footer.careers": "採用情報",
  "footer.github": "GitHub",
  "footer.legal": "法的情報",
  "footer.aup": "利用規定 (AUP)",
  "footer.ear": "輸出管理 (EAR)",
  "footer.aml": "免責事項 (AML)",
  "footer.privacyPolicy": "プライバシーポリシー",
  "footer.terms": "利用規約",
  "footer.slogan": "グローバルGPUクラウドメタ検索\n比較。デプロイ。節約。",
  "footer.allSystemsNormal": "全システム正常",
  "footer.disclaimer": "HyperRouterは独立した検索アグリゲーターです。決済やインフラ提供は行いません。ユーザーは米国の輸出管理(EAR)および制裁(OFAC)を遵守する責任があります。決済および本人確認(KYC/AML)は各クラウドベンダーにより直接処理されます。",
  "footer.copyright": "© 2026 HyperRouter, Inc. All rights reserved.",
  "pricing.title": "シンプルで透明な料金体系",
  "pricing.subtitle": "現在パブリックベータ中です。すべてのルーティング機能は無料でご利用いただけます。",
  "pricing.starter": "スターター (Starter)",
  "pricing.starterDesc": "個人向け。在庫検索、基本アラート (3)。",
  "pricing.pro": "プロ チーム (Pro Team)",
  "pricing.proDesc": "スタートアップ向け。リアルタイムWebhook (20)、チーム共有。",
  "pricing.enterprise": "エンタープライズ API",
  "pricing.enterpriseDesc": "企業向け。無制限API、30秒単位の超高速トラッキング。",
};

const de: TranslationDict = {
  ...en,
  "nav.instances": "Instanzen",
  "nav.pricing": "Preise",
  "nav.login": "Anmelden",
  "nav.signup": "Registrieren",
  "auth.signupDisclaimer": "Mit der Anmeldung stimmen Sie automatisch den EAR-Vorschriften und der AUP zu.",
  "compliance.title": "Compliance-Gateway",
  "compliance.proceed": "Fortfahren",
  "compliance.cancel": "Abbrechen",
  "compliance.acknowledge": "Bestätigen",

  "footer.product": "Produkt",
  "footer.gpuSearch": "GPU Meta-Suche",
  "footer.pricing": "Preise",
  "footer.apiDocs": "API Docs",
  "footer.docs": "Dokumentation",
  "footer.resources": "Ressourcen",
  "footer.gettingStarted": "Erste Schritte",
  "footer.apiReference": "API Referenz",
  "footer.status": "Status",
  "footer.contactSales": "Vertrieb kontaktieren",
  "footer.company": "Unternehmen",
  "footer.about": "Über uns",
  "footer.blog": "Blog",
  "footer.careers": "Karriere",
  "footer.github": "GitHub",
  "footer.legal": "Rechtliches",
  "footer.aup": "Nutzungsbedingungen (AUP)",
  "footer.ear": "Exportkontrolle (EAR)",
  "footer.aml": "Haftungsausschluss (AML)",
  "footer.privacyPolicy": "Datenschutz",
  "footer.terms": "Nutzungsbedingungen",
  "footer.slogan": "Globale GPU Metasuche.\nVergleichen. Bereitstellen. Sparen.",
  "footer.allSystemsNormal": "Alle Systeme normal",
  "footer.disclaimer": "HyperRouter ist eine unabhängige Suchmaschine. Die Nutzer sind für die Einhaltung der EAR/OFAC-Bestimmungen verantwortlich. Zahlungen und KYC erfolgen direkt über die Cloud-Anbieter.",
  "footer.copyright": "© 2026 HyperRouter, Inc. Alle Rechte vorbehalten.",
  "pricing.title": "Einfache, transparente Preise",
  "pricing.subtitle": "Derzeit in der öffentlichen Beta. Alle Routing-Funktionen sind kostenlos.",
  "pricing.starter": "Starter",
  "pricing.starterDesc": "Persönlich. Inventarsuche, Basis-Alarme (3).",
  "pricing.pro": "Pro Team",
  "pricing.proDesc": "Startup. Echtzeit-Webhooks (20), Team-Freigabe.",
  "pricing.enterprise": "Enterprise API",
  "pricing.enterpriseDesc": "Unternehmen. Unbegrenzte API, 30s-Tracking.",
  "alert.desc": "Lassen Sie sich benachrichtigen, wenn neue Instanzen verfügbar sind.",
  "legal.aup.title": "Richtlinie zur akzeptablen Nutzung",
  "legal.ear.title": "EAR / OFAC-Konformität",
  "legal.aml.title": "AML / KYC-Richtlinie",
  "legal.privacy.title": "Datenschutzrichtlinie",
  "legal.terms.title": "Nutzungsbedingungen",
  "legal.contentPlaceholder": "Platzhalter für das rechtliche Dokument. HyperRouter operiert als unabhängige Suchmaschine.",

};

const es: TranslationDict = {
  ...en,
  "nav.instances": "Instancias",
  "nav.pricing": "Precios",
  "nav.login": "Iniciar sesión",
  "nav.signup": "Regístrate",
  "auth.signupDisclaimer": "Al registrarse, acepta automáticamente las normativas EAR y AUP.",
  "compliance.title": "Puerta de Cumplimiento",
  "compliance.proceed": "Continuar",
  "compliance.cancel": "Cancelar",
  "compliance.acknowledge": "Reconocer",

  "footer.product": "Producto",
  "footer.gpuSearch": "Meta-búsqueda GPU",
  "footer.pricing": "Precios",
  "footer.apiDocs": "API Docs",
  "footer.docs": "Documentación",
  "footer.resources": "Recursos",
  "footer.gettingStarted": "Empezando",
  "footer.apiReference": "Referencia API",
  "footer.status": "Estado",
  "footer.contactSales": "Contactar Ventas",
  "footer.company": "Empresa",
  "footer.about": "Acerca de",
  "footer.blog": "Blog",
  "footer.careers": "Empleos",
  "footer.github": "GitHub",
  "footer.legal": "Legal",
  "footer.aup": "Uso Aceptable (AUP)",
  "footer.ear": "Control de Exportación (EAR)",
  "footer.aml": "Descargo (AML)",
  "footer.privacyPolicy": "Privacidad",
  "footer.terms": "Términos",
  "footer.slogan": "Metabúsqueda global de GPU.\nCompara. Despliega. Ahorra.",
  "footer.allSystemsNormal": "Todos los sistemas normales",
  "footer.disclaimer": "HyperRouter es un motor de búsqueda independiente. Los usuarios deben cumplir con EAR/OFAC. Los pagos y KYC son procesados directamente por los proveedores de la nube.",
  "footer.copyright": "© 2026 HyperRouter, Inc. Todos los derechos reservados.",
  "pricing.title": "Precios simples y transparentes",
  "pricing.subtitle": "Actualmente en beta pública. Todas las funciones de enrutamiento son gratuitas.",
  "pricing.starter": "Starter",
  "pricing.starterDesc": "Personal. Búsqueda de inventario, alertas básicas (3).",
  "pricing.pro": "Pro Team",
  "pricing.proDesc": "Startup. Webhooks en tiempo real (20), compartir en equipo.",
  "pricing.enterprise": "Enterprise API",
  "pricing.enterpriseDesc": "Empresa. API ilimitada, seguimiento de 30s.",
  "alert.desc": "Reciba notificaciones cuando haya nuevas instancias disponibles.",
  "legal.aup.title": "Política de uso aceptable",
  "legal.ear.title": "Cumplimiento de EAR / OFAC",
  "legal.aml.title": "Política AML / KYC",
  "legal.privacy.title": "Política de privacidad",
  "legal.terms.title": "Términos de servicio",
  "legal.contentPlaceholder": "Marcador de posición para el documento legal. HyperRouter opera como un motor de búsqueda independiente.",

};

const fr: TranslationDict = {
  ...en,
  "nav.instances": "Instances",
  "nav.pricing": "Tarification",
  "nav.login": "Connexion",
  "nav.signup": "S'inscrire",
  "auth.signupDisclaimer": "En vous inscrivant, vous acceptez automatiquement les réglementations EAR et AUP.",
  "compliance.title": "Portail de Conformité",
  "compliance.proceed": "Continuer",
  "compliance.cancel": "Annuler",
  "compliance.acknowledge": "Accepter",

  "footer.product": "Produit",
  "footer.gpuSearch": "Méta-recherche GPU",
  "footer.pricing": "Tarification",
  "footer.apiDocs": "API Docs",
  "footer.docs": "Documentation",
  "footer.resources": "Ressources",
  "footer.gettingStarted": "Commencer",
  "footer.apiReference": "Référence API",
  "footer.status": "Statut",
  "footer.contactSales": "Contacter les Ventes",
  "footer.company": "Entreprise",
  "footer.about": "À propos",
  "footer.blog": "Blog",
  "footer.careers": "Carrières",
  "footer.github": "GitHub",
  "footer.legal": "Légal",
  "footer.aup": "Utilisation Acceptable (AUP)",
  "footer.ear": "Contrôle des Exportations (EAR)",
  "footer.aml": "Avis de Non-Responsabilité (AML)",
  "footer.privacyPolicy": "Confidentialité",
  "footer.terms": "Conditions",
  "footer.slogan": "Méta-recherche mondiale de GPU.\nComparez. Déployez. Économisez.",
  "footer.allSystemsNormal": "Tous les systèmes sont normaux",
  "footer.disclaimer": "HyperRouter est un moteur de recherche indépendant. Les utilisateurs doivent respecter EAR/OFAC. Les paiements et le KYC sont traités directement par les fournisseurs cloud.",
  "footer.copyright": "© 2026 HyperRouter, Inc. Tous droits réservés.",
  "pricing.title": "Tarification simple et transparente",
  "pricing.subtitle": "Actuellement en version bêta publique. Toutes les fonctionnalités de routage sont gratuites.",
  "pricing.starter": "Starter",
  "pricing.starterDesc": "Personnel. Recherche d'inventaire, alertes de base (3).",
  "pricing.pro": "Pro Team",
  "pricing.proDesc": "Startup. Webhooks en temps réel (20), partage d'équipe.",
  "pricing.enterprise": "Enterprise API",
  "pricing.enterpriseDesc": "Entreprise. API illimitée, suivi 30s.",
  "alert.desc": "Soyez averti lorsque de nouvelles instances sont disponibles.",
  "legal.aup.title": "Politique d'utilisation acceptable",
  "legal.ear.title": "Conformité EAR / OFAC",
  "legal.aml.title": "Politique AML / KYC",
  "legal.privacy.title": "Politique de confidentialité",
  "legal.terms.title": "Conditions d'utilisation",
  "legal.contentPlaceholder": "Espace réservé pour le document juridique. HyperRouter agit comme un moteur de recherche indépendant.",

};

export const translations: Record<Locale, TranslationDict> = { en, ko, ja, de, es, fr };
