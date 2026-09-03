const fs = require('fs');
let code = fs.readFileSync('src/i18n/translations.ts', 'utf8');

// Add types
code = code.replace(/("search\.allCounts"\: string;)/, '$1\n  "filter.tier34": string;\n  "filter.standardDc": string;\n  "filter.community": string;\n  "filter.noSla": string;\n  "filter.uptime9999": string;\n  "filter.uptime999": string;');

// Add en
code = code.replace(/("search\.allCounts"\: "All Counts",)/, '$1\n  "filter.tier34": "Tier 3/4 Data Center",\n  "filter.standardDc": "Standard Data Center",\n  "filter.community": "Community / Peer-to-Peer",\n  "filter.noSla": "No SLA",\n  "filter.uptime9999": "99.99% Uptime",\n  "filter.uptime999": "99.9% Uptime",');

// Add ko
code = code.replace(/("search\.allCounts"\: "전체 개수",)/, '$1\n  "filter.tier34": "티어 3/4 데이터센터",\n  "filter.standardDc": "표준 데이터센터",\n  "filter.community": "커뮤니티 / P2P",\n  "filter.noSla": "SLA 없음",\n  "filter.uptime9999": "99.99% 가동률",\n  "filter.uptime999": "99.9% 가동률",');

// Add ja
code = code.replace(/("search\.allCounts"\: "すべての数",)/, '$1\n  "filter.tier34": "ティア3/4データセンター",\n  "filter.standardDc": "標準データセンター",\n  "filter.community": "コミュニティ / P2P",\n  "filter.noSla": "SLAなし",\n  "filter.uptime9999": "99.99% 稼働率",\n  "filter.uptime999": "99.9% 稼働率",');

// Add de
code = code.replace(/("search\.allCounts"\: "Alle Anzahlen",)/, '$1\n  "filter.tier34": "Tier 3/4 Rechenzentrum",\n  "filter.standardDc": "Standard Rechenzentrum",\n  "filter.community": "Community / P2P",\n  "filter.noSla": "Kein SLA",\n  "filter.uptime9999": "99.99% Verfügbarkeit",\n  "filter.uptime999": "99.9% Verfügbarkeit",');

// Add es
code = code.replace(/("search\.allCounts"\: "Todas las cant\.",)/, '$1\n  "filter.tier34": "Centro de datos Tier 3/4",\n  "filter.standardDc": "Centro de datos estándar",\n  "filter.community": "Comunidad / P2P",\n  "filter.noSla": "Sin SLA",\n  "filter.uptime9999": "99.99% de tiempo de act.",\n  "filter.uptime999": "99.9% de tiempo de act.",');

// Add fr
code = code.replace(/("search\.allCounts"\: "Toutes les quant\.",)/, '$1\n  "filter.tier34": "Centre de données Tier 3/4",\n  "filter.standardDc": "Centre de données standard",\n  "filter.community": "Communauté / P2P",\n  "filter.noSla": "Sans SLA",\n  "filter.uptime9999": "99.99% de disponibilité",\n  "filter.uptime999": "99.9% de disponibilité",');

fs.writeFileSync('src/i18n/translations.ts', code);
console.log('Extra options updated successfully!');
