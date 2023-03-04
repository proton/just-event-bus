# Simple Event Bus for javascript that just works

```javascript
const fn = (text) => console.log(text);
EventBus.on("foo", fn);

EventBus.emit("foo", "Hello World!"); // => Hello World!
```
