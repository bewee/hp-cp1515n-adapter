'use strict';

const Property = require('gateway-addon').Property;

class CartridgeProperty extends Property {
  constructor(device, ink) {
    super(device, `cartridge-${ink}`, {
      '@type': 'LevelProperty',
      label: `${ink} ink`,
      type: 'integer',
      unit: 'Pages',
      readOnly: true,
      value: 0,
      minimum: 0,
      maximum: 0,
    });
    this.ink = ink;
  }

  update(val, max) {
    this.maximum = max;
    this.setCachedValueAndNotify(val);
  }
}

module.exports = CartridgeProperty;
