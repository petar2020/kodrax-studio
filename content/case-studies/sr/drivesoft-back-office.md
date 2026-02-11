---
order: 4
title: "DriveSoft — Back-office sistem"
client: "DriveSoft"
industry: "Upravljanje flotom"
summary: "Laravel 10 admin panel za operacije flote sa queue obradom, upravljanjem rolama, reporting dashboard-ovima i Docker deploy-om."
challenge: "Operativni tim upravljao je vozilima, vozačima i rezervacijama kroz spreadsheet-ove i ručne procese. Nije postojao centralizovani sistem za izveštavanje ili upravljanje pristupom."
solution: "Napravili smo Laravel 10 back-office sa MySQL bazom, Redis queue-ovima za background poslove, granularnim upravljanjem rolama i automatizovanim reporting pipeline-ovima."
duration: "5 meseci"
budgetRange: "EUR 20k - EUR 35k"
liveUrl: ""
caseStudySlug: "drivesoft-back-office"
technologies:
  - "Laravel 10"
  - "MySQL"
  - "Redis"
  - "Queues"
  - "Docker"
  - "Upravljanje rolama"
results:
  - label: "Vreme obrade"
    value: "-75%"
    detail: "Smanjenje ručnog vremena obrade podataka kroz automatizovane queue poslove."
  - label: "Generisanje izveštaja"
    value: "Real-time"
    detail: "Zamena nedeljnih ručnih Excel izveštaja sa live dashboard-ovima."
  - label: "Uptime"
    value: "99.9%"
    detail: "Dostupnost sistema od Docker produkcijskog deploy-a."
media:
  screenshot: "/img/case-studies/drivesoft-backoffice-hero.png"
  videoUrl: ""
timeline:
  - phase: "Discovery"
    summary: "Mapiranje operativnih workflow-ova, modela podataka i zahteva za permisije sa operativnim timom."
    duration: "Nedelja 1-3"
  - phase: "Arhitektura"
    summary: "Dizajn Laravel modularne strukture, queue pipeline-a i Docker deploy strategije."
    duration: "Nedelja 4-6"
  - phase: "Implementacija"
    summary: "Admin panel, CRUD operacije, queue worker-i, reporting engine i sistem rola."
    duration: "Nedelja 7-18"
  - phase: "Deploy"
    summary: "Dockerizacija aplikacije, CI/CD setup, migracija produkcijskih podataka i obuka tima."
    duration: "Nedelja 19-20"
beforeAfter:
  beforeLabel: "Pre: spreadsheet-ovi i ručni rad"
  beforeSummary: "Operacije su se oslanjale na deljene Excel fajlove, email lance i ručni unos podataka."
  beforeImage: "/img/case-studies/drivesoft-bo-before.png"
  afterLabel: "Posle: centralizovani admin sistem"
  afterSummary: "Jedan dashboard za sve operacije flote sa automatizovanim izveštavanjem, queue obradom i kontrolom pristupa."
  afterImage: "/img/case-studies/drivesoft-bo-after.png"
---

DriveSoft-u je bio potreban sistem koji može da zameni fragmentirane ručne procese pouzdanim, centralizovanim back-office-om u koji ceo operativni tim može da ima poverenje.

## Šta je implementirano

- Laravel 10 admin panel sa modularnom arhitekturom za vozila, vozače, rezervacije i klijente.
- Redis queue sistem za background obradu izveštaja, notifikacija i sinhronizacija podataka.
- Granularno upravljanje rolama i permisijama tako da svaki član tima vidi samo ono što mu je potrebno.
- Automatizovani reporting dashboard-ovi koji zamenjuju ručne Excel workflow-ove.
- Kompletni Docker deploy sa CI/CD pipeline-om za zero-downtime ažuriranja.

## Poslovni uticaj

Back-office je eliminisao greške ručnog unosa podataka i smanjio vreme obrade za 75%. Dashboard-ovi u realnom vremenu dali su menadžmentu trenutnu vidljivost u iskorišćenost flote, dok je queue sistem obrađivao teške background poslove bez uticaja na korisničko iskustvo.
