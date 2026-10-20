# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** owners and managers of small and mid-size businesses, most of them regional (interior of São Paulo, the (19) area), who need someone to run their social media and produce their content. Current clients include drugstores, aesthetic clinics, a pharmacist, cleaning-product makers, distributors, a university and a cooperative.
- **Not limited to the region:** Somark already serves businesses in any segment and any region. Regional clients are the usual case, not a boundary.
- **Situation:** most visitors arrive on a phone, often from Instagram or a direct referral, and decide whether to start a WhatsApp conversation.

## Product Purpose

Somark Mídia is a creative, data-driven digital marketing agency: social media management, strategy, content creation, and video and photo production. The site replaces the founder's old personal Canva portfolio ("Creative Serjo") with a more detailed agency site that follows the Somark identity.

Success is a visitor who understands what Somark does, sees that real brands trust it, picks a plan, and opens a WhatsApp conversation.

## Positioning

Three things, together:

1. **Audiovisual production in-house.** Video, photo and color grading are made by the agency itself, not outsourced. Strategy and production live under one roof, and the content is designed for performance and positioning, not only looks.
2. **Strategy based on data.** Planning starts from data and clear objectives.
3. **Close, hands-on service.** Direct WhatsApp contact, weekly (PRO) or daily (PRIME) follow-up, and client approval at every step (briefing, script, approval, execution). Clients talk to the people doing the work.

## Operating Context

- Contact and sales happen on **WhatsApp**: every plan button and the contact form open WhatsApp with a pre-written message. E-mail and Instagram are secondary.
- Prices are agreed in conversation. **No prices appear on the site** (client decision).
- The working method shown to clients: Briefing, Roteiro, Aprovação, Execução.
- Plans: **LITE** (starting out), **PRO** (most chosen), **PRIME** (accelerated results); each plan adds to the previous one. Full feature matrix in `docs/projeto.md` §3.5.

## Capabilities and Constraints

- Static HTML/CSS/JS pages built with Vite, with small React islands (`src/islands/`) for the theme toggle, method accordion, links and cursor. Each prototype lives in `prototipos/vN/` and shares `assets/`. V3 (`prototipos/v3/`) is a fork of V2 and is the current working version.
- Portfolio videos play **on the site itself** (no YouTube embed), muted, on hover on desktop and on tap on mobile; they load only on first interaction. No real videos exist yet.
- Client logos run in an automatic belt (client request).
- Mobile is the primary access; desktop is centered and compact.
- Icons: Phosphor only. No emojis anywhere.
- Copy is Brazilian Portuguese, written in the **plural** ("somos", "cuidamos").
- Fonts and icons load from CDNs in the prototypes; they must be self-hosted before launch.
- **Open decisions:** the PRO follow-up cadence (the PDF says both "daily" and "weekly"; the site uses weekly), whether to keep the plans section without prices, whether the old Canva site stays live until launch, and a segment filter for the portfolio once videos exist. Domain and hosting are undefined.

## Brand Commitments

- **Name:** Somark Mídia. "Somark" reads as *somar* + *mark*: the "+" and the idea of adding up are a real thread (numbers with "+", four services that add up, each plan adds to the last), used with meaning, never as ornament.
- **Institutional voice:** Somark speaks as an agency and a team. **Decided 2026-10-20:** the founder, Sergio Godoy, is no longer the face of the brand; the "Sobre" section must present the agency, not him. (V2 still frames him as founder; `docs/projeto.md` lists this as open and is now out of date on this point.)
- **Brand lines from the media kit:** "Cresça conosco!", "Marketing digital é mais do que números!", "Vamos crescer juntos?".
- **Voice:** direct and short. Keywords: crescer, somar, estratégia, assinatura. No agency clichés ("soluções inovadoras", "elevar", "next-level").
- **Identity source:** the Somark media kit (green) is the binding identity, documented in `docs/identidade-visual.md`. The old "Creative Serjo" look (red on cream, condensed type, monospace, badges) must not return.
- **Logo:** only a white raster PNG exists (`assets/brand/somark-logo-branco.png`), usable only on the brand green or dark green. SVG and color/dark versions are pending from the client.
- **Typography B** (Fraunces + Montserrat) was chosen by the team; the client has not confirmed it.

## Evidence on Hand

- **Client logos:** 18 files in `assets/logos/`, low resolution (up to 440 px). Names "Édmais" and "WF" were inferred from the artwork and need confirmation.
- **Result figures:** +95% client satisfaction, +35% social engagement, +65% sales growth, from the media kit. **Unconfirmed:** source and period must be confirmed by the client before launch.
- **Photos:** `assets/img/` (from the media kit and the old site; origin and license unconfirmed). Prototype photos are Picsum/Unsplash placeholders.
- **Videos:** `assets/video/` holds open-license sample clips (Wikimedia Commons) that are **not Somark work**. No real portfolio exists on the site yet.
- **Absent, do not fabricate:** testimonials, case studies, real portfolio work, prices, team photos with confirmed identities, official Somark contact channels (current ones are Sergio's personal WhatsApp, e-mail and @creativeserjo).

## Product Principles

1. **Every path ends in a WhatsApp conversation.** The site exists to start that conversation; nothing should compete with it.
2. **Show the work, not adjectives.** In-house production is the edge, so the portfolio and real brands carry the proof; claims without evidence stay out.
3. **Agency, not author.** Speak as a team in the plural; the brand must be able to grow beyond one person.
4. **Closeness is a feature.** Approval at each step and direct contact are part of the offer and should read as such.
5. **Adding up is the idea.** Use "somar" where it is true (services, plans, method), never as decoration.

## Accessibility & Inclusion

- Phone-first: layouts start at mobile width; tap targets at least 48 px.
- Text contrast meets WCAG AA; the approved color pairs and ratios are in `docs/identidade-visual.md` §2.3.
- `prefers-reduced-motion` shows everything static and complete.
- Video playback works by tap as well as hover; videos are muted.
