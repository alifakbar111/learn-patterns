# Streaming Server Rendering

We can reduce the *Time To Interactive* while still server rendering our application by streaming server rendering 

Instead of generating one large HTML file containing the necessary markup for the current navigation, we can split it up into smaller chunks. Node streams allow us to stream data into the response object, which means that we can continuously send data down to the client.

In React using `renderToNodeStream` makes it possible for us to send our application in smaller chunks.

## Concepts 
Like progressive hydration, streaming is another rendering mechanism that can be used to improve SSR performance.
Streaming implies chunks of HTML are streamed from the node server to the client as they are generated.

Streaming responds well to `network backpressure`. If the network is clogged and not able to transfer any more bytes, the renderer gets a signal and stops streaming till the network is cleared up. So server can use less memory and more resposive to I/O conditions.

<br>

## React for Streaming
1. **ReactDOMServer.renderToNodeStream(element)**: The output HTML same as `ReactDOMServer.renderToString(element)`but is in a Node.js readablestream format. The function will only work on the server to render HTML as a stream. The client receiving this stream can subsequently call `ReactDOM.hydrate()` to hydrate the page and make it interactive.
   
2. **ReactDOMServer.renderToStaticNodeStream(element)**: This corresponds to `ReactDOMServer.renderToStaticMarkup(element)`. The HTML output is the same but in a stream format. It can be used for rendering static, non-interactive pages on the server and then streaming them to the client.

A comparison between TTFB and First Meaningful Paint for normal SSR Vs Streaming is available in the following image.

![image](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1616883053/patterns.dev/renderingwebap--03wnu5khnrzr.png)


<br>

## Streaming SSR - Pros and Cons

### Advantages
- **Performance Improvement**: As the first byte reaches the client soon after rendering starts on the server, the TTFB is better than that for SSR. 
- **Handling of Backpressure**: Streaming responds well to network backpressure or congestion and can result in responsive websites even under challenging conditions.
- **Supports SEO**: The streamed response can be read by search engine crawlers, thus allowing for SEO on the website.

### Disadvantages
It is important to note that streaming implementation is not a simple find-replace from `renderToString` to `renderToNodeStream()`. There are cases where the code that works with SSR may not work as-is with streaming.

- Frameworks that use the server-render-pass to generate markup that needs to be added to the document before the SSR-ed chunk.
- Code, where renderToStaticMarkup is used to generate the page template and renderToString calls are embedded to generate dynamic content. 

Both Streaming and Progressive Hydration can help to bridge the gap between a pure SSR and a CSR experience. 