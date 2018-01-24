"use strict";

let Characteristic;

class ProjectorBulbService {
  constructor(log, api, device, name) {

    this.log = log;

    this._device = device;

    Characteristic = api.hap.Characteristic;

    this._service = new api.hap.Service.ProjectorBulbService(name);
    this._service
      .getCharacteristic(Characteristic.ProjectorBulbEcoMode)
      .on('set', this._setEcoMode.bind(this));

    this._powerRegex = /PWR=([0-9]+)/;
    this._hoursRegex = /LAMP=([0-9]+)/;
    this._luminanceRegex = /LUMINANCE=([0-9]+)/;
  }

  getService() {
    return this._service;
  }

  async update(powerStatus) {
    this._updatePowerState(powerStatus);
    await this._refreshLampHours();

    if (powerStatus === '01') {
      await this._refreshEcoMode();
    }
  }

  _updatePowerState(state) {
    const isOn = ['01'].indexOf(state) !== -1;

    this._service
      .getCharacteristic(Characteristic.ProjectorBulb)
      .updateValue(isOn);
  }

  async _refreshEcoMode() {
    const ecoMode = await this._device.execute('LUMINANCE?');
    const matches = this._luminanceRegex.exec(ecoMode);
    if (matches !== null) {
      this._updateEcoMode(matches[1]);
    }
    else {
      this.log(`Failed to update eco mode: ${ecoMode}`);
    }
  }

  _updateEcoMode(mode) {
    const isOn = ['01'].indexOf(mode) !== -1;

    this._service
      .getCharacteristic(Characteristic.ProjectorBulbEcoMode)
      .updateValue(isOn);
  }

  async _refreshLampHours() {
    const lampHours = await this._device.execute('LAMP?');
    const matches = this._hoursRegex.exec(lampHours);
    if (matches !== null) {
      this._updateLampHours(matches[1]);
    }
    else {
      this.log(`Failed to update lamp hours: ${lampHours}`);
    }
  }

  _updateLampHours(hours) {
    this._service
      .getCharacteristic(Characteristic.ProjectorBulbHours)
      .updateValue(hours);
  }

  async _setEcoMode(mode, callback) {
    this.log(`Set projector eco mode to ${mode}`);
    try {
      let cmd = 'LUMINANCE 00';
      if (mode) {
        cmd = 'LUMINANCE 01';
      }

      await this._device.execute(cmd);
      callback(undefined);
    }
    catch (e) {
      this.log(`Failed to set eco mode ${e}`);
      callback(e);
    }
  }
};

module.exports = ProjectorBulbService;
