"use client";

// ---------------------------------------------------------------------------
// i18n Translation Dictionaries — 5 Languages
// Keys are used across all UI components via the useI18n() hook.
// ---------------------------------------------------------------------------

export type Locale = "en" | "ko" | "ja" | "zh" | "de";

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

  // Auth
  "auth.continueGoogle": string;
  "auth.terms": string;
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
};

const ko: TranslationDict = {
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
};

const ja: TranslationDict = {
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
};

const zh: TranslationDict = {
  "nav.instances": "实例",
  "nav.pricing": "定价",
  "nav.api": "API",
  "nav.docs": "文档",
  "nav.login": "登录",
  "nav.signup": "注册",

  "search.label": "搜索",
  "search.placeholder": "搜索GPU...",
  "search.allGpus": "所有GPU",
  "search.anyVram": "全部VRAM",
  "search.anyRegion": "全部区域",
  "search.button": "搜索",
  "search.stats": "19个供应商 · 40+实例已索引",
  "search.noModels": "未找到型号。",

  "filter.availability": "可用性",
  "filter.includeSpot": "包含竞价",
  "filter.maxPrice": "最高$/hr",
  "filter.globalRegions": "全球区域",
  "filter.region": "区域",
  "filter.enterprise": "企业",
  "filter.compliance": "合规",
  "filter.infraTier": "基础设施",
  "filter.sla": "SLA",
  "filter.providers": "供应商",
  "filter.all": "全部",

  "region.northAmerica": "北美",
  "region.europe": "欧洲",
  "region.asiaPacific": "亚太",
  "region.global": "全球",

  "results.searching": "搜索中...",
  "results.promoted": "推广",
  "results.results": "条结果",
  "results.priceAsc": "价格 ↑",
  "results.priceDesc": "价格 ↓",
  "results.noResults": "未找到实例",
  "results.noResultsHint": "请调整过滤条件或搜索条件。",
  "results.failed": "加载实例失败",
  "results.failedHint": "请稍后再试或调整过滤条件。",

  "col.provider": "供应商",
  "col.gpu": "GPU",
  "col.vram": "VRAM",
  "col.region": "区域",
  "col.type": "类型",
  "col.sla": "SLA",
  "col.compliance": "认证",
  "col.price": "价格",

  "gpu.rent": "租用",
  "gpu.ad": "广告",
  "gpu.similar": "相似",
  "gpu.acrossRegions": "个实例位于其他区域。",

  "alert.create": "创建可用性提醒",
  "alert.title": "设置提醒",

  "error.title": "出错了",
  "error.description": "无法加载该区域的价格数据，请重试。",
  "error.retry": "重试",

  "auth.continueGoogle": "使用Google继续",
  "auth.terms": "继续即表示您同意我们的服务条款和隐私政策。",
};

const de: TranslationDict = {
  "nav.instances": "Instanzen",
  "nav.pricing": "Preise",
  "nav.api": "API",
  "nav.docs": "Doku",
  "nav.login": "Anmelden",
  "nav.signup": "Registrieren",

  "search.label": "Suche",
  "search.placeholder": "GPU suchen...",
  "search.allGpus": "Alle GPUs",
  "search.anyVram": "Alle VRAM",
  "search.anyRegion": "Alle Regionen",
  "search.button": "Suchen",
  "search.stats": "19 Anbieter · 40+ Instanzen indexiert",
  "search.noModels": "Keine Modelle gefunden.",

  "filter.availability": "Verfügbarkeit",
  "filter.includeSpot": "Spot einbeziehen",
  "filter.maxPrice": "Max $/Std",
  "filter.globalRegions": "Globale Regionen",
  "filter.region": "Region",
  "filter.enterprise": "Enterprise",
  "filter.compliance": "Compliance",
  "filter.infraTier": "Infrastruktur",
  "filter.sla": "SLA",
  "filter.providers": "Anbieter",
  "filter.all": "Alle",

  "region.northAmerica": "Nordamerika",
  "region.europe": "Europa",
  "region.asiaPacific": "Asien-Pazifik",
  "region.global": "Global",

  "results.searching": "Suche läuft...",
  "results.promoted": "Gesponsert",
  "results.results": "Ergebnisse",
  "results.priceAsc": "Preis ↑",
  "results.priceDesc": "Preis ↓",
  "results.noResults": "Keine Instanzen gefunden",
  "results.noResultsHint": "Filter oder Suchkriterien anpassen.",
  "results.failed": "Instanzen konnten nicht geladen werden",
  "results.failedHint": "Versuchen Sie es später erneut.",

  "col.provider": "Anbieter",
  "col.gpu": "GPU",
  "col.vram": "VRAM",
  "col.region": "Region",
  "col.type": "Typ",
  "col.sla": "SLA",
  "col.compliance": "Zertifizierung",
  "col.price": "Preis",

  "gpu.rent": "Mieten",
  "gpu.ad": "Anzeige",
  "gpu.similar": "ähnliche",
  "gpu.acrossRegions": "Instanzen in anderen Regionen.",

  "alert.create": "Verfügbarkeitsalarm erstellen",
  "alert.title": "Alarm einstellen",

  "error.title": "Etwas ist schiefgelaufen",
  "error.description": "Preisdaten für diese Region konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
  "error.retry": "Erneut versuchen",

  "auth.continueGoogle": "Weiter mit Google",
  "auth.terms": "Durch Fortfahren stimmen Sie unseren Nutzungsbedingungen und Datenschutzrichtlinien zu.",
};

export const translations: Record<Locale, TranslationDict> = { en, ko, ja, zh, de };
