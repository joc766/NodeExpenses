const { Type } = require("protobufjs");


function decoratorUtility(decoratorFn) {
    return function (target, key, descriptor) {
      return decoratorFn(descriptor.value);
    };
}

function withErrorHandling(fn) {
    return async function() {
        try {
          return await fn.apply(this, arguments);
        } catch (error) {
            let res = arguments[1]
            res.status(500).send('Internal Server Error');
            console.error('Error:', error);
        }
    };
}

const errordecorator = decoratorUtility(withErrorHandling);


module.exports = {
    withErrorHandling,
    errordecorator,
}
