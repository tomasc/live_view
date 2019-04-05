import { Controller } from "stimulus"

import _ from 'lodash'

export default class extends Controller {
  initialize() {
    this.onKeyUp = _.debounce(this.onKeyUp, 500)
  }

  onKeyUp() {
    let email = document.querySelector('#user_email').value;
    let age = document.querySelector('#user_age').value;

    App.component.send(
      { operation: { name: 'FORM', email: email, age: age } }
    );
  }
}
