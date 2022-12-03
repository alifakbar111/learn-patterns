# Progressive Hydration

A server rendered application to generate the HTML, when the server has completed generating the HTML contents, which also contains the necessary CSS and JSON data to display the static UI it sends the data down to the client. Since the server generated the markup for us, the client can quickly parse this and display it on the screen, which produces a fast **First Contentful Paint**.

Although server rendering provides a faster **First Contentful Paint**, it doesn't always provide a faster **Time To Interactive**. The handlers will only get attached once the JavaScript bundle has been loaded and processed. This process is called *hydration*: React checks the current DOM nodes, and hydrates the nodes with the corresponding JavaScript.

The time that the user sees non-interactive UI on the screen is also refered to as the **uncanny valley**: although users may think that they can interact with the website, there are no handlers attached to the components yet.  This can be a frustrating experience for the user, as the UI may look like it's frozen!

It can take a while before the DOM fully hydrated. Before the components can be hydrated, the JavaScript file needs to be loaded, processed, and executed. Instead of hydrating the entire application at once, like we did previously, we can also progressively hydrate the DOM nodes. **Progressive hydration** makes it possible to individually hydrate nodes over time, which makes it possible to only request the minimum necessary JavaScript.

By progressively hydrating the application, we can delay the hydration of less important parts of the page. Progressive hydration also helps avoid the most common SSR Rehydration pitfalls where a server-rendered DOM tree gets destroyed and then immediately rebuilt.


## Progressive Hydration Implementation

Hydration allows client-side React to recognize the ReactDOM components that are rendered on the server and attach events to these components. Thus, it introduces continuity and seamlessness for an SSR app to function like a CSR app once it is available on the client.

Progressive Hydration solves this problem by allowing us to hydrate only certain parts of the application when the page loads.

![images](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1616962404/patterns.dev/Rendering-ProgressiveHydration.svg)

Instead of initializing the entire application at once, the hydration step begins at the root of the DOM tree, but the individual pieces of the server-rendered application are activated over a period of time.

The idea behind progressive hydration is to provide a great performance by activating your app in chunks.

The requirements for a holistic progressive hydration implementation are as follows.

1. Allows usage of SSR for all components.
2. Supports splitting of code into individual components or chunks
3. Supports client side hydration of these chunks in a developer defined sequence.
4. Does not block user input on chunks that are already hydrated.
5. Allows usage of some sort of a loading indicator for chunks with deferred hydration

<br>

## Progressive Hydration - Pros and Cons

### **Advantages**
- **Promotes code-splitting**: Code-splitting is an integral part of progressive hydration because chunks of code need to be created for individual components that are lazy- loaded.
- **Allows on-demand loading for infrequently used parts of the page**: There may be components of the page that are mostly static, out of the viewport and/or not required very often. Hydration code for these components need not be sent when the page loads. Instead, they may be hydrated based on a trigger.
- **Reduces bundle size**: Code-splitting automatically results in a reduction of bundle size. Less code to execute on load helps reduce the time between FCP and TTI.

### **Disadvantages**
Progressive hydration may not be suitable for dynamic apps where every element on the screen is available to the user and needs to be made interactive on load.
