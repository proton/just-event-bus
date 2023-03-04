class EventBus {
  static emit(eventName, data) {
    this.getInstance().emit(eventName, data)
  }

  static on(eventName, data) {
    this.getInstance().on(eventName, data)
  }

  static off(eventName, data) {
    this.getInstance().off(eventName, data)
  }

  static getInstance() {
    return EventBus.instance || new EventBus()
  }

  constructor() {
    if (EventBus.instance) {
      return EventBus.instance
    }
    EventBus.instance = this
    this.listeners = {}
  }

  emit(eventName, data) {
    const listeners = this.listeners[eventName]
    if (!listeners) return

    for (const listener of listeners) {
      if (typeof listener === 'function') {
        listener(data)
      }
    }
  }

  on(eventName, listener) {
    this.listeners[eventName] = this.listeners[eventName] || new Set()
    const listeners = this.listeners[eventName]
    listeners.add(listener)
  }

  off(eventName, listener) {
    const listeners = this.listeners[eventName]
    if (listeners) {
      listeners.delete(listener)
      if (listeners.size === 0) {
        delete this.listeners[eventName]
      }
    }
  }
}

module.exports = EventBus
