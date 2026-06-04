# Beyond Expertise — Site corporate

Site vitrine bilingue (FR/EN) pour **Beyond Expertise**, éditeur de logiciels & d'IA.
Stack : **Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS**. Design *dark premium*.

## Démarrer

```bash
npm install        # déjà fait
npm run dev        # serveur de dev  → http://localhost:3000
# ou
npm run build && npm run start   # build de production
```

La racine `/` redirige automatiquement vers la langue du navigateur (`/fr` ou `/en`).

## Structure

```
app/
  [lang]/
    layout.tsx          # layout racine (polices, header, footer, métadonnées i18n)
    page.tsx            # page d'accueil (13 sections)
    products/           # Produits
    solutions/          # Solutions par besoin
    company/            # Entreprise / mission / valeurs
    trust/              # Sécurité & conformité
    contact/            # Contact + formulaire
  globals.css           # design system (tokens, classes utilitaires, animations)
  icon.svg              # favicon
components/
  Logo.tsx              # logo (mark double-chevron « beyond » + wordmark)
  Header.tsx            # navigation + sélecteur de langue + menu mobile
  Footer.tsx            # pied de page complet + badges de conformité
  LanguageSwitcher.tsx  # bascule FR/EN
  Reveal.tsx            # animations d'apparition au scroll
  ContactForm.tsx       # formulaire de contact
  sections/             # sections de la page d'accueil
i18n/
  config.ts             # locales (fr, en)
  dictionaries.ts       # chargement des dictionnaires (côté serveur)
  dictionaries/fr.json  # tout le contenu FR
  dictionaries/en.json  # tout le contenu EN
middleware.ts           # redirection / détection de langue
public/logo.svg         # logo autonome (fond clair)
```

## Personnalisation

- **Contenu / textes** → `i18n/dictionaries/fr.json` et `en.json` (mêmes clés des deux côtés).
- **Couleurs & design tokens** → `tailwind.config.ts` (palette `violet-glow` / `cyan-glow`, dégradé de marque) + `app/globals.css`.
- **Produits, industries, valeurs** → tableaux dans les dictionnaires (`products.items`, `industries.items`, `pages.company.values`…).
- **Logo** → `components/Logo.tsx` (vectoriel, dégradé violet → cyan).

## Notes

- Le formulaire de contact est en démonstration (état de succès côté client). Brancher un endpoint / service email (ex. Resend, un webhook) dans `components/ContactForm.tsx` pour la mise en production.
- Pages légales (Confidentialité, CGU, Cookies) pointent vers `/trust` — à remplacer par de vraies pages le moment venu.
- Logos clients de la section « confiance » = placeholders (`components/sections/HomeSections.tsx`).

## Déploiement

Optimisé pour **Vercel** (`vercel deploy`) ou tout hébergeur Node. Pour un export statique, ajouter `output: "export"` dans `next.config.mjs` (le middleware de langue devra alors être adapté).
