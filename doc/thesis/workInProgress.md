# **Szakdolgozat**

# Piackutatás

Már létező programokra öt példát hoztam, amik mind valamilyen szinten különböznek.
Felhasználókörük, funkcióik, előnyök és hátrányok az én tervemhez képest. Az én terveimhez képest egy rövis ismertetők az előnyeikről valamint hártányaikról. Miért jobb vagy mivel tudnak többet, mint amit én terveztem egyenlőre kialakítani.

## 1. Grocy

A Grocy egy lokálisan hostolható weblap. Irgalmatlanul részletes és rengeteg funkciója
van, amihez, ha az ember hozzászokik és elég időt és törődést fektet bele, akkor egy
nagyon hasznos program. Ellenben, mivel lokálisan van felépítve, ezért, ha valaki most
kezdené el először használni, akkor nagyon sokáig tart, amíg igazán használható lehet.

A recept kezelő lapja csak manuálisan feltölthető, tehát nincs importálásra lehetőség.
Rendelkezik bevásárlólista és “sufni” opciókkal is. Az otthon lévő alapanyagokat egyessével, tetsző részletességgel fel lehet venni a “sufniba”, ezzel leltározva, hogy milyen
alapanyagok vannak otthon. Ezekről eltárolható adatok közé tartozik, hogy mennyi van belőle, meddig jók, képet, de akár a vonalkódját is. A bevásárló lista pedig egyértelműen
a vásárlást segítő funkció, aminek a végén, egy kattintásra átrakható “sufniba”.

Már ezen kis leírás alapján is látszik, hogy ahhoz, hogy ez a rendszer használható legyen, egy komoly lokális adatbázist kell létrehozni az alapanyagokból és azok adatairól,
valamint a receptekről. Ez a rendszer csak limitált tudású emberek számára használha-
tó, mivel már csak a telepítése is kicsit bonyolultabb, ezért átlag emberek számára nem
ajánlott.

## 2. Delish

Ezt a weblapot azért választottam példaként, mert ez egy tökéletes példa egy átlagos, egyszerű receptes weblapokra.  A honlapon csak recepteket és talán pár blog bejegyzés található regisztráció után is. Ez a weblap reprezentálja a legtöbb hasonló, csak blogként működőket.

Egy receptre kattintva látjuk az alapadatokat, hozzávalókat, elkészítési javaslatot valamint alap adatokat mint az elészítési idő. A weblaon található még hasonló recept ajánlások, de ezzel le lett fedve minden funckciója.

## 3. Yummly

Ez egy fejlettebb verziója a korábban említett "átlagos" weblapoknak. Bejelentkezés nélkül egy kissé korlátolt, viszont utána már kifejezettem sok képessége van. A webes kinézeten felül applikációval is rendelkezik. 

Az alap recept keresésen kívűl, itt már lehetőségünk van azok elmentésére a sajátjaink közé. A weblap rendelkezik bevásárló lista funkcióval, valamint képes azonnal a receptből áthelyezni az alapanyagokat is. Egy kiemelkedő funkciója az étkezés tervező. Ez, figyelembe véve esetleges allergiákat, vagy étrendeket ajánj és segít tervezni a következő időszakra. 

Ami hátrány az egész weblapon, hogy nem közösség bővíti a recept adatbázist, ezért limitált a receptek száma és nem lehet mindent megtalálni. Még akkor is, ha figyelembe vesszük a manuális recept készítést, nem feltétlenül a leg felhasználóbarátibb, hogy mindig egy külső helyről egyösször kikeressük amit akarunk, majd kézzel beírjuk.

## 4. BigOven

A legnagyobb különbség az eddigiekhez képes, hogy ez a weblap már rendelkezik recept importáló funkcióval is. Azon felül négy különböző módon lehet újjakat létrehozni. Az importálás során nem tárolják el az egész receptet, ha más honlapról származik. "Our Pledge to Food Bloggers" leírja, hogy miért, viszont ez azt jelenti, hogy a teljes receptet megtekintsük, át kell navigálni az eredeti oldalra. Ezen felül a bevásárló listában nem adódnak össze a termékek, valamint nincsenek kategóriák a receptekhez.

