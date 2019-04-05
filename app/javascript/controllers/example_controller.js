import { Controller } from "stimulus"

export default class extends Controller {
  greet() {
    App.component.send(
      { operation: { name: 'GREET' } }
    );
  }
}
