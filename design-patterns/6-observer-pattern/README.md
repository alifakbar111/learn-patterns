# Observer Pattern

**Rules** : With the observer pattern, we can subscribe certain objects, the observers, to another object, called the observable. Whenever an event occurs, the observable notifies all its observers!

An observable object usually contains 3 important parts:
- `observers`: an array of observers that will get notified whenever a specific event occurs
- `subscribe()`: a method in order to add observers to the observers list
- `unsubscribe()`: a method in order to remove observers from the observers list
- `notify()`: a method to notify all observers whenever a specific event occurs

### Example : 

```js
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter(observer => observer !== func);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}
```
<br>

### **Adv** 
Using the observer pattern is a great way to enforce separation of concerns and the `single-responsiblity principle`. The observer objects aren’t tightly coupled to the observable object, and can be (de)coupled at any time.

### **(Dis)adv** 
If an observer becomes too complex, it may cause `performance issues` when notifying all subscribers.