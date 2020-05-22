'use strict';

const wrap = f => {
    let limit = 0;
    let counter = 0;

    const wrapper = (...args) => {
        if (limit && counter === limit) wrapper.cancel();
        if (f) {
            const res = f(...args);
            counter++;
            return res;
        }
    };

     wrapper.cancel = () => {
        f = null;
        return wrapper;
     };

     wrapper.timeout = msec => {
         setTimeout(() => {
             wrapper.cancel();
         }, msec);
         return wrapper;
     };

     wrapper.limit = count => {
         limit = count;
         return wrapper;
     };

     return wrapper;
};

// Usage

const fn = par => {
    console.log('Function called, par:', par);
};

const f = wrap(fn).timeout(200).limit(3);
f('1st');

setTimeout(() => {
    f('2nd');
    f.cancel();
    f('3rd');
//    f.cancel();
    f('4rd');
}, 150);