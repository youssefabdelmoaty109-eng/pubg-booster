# PUBG Booster

An Arabic-first, mobile-first static diagnostic PWA for Android. It measures real HTTPS requests from the browser to a configurable test server, keeps a local history, and compares measurements before and after a manual network change.

## What it measures (and does not)

- Each latency result is browser-to-test-server response time until the HTTP response headers arrive.
- **Jitter** is the mean absolute difference between adjacent successful test requests. It is shown as unavailable unless there are at least two adjacent successful results.
- **Failure rate** is failed HTTP/network/timeout requests divided by all test requests. CORS blocks may appear as network failures. This is not measured inside PUBG Mobile and is not confirmed in-game packet loss.
- Results are **not** direct PUBG server ping and do not promise better gameplay.
- A website cannot route or optimize traffic from the separate PUBG Mobile app. GearUP-like acceleration would need an appropriate on-device component, relay infrastructure, and real integration; this app does not implement a VPN.
- The default endpoint is `https://httpbin.org/status/204`. It is a public test endpoint, not a PUBG server. A selected endpoint must accept HTTPS `GET` requests and browser CORS.
- No PUBG account details, password, or game files are requested or changed. Test history, endpoint preferences, game name, and device name are stored only in this browser's local storage.
- The app has no paid APIs, backend, analytics, or game integration. Its PWA shell can be cached for opening offline, but a network connection is required to measure a live endpoint.

## Run locally

Do not open `index.html` as a `file://` URL: modern browsers may block its network requests. Serve the folder over HTTP instead:

```sh
cd pubg-booster-web
python3 -m http.server 8080
```

Open `http://localhost:8080` on the computer. To test from an Android phone on the same Wi-Fi network, find the computer's local IP address and visit `http://COMPUTER-IP:8080` on the phone. Keep the computer and server running. The test endpoint itself must still be HTTPS and CORS-enabled.

## Android

For the simplest phone-only preview, publish the static files using the free GitHub Pages option below, then open the resulting HTTPS URL in Chrome on Android. The **Install** button requests PWA installation when Chrome offers it; if it does not, open Chrome's `⋮` menu and choose **Install app** or **Add to Home screen**. Installation needs the published HTTPS site and the service worker to load successfully.

## Free static hosting with GitHub Pages

1. Create a **public** GitHub repository (the free GitHub Pages option is available for public repositories on GitHub Free) and upload all app files at the repository root: `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, `sw.js`, `icon.svg`, `icon-192.png`, `icon-512.png`, and `README.md`.
2. In the repository, open **Settings → Pages**.
3. Under the build/deployment source, choose **Deploy from a branch**, select the default branch and `/ (root)`, then save.
4. Wait for GitHub Pages to show the published HTTPS URL. Open it on Android and run a test.

Publishing requires a GitHub account and the repository's Pages settings. A public repository makes the source files public. This source package does not publish anything or claim a live URL exists.

## Controls

- **Start test:** run the configured number of sequential real browser requests (1–20).
- **Before / after:** record successful-run averages to compare a manual change on the same endpoint and with the same number of attempts. These are browser measurements only.
- **History:** the latest 12 test runs are stored locally; use **Clear history** to remove them.
- **Profile:** edit the game and device labels; defaults are PUBG Mobile and Infinix NOTE 40 5G. The labels never go to the test endpoint.
- **Install:** install as a PWA from supported Android browsers, or use the browser menu if no direct prompt appears.
- **Language:** Arabic RTL is the default; use the top-right toggle for English.

## Browser limitations

Fetch timing is affected by the device, browser scheduling, DNS, TLS, the route to the selected host, and server load. Cross-origin requests can be blocked by the endpoint's CORS policy; the page will report a generic network/CORS error because browsers intentionally hide many details. The timing is not a calibrated network benchmark. A failed response, timeout, or CORS block is recorded as a failed attempt rather than a made-up number.

This is a static app: it uses no paid API, backend, analytics, account system, or third-party game integration.
