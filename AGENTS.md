<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Verification workflow (dev vs build)

- During development, verify changes through the running dev server's HMR + browser/curl checks only. Do not run `npm run build` after every change — it writes to `.next` and disrupts a running `next dev` (which shares that directory), so the dev server must be restarted afterward.
- For type checks that don't touch `.next`, use `npx tsc --noEmit`.
- Run `npm run build` only once as a final gate right before creating or updating a pull request.

## Session cleanup

- At the end of each session, stop any dev server started during the session (e.g. `kill` the PIDs on port 3000) so it doesn't linger in the background.

