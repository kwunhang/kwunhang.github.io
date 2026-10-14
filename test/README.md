# Personal site checks

Run `bash test/integration_personal_site.sh` to build with the production
configuration and verify navigation, publication lists, selected papers, and
the absence of hidden sections and links to them.

The Comments, Distill, and new-plugin integration scripts use
`demo_posts_config.rb` to enable only their five retained demo posts in temporary
builds. This override is never used by deployment. Blog and Projects remain
excluded in `_config.yml`.

Run `npm run test:visual` for desktop Chromium and mobile WebKit checks of the
personal site, including direct requests to hidden URLs. The server and tests
read the base URL from `_config.yml`. The original template browser specs remain
as reference files; they are not applicable to the customized content and are
not selected by the Playwright configuration.
