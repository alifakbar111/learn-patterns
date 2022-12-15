# Static Import

### Import code that has been exported by another module

<br>
<br>

The import keyword allows us to import code that has been exported by another module.

A module that is imported by using the default ES2015 import syntax, `import module from 'module'`, is statically imported.

```js
import React from "react";

// Statically import Chatlist, ChatInput and UserInfo
import UserInfo from "./components/UserInfo";
import ChatList from "./components/ChatList";
import ChatInput from "./components/ChatInput";

import "./styles.css";

console.log("App loading", Date.now());

const App = () => (
  <div className="App">
    <UserInfo />
    <ChatList />
    <ChatInput />
  </div>
);

export default App;
```
The modules get executed as soon as the engine reaches the line on which we import them. When you open the console, you can see the order in which the modules have been loaded!.

Since the components were statically imported, Webpack bundled the modules into the initial bundle.

Our chat application's source code gets bundled into one bundle: main.bundle.js. A large bundle size can affect the loading time of our application significantly depending on the user's device and network connection.

Instead of importing all component statically, we can dynamically import the modules after the App component has rendered its contents and the user is able to interact with our application.