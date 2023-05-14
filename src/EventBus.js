const arrayrize = array => (Array.isArray(array) ? array : [array])

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

  on(eventNames, listeners) {
    eventNames = arrayrize(eventNames)
    listeners = arrayrize(listeners)

    for (const eventName of eventNames) {
      this._onEvent(eventName, listeners)
    }
  }

  off(eventNames, listeners) {
    eventNames = arrayrize(eventNames)
    listeners = arrayrize(listeners)

    for (const eventName of eventNames) {
      this._offEvent(eventName, listeners)
    }
  }

  _onEvent(eventName, listeners) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = new Set()
    }

    for (const listener of listeners) {
      this.listeners[eventName].add(listener)
    }
  }

  _offEvent(eventName, listeners) {
    const eventListeners = this.listeners[eventName]
    if (!eventListeners) {
      return
    }

    for (const listener of listeners) {
      eventListeners.delete(listener)
    }

    if (eventListeners.size === 0) {
      delete this.listeners[eventName]
    }
  }
}

module.exports = EventBus
