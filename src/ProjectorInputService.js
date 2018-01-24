"use strict";

let Characteristic;

class ProjectorInputService {
  constructor(log, api, device, name) {

    this.log = log;

    this._device = device;
    this._sourceRegex = /SOURCE=([0-9A-Fa-f]+)/;

    Characteristic = api.hap.Characteristic;

    this._characteristics = [
      { source: 0x30, characteristic: Characteristic.InputHDMI1 },
      { source: 0xA0, characteristic: Characteristic.InputHDMI2 },
      { source: 0x10, characteristic: Characteristic.InputComponent },
      { source: 0x20, characteristic: Characteristic.InputPC },
      { source: 0x40, characteristic: Characteristic.InputVideo }
    ];

    this._service = new api.hap.Service.ProjectorInputService(name);

    for (let c of this._characteristics) {
      this._service
        .getCharacteristic(c.characteristic)
        .on('set', this._changeInput.bind(this, c));
    }
  }

  getService() {
    return this._service;
  }

  async update() {
    this.log('Refresh projector source status');

    const status = await this._device.execute(`SOURCE?`);
    const matches = this._sourceRegex.exec(status);
    if (matches !== null) {
      let source = Number.parseInt(matches[1], 16) & 0xF0;

      if (source !== this._lastKnownSource) {
        this._updateSource(this._lastKnownSource, false);
        this._updateSource(source, true);

        this._lastKnownSource = source;
      }
    }
    else {
      this.log(`Failed to refresh characteristic state: ${c.cmd}`);
    }
  }

  _updateSource(source, state) {
    const c = this._characteristics.find(c => c.source === source);
    if (c) {
      this._service
        .getCharacteristic(c.characteristic)
        .updateValue(state);
    }
  }

  async _changeInput(c, value, callback) {
    this.log(`Set projector SOURCE to ${c.source}`);
    try {
      value = ('00' + c.source.toString(16)).substr(-2);
      const cmd = `SOURCE ${value}`;

      this.log(`Sending ${cmd}`);
      const response = await this._device.execute(cmd);
      callback(undefined);

      this._updateSource(this._lastKnownSource, false);
      this._lastKnownSource = c.source;
    }
    catch (e) {
      this.log(`Failed to set characteristic ${e}`);
      callback(e);
    }
  }
};

module.exports = ProjectorInputService;
