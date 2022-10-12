# HOC Pattern
### High Order Component Pattern
<br>

**Rules** : A `Higher Order Component (HOC)` is a component that receives another component. The HOC contains certain logic that we want to apply to the component that we pass as a parameter. After applying that logic, the HOC returns the element with the additional logic.


### **Example**

```js
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```

In the example above, we create `StyledButton` and `StyledText` component, which are the modified versions of the `Button` and `Text` component.

The Higher Order Component pattern allows us to provide the same logic to multiple components.

At the example folder in *(design-patterns/10-HOC-pattern/example/src/DogImages.js)* we create a HOC named `withLoader`,  `withLoader` will show a `"Loading..."` screen to user until the data is fetched. To make the `withLoader` HOC very reusable, we won't hardcode the Dog API url in that component.

<br>

Generally speaking, React Hooks don't replace the HOC pattern.

*"In most cases, Hooks will be sufficient and can help reduce nesting in your tree."* - [React Docs](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)

As the React docs tell us, using Hooks can reduce the depth of the component tree. Using the HOC pattern, it's easy to end up with a deeply nested component tree.

```js
<withAuth>
  <withLayout>
    <withLogging>
      <Component />
    </withLogging>
  </withLayout>
</withAuth>
```

### **Adv**
Using the Higher Order Component pattern allows us to keep logic that we want to re-use all in one place.

### **(Dis)adv**
The name of the prop that a HOC can pass to an element, can cause a naming collision.

```js
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button style={{ color: 'red' }}>Click me!</button>
const StyledButton = withStyles(Button)
```
In this case above, the `withStyles` HOC adds a prop called `style` to the element that we pass to it. However, the `Button` component already had a prop called `style`, which will be *`overwritten!`* Make sure that the HOC can handle accidental name collision, by either renaming the prop or merging the props like example below.

```js
function withStyles(Component) {
  return props => {
    const style = {
      padding: '0.2rem',
      margin: '1rem',
      ...props.style
    }

    return <Component style={style} {...props} />
  }
}

const Button = () = <button style={{ color: 'red' }}>Click me!</button>
const StyledButton = withStyles(Button)
```

When we using too many HOCs that all pass props to element that wrapped within them, it can be difficult to figure out which HOC is resposible for which prop. 