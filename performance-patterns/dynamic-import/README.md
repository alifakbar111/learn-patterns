# Dynamic Import

Import parts of your code on demand

<br>
<br>

In our chat application, we have four key components: `UserInfo`, `ChatList`, `ChatInput` and `EmojiPicker`. But `EmojiPicker` isn't direcly visible, and may not even be rendered at all if the user won't even click on the `Emoji` in order to toggle the `Emojipicker`.

To solve this, we can _dynamically_ import the `EmojiPicker` component. An easy way to dynamically import components in React is by using **`React Suspense`**.

```js
import React, { Suspense, lazy } from "react";
// import Send from "./icons/Send";
// import Emoji from "./icons/Emoji";
const Send = lazy(() =>
  import(/*webpackChunkName: "send-icon" */ "./icons/Send")
);
const Emoji = lazy(() =>
  import(/*webpackChunkName: "emoji-icon" */ "./icons/Emoji")
);
// Lazy load EmojiPicker  when <EmojiPicker /> renders
const Picker = lazy(() =>
  import(/*webpackChunkName: "emoji-picker" */ "./EmojiPicker")
);

const ChatInput = () => {
  const [pickerOpen, togglePicker] = React.useReducer((state) => !state, false);

  return (
    <Suspense fallback={<p id="loading">Loading...</p>}>
      <div className="chat-input-container">
        <input type="text" placeholder="Type a message..." />
        <Emoji onClick={togglePicker} />
        {pickerOpen && <Picker />}
        <Send />
      </div>
    </Suspense>
  );
};

console.log("ChatInput loaded", Date.now());

export default ChatInput;
```

The `React.Suspense` component receives the component that should be dynamically loaded, which makes it possible for the `App` component can render its contents faster by suspending the import of the `EmojiPicker` module.

Instead of unnecessarily adding `EmojiPicker` to the **initial bundle**, we can split it up into its own **bundle** and reduce the size of the **initial bundle**!

A `smaller` initial bundle size means a faster initial load: the user doesn't have to stare at a blank loading screen for as long.

By **dynamically importing** the `EmojiPicker` component, we managed to reduce the initial bundle size from 1.5MiB to 1.33 MiB! Although the user may still have to wait a while until the EmojiPicker has been fully loaded.

<br>

## Loadable Components

Server-side rendering doesn't support `React Suspense` (yet). A good alternative to React Suspense is the _loadable-components_ library, which can be used in SSR applications.

```js
import React from "react";
import loadable from "@loadable/component";

import Send from "./icons/Send";
import Emoji from "./icons/Emoji";

const EmojiPicker = loadable(() => import("./EmojiPicker"), {
  fallback: <div id="loading">Loading...</div>,
});

const ChatInput = () => {
  const [pickerOpen, togglePicker] = React.useReducer((state) => !state, false);

  return (
    <div className="chat-input-container">
      <input type="text" placeholder="Type a message..." />
      <Emoji onClick={togglePicker} />
      {pickerOpen && <EmojiPicker />}
      <Send />
    </div>
  );
};

export default ChatInput;
```

Similar to `React Suspense`, we can pass the lazily imported module to the `loadable`, which will only import the module once the EmojiPicker module is being requested! While the module is being loaded, we can render a `fallback` component.

Although loadable components are a great alternative to React Suspense for SSR applications, they're also useful in CSR applications in order to suspend the import of modules.