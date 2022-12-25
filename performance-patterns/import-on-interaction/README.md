# Import On Interaction

### Load non-critical resources when a user interacts with UI requiring it

<br>

Your page may contain code or data for a component or resource that isn’t immediately necessary. Loading these resources eagerly (i.e right away) can block the main thread if they are costly, pushing out how soon a user can interact with more critical parts of a page.

Instead of loading these resources immediately, you can load them at a more opportune moment, such as:

- When the user clicks to interact with that component for the first time
- Scrolls the component into view
- or deferring load of that component until the browser is idle (via requestIdleCallback).

The different ways to load resources are, at a high-level:

- Eager - load resource right away (the normal way of loading scripts)
- Lazy (Route-based) - load when a user navigates to a route or component
- Lazy (On interaction) - load when the user clicks UI (e.g Show Chat)
- Lazy (In viewport) - load when the user scrolls towards the component
- Prefetch - load prior to needed, but after critical resources are loaded
- Preload - eagerly, with a greater level of urgency

**Note**: Import-on-interaction for first-party code should only be done if you’re unable to prefetch resources prior to interaction.

<br>

### **"Fake" loading third-party UI with a facade**

You might be importing a third-party script and have less control over what it renders or when it loads code. One option for implementing load-on-interaction is straight-forward: use a facade. A facade is a simple "preview" or "placeholder" for a more costly component where you simulate the basic experience, such as with an image or screenshot.

### **Video Player Embeds**

A good example of a "facade" is the YouTube Lite Embed by Paul Irish. This provides a Custom Element which takes a YouTube Video ID and presents a minimal thumbnail and play button. Clicking the element dynamically loads the full YouTube embed code, meaning users who never click play don’t pay the cost of fetching and processing it.

![images](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1617434835/patterns.dev/import-on-interaction/image2_egy8ct_c_scale_w_1280.png)

### **Authentication**
Apps may need to support authentication with a service via a client-side JavaScript SDK. These can occasionally be large with heavy JS execution costs and one might rather not eagerly load them up front if a user isn’t going to login. Instead, dynamically import authentication libraries when a user clicks on a "Login" button, keeping the main thread more free during initial load.

![images](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1617434835/patterns.dev/import-on-interaction/image4_qeskzi_c_scale_w_1280.png)

### **Chat widgets**
Calibre app improved performance of their Intercom-based live chat by 30% through usage of a similar facade approach. They implemented a "fake" fast loading live chat button using just CSS and HTML, which when clicked would load their Intercom bundles.

![images](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1617434835/patterns.dev/import-on-interaction/image5_x7d5a9_c_scale_w_1280.png)

### Import-on-interaction for first-party code as part of progressive loading

Loading code on interaction also happens to be a key part of how Google handles progressive loading in large applications like Flights and Photos.

Imagine a user is planning a trip to Mumbai, India and they visit Google Hotels to look at prices. All of the resources needed for this interaction could be loaded eagerly upfront, but if a user hasn’t selected any destination, the HTML/CSS/JS required for the map would be unnecessary.

![images](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1617434835/patterns.dev/import-on-interaction/image10_ofj3bz_c_scale_w_1280.png)

In the simplest download scenario, imagine Google Hotels is using naive client-side rendering (CSR). All the code would be downloaded and processed upfront: HTML, followed by JS, CSS and then fetching the data, only to render once we have everything. However, this leaves the user waiting a long time with nothing displayed on-screen. A big chunk of the JavaScript and CSS may be unnecessary.

![image](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1617434835/patterns.dev/import-on-interaction/image11.png)

Next, imagine this experience moved to server-side rendering (SSR). We would allow the user to get a visually complete page sooner, which is great, however it wouldn’t be interactive until the data is fetched from the server and the client framework completes hydration.

![image](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1617434835/patterns.dev/import-on-interaction/image12.png)

<br>

## Replacing interactive embeds with a static variant
The final rendered content from an embed may be needed immediately in some cases e.g a social media post that is visible in the initial viewport. This can also introduce its own challenges when the embed brings in 2-3MB of JavaScript. Because the embed content is needed right away, lazy-loading and facades may be less applicable.

## Conclusions
First-party JavaScript often impacts the interaction readiness of modern pages on the web, but it can often get delayed on the network behind non-critical JS from either first or third-party sources that keep the main thread busy.
Avoid synchronous third-party scripts in the document head and aim to load non-blocking third-party scripts after first-party JS has finished loading. Patterns like import-on-interaction give us a way to defer the loading of non-critical resources to a point when a user is much more likely to need the UI they power.