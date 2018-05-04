
const co = (fn, callback) => {
    const g = fn();

    function next(v) {
        let value;
        let done;
        try {
            ({ value, done } = g.next(v));
        } catch (e) {
            return callback(e);
        }
        if (done) {
            return callback(null, value);
        }
        if (typeof value === 'function') {
            value((err, res) => {
                next(res);
            });
        } else if (typeof value === 'object' && typeof value.then === 'function') {
            value.then(res => {
                next(res);
            });
        } else {
            next(value);
        }
    }

    next();
}

if (typeof module === 'object' && module.exports) {
    module.exports = co;
} else if (typeof define === 'function') {
    define(function () {
        return co;
    });
} else {
    window.co = co;
}
