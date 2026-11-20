# Gigs und Locations selbst pflegen

Beide Listen stehen jeweils in einer eigenen kleinen Datei. Du änderst nur diese
Datei, die Website übernimmt den Rest.

| Was | Datei | Wo sichtbar |
|-----|-------|-------------|
| Nächste Gigs | `partials/gigs.html` | Startseite, Abschnitt „Nächste Gigs“ |
| Marken & Locations (Referenzen) | `partials/locations.html` | Startseite und DJ-Seite |

## So bearbeitest du eine Datei direkt auf GitHub

1. Im Repository `benjiholiday.github.io` den Ordner `partials` öffnen.
2. Die Datei anklicken, oben rechts auf das **Stift-Symbol** (Edit) klicken.
3. Ändern (siehe unten), dann **Commit changes…** → **Commit changes**.
4. Nach 1–2 Minuten ist die Änderung live. Falls nicht sofort sichtbar:
   Seite neu laden (am Handy ggf. Tab schließen und neu öffnen).

## Gig eintragen

Eine Zeile kopieren, darunter einfügen und anpassen:

```html
<div class="gig"><time class="gig-date" datetime="2026-12-31"></time><span class="gig-venue">Name der Location</span><span class="gig-city">Stadt</span></div>
```

- Datum **immer** als Jahr-Monat-Tag schreiben: `2026-12-31`. Die Website zeigt
  daraus automatisch „31.12.“ an.
- **Vergangene Gigs verschwinden von selbst**, du musst nichts löschen
  (darfst aber gern aufräumen).
- Die Reihenfolge ist egal, die Website sortiert nach Datum.
- Gibt es keinen kommenden Gig, steht dort „Neue Termine folgen in Kürze“.
- Private Feier? Als Location z. B. `Privatveranstaltung` und als Stadt
  `geschlossene Gesellschaft` eintragen.

## Regelmäßiger Termin (ohne festes Datum)

```html
<div class="gig"><span class="gig-date">Mo–Fr</span><span class="gig-venue">Name</span><span class="gig-city">8–13:30 Uhr</span></div>
```

Solche Zeilen verschwinden nie automatisch und stehen immer ganz oben.
Wenn der Termin wegfällt, die Zeile einfach löschen.

## Location / Marke eintragen

```html
<div class="lineup-row"><span class="lu-name">Name</span><span class="lu-tag">Unterzeile</span></div>
```

- Reihenfolge in der Datei = Reihenfolge auf der Website.
- Unterzeile kurz halten, z. B. `Exklusives Club-Erlebnis` oder
  `Fashion · Kundenevent`.
- Nur Marken/Locations eintragen, für die du wirklich gespielt hast.

## Wichtig

- Nur den Text zwischen `>` und `<` ändern und die `datetime`-Angabe.
  Die Zeichen `<div …>`, `<span …>`, `</span>`, `</div>` müssen stehen bleiben.
- Das `&`-Zeichen bitte als `&amp;` schreiben (z. B. `Bar &amp; Lounge`).
- Kaputt gemacht? Auf GitHub unter **History** der Datei die vorherige Version
  öffnen und den Inhalt zurückkopieren.
