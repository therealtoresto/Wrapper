'use strict';

// wrapper will prevent calls > n

const limit = (count, fn) => {
    let counter = 0;
    return (...args) => {
        if (counter === count) return;
        counter++;
        return fn(...args);
    };
};

// Usage

const fn = par => {
    console.log('Function called, par:', par);
};

const fn2 = limit(2, fn);

fn2('first');
fn2('second');
fn2('third');