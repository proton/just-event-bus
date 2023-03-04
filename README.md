# Simple Event Bus for javascript that just works

```javascript
const fn = (_) => console.log("Hello World!");
EventBus.on("foo", fn);

EventBus.emit("foo"); // => Hello World!
```
