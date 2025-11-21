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

## Uutta opittua

### Github workflow

Halusin testit ajettaviksi Githubissa, mutta ainoastaan manuaalisesti, joten joiduin muokkaamaan ajoehtoja NPM:n automaattisesti generoimassa playwright.yml tiedostossa.

Lisäksi tarvitsin ympäristömuuttujat Githubiin, joten ne piti myös määritellä workflow tiedostoon.

Päivitetty playwright.yml:

```
name: Playwright Tests
on:
  workflow_dispatch:
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    env:
      T_URL: ${{ secrets.T_URL }}
      T_USERNAME1: ${{ secrets.T_USERNAME1 }}
      T_PASSWORD1: ${{ secrets.T_PASSWORD1 }}
      B_URL: ${{ secrets.B_URL }}
      B_USERNAME1: ${{ secrets.B_USERNAME1 }}
      B_PASSWORD1: ${{ secrets.B_PASSWORD1 }}
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30

```

### Github ja ympäristömuuttujat

En ollut aikasemmin tarvinnut ympäristömuuttujia Github repositorioon, joten salaisuuksien lisääminen repositorioon oli selvitettävä, jotta Github Actions voi ajaa testit onnistuneesti.

### Playwright taitojen kehitys

En ollut ennen kurssia käyttänyt playwrightia, joten viikkotehtävää monimutkaisempien testion toteutus antoi lisää ymmärrystä ja käytännön kokemusta playwright testien kirjiottamisesta ja suunnittelemista.

## Lähteet

Playwright.dev. Playwright dokumentaatio. https://playwright.dev/docs