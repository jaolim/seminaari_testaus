# Ohjelmistokehityksen teknologioita seminaari - Testaus

*Playwright testaus kurssien [back-end ohjelmointi](https://github.com/jaolim/back_end_harjoitustyo) ja [ohjelmistoprojekti 1](https://github.com/jaolim/TicketGuru) sivuille.*

Seminaarin tavoitteena on toteuttaa front-endin testaus kahteen yllämainittuun projektiin. Back-end projekti on valmis, joten siinä riittää toimintojen kattava testaus.

Ohjelmistoprojekti I sen sijaan on vielä kesken, joten testit on suunniteltava helposti päivitettäviksi front-endin muuttuessa, sekä tehtävä päätös siitä, mitä kaikkea niiden on mielekästä kattaa.

Molemmista projekteista on kaksi julkaisua rahtiin, joista toinen käyttää ajoaikaista tietokantaa ja toinen pysyvää.

Testauksen aion tehdä ajoaikaista tietokantaa käyttävään versioon, mutta senkään sisällöstä ei testejä ajettaessa ole varmuutta, joka on otettava suunnittelussa huomioon, erityisesti update tai delete toiminnallisuuksia testatessa.

## Back-end projekti - Regions of Finland

- Repositorio: https://github.com/jaolim/back_end_harjoitustyo
- Julkaisu: https://dev-backend-harjoitustyo-backend-harjoitustyo.2.rahtiapp.fi/

### Testattavat osoitteet ja elementit

*Tarkempi testikattavuus määritelty itse testeissä. Tässä listattuna sivujen oleelliset testtavat elementit.*

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
					
## Ohjelmistoprojekti I - TicketGuru

- Repositorio: https://github.com/jaolim/TicketGuru
- Julkaisu: https://ticketguru-ticketguru-postgres.2.rahtiapp.fi/

## Ympäristömuuttujat

Web-sivujen osoitteet ja käyttäjätunnukset on tallennettu ympäristömuuttujiin.

Paikallisesti tämä on .env tiedostosto seuraavassa muodossa projektin päähakemistossa (kurssin opettajille laitan salaisuudet teams palautuksessa):

```
T_URL=
T_USERNAME1=
T_PASSWORD1=

B_URL=
B_USERNAME1=
B_PASSWORD1=
````

## Github Actions Workflow

Githubiin on ohjelmoitu workflow testien ajamiseksi manuaalisesti. Tämän käyttämiseksi ympäristömuuttujat tarvitaan myös Githubissa, jossa ne on määritelty secreteiksi kohdassa:

Settings -> Secrets and variables -> Actions -> New repository secret.

## 


## Lähteet

Playwright.dev. Playwright dokumentaatio. https://playwright.dev/docs