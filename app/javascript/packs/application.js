import ActionCable from 'actioncable';
import StimulusReflex from "lib/stimulus_reflex"

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('body[data-cable]')) {
    StimulusReflex.connect()

    const application = Application.start()
    const context = require.context("../controllers", true, /_controller\.js$/)
    application.load(definitionsFromContext(context));
  }
});
