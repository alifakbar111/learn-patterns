# Selective Hydration

In previous articles, we covered how SSR with hydration can improve user experience. However, this approach can lead to some performance issues due to some limitations with the current implementation. Before the server-rendered HTML tree is able to get sent to the client, all components need to be ready. Besides a slower tree generation, another issue is the fact that React only hydrates the tree once. 

React 18 solves these problems by allowing us to combine streaming server-side rendering with a new approach to hydration: Selective Hydration!.

Instead of using the `renderToString` method that we covered earlier, we can now stream render HTML using the new `pipeToNodeStream` method on the server. 

This method, in combination with the `createRoot` method and `Suspense`, makes it possible to start streaming HTML without having to wait for the larger components to be ready. 

```js
import { pipeToNodeStream} from "react-dom/server";

export function render(res) {
  const data = createServerData();
  const { startWriting, abort } = pipeToNodeWritable(
    <DataProvider data={data}>
      <App assets={assets} />
    </DataProvider>,
    res,
    {
      onReadyToStream() {
        res.setHeader('Content-type', 'text/html');
        res.write('<!DOCTYPE html>');
        startWriting();
      }
    }
  );
};
```
This is a simplified example inspired by this [codesandbox](https://codesandbox.io/s/festive-star-9hfqt?file=/src/index.js:193-320)

The `Comments` component, which earlier slowed down the tree generation and TTI, is now wrapped in `Suspense`. This tells React to not let this component slow down the rest of the tree generation.

In the meantime, we're still fetching the external data that we need for the `Comments` component.

**Selective hydration** makes it possible to already hydrate the components that were sent to the client, even before the `Comments` component has been sent!.

Once the data for the Comments component is ready, React starts streaming the HTML for this component, as well as a small <script> to replace the fallback loader.

React starts the hydration after the new HTML has been injected.

Components can be hydrated as soon as they're streamed to the client, since we no longer have to wait for all JavaScript to load to start hydrating and can start interacting with the app before all components have been hydrated.