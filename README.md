## WAP 2023 Projekt 2 -- Pohyb robotů v bludišti zobrazeného na webovém plátně
### Autoři: Vojtěch Fiala \<xfiala61\>, Žaneta Grossová \<xgross11\>

Pro spuštění je nutné použít webový server -- stačí jakýkoliv, například npm live-server, který lze nainstalovat a spustit skrze npm install -g live-server && live-server

Dokumentace je psaná uvnitř souborů tak, aby bylo možné pro její generování použít JSDoc -- Pro vygenerování lze použít přiložený skript ./doc.sh

Řešení je rozdělené na 2 částí -- backend a frontend, kdy logika aplikace je uložena ve složce backend/ a frontend včetně svých potřebných vykreslovacích modulů je ve složce frontend/
Složka static/ obsahuje statické soubory jako .css