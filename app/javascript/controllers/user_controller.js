import { Controller } from "stimulus"

import _ from 'lodash'
import formToObject from 'form_to_object'

export default class extends Controller {
  initialize() {
    this.dirtyFields = [];
    this.onKeyUp = _.debounce(this.onKeyUp, 250)

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

    App.component.send(
      { operation: { name: 'FORM', params: formToObject(this.element.querySelector('form')) } }
    );
  }
}
