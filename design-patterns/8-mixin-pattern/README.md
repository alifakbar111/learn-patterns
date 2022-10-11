# Mixin Pattern

**Rule** : A mixin is an object that we can use in order to add reusable functionality to another object or class, without using inheritance. 

### Example
A dog should be able to do more than just have a `name`. It should be able to bark, wag its tail, and play! Instead of adding this directly to the Dog, we can create a mixin `dogFunctionality` that provides the `bark`, `wagTail` and `play` property for us.

We can create `animalFunctionality` that most mammals (besides dolphins.. and maybe some more) can `walk` and `sleep` as well.

then we can add these properties to the `dogFunctionality` prototype, using `Object.assign`. In this case, the target object is `dogFunctionality`.

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
}
const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!")
};

const animalFunctionality = {
  walk: () => console.log("Walking!"),
  sleep: () => console.log("Sleeping!")
};

Object.assign(Dog.prototype, dogFunctionality);
Object.assign(dogFunctionality, animalFunctionality);

// then try to make dog named Daisy
const pet1 = new Dog("Daisy");

pet1.name; // Daisy
pet1.bark(); // Woof!
pet1.play(); // Playing!
```
**Perfect!** Any new instance of `Dog` can now access the `walk` and `sleep` methods as well.
