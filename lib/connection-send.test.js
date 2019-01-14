import EventEmitter from 'events'
import test from 'ava'
import td from 'testdouble'

class SpStub extends EventEmitter {
  constructor (port, opts, cb) {
    super()
    cb(null, this)
  }

  close (cb) {
    cb()
  }

  write (content, cb) {
    cb()
  }
}

function mock (sp = SpStub) {
  td.replace('serialport', sp)
  return require('./connection')
}

test('.send() should reject if connection is not open', async t => {
  const M = mock()
  const m = await new M()
  await m.close()
  return t.throwsAsync(() => m.send(), 'instance not in state OPEN')
})

test('.send() should reject if not used with string', async t => {
  const M = mock()
  const m = await new M()
  await t.throwsAsync(() => m.send(), 'first argument must be a string')
  await t.throwsAsync(() => m.send(12), 'first argument must be a string')
  await t.throwsAsync(() => m.send({ text: 'this' }), 'first argument must be a string')
})

test('.send() should fulfill', async t => {
  const M = mock()
  const m = await new M()
  return t.notThrows(() => m.send('asdf'))
})
