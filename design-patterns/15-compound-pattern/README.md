# Compound Pattern

**Rules** : The compound component pattern allows you to create components that all work together to perform a task.


### **Example**

```js
const FlyOutContext = createContext();

function FlyOut(props) {
  const [open, toggle] = useState(false);

  return (
    <FlyOutContext.Provider value={{ open, toggle }}>
      {props.children}
    </FlyOutContext.Provider>
  );
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    <div onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

function List({ children }) {
  const { open } = useContext(FlyOutContext);
  return open && <ul>{children}</ul>;
}

function Item({ children }) {
  return <li>{children}</li>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;
```

or using `React.Children.map`

```js
const FlyOutContext = React.createContext();

function FlyOut(props) {
  const [open, toggle] = React.useState(false);

  return (
    <div>
      {React.Children.map(props.children, child =>
        React.cloneElement(child, { open, toggle })
      )}
    </div>
  );
}

function Toggle() {
  const { open, toggle } = React.useContext(FlyOutContext);

  return (
    <div className="flyout-btn" onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

function List({ children }) {
  const { open } = React.useContext(FlyOutContext);
  return open && <ul className="flyout-list">{children}</ul>;
}

function Item({ children }) {
  return <li className="flyout-item">{children}</li>;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;
```

We can now use them as properties on the `FlyOut component`! In this case, we want to show two options to the user: `Edit` and `Delete`. Let's create a FlyOut.List that renders two FlyOut.Item components, one for the Edit option, and one for the Delete option.

```js
import { FlyOut } from "./FlyOut";

function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
```

The two examples above are similar, the difference is in `FlyOut` function. Tt the first example using `React context API` and the second example using `React Children map`.

### **Adv**
`Compound components` manage their own internal state, which they share among the several child components. When implementing a compound component, we don't have to worry about managing the state ourselves.

### **(Dis)adv**
Cloning an element with `React.cloneElement` performs a `shallow merge`. Already existing props will be merged together with the new props that we pass. This could end up in a *naming collision*, if an already existing prop has the same name as the props we're passing to the `React.cloneElement` method. 