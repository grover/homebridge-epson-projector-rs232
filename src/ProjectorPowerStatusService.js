"use strict";

let Characteristic;

class ProjectorPowerStatusService {
  constructor(log, api, device, name, expectedStatus) {

    this.log = log;

    this._device = device;
    this._expectedStatus = expectedStatus;
    this._isInExpectedState = false;

    Characteristic = api.hap.Characteristic;

    this._service = new api.hap.Service.ProjectorPowerStatusService(name);
  }

  getService() {
    return this._service;
  }

  async update(powerStatus) {
    const isAbnormalStandby = powerStatus === '05';
    const isCoolingDown = powerStatus === '03';
    const isWarmingUp = powerStatus === '02';

    this._service
      .getCharacteristic(Characteristic.ProjectorAbnormalStandby)
      .updateValue(isAbnormalStandby);
    this._service
      .getCharacteristic(Characteristic.ProjectorCoolingDown)
      .updateValue(isCoolingDown);
    this._service
      .getCharacteristic(Characteristic.ProjectorWarmingUp)
      .updateValue(isWarmingUp);
  }
};

module.exports = ProjectorPowerStatusService;
