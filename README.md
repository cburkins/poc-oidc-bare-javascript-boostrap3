
# Proof of Concept using oidc-client and minimal javascript

My intent here is to leverage a **small** amount of javascript along with the oidc-client.js to demonstrate how to login/authenticate using an ODIC-compliant Identity Provider

github repo for oidc-client: https://github.com/IdentityModel/oidc-client-js
NPM for oidc-client: https://www.npmjs.com/package/oidc-client

I've tested this setup with:
- Auth0
- Okta
- PingID Fedlogin

Uses node.js to serve up a static HTML file containing a small amount of javascript.