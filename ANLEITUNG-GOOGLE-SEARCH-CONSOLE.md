# Google Search Console: neue Seiten indexieren

Stand: November 2026 · für www.benjiholiday.com

Mit diesem Update sind drei neue Seiten online und einige bestehende Seiten haben
sich geändert (neue Fotos, neue Preise). Damit Google das schnell mitbekommt,
einmal diese Schritte durchgehen. Dauer: ca. 15 Minuten.

---

## 1. Zugang einrichten (nur beim ersten Mal)

1. Öffne <https://search.google.com/search-console> und melde dich mit deinem
   Google-Konto an.
2. **Property hinzufügen** → links **Domain** wählen → `benjiholiday.com`
   eintragen (ohne `www`, ohne `https://`).
3. Google zeigt dir einen **TXT-Eintrag** (`google-site-verification=…`).
   Diesen beim Domain-Anbieter in den DNS-Einstellungen als neuen TXT-Eintrag
   für die Hauptdomain (`@`) anlegen. Die bestehenden A-Records und den CNAME
   für GitHub Pages **nicht** verändern.
4. Zurück in der Search Console auf **Bestätigen** klicken. Klappt es nicht
   sofort, nach 30–60 Minuten erneut versuchen (DNS braucht etwas).

> Hast du die Search Console schon eingerichtet? Dann direkt bei Schritt 2 weitermachen.

---

## 2. Sitemap einreichen

1. Links im Menü **Sitemaps** öffnen.
2. Unter „Neue Sitemap hinzufügen“ eintragen: `sitemap.xml`
   (die volle Adresse ist `https://www.benjiholiday.com/sitemap.xml`).
3. **Senden**. Der Status sollte nach kurzer Zeit **Erfolgreich** zeigen.

War die Sitemap schon eingereicht, trotzdem einmal neu senden. Google liest
dann die neuen Änderungsdaten.

---

## 3. Neue und geänderte Seiten zur Indexierung anmelden

Für jede Adresse unten:

1. Ganz oben in das Suchfeld **„Jede URL in … prüfen“** die Adresse einfügen
   und Enter drücken.
2. Bei neuen Seiten steht dort „URL ist nicht auf Google“. Das ist normal.
3. Auf **Indexierung beantragen** klicken und ca. 1–2 Minuten warten, bis
   „Indexierung beantragt“ erscheint.

**Neue Seiten (zuerst):**

- `https://www.benjiholiday.com/dj/basel.html`
- `https://www.benjiholiday.com/dj/wien.html`
- `https://www.benjiholiday.com/dj/heidelberg.html`

**Geänderte Seiten:**

- `https://www.benjiholiday.com/`
- `https://www.benjiholiday.com/musikunterricht.html` (neue Preise)
- `https://www.benjiholiday.com/dj.html`
- `https://www.benjiholiday.com/bio.html` (neue Fotostrecke)
- `https://www.benjiholiday.com/kontakt.html`

Google erlaubt nur eine begrenzte Zahl solcher Anträge pro Tag. Kommt die
Meldung „Kontingent überschritten“, den Rest am nächsten Tag machen.
Die übrigen Seiten findet Google über die Sitemap von selbst.

---

## 4. Nach ein paar Tagen kontrollieren

- **Indexierung → Seiten:** Hier siehst du, welche Seiten bei Google sind.
  Unter „Warum Seiten nicht indexiert werden“ dürfen `404.html` und Varianten
  wie `…/index.html` auftauchen, das ist in Ordnung.
- **Leistung:** Nach 1–2 Wochen siehst du, bei welchen Suchbegriffen
  (z. B. „DJ München“, „DJ Wien“) die Seite angezeigt und geklickt wird.
- Die Aufnahme neuer Seiten dauert meist einige Tage, manchmal bis zu zwei
  Wochen. Mehrfaches Beantragen beschleunigt nichts.

---

## 5. Optional: Bing (auch für ChatGPT-Suche relevant)

1. <https://www.bing.com/webmasters> öffnen und mit Microsoft- oder Google-Konto
   anmelden.
2. **Aus der Google Search Console importieren** wählen. Bing übernimmt
   Bestätigung und Sitemap automatisch.

---

## 6. Wenn du später Gigs oder Locations änderst

Dafür musst du in der Search Console **nichts** tun. Die Startseite wird von
Google regelmäßig neu gelesen. Wie du Gigs und Locations einträgst, steht in
`ANLEITUNG-GIGS-UND-LOCATIONS.md`.
