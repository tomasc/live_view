import { Controller } from "stimulus"

import _ from 'lodash'

export default class extends Controller {
  initialize() {
    this.dirtyFields = [];
    this.onKeyUp = _.debounce(this.onKeyUp, 100)

    document.addEventListener('cable-ready:after-morph', (e) => {
      for (let id of this.dirtyFields) {
        let el = document.querySelector("#"+id);
        el.parentNode.classList.add('dirty');
      }
    })
  }

  onKeyUp(e) {
    if (this.dirtyFields.includes(e.target.id) == false) {
      this.dirtyFields.push(e.target.id);
    }

    let email = document.querySelector('#user_email').value;
    let age = document.querySelector('#user_age').value;

    App.component.send(
      { operation: { name: 'FORM', email: email, age: age } }
    );
  }
}
