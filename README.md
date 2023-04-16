## WAP 2023 Projekt 2 -- Pohyb robotů v bludišti zobrazeného na webovém plátně
### Autoři: Vojtěch Fiala \<xfiala61\>, Žaneta Grossová \<xgross11\>

## Spouštění

Pro spuštění je nutné použít webový server -- stačí jakýkoliv, například npm live-server, který lze nainstalovat a spustit skrze npm install -g live-server && live-server

Dokumentace je psaná uvnitř souborů tak, aby bylo možné pro její generování použít JSDoc -- Pro vygenerování lze použít přiložený skript ./doc.sh

## Obecné informace

Řešení je rozdělené na 2 částí -- backend a frontend, kdy logika aplikace je uložena ve složce backend/ a frontend včetně svých potřebných vykreslovacích modulů je ve složce frontend/
Složka static/ obsahuje statické soubory jako .css

Projekt pro své fungování nepotřebuje žádné knihovny, krom JSDocu pro vygenerování dokumentace. Frontend ovšem využívá volně dostupný CSS framework *Bootstrap* k definici vzhledu některých prvků.


## Informace k objektovému modelu
Aplikace je, jak bylo již zmíněno, rozdělena na backend a frontend a soubory přilehající k jendotlivým částem jsou v odpovídajících složkách. 
Logika fungování aplikace, tedy backend, je rozdělen na 3 třídy - Controller, Map a Robot. Ty jsou umístěny v obdobně pojmenovaných modulech. Krom toho je součástí backendu ještě modul *moveFunctions*, který obsahuje funkce, které mají za úkol určovat jaký pohyb má robot vykonávat. Objektový model je následující:

Controller má za úkol řídit mapu a roboty.
Map má za úkol zajišťovat operace s mapou.
Robot má za úkol zajišťovat oeprace s roboty.

To vše ilustruje následující diagram tříd:

<!-- Případně ./doc/backend_class_diagram.svg -- JSDoc se ukládá do složky doc/, takže tam cestu nepotřebuje... README samotné je v rootu, takže potřebuje... -->

<img src="./backend_class_diagram.svg"> 


Logika aplikace je následující: 

Na základě zvolené velikosti mapy se iterativním DFS algoritmem vygeneruje mapa o dané velikosti, která je ohraničena stěnami. Základem je vnitřní reprezentace mapy, která obsahuje nenavštívená pole a má oproti generované mapě velikost 2x-1, kde x je zadaná velikost mapy. Jejím účelem je v rámci algoritmu hlídat, které pole byla již navštívena a která ne. 

Do mapy se poté přidávají roboti. Je možné je z ní také odstranit. Při tvorbě robota je mu vždy poskytnuta funkce, kterou má využívat k pohybu.

Řídící Controller volá funkce na pohyb robotů a související aktualizaci mapy. Nabízí také možnost mapu exportovat či importovat s využitím Web Storage.

## Informace k vzhledu
Frontend aplikace je rozdělen na hlavní Javascript soubor, který zajišťuje volání všech ostatních potřebných náležitostí. Dále obsahuje 2 třídy -- RobotIcon a Rectangle, kdy Rectangle slouží k vykreslování jednotlivých bloků, ze kterých se bludiště skládá a RobotIcon slouží k vykreslení robota. Posledním souborem je printMap, což je modul exportující funkci zajišťující samotné volání překreslení mapy.

