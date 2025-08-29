# Running development version of the new Global Goods Guidebook

## Project info
**Live URL**: https://beta.globalgoodsguidebook.org

**Dev URL**: https://lovable.dev/projects/ea898c29-1c50-4e86-a2e4-7ccd6f328900

Deployed on: netlify.com



## Data Sources

- **Global Goods**
  - Index: `public/data/global-goods/index.json`
  - Individual details: `public/data/global-goods/individual/*.json`
- **Reference Data**
  - Catalogs: `public/data/reference/*.json` (e.g., classifications, standards, licenses, languages, countries)
- **Use Cases**
  - Files: `src/data/use-cases/*.json` (multilingual supported)

Contributing data:
- Add/edit JSON files in the directories above.
- Run repo scripts where relevant (e.g., `scripts/generate-index.js`, `scripts/generate-sitemap.js`).
- Validate locally by running the app; loaders resolve references and types at runtime.
- See `docs/` for schemas and validation rules.


## Licensing

- **Code**: Apache-2.0 © Contributors. See `LICENSE` and `NOTICE`.
- **Content (data and docs)**: CC BY 4.0 for materials under `public/data/` and `docs/`.

- **Use Cases**: Text and structured content for use cases (e.g., under `src/data/use-cases/` and `public/data/**/use-cases*`) is licensed under CC BY 4.0 © Contributors. Any third‑party excerpts or media referenced within remain the property of their respective owners.

- **Logos and Trademarks**: Files under `public/uploads/gg_logos/` and `public/lovable-uploads/` are the property of their respective owners and are used for identification only. These are not licensed under Apache-2.0 or CC BY 4.0.

- **Screenshots**: Files under `public/uploads/gg_screenshots/` remain the property of their respective owners and are not covered by the project’s open-source licenses. Used with permission or under fair use.

- **Branding and Social Images**: `public/og-image.png`, `src/assets/og-image.png`, `public/favicon.ico`, and `public/placeholder.svg` are project branding assets. Any third‑party marks within remain owned by their respective holders.

- **Map Data**: `public/map_country-data-110m.json` is derived from Natural Earth (Public Domain). “Made with Natural Earth.”

- **Third-party PDFs**: `public/assets/Climate_Annex.pdf` is third‑party content; rights remain with the author/publisher unless otherwise stated.


