# Server-Side Rendering

**Server-side rendering (SSR)** generates the full HTML for the page content to be rendered in response to a user request. The content may include data from a datastore or external API. Rendering code is not required on the client and the JavaScript corresponding to this need not be sent to the client.

With SSR every request is treated independently and will be processed as a new request by the server. Since the server is common to multiple users, the processing capability is shared by all active users at a given time.

<br>

## Classic SSR Implementation

*index.html*
```html
<!DOCTYPE html>
<html>
   <head>
       <title>Time</title>
   </head>
   <body>
       <div>
       <h1>Hello, world!</h1>
       <b>It is <div id=currentTime></div></b>
       </div>
   </body>
</html>
```

*index.js*
```js
function tick() {
    var d = new Date();
    var n = d.toLocaleTimeString();
    document.getElementById("currentTime").innerHTML = n;
}
setInterval(tick, 1000);
```

That code is different with Client-Side-Rendering (CSR) but give same output. The HTML is rendered by server, so time will populated to client by Javascript function `tick()` . 

<br>

## SSR - Pros and Cons

Pros: 
- **Lesser JavaScript leads to quicker FCP and TTI**: SSR have less Javascript compared to CSR, although there is a lot of logic in it. With SSR, users will not be left waiting for all the screen elements to appear and for it to become interactive.

- **Provides additional budget for client-side JavaScript**: Development teams are required to work with a JS budget that limits the amount of JS on the page to achieve the desired performance. With SSR, you will eliminating the JS required to render the page, so it can be make lighter to render page even if reqired third party JS.
  
- **SEO enabled**: Search engine crawlers are easily able to crawl the content of an SSR application thus ensuring higher search engine optimization on the page.

Cons: 
- **Slow TTFB**: Since all processing takes place on the server, the response from the server may be delayed in case of one or more of the following scenarios
    - Multiple simultaneous users causing excess load on the server.
    - Slow network
    - Server code not optimized.
- **Full page reloads required for some interactions**: Since all code is not available on the client, frequent round trips to the server are required for all key operations causing full page reloads. This can make user required to wait longer.

<br>

## SSR with Next.js
The Next.js framework also supports SSR. This pre-renders a page on the server on every request. It can be accomplished by exporting an async function called `getServerSideProps()` from a page as follows.

## React for the Server
React can be rendered isomorphically, which means that it can function both on the browser as well as other platforms like the server. Thus, UI elements may be rendered on the server using React.
