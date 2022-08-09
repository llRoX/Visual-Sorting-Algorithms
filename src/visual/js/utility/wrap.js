function wrap(originalFunction, { inject, wrapper } = {}) {

    const wrapperFn = function (...args) {
        if (typeof inject === 'function') {
            inject(originalFunction, this);
        }
        if (typeof wrapper === 'function') {
            return wrapper(originalFunction, this, args);
        }
        return originalFunction.apply(this, args);
    };

    // copy the original function's props onto the wrapper
    for (const prop in originalFunction) {
        if (originalFunction.hasOwnProperty(prop)) {
            wrapperFn[prop] = originalFunction[prop];
        }
    }
    return wrapperFn;
}


export default wrap;