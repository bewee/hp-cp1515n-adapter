'use strict';

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

class HP1515nLib {
  constructor(ip) {
    this.ip = ip;
  }

  get(path) {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', `http://${this.ip}/${path}`);
      xhttp.onload = () => {
        if (xhttp.status >= 200 && xhttp.status < 300) {
          resolve(xhttp.responseText);
          return;
        }
        reject();
      };
      xhttp.onerror = reject;
      xhttp.send();
    });
  }

  getCartridgesPages(page) {
    let r = new RegExp(/<td class="tableDataCellStand width30">(\n|\s|\r)*[0-9]+/gm);
    const matches = page.match(r);
    r = new RegExp(/<td class="tableDataCellStand width30">(\n|\s|\r)*/gm);
    const list = [];
    for (const m of matches) {
      const firstpart = m.match(r)[0];
      list.push(parseInt(m.substring(firstpart.length)));
    }
    return list;
  }

  getCartridgesPercent(page) {
    let r = new RegExp(/<td>(\n|\s|\r)*&nbsp;&nbsp;[0-9]+/gm);
    const matches = page.match(r);
    r = new RegExp(/<td>(\n|\s|\r)*&nbsp;&nbsp;/gm);
    const list = [];
    for (const m of matches) {
      const firstpart = m.match(r)[0];
      list.push(parseInt(m.substring(firstpart.length)));
    }
    return list;
  }

}

module.exports = HP1515nLib;
