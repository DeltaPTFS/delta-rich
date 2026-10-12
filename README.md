# Delta Air Lines Discord Activity

Client ID: `1559217374668922882`. Art asset: `delta_logo_main`.

## Deploy to Render (Static Site)
- Branch: `main`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Root directory: blank

In Discord Developer Portal > Activities > URL Mappings, set prefix `/` and target to your deployed Render hostname, without `https://`.

## Important limitations
This is the hosted Activity shell, not a guaranteed working Rich Presence. To call `setActivity` with scope `rpc.activities.write`, Discord may require an OAuth authorize -> server-side code/token exchange -> authenticate flow. Do not put the Discord client secret in a static site's source code or public environment variables. The hosted page cannot display a permanent custom status, or reproduce the screenshot's Join Server button by itself.

This community demo is not affiliated with Delta Air Lines.
