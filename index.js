/**
 * index.js - Loads the hp-cp1515n adapter.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const HPCP1515nAdapter = require('./lib/adapter');

module.exports = (addonManager) => {
  new HPCP1515nAdapter(addonManager);
};
