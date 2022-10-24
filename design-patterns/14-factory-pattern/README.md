# Factory Pattern

**Rules** : With the factory pattern we can use factory functions in order to create new objects. A function is a factory function when it returns a new object without the use of the new keyword!

### Example

```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
});
```

```js
const user1 = createUser({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com"
});
console.log(user1);

// result
// {firstName: "John", lastName: "Doe", email: "john@doe.com", fullName: ƒ fullName()}
```

### **Adv** 
The `factory pattern` is useful when we have to create multiple smaller objects that share the same properties. A factory function can easily return a custom object depending on the current environment, or user-specific configuration.

### **(Dis)adv** 
In `JavaScript`, the `factory pattern` isn't much more than a function that returns an object without using the new keyword. ES6 arrow functions allow us to create small factory functions that implicitly return an object each time.

However, in many cases it may be more memory efficient to create new instances instead of new objects each time.