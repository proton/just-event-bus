const EventBus = require('./EventBus')

test('it calls proper callbacks', () => {
  const f1 = jest.fn()
  const f2 = jest.fn()
  const f3 = jest.fn()

  EventBus.on('foo', f1)
  EventBus.on('foo', f2)
  EventBus.on('bar', f3)

  EventBus.emit('foo', 'something')

  expect(f1).toHaveBeenCalledWith('something')
  expect(f2).toHaveBeenCalledWith('something')
  expect(f3).not.toHaveBeenCalled()
})

test('it doesnt call off callbacks', () => {
  const f1 = jest.fn()
  const f2 = jest.fn()

  EventBus.on('foo', f1)
  EventBus.on('foo', f2)
  EventBus.off('foo', f1)

  EventBus.emit('foo')

  expect(f1).not.toHaveBeenCalled()
  expect(f2).toHaveBeenCalled()
})
