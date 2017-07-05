var invariant = require('fbjs/lib/invariant');
var defaultClickRejectionStrategy = require('./defaultClickRejectionStrategy');

var alreadyInjected = false;

module.exports = function injectTapEventPlugin (strategyOverrides) {
  strategyOverrides = strategyOverrides || {}
  var shouldRejectClick = strategyOverrides.shouldRejectClick || defaultClickRejectionStrategy;

  if (!alreadyInjected) {
    alreadyInjected = true;

    require('react-dom/lib/EventPluginHub').injection.injectEventPluginsByName({
      'TapEventPlugin':       require('./TapEventPlugin.js')(shouldRejectClick)
    });
  }
};
