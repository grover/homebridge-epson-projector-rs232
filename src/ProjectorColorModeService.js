"use strict";

let Characteristic;

class ProjectorColorModeService {
  constructor(log, api, device, name) {

    this.log = log;

    this._device = device;
    this._cmodeRegex = /CMODE=([0-9A-Fa-f]+)/;

    Characteristic = api.hap.Characteristic;

    this._characteristics = [
      { mode: 0x06, characteristic: Characteristic.ColorModeDynamic },
      { mode: 0x07, characteristic: Characteristic.ColorModeNatural },
      { mode: 0x0C, characteristic: Characteristic.ColorModeLiving },
      { mode: 0x13, characteristic: Characteristic.ColorModeTHX },
      { mode: 0x15, characteristic: Characteristic.ColorModeCinema },
      { mode: 0x17, characteristic: Characteristic.ColorMode3DCinema },
      { mode: 0x18, characteristic: Characteristic.ColorMode3DDynamic },
      { mode: 0x19, characteristic: Characteristic.ColorMode3DTHX },
      { mode: 0x20, characteristic: Characteristic.ColorModeBlackWhiteCinema },
    ];

    this._service = new api.hap.Service.ProjectorColorModeService(name);

    for (let c of this._characteristics) {
      this._service
        .getCharacteristic(c.characteristic)
        .on('set', this._setColorMode.bind(this, c));
    }
  }

  getService() {
    return this._service;
  }

  async update() {
    const status = await this._device.execute(`CMODE?`);
    const matches = this._cmodeRegex.exec(status);
    if (matches !== null) {
      let value = Number.parseInt(matches[1], 16);

      if (value !== this._lastKnownMode) {
        this._updateMode(this._lastKnownMode, false);
        this._updateMode(value, true);

        this._lastKnownMode = value;
      }
    }
    else {
      this.log(`Failed to refresh characteristic state: ${c.cmd}`);
    }
  }

  _updateMode(mode, state) {
    const c = this._characteristics.find(c => c.mode === mode);
    if (c) {
      this._service
        .getCharacteristic(c.characteristic)
        .updateValue(state);
    }
  }


  async _setColorMode(c, value, callback) {
    this.log(`Set projector CMODE to ${c.mode}`);
    try {
      value = ('00' + c.mode.toString(16)).substr(-2);
      const cmd = `CMODE ${value}`;

      this.log(`Sending ${cmd}`);
      const response = await this._device.execute(cmd);
      callback(undefined);

      this._updateMode(this._lastKnownMode, false);
      this._lastKnownMode = c.mode;
    }
    catch (e) {
      this.log(`Failed to set characteristic ${e}`);
      callback(e);
    }
  }
};

module.exports = ProjectorColorModeService;