Egy nagy hátránya a weblapnak, hogy kissé régi stílusú. A gombok majdnem eredeti HTML alakban jelennek meg. A képek, form-ok, lista nézet mind úgy néz ki, amin épphogy van egy kis formázás. A webes kinézenket a navigációja nem a leg felhasználóbarátibb. 

Annak ellenére, hogy a weblapnak mennyire nem modern stílusa van, az applikáció igenis követhető. A funkciók szintén jól működnek. Elméletileg IOS-en is létezik, viszont arra nincs lehetőségem, hogy felmérjem milyen különbségek lehetnek. Egy nagy előny, hogy az ingyenes verzióban is használhatóak az alapfunkciók.

## 5. ChefTap

Az összes közül valőszínűleg ez az applikáció, ami a legtöbb funkcóval rendelkezik. Technikailag van webes és telefonos applikációs verziója is, viszont a webes csak recept lekérdezésre használható. Minden egyéb, beleértve a recept importálást, bevásárló listát, étkezés tervezőt csak az applikációk keresztűl lehet elérni és szerkeszteni. A weben volt lehetőség Google segítségével bejelentkezni, viszont az applikációnak nem volt ilyen lehetősége. Ennél az appnál az ingyenes verzió elég limitált, a recept importáláson kívül semmi sem működik a próbaidőszak lejárta után.

Ezen a felületen nincs mások által, vagy akár csak egy közös adatbázisból való keresésre és importálása lehetőség a recepteknél. A felhasználónak mindent magának kell beszerezni. 

A beimportált recepteket könnyű módosítani, valamint rengeteg kis adatot megadni, hogy otthonosan lehessen használni a környezetet. Itt nincs lehetőség közvetlenül a receptből a bevásárló listába rakni alapanyagokat, menüket összekészíteni vagy az étkezéstervezőt használni az ingyenes próbaverzió után. 



# Funkcionális specifikáció

Egy összefoglaló részletesebb arról, hogy minek pontosan hogyan kell működnie az eredeti terv szerint.

## 1. Bejelentkezés/Regisztráció

A regisztrációt és bejelentkezés a legbiztosabb biztonság érdekében a Firebase Auth rendszerén keresztül történik. Kettő módszer van a regisztrációra. Első, a szokásos email és jelszó páros megadásával a regisztrációs formon keresztül. Második, a Google authentikációs rendszeren ekresztül. A felhasználók ezt látják elösször, mikor a honlapra navigálnak. Bejelentkezés nélkül nem lehetséges a weblapot megtekinteni.

## 2. Kezdőoldal

A kezdőoldalnak az első lap, amit a bejelentkezés után látnak a felhasználók. A lapon két különböző recept ajánló jelenik meg. Az egyik a saját, kimentett receptekből ajánlt fel párat, a másik viszont a még nem kimentett receptekből. Ezen felül a kategória keresés is itt érhető el. Minden receptnek léterhozáskor kötelezően van legalább egy kategóriája, ezért ez a típusú keresés jó az általános recept felfedező felhasználóknak.

## 3. Recept saját gyüjteményekbe
A létező recepteknél a megnyitás után egy gombnyomással lehetőségünk van azt a saját gyüjteményünkhöz adni. Amennyiben ez sikerült, a gomb átváltozik egy kuka ikonra. Ez újonnan megnyomása után a recept kikerül az elmentettjeink közül. Ez a gyüjtemény egyszerűen megtalálható az oldalmenüben a "My recipes" alatt. Ezen lap alatt az összes korábban elmentett recept kilistázódik.

Amennyiben a felhasználó kimentett egy receptet, a törlés gombra változáson kívűl egy szívecske is megjelenik a recepten. Erre nyomva a recept egy külön listába kerül, ahol a saját recepteken felül csak a kedvenceket lehet gyorsan elérni. A szivecskére kattinta ki és be lehet kapcsolni, hogy a kedvencek közé kerüljön. Amint a felhasználó kiveszi a receptet a saját gyüjteményéből, akkor a kedvencek közül is eltűnik. A lista megtalálható az oldalsó menüben a "My favourites" menüpont alatt.

## 4. Recept importálás


## 5. Recept kalória számlálás


## 6. Bevásárlólista


## 7. Bevásárlólista ajánló



# Felhasznált technológiák
