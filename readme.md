# Ohjelmistokehityksen teknologioita seminaari - Testaus

*Playwright testaus kurssien [back-end ohjelmointi](https://github.com/jaolim/back_end_harjoitustyo) ja [ohjelmistoprojekti 1](https://github.com/jaolim/TicketGuru) sivuille.*

## Tavoitteet(lähtötilanne)

Seminaarin tavoitteena on toteuttaa front-endin testaus kahteen yllämainittuun projektiin. Back-end projekti on valmis, joten siinä riittää toimintojen kattava testaus.

Ohjelmistoprojekti I sen sijaan on vielä kesken, joten testit on suunniteltava helposti päivitettäviksi front-endin muuttuessa, sekä tehtävä päätös siitä, mitä kaikkea niiden on mielekästä kattaa.

Molemmista projekteista on kaksi julkaisua rahtiin, joista toinen käyttää ajoaikaista H2 tietokantaa ja toinen pysyvää.

Testauksen aion tehdä ajoaikaista tietokantaa käyttävään versioon, mutta senkään sisällöstä ei testejä ajettaessa ole varmuutta, joka on otettava suunnittelussa huomioon, erityisesti update tai delete toiminnallisuuksia testatessa.

## Testauksen toteutus

Testaus on toteuttettu NPM TypeScript Playwright projektina, joka on ajettavissa sekä lokaalista, että manuaalisesti käynnistettävänä GitHub workflowna. Pidin manuaalista käynnistystä mielekkeempänä toteutuksena, kuin pushiin liitettyä ajoa.

Testit on jaettu testattavien sivujen mukaan kahteen tiedostoon, jossa loogiset kokonaisuudet ovat omat testinsä. Lisäksi projekti sisältää `utils.ts` tiedston apufunktioille, joita molemmat testit voivat käyttää.

## Back-end projekti - Regions of Finland

- Repositorio: https://github.com/jaolim/back_end_harjoitustyo
- Julkaisu: https://dev-backend-harjoitustyo-backend-harjoitustyo.2.rahtiapp.fi/

Regions of Finland sivu sisältää Suomen maakunnat, joissa on kaupunkeja, joissa on paikkoja, joissa on kommentteja.

Maakuntien, kaupunkien ja paikkojen lisäys, editointi ja poisto vaativat admin oikeudet.

Kommentteja voivat lisätä kaikki tunnistustautuneet käyttäjät, kommenttia voi editoida vain sen lisännyt käyttäjä ja sen voi poistaa admin tai sen lisännyt käyttäjä.

Elementit näkyvät ainoastaan käyttäjille, joilla on niille käyttöoikeus ja virheellinen data submitissa tuottaa virheilmoituksia tiettyyn html elementtiin.

### Testaus

Testit kattavat sivuston navigoinnin, oikeiden elementtien näkymisen admin ja user käyttäjille ja CRUD toiminnallisuuksien testaamisen admin käyttäjälle.

Testeissä luotan testattavan sovelluksen generoiman testidatan löytyvän oikeassa muodossa, mutta testien itsensä lisäämän ja poistaman datan lähtötilan validoin etsimällä ja tuhoamalla datan, jos se on olemassa testien lähtötilanteissa.

#### Testattavat osoitteet ja elementit

*Tarkempi testikuvaus kommentoitu testeihin. Tässä ainoastaan listattuna sivujen oleelliset testattavat elementit.*

	-/
		- Login, Logout, Clear Database, Add New Region, Select, Edit, Delete
		- /login
			- Home, User Name, Password, Sign In
		- /region/add
			- Region Name, Region Description, Image Source Url, Save
		- /region/edit/{id}
			- Region Name, Region Description, Image Source Url, Save
		- /region/{id}
			- Regions, Add New City, Select, Edit, Delete
			- /city/add
				- City Name, City Population, City Area, City Description, Image Source Url, Regions, Save
			- /city/edit/{id}
				- City Name, City Population, City Area, City Description, Image Source Url, Regions, Save
			- /city/{id}
				- Add New Location, Select, Edit Location, Delete
				- /location/add
					- Location Name, Location Description, Address, Image Source Url, Cities, Save
				- /location/edit/{id}
					- Location Name, Location Description, Address, Image Source Url, Cities, Save
				- /location/{id}
					- Add New Comment, Edit, Delete
					- /location/{id}/comment/add
						- Comment Headline, Comment Body, Save
					- /location/{id}/comment/edit/{id}
						- Comment Headline, Comment Body, Save
						
#### Testit

- **Regions responds**: Sivu latautuu
- **Admin login and navigation**: Admin käyttäjällä pääsee kirjautumaan, sivun navigointi toimii ja oikeat elementit löytyvät kaikista endpointeista
- **Login works user**: User käyttäjällä pääsee kirjautumaan, sivun navigointi toimii, oikeat elementit löytyvät kaikista endpointeista ja kiellettyjä elementtejä ei löydy
- **Regions CRUD**: Regions listaus, lisäys, editointi, poisto toimivat ja kielletty data antaa oiketa virheilmoituksia
- **Cities CRUD**: Cities listaus, lisäys, editointi, poisto toimivat ja kielletty data antaa oiketa virheilmoituksia
- **Locations CRUD**: Locations listaus, lisäys, editointi, poisto toimivat ja kielletty data antaa oiketa virheilmoituksia
- **Comments CRUD**: Comments listaus, lisäys, editointi, poisto toimivat ja kielletty data antaa oiketa virheilmoituksia
					
## Ohjelmistoprojekti I - TicketGuru

- Repositorio: https://github.com/jaolim/TicketGuru
- Julkaisu: https://ticketguru-ticketguru-postgres.2.rahtiapp.fi/

TicketGuru on lipunmyyntipalvelu, jossa voi myydä tapahtumiin lippuja.

### Testaus

Tämä projekti on vielä kesken ja sivut tulevat muuttumaan huomattavasti, joten testit kattavat ainoastaan sisäänkirjautumisen ja eri endpointtien toimivuuden.

Tältä pohjalta pystyy jatkokehittämään kattavammat testit, kunhan sivujen sisältö on lyöty lukkoon.

#### Testattavat osoitteet ja elementit

*Tarkempi testikuvaus kommentoitu testeihin. Tässä ainoastaan listattuna sivujen oleelliset testattavat elementit.*

	- /
		- Login, Sell Tickets, Events, Venues, Users
		- /login
			- Login form
		- /sell
			- Sell Tickets, Create Sale, Home
		- /eventpage
			- Add New Event
			- /event/add
				- Event form
		- /venuepage
			- Add New Venue
			- /venue/add
				- Venue form
		- /uesrpage
			- Add New User
			- /user/add
				- User form
				
#### Testit

- **TicketGuru responds**: Sivu latautuu
- **Login works admin**: Admin käyttäjällä pääsee kirjautumaan
- **Login works user**: User käyttäjällä pääsee kirjautumaan
- **Endpoints**: Navigointi eri endpointteihin onnistuu

## Ympäristömuuttujat

Web-sivujen osoitteet ja käyttäjätunnukset on tallennettu ympäristömuuttujiin.

Paikallisesti tämä on .env tiedostosto seuraavassa muodossa projektin päähakemistossa (kurssin opettajille laitan salaisuudet teams palautuksessa):

```
T_URL=
T_USERNAME1=
T_PASSWORD1=
T_USERNAME2=
T_PASSWORD2=

B_URL=
B_USERNAME1=
B_PASSWORD1=
B_USERNAME2=
B_PASSWORD2=
````

## Github Actions Workflow

Githubiin on ohjelmoitu workflow testien ajamiseksi manuaalisesti. Tämän käyttämiseksi ympäristömuuttujat tarvitaan myös Githubissa, jossa ne on määritelty secreteiksi kohdassa:

Settings -> Secrets and variables -> Actions -> New repository secret.

## Demovideo

Linkki annettu Teams tehtäväpalautuksessa.

## Uutta opittua

### Github workflow

Halusin testit ajettaviksi Githubissa, mutta ainoastaan manuaalisesti, joten joiduin muokkaamaan ajoehtoja NPM:n automaattisesti generoimassa playwright.yml tiedostossa.

Lisäksi tarvitsin ympäristömuuttujat Githubiin, joten ne piti myös määritellä workflow tiedostoon.

### Github ja ympäristömuuttujat

En ollut aikasemmin tarvinnut ympäristömuuttujia Github repositorioon, joten salaisuuksien lisääminen repositorioon oli selvitettävä, jotta Github Actions voi ajaa testit onnistuneesti.

### Playwright taitojen kehitys

En ollut ennen kurssia käyttänyt playwrightia, joten viikkotehtävää monimutkaisempien testien toteutus antoi lisää ymmärrystä ja käytännön kokemusta playwright testien kirjoittamisesta ja suunnittelemista.

Erityisesti dynaamisesti generoituvissa elementeissä, joista vain osa arvoista tiedetään joitui käyttämään viikkotehtävää monimuktaisempaa elementtien paikantamista.

Koska testattavat sivut käyttävät tietokantaa, piti myös puuttuvien elementtien validointi miettiä, ettei yksi epäonnistunut testiajo riko myös tulevia testiajoa, jos se jättää tietokannan muuhun kuin oletettuun tilaan.

## Lähteet

Playwright.dev. Playwright dokumentaatio. https://playwright.dev/docs

Github.com. Events that trigger workflows. https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_dispatch