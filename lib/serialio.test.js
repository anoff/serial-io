import test from 'ava'
import td from 'testdouble'

function mock (sp = { list: cb => cb() }) {
  td.replace('serialport', sp)
  td.replace('./connection')
  return require('./serialio')
}

test('.ports() should resolve to list of ports', async t => {
  const m = mock({ list: cb => cb(null, 'weeo') })
  t.is(await m.ports(), 'weeo')
})

test('.ports() should reject if erronous', t => {
  const m = mock({ list: cb => cb('erroror', 'weeo') }) // eslint-disable-line standard/no-callback-literal
  return t.throwsAsync(() => m.ports(), 'erroror')
})

test('.send() single command', t => {
  const m = mock()
  t.truthy(m.send)
})

test('.connect()', t => {
  const m = mock()
  m.connect()
  t.notThrows(m.connect)
})
