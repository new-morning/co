# co-sy

A generator function runner.

## Install

### In Node.js

```bash
~$ npm i co-sy --save
```

### In Web Browser

```html
<script src="js/co-sy.js" ></script>
```

## Example

```js
const co = require('co-sy'); // In Node.js


const sleep1 = (time = 1) => {
    return function (fn) {
        setTimeout(() => fn(null, time), time * 1000);
    };
}

const sleep2 = (time = 1) => new Promise(resolve => {
    setTimeout(() => resolve(time), time * 1000);
});

co(function* () {
    const a = yield 1;
    console.log('a = ', a); // 1
    const b = yield sleep1(2);
    console.log('b = ', b); // 2
    const c = yield sleep2(3);
    console.log('c = ', c); // 3

    return 4;
}, (err, res) => {
    if(err) return console.error(err);
    console.log(res);
});
```

## Licence

This project is under MIT licence.