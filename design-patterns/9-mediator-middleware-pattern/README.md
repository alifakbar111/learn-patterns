# Mediator/Middleware Pattern

**Rules** : The `mediator pattern` makes it possible for components to interact with each other through a `central point`: the mediator. Instead of directly talking to each other, the mediator receives the requests, and sends them forward! In JavaScript, the mediator is often nothing more than an object literal or a function.

### Example

```js
class ChatRoom {
  logMessage(user, message) {
    const sender = user.getName();
    console.log(`${new Date().toLocaleString()} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}

const chatroom = new ChatRoom();

const user1 = new User("John Doe", chatroom);
const user2 = new User("Jane Doe", chatroom);

user1.send("Hi there!");
user2.send("Hey!");

```
In example above, `send` was a mediator between two user.

Instead of letting every objects talk `directly` to the other objects, resulting in a many-to-many relationship, the object's requests get handled by the mediator. 

`The middleware pattern` makes it easy for us to simplify **many-to-many** relationships between objects, by letting all communication flow through one central point.