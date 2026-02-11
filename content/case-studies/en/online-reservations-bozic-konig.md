---
order: 1
title: "Online Reservations (Bozic-Konig)"
client: "Bozic-Konig"
industry: "Intercity Transport"
summary: "Rebuilt booking flow for faster search, simpler checkout, and measurable conversion growth."
challenge: "Passengers dropped during route selection and checkout because the old flow was slow, fragmented, and hard to complete on mobile."
solution: "Designed and shipped a React/Next booking experience connected to Laravel operational APIs with stricter state handling and cleaner seat selection."
duration: "3 months"
budgetRange: "EUR 18k - EUR 30k"
liveUrl: "https://bozic-konig.com/"
caseStudySlug: "online-reservations-bozic-konig"
technologies:
  - "React"
  - "Next.js"
  - "Laravel API"
  - "MySQL"
  - "Redis"
results:
  - label: "Conversion"
    value: "+240%"
    detail: "Completed booking rate versus previous checkout baseline."
  - label: "Page Speed"
    value: "6.2s -> 1.8s"
    detail: "Main booking route median load time after optimization."
  - label: "Monthly Users"
    value: "15k -> 50k"
    detail: "Stable monthly active audience after launch window."
media:
  screenshot: "/img/case-studies/bozic-hero.png"
  videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ"
timeline:
  - phase: "Discovery"
    summary: "Mapped booking drop-off points and aligned KPI targets with operations."
    duration: "Week 1-2"
  - phase: "UX + Prototype"
    summary: "Reframed search, seat, and checkout flow into one guided path."
    duration: "Week 3-4"
  - phase: "Implementation"
    summary: "Built Next.js frontend and integrated Laravel data contracts and booking validation."
    duration: "Week 5-10"
  - phase: "Launch + Optimization"
    summary: "Monitored funnels, reduced payload size, and tuned cache strategy."
    duration: "Week 11-12"
beforeAfter:
  beforeLabel: "Before: fragmented checkout"
  beforeSummary: "Users switched between multiple pages with weak progress feedback and frequent session loss."
  beforeImage: "/img/case-studies/bozic-before.png"
  afterLabel: "After: guided booking flow"
  afterSummary: "Single flow with persistent state, clearer pricing, and stronger mobile completion behavior."
  afterImage: "/img/case-studies/bozic-after.png"
testimonial:
  quote: "Petar turned a complicated reservation process into a product our passengers actually finish."
  name: "Milan R."
  role: "Operations Lead"
  company: "Bozic-Konig"
  result: "Higher completion and fewer support tickets during peak departures."
  avatar: "/img/avatars/milan-r.jpg"
---

The project goal was not only a visual redesign. We needed a booking channel that operations trusted during high traffic and holiday peaks.

## What was implemented

- New route and schedule search with predictable loading states.
- Cleaner seat selection and passenger data handoff to checkout.
- API contract hardening between frontend and booking services.
- Error messaging tied to operational edge cases (capacity, payment retries, stale availability).

## Business impact

The platform moved from a technically working flow to a conversion-oriented product. Better speed and simpler interaction reduced abandonment, while backend consistency lowered manual operator intervention.
