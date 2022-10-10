# Prototype Pattern

**Rules** : The prototype pattern is a useful way to share properties among many objects of the same type.

The prototype pattern is a useful way to share properties among many objects of the same type.

### Example

```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");


console.log(Dog.prototype);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

console.log(dog1.__proto__);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()
```

in `index.js` files we have access to the bark method, as we extended the Dog class. The value of __proto__ on the prototype of SuperDog points to the Dog.prototype object!