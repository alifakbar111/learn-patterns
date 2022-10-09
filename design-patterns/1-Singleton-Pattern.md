# Singleton Patterns

**Rule** : Singletons are classes which can be `instantiated once`, and can be accessed globally. A Singleton should only be able to get `instantiated once`.

example: 

```js
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

The `Object.freeze` method makes sure that consuming code cannot modify the Singleton. 

Properties on the frozen instance cannot be added or modified, which reduces the risk of accidentally overwriting the values on the Singleton.


### **Adv**
Restricting the instantiation to just one instance could potentially save a lot of memory space.

### **(Dis)adv**
However, Singletons are actually considered an anti-pattern, and can (or.. should) be avoided in JavaScript. The class implementation shown in the examples above is actually overkill.