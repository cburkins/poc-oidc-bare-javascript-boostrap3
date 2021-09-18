# Proof of Concept using oidc-client and minimal javascript

My intent here is to leverage a **small** amount of javascript along with the oidc-client.js to demonstrate how to login/authenticate using an ODIC-compliant Identity Provider

github repo for oidc-client: https://github.com/IdentityModel/oidc-client-js
NPM for oidc-client: https://www.npmjs.com/package/oidc-client

I've tested this setup with:

-   Auth0
-   Okta
-   PingID Fedlogin

Uses node.js to serve up a static HTML file containing a small amount of javascript.

# Screenshot

![image](https://user-images.githubusercontent.com/9342308/111884954-2cd49e80-899b-11eb-8ab8-e5407b16ca00.png)

# Installation

1. Install node-js
1. Run `npm install`
1. NOTE: OAUTH Endpoint connection details are hard-coded into `public/form_javascript.js`
1. Run `npm run start`
1. Manually open browser
1. Navigate to `http://localhost:3155`
