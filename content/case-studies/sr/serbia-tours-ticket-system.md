---
order: 2
title: "Srbija Tours ticket sistem"
client: "Srbija Tours International"
industry: "Travel i ticketing"
summary: "Performance-focused rekonstrukcija javnog ticket kanala povezanog sa operativnim podacima u realnom vremenu."
challenge: "Postojeci sajt je usporavao pod campaign traffic-om i sezonskim opterecenjem, sto je izazivalo neuspele checkout-e i support eskalacije."
solution: "Redizajniran je frontend delivery i API integracioni sloj, uvedene su cache granice i stroza validacija booking payload-a."
duration: "4 meseca"
budgetRange: "EUR 24k - EUR 40k (~2.8m - 4.7m RSD)"
liveUrl: "https://srbijatours.com/"
caseStudySlug: "serbia-tours-ticket-system"
technologies:
  - "WordPress"
  - "Laravel API"
  - "MySQL"
  - "Redis"
  - "Nginx"
results:
  - label: "Checkout completion"
    value: "+68%"
    detail: "Rast broja zavrsenih kupovina nakon hardening faze."
  - label: "Backend response"
    value: "920ms -> 260ms"
    detail: "P95 latencija booking search endpoint-a nakon query i cache refaktora."
  - label: "Peak kapacitet"
    value: "3.1x traffic"
    detail: "Stabilan rad pod campaign peak opterecenjem bez pada booking UX-a."
media:
  screenshot: "/img/case-studies/serbia-hero.png"
  videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U"
timeline:
  - phase: "Audit"
    summary: "Profilisana su uska grla u renderovanju stranica, search endpoint-ima i DB pristupu."
    duration: "Nedelja 1-3"
  - phase: "Arhitekturne izmene"
    summary: "Uvedeni su cache slojevi i queue-safe upisi za kriticne booking tokove."
    duration: "Nedelja 4-7"
  - phase: "Frontend optimizacija"
    summary: "Smanjen je script payload, optimizovani asset-i i pojednostavljene korisnicke interakcije."
    duration: "Nedelja 8-12"
  - phase: "Load validacija"
    summary: "Potvrdjeno je ponasanje platforme pod produkciono-slicnim opterecenjem."
    duration: "Nedelja 13-16"
beforeAfter:
  beforeLabel: "Pre: traffic-sensitive platforma"
  beforeSummary: "Visok promet je uzrokovao nestabilna vremena odziva i prekide checkout toka."
  beforeImage: "/img/case-studies/serbia-before.png"
  afterLabel: "Posle: performance-first booking tok"
  afterSummary: "Predvidljive API latencije i stabilna kupovina karata tokom campaign peak-ova."
  afterImage: "/img/case-studies/serbia-after.png"
testimonial:
  quote: "Isporuka je bila brza, komunikacija jasna, a sistem je izdrzao kada je saobracaj porastao."
  name: "Ana S."
  role: "Product Manager"
  company: "Srbija Tours International"
  result: "Kraci release ciklusi i manji broj incidenata u peak periodima."
  avatar: "/img/avatars/ana-s.jpg"
---

Fokus ovog case-a bio je pouzdanost pod pritiskom. Cilj je bio da booking tok ostane stabilan kada marketing kampanje i sezonska traznja udare istovremeno.

## Ključne isporuke

- Uvedena cache strategija prema volatilnosti podataka po endpoint-u.
- Smanjen DB overhead kroz indexing i query-path cleanup.
- Poostrana validacija booking upisa i payment callback tokova.
- Optimizovan frontend rendering put radi responsivnog prvog korisnickog koraka.

## Operativni rezultat

Sistem sada bolje podnosi demand spike situacije, uz cistiji observability i manje "firefighting" opterecenje internog tima.
