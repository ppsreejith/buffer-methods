const _ = require('lodash');

module.exports = (model) => {
  const _methodBuffer = [];
  return {
    model: _.reduce(
      _.keys(model),
      (acc, key) => {
        if (model[key] && model[key].constructor === Function) {
          acc[key] = (...args) => {
            _methodBuffer.push({ key, args });
          };
        }
        return acc;
      },
      {}
    ),
    resolve: function () {
      _.extend(this.model, model);
      _.forEach(_methodBuffer, ({ key, args }) => model[key].apply({}, args));
    }
  }
};