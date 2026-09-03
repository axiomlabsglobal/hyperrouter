const fs = require('fs');
let code = fs.readFileSync('src/i18n/translations.ts', 'utf8');

// Add types
code = code.replace(/("search\.button"\: string;)/, '$1\n  "search.liveInventory": string;\n  "search.allCounts": string;');
code = code.replace(/("filter\.all"\: string;)/, '$1\n  "filter.hyperscalers": string;\n  "filter.specialized": string;\n  "filter.decentralized": string;');
code = code.replace(/("results\.failedHint"\: string;)/, '$1\n  "results.showRealCost": string;\n  "results.realCostDesc": string;');

// Add en
code = code.replace(/("search\.button"\: "Search",)/, '$1\n  "search.liveInventory": "Live Inventory",\n  "search.allCounts": "All Counts",');
code = code.replace(/("filter\.all"\: "All",)/, '$1\n  "filter.hyperscalers": "Hyperscalers",\n  "filter.specialized": "Specialized",\n  "filter.decentralized": "Decentralized",');
code = code.replace(/("results\.failedHint"\: "Try again later or adjust your filters\.",)/, '$1\n  "results.showRealCost": "Show Real Cost",\n  "results.realCostDesc": "Includes est. 1TB storage and network egress (~23%).",');

// Add ko
code = code.replace(/("search\.button"\: "검색",)/, '$1\n  "search.liveInventory": "실시간 재고",\n  "search.allCounts": "전체 개수",');
code = code.replace(/("filter\.all"\: "전체",)/, '$1\n  "filter.hyperscalers": "하이퍼스케일러",\n  "filter.specialized": "전문 벤더사",\n  "filter.decentralized": "분산형 (커뮤니티)",');
code = code.replace(/("results\.failedHint"\: "잠시 후 다시 시도하거나 필터를 조정하세요\.",)/, '$1\n  "results.showRealCost": "실제 TCO 비용 보기",\n  "results.realCostDesc": "네트워크 송출 및 스토리지 1TB 예상 오버헤드(~23%) 포함.",');

// Add ja
code = code.replace(/("search\.button"\: "検索",)/, '$1\n  "search.liveInventory": "ライブインベントリ",\n  "search.allCounts": "すべての数",');
code = code.replace(/("filter\.all"\: "全て",)/, '$1\n  "filter.hyperscalers": "ハイパースケーラー",\n  "filter.specialized": "特化型ベンダー",\n  "filter.decentralized": "分散型 (コミュニティ)",');
code = code.replace(/("results\.failedHint"\: "後でもう一度お試しください\.",)/, '$1\n  "results.showRealCost": "実質コストを表示",\n  "results.realCostDesc": "ネットワーク出力およびストレージ1TBの予想オーバーヘッド(~23%)を含む。",');

// Add de (assuming keys are missing so we add to the ...en spread part or directly if missing)
// For DE, ES, FR it spreads EN, so we just need to append them to the object if we want translations.
code = code.replace(/(const de\: TranslationDict = \{\n  \.\.\.en,)/, '$1\n  "search.liveInventory": "Live-Bestand",\n  "search.allCounts": "Alle Anzahlen",\n  "filter.hyperscalers": "Hyperscaler",\n  "filter.specialized": "Spezialisierte",\n  "filter.decentralized": "Dezentralisiert",\n  "results.showRealCost": "Reale Kosten",\n  "results.realCostDesc": "Inkl. 1TB Speicher und Netzwerk-Egress (~23%).",');

// Add es
code = code.replace(/(const es\: TranslationDict = \{\n  \.\.\.en,)/, '$1\n  "search.liveInventory": "Inventario en vivo",\n  "search.allCounts": "Todas las cant.",\n  "filter.hyperscalers": "Hiperescaladores",\n  "filter.specialized": "Especializados",\n  "filter.decentralized": "Descentralizados",\n  "results.showRealCost": "Costo Real",\n  "results.realCostDesc": "Incluye 1TB de almacenamiento y red (~23%).",');

// Add fr
code = code.replace(/(const fr\: TranslationDict = \{\n  \.\.\.en,)/, '$1\n  "search.liveInventory": "Inventaire en direct",\n  "search.allCounts": "Toutes les quant.",\n  "filter.hyperscalers": "Hyperscalers",\n  "filter.specialized": "Spécialisés",\n  "filter.decentralized": "Décentralisés",\n  "results.showRealCost": "Coût Réel",\n  "results.realCostDesc": "Inclut 1 To de stockage et le réseau (~23%).",');

fs.writeFileSync('src/i18n/translations.ts', code);
console.log('Translations updated successfully!');
