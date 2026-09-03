const fs = require('fs');

let code = fs.readFileSync('src/i18n/translations.ts', 'utf8');

const missingTypes = `
  "alert.desc": string;
  "legal.aup.title": string;
  "legal.ear.title": string;
  "legal.aml.title": string;
  "legal.privacy.title": string;
  "legal.terms.title": string;
  "legal.contentPlaceholder": string;
`;

code = code.replace(/("pricing\.enterpriseDesc"\: string;)/, '$1' + missingTypes);

const missingEn = `
  "alert.desc": "Get notified when new instances are available.",
  "legal.aup.title": "Acceptable Use Policy",
  "legal.ear.title": "EAR / OFAC Compliance",
  "legal.aml.title": "AML / KYC Policy",
  "legal.privacy.title": "Privacy Policy",
  "legal.terms.title": "Terms of Service",
  "legal.contentPlaceholder": "This is a placeholder for the legal document content. HyperRouter operates strictly as an independent search aggregator. All terms apply as per local and international laws.",
`;
code = code.replace(/("pricing\.enterpriseDesc"\: "Enterprise\. Unlimited real-time routing API, 30s tracking\.",)/, '$1' + missingEn);

const missingKo = `
  "alert.desc": "새 인스턴스가 등록되면 알림을 받습니다.",
  "legal.aup.title": "허용 가능한 사용 정책 (AUP)",
  "legal.ear.title": "EAR / OFAC 컴플라이언스",
  "legal.aml.title": "AML / KYC 정책",
  "legal.privacy.title": "개인정보 처리방침",
  "legal.terms.title": "이용약관",
  "legal.contentPlaceholder": "법적 문서의 임시 텍스트입니다. HyperRouter는 독립적인 중개 검색 엔진으로 운영되며, 관련 국내외 법률에 따라 모든 약관이 적용됩니다.",
`;
code = code.replace(/("pricing\.enterpriseDesc"\: "기업용\. 실시간 라우팅 API 무제한, 30초 단위 초밀착 추적\.",)/, '$1' + missingKo);

const missingJa = `
  "alert.desc": "新しいインスタンスが登録されたときに通知を受け取ります。",
  "legal.aup.title": "許容利用ポリシー (AUP)",
  "legal.ear.title": "EAR / OFAC コンプライアンス",
  "legal.aml.title": "AML / KYC ポリシー",
  "legal.privacy.title": "プライバシーポリシー",
  "legal.terms.title": "利用規約",
  "legal.contentPlaceholder": "法的文書のプレースホルダーです。HyperRouterは独立した検索アグリゲーターとして機能します。",
`;
code = code.replace(/("pricing\.enterpriseDesc"\: "企業向け。無制限API、30秒単位の超高速トラッキング\.",)/, '$1' + missingJa);

const missingDe = `
  "alert.desc": "Lassen Sie sich benachrichtigen, wenn neue Instanzen verfügbar sind.",
  "legal.aup.title": "Richtlinie zur akzeptablen Nutzung",
  "legal.ear.title": "EAR / OFAC-Konformität",
  "legal.aml.title": "AML / KYC-Richtlinie",
  "legal.privacy.title": "Datenschutzrichtlinie",
  "legal.terms.title": "Nutzungsbedingungen",
  "legal.contentPlaceholder": "Platzhalter für das rechtliche Dokument. HyperRouter operiert als unabhängige Suchmaschine.",
`;
code = code.replace(/("pricing\.enterpriseDesc"\: "Unternehmen\. Unbegrenzte API, 30s-Tracking\.",)/, '$1' + missingDe);

const missingEs = `
  "alert.desc": "Reciba notificaciones cuando haya nuevas instancias disponibles.",
  "legal.aup.title": "Política de uso aceptable",
  "legal.ear.title": "Cumplimiento de EAR / OFAC",
  "legal.aml.title": "Política AML / KYC",
  "legal.privacy.title": "Política de privacidad",
  "legal.terms.title": "Términos de servicio",
  "legal.contentPlaceholder": "Marcador de posición para el documento legal. HyperRouter opera como un motor de búsqueda independiente.",
`;
code = code.replace(/("pricing\.enterpriseDesc"\: "Empresa\. API ilimitada, seguimiento de 30s\.",)/, '$1' + missingEs);

const missingFr = `
  "alert.desc": "Soyez averti lorsque de nouvelles instances sont disponibles.",
  "legal.aup.title": "Politique d'utilisation acceptable",
  "legal.ear.title": "Conformité EAR / OFAC",
  "legal.aml.title": "Politique AML / KYC",
  "legal.privacy.title": "Politique de confidentialité",
  "legal.terms.title": "Conditions d'utilisation",
  "legal.contentPlaceholder": "Espace réservé pour le document juridique. HyperRouter agit comme un moteur de recherche indépendant.",
`;
code = code.replace(/("pricing\.enterpriseDesc"\: "Entreprise\. API illimitée, suivi 30s\.",)/, '$1' + missingFr);

fs.writeFileSync('src/i18n/translations.ts', code);
console.log("Translations updated!");
