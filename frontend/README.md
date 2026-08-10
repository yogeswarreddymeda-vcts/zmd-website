# ZMD website

The ZMD marketing site is a React/Vite static application. The deployable site is generated in `dist/`; it does not require a Node server, database, or API at runtime.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Run locally

From this directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

The development server uses browser history routing. Use the navigation links in the site to check the home, products, solutions, about, and contact routes.

## Verify before deployment

Run the production build:

```bash
npm run build
```

This writes the production files to `dist/`. A successful build ends with `built in ...ms` and creates `dist/index.html` plus the hashed asset files.

Preview the exact production build locally:

```bash
npm run preview
```

Then open the preview URL, usually `http://localhost:4173/`. Check desktop and mobile widths, direct navigation to nested routes, image loading, and the primary CTAs.

Optional lint check:

```bash
npm run lint
```

## Create the GoDaddy ZIP

Build first, then create a ZIP containing the *contents* of `dist`, not the `dist` folder itself:

```bash
npm run build
rm -f zmd-godaddy-deployment.zip
(cd dist && zip -r ../zmd-godaddy-deployment.zip . -x '*.DS_Store')
unzip -t zmd-godaddy-deployment.zip
```

The ZIP should contain `index.html` at its root. It should not contain `dist/index.html` or the source files. The build includes the Apache `.htaccess` fallback so nested routes work on GoDaddy Linux hosting.

## Upload to GoDaddy

1. Open GoDaddy Hosting cPanel and launch **File Manager**.
2. Open the domain's document root, normally `public_html`.
3. Upload `zmd-godaddy-deployment.zip`.
4. Extract it in `public_html` so `index.html`, `assets/`, and `.htaccess` sit directly in that folder.
5. Remove the ZIP after extraction if it is no longer needed.
6. Visit `https://zmd.tech/` and test a nested route such as `/products/cameras` with a hard refresh.

Do not upload the repository, `node_modules`, `src`, or the ZIP as the live document root. Only the extracted `dist` contents belong in `public_html`.

## Test with XAMPP

Do not open `dist/index.html` with a `file://` URL. Serve the folder through Apache so asset paths and route fallback behave like production:

1. Copy the contents of `dist` into a folder such as `xampp/htdocs/zmd`.
2. Start Apache in XAMPP.
3. Open `http://localhost/zmd/`.

If the page is blank or assets return 404, confirm that `index.html` and `assets/` are at the same level and that the `.htaccess` file was copied. Rebuild after source changes and replace the XAMPP folder with the new `dist` contents.

## Project layout

- `src/` — React pages, components, styles, and source images
- `public/` — files copied directly to the build, including favicons and `.htaccess`
- `dist/` — generated production output; do not edit by hand
- `vite.config.js` — portable relative asset base for GoDaddy/static hosting

## Deployment notes

- Keep `base: './'` in `vite.config.js`; it allows the same build to work from GoDaddy and a local static folder.
- Keep `.htaccess` in the deployed root for Apache route fallback.
- Re-run the build and ZIP commands after every source change.
- Keep the generated GoDaddy ZIP out of source control unless a release archive is specifically required.
