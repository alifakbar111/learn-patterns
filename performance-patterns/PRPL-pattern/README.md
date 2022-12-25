# PRPL Pattern

### Optimize initial load through precaching, lazy loading, and minimizing roundtrips

<br>

Making our applications globally accessible can be a challenge! We have to make sure the application is performant on low-end devices and in regions with a poor internet connectivity.

The PRPL pattern focuses on four main performance considerations:

- Pushing critical resources efficiently, which minimizes the amount of roundtrips to the server and reducing the loading time.
- Rendering the initial route soon as possible to improve the user experience
- Pre-caching assets in the background for frequently visited routes to minimize the amount of requests to the server and enable a better offline experience
- Lazily loading routes or assets that aren’t requested as frequently

Having to repeatedly request the resources isn’t optimal, as we’re trying to minimize the amount of round trips between the client and the server!

<br>

## HTTP/2

**HTTP/**2 makes use of _bidirectional_ streams, which makes it possible to have one single TCP connection that includes multiple bidirectional streams, which can carry multiple request and response frames between the client and the server!

Once the server has received all request **frames** for that specific request, it reassembles them and generates response frames. These response frames are sent back to the client, which reassembles them. Since the stream is bidirectional, we can send both request and response frames over the same stream.

**HTTP/2** solves head of line blocking by allowing multiple requests to get sent on the same TCP connection before the previous request resolves!

HTTP/2 also introduced a more optimized way of fetching data, called server push. Instead of having to explicitly ask for resources each time by sending an HTTP request, the server can send the additional resources automatically, by “pushing” these resources.

<br>

### The PRPL pattern

**The PRPL pattern** focuses on optimizing the initial load. No other resources get loaded before the initial route has loaded and rendered completely!

When working with the **PRPL pattern**, we need to make sure that the bundles we’re requesting contain the minimal amount of resources we need at that time, and are cachable by the browser.

The benefit of being able to dynamically request minimal resources by bundling an application can easily be mocked by configuring the browser and server to support HTTP/2 push, and caching the resources efficiently.

**The PRPL pattern** often uses an app shell as its main entry point, which is a minimal file that contains most of the application’s logic and is shared between routes! It also contains the application’s router, which can dynamically request the necessary resources.

The PRPL pattern makes sure that no other resources get requested or rendered before the initial route is visible on the user’s device. 

Once the initial route has been loaded successfully, a server worker can get installed in order to fetch the resources for the other frequently visited routes in the background!

Since this data is being fetched in the background, the user won’t experience any delays. If a user wants to navigate to a frequently visited route that’s been cached by the service worker, the service worker can quickly get the required resources from cache instead of having to send a request to the server.