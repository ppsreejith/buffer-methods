const _ = require('lodash');

module.exports = (model) => {
  let _methodBuffer = [];
  const _model = _.reduce(
    _.keys(model),
    (acc, key) => {
      if (_.isFunction(model[key])) {
        acc[key] = (...args) => {
          _methodBuffer.push({ key, args });
        };
      } else {
        acc[key] = model[key];
      }
      return acc;
    },
    {}
  );
  return {
    model: _model,
    resolve: function () {
      _.extendWith(_model, model);
      _.forEach(_methodBuffer, ({ key, args }) => model[key].apply({}, args));
      _methodBuffer = [];
    }
  }
};