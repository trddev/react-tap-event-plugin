var invariant = require('fbjs/lib/invariant');
var defaultClickRejectionStrategy = require('./defaultClickRejectionStrategy');

class Injector {
  constructor() {
    this.alreadyInjected = false;
  }

  injectTapEventPlugin (strategyOverrides) {
    console.log('USING FORKED INJECTOR');
    const self = this;
    strategyOverrides = strategyOverrides || {}
    var shouldRejectClick = strategyOverrides.shouldRejectClick || defaultClickRejectionStrategy;

    if (!self.alreadyInjected) {
      self.alreadyInjected = true;
      require('react-dom/lib/EventPluginHub').injection.injectEventPluginsByName({
        'TapEventPlugin': require('./TapEventPlugin.js')(shouldRejectClick)
      });
    }
  }
}
const injector = new Injector();

module.exports = {
  injectTapEventPlugin: injector.injectTapEventPlugin.bind(injector),
};
