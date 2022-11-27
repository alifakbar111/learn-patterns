# Client Side Rendering

In *Client-Side Rendering (CSR)* only the barebones HTML container for a page is rendered by the server.  The logic, data fetching, templating and routing required to display content on the page is handled by JavaScript code that **executes** in the **browser/client**.

## CSR - Basic structure

<br>

in HTML : 
```html
<div id="root"></div>
```
<br>

in JS: 
```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
 ReactDOM.render(element,document.getElementById('root'));
}
setInterval(tick, 1000);
```

The HTML consists of just a single root div tag. Content display and updates on the other hand are handled completely in JavaScript.

## JavaScript bundles and Performance
As the complexity of the page increases CSR resulted in large JS bundles which increase the FCP an TTI of the page.

![image](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1616882583/patterns.dev/renderingwebap--x8xrlwjb7rh.png)

<br>

## Client-side React - Pros and Cons
Pros: 
- **CSR** allows us to have a Single-Page Application that supports navigation without page refresh and provides a great user experience
- **CSR** also allows developers to achieve a clear separation between client and server code.
  
Cons: 
- **SEO considerations**: Most web crawlers can interpret server rendered websites in a straight-forward manner. In CSR have large payloads and waterfall netowrk request may result in meaningful content not rendered fast enough.
- **Performance**: With client-side rendering, the response time during interactions is greatly improved as there is no round trip to the server. But in browser in CSR have to wait for the JS to load first and start processing.
- **Code Maintainability**: Some elements of code may get repeated across client and server (APIs) in different languages. In other cases, clean separation of business logic may not be possible.
- **Data Fetching**: witch CSR, data fetching is usually event-driven. The page could initially be loaded without any data. 

The importance of these considerations may be different across applications. Developers are often interested in finding SEO friendly solutions that can serve pages faster without compromising on the interaction time.

<br>

## Improving CSR performance
Since performance for CSR is inversely proportional to the size of the JavaScript bundle, the best thing we can do is structure our JavaScript code for optimal performance.
- **Budgeting JavaScript**: Ensure that you have a reasonably tight JavaScript budget for your initial page loads. An initial bundle of **<100-170KB** minified and gzipped is a good starting point.
- **Preloading**: This technique can be used to preload critical resources that would be required by the page, earlier in the page lifecycle. example code below informs the browser to start loading the critical.js file before the page rendering mechanism starts. 
```html
<link rel="preload" as="script" href="critical.js">
```

- **Lazy loading**: With lazy loading, you can identify resources that are non-critical and load these only when needed. Initial page load times can be improved using this approach as the size of resources loaded initially is reduced
- **Code Splitting**: To avoid a large bundle of JS code, you could splitting your bundles. Code-Splitting is supported by bundlers like *Webpack* where it can be used to create multiple bundles that can be dynamically loaded at runtime.
- **Application shell caching with service workers**: This technique involves caching the application shell which is the minimal HTML, CSS, and JavaScript powering a user interface. *Service workers* can be used to cache the application shell offline. This can be useful in providing a native single-page app experience where the remaining content is loaded progressively as needed.