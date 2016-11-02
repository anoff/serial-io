import test from 'ava';
import td from 'testdouble';

class SpStub {
	constructor(port, opts, cb) {
		cb();
	}

	close(cb) {
		cb();
	}
}

function mock(sp = SpStub) {
	td.replace('serialport', sp);
	return require('./connection');
}

test('.constructor() should resolve', t => {
	const M = mock();
	t.notThrows(new M());
});

test('.state should be OPEN after .constructor() call', async t => {
	const M = mock();
	t.is((await new M()).state, M.states().OPEN);
});

test('.constructor() should reject on error', async t => {
	class SpStub {
		constructor(port, opts, cb) {
			cb('erroror');
		}
	}
	const M = mock(SpStub);
	return t.throws(new M(), 'erroror');
});

test('.close() should resolve', async t => {
	const M = mock();
	const m = await new M();
	return t.notThrows(m.close());
});

test('.close() should reject on error', async t => {
	class SpStub {
		constructor(port, opts, cb) {
			cb();
		}
		close(cb) {
			cb('errors');
		}
	}
	const M = mock(SpStub);
	const m = await new M();
	return Promise.all([
		t.throws(m.close(), 'errors'),
		t.is(m.getState(), M.states().ERROR)
	]);
});

test('.getState() should always show correct state', async t => {
	const M = mock();
	const m = await new M();
	t.is(m.getState(), M.states().OPEN);
	t.is((await m.close()).getState(), M.states().CLOSED);
});

test('.send() should reject if connection is not open', async t => {
	const M = mock();
	const m = await new M();
	await m.close();
	t.throws(m.send(), 'instance not in state OPEN');
});
