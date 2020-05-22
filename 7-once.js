'use strict';

// Wraper will prevent calls > n

const once = f => (...args) => {
    if (!f) return;
    const res = f(...args);
    f = null;
    return res;
};

// Usage

const fn = par => {
    console.log('Function called, par:', par);
};

const f = once(fn);

f('first');
f('second');