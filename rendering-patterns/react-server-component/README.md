# React Server Components

The React team are working on zero-bundle-size React Server Components, which aim to enable **modern UX with a server-driven mental model**. 

<br>

## Server-side rendering limitations
Today's Server-side rendering of client-side JavaScript can be suboptimal. JavaScript still needs to be fetched for interactivity which is often achieved via a hydration step. Server-side rendering is generally used for the initial page load, so post-hydration you're unlikely to see it used again.

With ***React Server Components***, our components can be refetched regularly. An application with components which rerender when there is new data can be run on the server, limiting how much code needs to be sent to the client.

<br>

## Server Components
React's new Server Components compliment Server-side rendering, enabling rendering into an intermediate abstraction format without needing to add to the JavaScript bundle.

Server Components are not a replacement for SSR. When paired together, they support quickly rendering in an intermediate format, then having Server-side rendering infrastructure rendering this into HTML enabling early paints to still be fast.

<br>

## Automatic Code-Splitting
It's been considered a best-practice to only serve code users need as they need it by using code-splitting. Prior to Server Components, one would manually use React.lazy() to define "split-points" or rely on a heuristic set by a meta-framework, such as routes/pages to create new chunks.

**Some of the challenges with code-splitting are:**
- Outside of a meta-framework (like Next.js), you often have to tackle this optimization manually, replacing import statements with dynamic imports.
- It might delay when the application begins loading the component impacting the user-experience.

**Server Components** introduce automatic code-splitting treating all normal imports in Client components as possible code-split points. They also allow developers to select which component to use much earlier (on the server), allowing the client to fetch it earlier in the rendering process.

<br>

## Will Server Components replace Next.js SSR?
No. They are quite different. Initial adoption of Server Components will actually be experimented with via meta-frameworks such as Next.js as research and experimentation continue.

To summarize a good explanation of the differences between Next.js SSR and Server Components from Dan Abramov:

- Code for Server Components is never delivered to the client.
- Server components enable access to the back-end from anywhere in the tree.
- Server Components may be refetched while maintaining Client-side state inside of the tree.