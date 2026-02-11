---
order: 1
title: "Online rezervacije (Bozic-Konig)"
client: "Bozic-Konig"
industry: "Medjugradski transport"
summary: "Redizajniran booking tok za brzu pretragu, jednostavniji checkout i merljiv rast konverzije."
challenge: "Korisnici su odustajali tokom izbora linije i checkout-a jer je stari tok bio spor, fragmentisan i nepregledan na mobilnim uredjajima."
solution: "Dizajniran i isporucen React/Next booking interfejs povezan sa Laravel operativnim API-jima uz cvrscu kontrolu stanja i cistiji seat-selection tok."
duration: "3 meseca"
budgetRange: "EUR 18k - EUR 30k (~2.1m - 3.5m RSD)"
liveUrl: "https://bozic-konig.com/"
caseStudySlug: "online-reservations-bozic-konig"
technologies:
  - "React"
  - "Next.js"
  - "Laravel API"
  - "MySQL"
  - "Redis"
results:
  - label: "Konverzija"
    value: "+240%"
    detail: "Rast zavrsenih rezervacija u odnosu na prethodni checkout baseline."
  - label: "Brzina stranice"
    value: "6.2s -> 1.8s"
    detail: "Median load time glavne booking rute nakon optimizacije."
  - label: "Mesecni korisnici"
    value: "15k -> 50k"
    detail: "Stabilna mesecna aktivna publika nakon lansiranja."
media:
  screenshot: "/img/case-studies/bozic-hero.png"
  videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ"
timeline:
  - phase: "Discovery"
    summary: "Mapirani su drop-off punktovi u booking toku i usaglaseni KPI ciljevi sa operativom."
    duration: "Nedelja 1-2"
  - phase: "UX + prototip"
    summary: "Search, seat i checkout koraci pretvoreni su u jedan vodjeni tok."
    duration: "Nedelja 3-4"
  - phase: "Implementacija"
    summary: "Isporucen Next.js frontend i integrisani Laravel data ugovori i booking validacija."
    duration: "Nedelja 5-10"
  - phase: "Lansiranje + optimizacija"
    summary: "Prachen je funnel, smanjen payload i dotegnuta cache strategija."
    duration: "Nedelja 11-12"
beforeAfter:
  beforeLabel: "Pre: fragmentisan checkout"
  beforeSummary: "Korisnici su prelazili vise stranica bez jasnog napretka i uz cest gubitak sesije."
  beforeImage: "/img/case-studies/bozic-before.png"
  afterLabel: "Posle: vodjeni booking tok"
  afterSummary: "Jedinstven tok sa persistent stanjem, jasnijim cenama i boljom mobilnom zavrsnoscu."
  afterImage: "/img/case-studies/bozic-after.png"
testimonial:
  quote: "Petar je kompleksan rezervacioni proces pretvorio u proizvod koji putnici zaista zavrse."
  name: "Milan R."
  role: "Operations Lead"
  company: "Bozic-Konig"
  result: "Vise zavrsenih rezervacija i manje support ticketa u peak periodima."
  avatar: "/img/avatars/milan-r.jpg"
---

Cilj projekta nije bio samo vizuelni refresh. Trebao nam je booking kanal kome operativa veruje i u periodima visokog opterecenja.

## Sta je isporuceno

- Nova pretraga linija i polazaka sa predvidljivim loading stanjima.
- Cistiji izbor sedista i handoff podataka ka checkout-u.
- Hardening API ugovora izmedju frontenda i booking servisa.
- Error poruke vezane za operativne edge-case scenarije (kapacitet, retry placanja, zastarela dostupnost).

## Poslovni uticaj

Platforma je prebacena sa "tehnicki funkcionalnog" toka na konverzijski orijentisan proizvod. Bolja brzina i jednostavniji UX smanjili su odustajanje, a backend konzistentnost smanjila manuelnu intervenciju operatera.
