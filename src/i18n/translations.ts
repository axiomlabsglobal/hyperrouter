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
  "auth.signupDisclaimer": "By signing up, you automatically agree to EAR regulations and AUP.",

  "compliance.title": "Compliance Gateway",
  "compliance.subtitle": "Required before proceeding",
  "compliance.earTitle": "US Export Control & Sanctions (EAR/OFAC)",
  "compliance.earDesc": "I confirm that I am not located in a sanctioned country and will not use resources on behalf of sanctioned entities.",
  "compliance.aupTitle": "Acceptable Use Policy (AUP)",
  "compliance.aupDesc": "I agree not to use resources for crypto mining, DDoS, hacking, or illegal AI training.",
  "compliance.amlTitle": "Aggregator Disclaimer (AML/Liability)",
  "compliance.amlDesc": "HyperRouter is a metasearch engine. The vendor holds liability for payment and infrastructure.",
  "compliance.proceed": "Proceed",
  "compliance.cancel": "Cancel",
  "compliance.acknowledge": "Acknowledge",
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
  "auth.signupDisclaimer": "가입 시 EAR 규제 및 AUP에 자동 동의하는 것으로 간주합니다.",

  "compliance.title": "컴플라이언스 게이트웨이",
  "compliance.subtitle": "계속하기 전에 동의가 필요합니다",
  "compliance.earTitle": "미국 수출 통제 및 제재 (EAR/OFAC)",
  "compliance.earDesc": "본인은 제재 대상 국가 소속이 아니며, 제재 대상 기업을 대신하여 인프라를 사용하지 않음을 확인합니다.",
  "compliance.aupTitle": "적정 사용 정책 (AUP)",
  "compliance.aupDesc": "본 자원을 암호화폐 채굴, DDoS, 해킹 또는 불법 AI 모델 학습에 사용하지 않을 것에 동의합니다.",
  "compliance.amlTitle": "중개자 면책 조항 (AML/책임)",
  "compliance.amlDesc": "HyperRouter는 단순 중개 검색 엔진이며, 실제 결제 및 인프라 제공 책임은 해당 벤더사에게 있습니다.",
  "compliance.proceed": "계속하기",
  "compliance.cancel": "취소",
  "compliance.acknowledge": "확인",
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
};

export const translations: Record<Locale, TranslationDict> = { en, ko, ja, de, es, fr };
