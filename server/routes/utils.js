

function decoratorUtility(decoratorFn) {
    return function (target, key, descriptor) {
      return decoratorFn(descriptor.value);
    };
}

function withErrorHandling(fn, routeOrigin="No origin") {
    return async function() {
        try {
          return await fn.apply(this, arguments);
        } catch (error) {
            let res = arguments[1]
            console.error(`${routeOrigin}: `, error);
            return res.status(500).send('Internal Server Error');
        }
    };
}

const errordecorator = decoratorUtility(withErrorHandling);


module.exports = {
    withErrorHandling,
    errordecorator,
}
