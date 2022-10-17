# Render Props Pattern

**Rules** : A render prop is a prop on a component, which value is a function that returns a JSX element. The component itself does not render anything besides the render prop.

### Example
```js
import React from "react";
import { render } from "react-dom";

const Title = (props) => props.render();

render(
  <div className="App">
    <Title render={() => <h1>✨ First render prop! ✨</h1>} />
    <Title render={() => <h2>🔥 Second render prop! 🔥</h2>} />
    <Title render={() => <h3>🚀 Third render prop! 🚀</h3>} />
  </div>,
  document.getElementById("root")
);
```
We can use it multiple times, passing different values to the render prop each time.

But we can split the Title as other Component, so you can use Title for rendering another props data. then the render prop can receive this value that we passed as its argument.

```js
function Component(props) {
  const data = { ... }

  return props.render(data)
}

<Component render={data => <ChildComponent data={data} />}

```

### **Adv** 
1. Sharing logic and data among several components is easy with the render props pattern. Components can be made very reusable, by using a render or children prop.

2. The issue of naming collisions that we can run into by using the HOC pattern no longer applies by using the render props pattern, since we don't automatically merge props.
### **(Dis)adv** 
The issues that we tried to solve with render props, have largely been replaced by React Hooks. As Hooks changed the way we can add reusability and data sharing to components, they can replace the render props pattern in many cases.