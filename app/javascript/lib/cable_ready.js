import morphdom from 'morphdom';

const dispatch = (name, detail = {}) => {
  DOMOperations.dispatchEvent({ name, detail });
};

const DOMOperations = {
  // DOM Events ..............................................................................................

  dispatchEvent: config => {
    let target = document;
    if (config.selector)
      target = document.querySelector(config.selector) || document;
    const event = new Event(config.name);
    event.detail = config.detail;
    target.dispatchEvent(event);
  },

  // Element Mutations .......................................................................................

  morph: config => {
    let template = String(config.html).trim();

    dispatch('cable-ready:before-morph', { config, content: template });

    morphdom(document.querySelector(config.selector), template, {
      childrenOnly: !!config.childrenOnly
    });

    dispatch('cable-ready:after-morph', { config, content: template });
  },
};

export default class {
  static perform(operations) {
    for (let name in operations) {
      if (operations.hasOwnProperty(name)) {
        const entries = operations[name];
        for (let i = 0; i < entries.length; i++) {
          try {
            const config = entries[i];
            DOMOperations[name](config);
          } catch (e) {
            console.log(`CableReady detected an error in ${name}! ${e.message}`);
          }
        }
      }
    }
  };
}
