import ActionCable from 'actioncable';
import CableReady from 'lib/cable_ready'

import 'controllers';

window.App || (window.App = {});

App.cable || (App.cable = ActionCable.createConsumer());

App.component = App.cable.subscriptions.create({ channel: "ComponentChannel", room: window.userId }, {
  received: function (data) {
    if (data.cableReady) {
      CableReady.perform(data.operations);
    }
  }
});
