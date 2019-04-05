import { Controller } from "stimulus"

import _ from 'lodash';

export default class extends Controller {
  static targets = [ "ids", "search" ]

  connect() {
    this.onKeyUp = _.debounce(this.onKeyUp, 250);
  }

  onKeyUp(e) {
    App.resource_select.send(
      { operation: { name: 'SEARCH', str: this.searchTarget.value, ids: this.idsTarget.value.split(',') } }
    );
  }

  select(e) {
    e.preventDefault();

    let id = e.target.getAttribute('data-id');
    let ids = this.idsTarget.value.split(',');

    ids.push(id);

    App.resource_select.send(
      { operation: { name: 'SELECT', str: this.searchTarget.value, ids: ids } }
    );
  }

  remove(e) {
    e.preventDefault();

    let id = e.target.getAttribute('data-id');
    let ids = this.idsTarget.value.split(',');

    ids = _.pull(ids, id);

    App.resource_select.send(
      { operation: { name: 'REMOVE', str: this.searchTarget.value, ids: ids } }
    );
  }
}
