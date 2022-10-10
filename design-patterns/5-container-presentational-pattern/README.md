# Container/Presentational Pattern

**Rule** : In React, one way to enforce separation of concerns is by using the Container/Presentational pattern. With this pattern, we can separate the view from the application logic.

Ideally, we want to enforce separation of concerns by separating this process into two parts:
  
  1. `Presentational Components`: Components that care abouthow data is shown to the user. In this example, that's the rendering the list of dog images.
  2. `Container Components`: Components that care about what data is shown to the user. In this example, that's fetching the dog images.

## Example
<br>

### **Presentational Component**
A presentational component receives its data through props. Its primary function is to simply display the data it receives the way we want them to, including styles, without modifying that data.

`Presentational components are usually stateless: they do not contain their own React state, unless they need a state for UI purposes`

```js
export default function DogImages({ dogs }) {
  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```
<br>

### **Container Component**
The primary function of container components is to pass data to presentational components, which they contain.

```js
export default class DogImagesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      dogs: []
    };
  }

  render() {
    return <DogImages dogs={this.state.dogs} />;
  }
}
```

Combining these two components together makes it possible to separate handling application logic with the view.


### **Adv** 
The Container/Presentational pattern encourages the *`separation of concerns`*. Presentational components can be pure functions which are responsible for the UI, whereas container components are responsible for the state and data of the application. 

### **(Dis)adv** 
However, `Hooks` make it possible to achieve the same result without having to use the Container/Presentational pattern, and without having to rewrite a stateless functional component into a class component. Note that today, we don't need to create class components to use state anymore.