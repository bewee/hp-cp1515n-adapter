'use strict';

const Device = require('gateway-addon').Device;
const CartridgeProperty = require('./cartridge-property');
const HPCP1515nLib = require('./hp-cp1515n-lib');

class PrinterDevice extends Device {
  constructor(adapter, ip, name) {
    super(adapter, `hp-cp1515n-${ip}`);

    this.name = name ? name : 'Printer';
    this.description = 'HP CP1515n printer';
    this.ip = ip;
    this.lib = new HPCP1515nLib(this.ip);

    this.properties.set('cartridge-black', new CartridgeProperty(this, 'black'));
    this.properties.set('cartridge-cyan', new CartridgeProperty(this, 'cyan'));
    this.properties.set('cartridge-magenta', new CartridgeProperty(this, 'magenta'));
    this.properties.set('cartridge-yellow', new CartridgeProperty(this, 'yellow'));

    this.links.push({
      rel: 'alternate',
      mediaType: 'text/html',
      href: `http://${this.ip}`,
    });
  }

  run() {
    if ('dead' in this) return;
    this.connectedNotify(true);
    console.log(this.id, 'Updating!');
    this.lib.get('info_deviceStatus.html?tab=Status&menu=DevStatus').then(((page) => {
      const pageslist = this.lib.getCartridgesPages(page);
      const percentlist = this.lib.getCartridgesPercent(page);
      const maxpageslist = percentlist.map((x, i) => Math.ceil(pageslist[i]/(x/100.0)));
      this.properties.get('cartridge-black').update(pageslist[0], maxpageslist[0]);
      this.properties.get('cartridge-cyan').update(pageslist[1], maxpageslist[1]);
      this.properties.get('cartridge-magenta').update(pageslist[2], maxpageslist[2]);
      this.properties.get('cartridge-yellow').update(pageslist[3], maxpageslist[3]);
      this.adapter.handleDeviceUpdated(this);
    }).bind(this));
    setTimeout(this.run.bind(this), this.adapter.config.pollInterval*1000);
  }

  stop() {
    console.log(this.id, 'Stop!');
    this.dead = true;
  }
}

module.exports = PrinterDevice;
