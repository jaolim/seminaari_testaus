# Ohjelmistokehityksen teknologioita seminaari - Testaus

*Playwright testaus kurssien [back-end ohjelmointi](https://github.com/jaolim/back_end_harjoitustyo) ja [ohjelmistoprojekti 1](https://github.com/jaolim/TicketGuru) sivuille.*

## Ympäristömuuttujat

Web-sivujen osoitteet ja käyttäjätunnukset on tallennettu ympäristömuuttujiin.

Paikallisesti tämä on .env tiedostosto seuraavassa muodossa projektin päähakemistossa (kurssin opettajille laitan salaisuudet teams palautuksessa):

T_URL=

T_USERNAME1=

T_PASSWORD1=

B_URL=

B_USERNAME1=

B_PASSWORD1=

## Github Actions Workflow

Githubiin on ohjelmoitu workflow testien ajamiseksi manuaalisesti. Tämän käyttämiseksi ympäristömuuttujat myös Githubissa, jossa ne on määritelty secreteiksi kohdassa:

Settings -> Secrets and variables -> Actions -> New repository secret.