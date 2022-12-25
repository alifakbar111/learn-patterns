# Preload

### Inform the browser of critical resources before they are discovered

<br>

Preload (`<link rel="preload">`) is a browser optimization that allows critical resources (that may be discovered late) to be requested earlier.

It can have a positive impact on loading performance and metrics in the Core Web Vitals. That said, preload is not a panacea and requires an awareness of some trade-offs.

When optimizing for metrics like **Time To Interactive** or **First Input Delay**, preload can be useful to load JavaScript bundles (or chunks) that are necessary for interactivity.

### Preload in single-page apps

While **prefetching** is a great way to cache resources that may be **requested** some time soon, we can preload resources that need to be used instantly.

### Preload + the async hack
Should you wish for browsers to download a script as high-priority, but not block the parser waiting for a script, you can take advantage of the preload + async hack below.

```html
<link rel="preload" href="emoji-picker.js" as="script">
<script src="emoji-picker.js" async>

```

## Conclusions

Use preload sparingly and always measure its impact in production. If the preload for your image is earlier in the document than it is, this can help browsers discover it (and order relative to other resources).

You may also find `<link rel="preload"> `to be helpful for cases where you need to fetch scripts without executing them.