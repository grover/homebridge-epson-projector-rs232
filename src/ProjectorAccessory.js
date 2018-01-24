"use strict";

const Transport = require('./Transport');

const ProjectorPowerService = require('./ProjectorPowerService');
const ProjectorBulbService = require('./ProjectorBulbService');
const ProjectorColorModeService = require('./ProjectorColorModeService');
const ProjectorImageService = require('./ProjectorImageService');
const ProjectorInputService = require('./ProjectorInputService');

let Characteristic, Service;

const powerRegex = /PWR=([0-9]+)/;

class ProjectorAccessory {

  constructor(api, log, config) {
    this.api = api;
    Characteristic = this.api.hap.Characteristic;
    Service = this.api.hap.Service;

    this.log = log;
    this.config = config;
    this.name = config.name;

    this.config.pollingInterval = this.config.pollingInterval || 60000;

    this._isReachable = false;

    this._device = new Transport(this.config.port);
    this._device.on('connected', this._onConnected.bind(this));
    this._device.on('disconnected', this._onDisconnected.bind(this));

    this._services = this.createServices(this.api.hap);
  }

  getServices() {
    return this._services;
  }

  createServices(homebridge) {
    return [
      this.getAccessoryInformationService(),
      this.getBridgingStateService(),
      this.getProjectorPowerService(),
      this.getProjectorBulbService(),
      this.getProjectorColorModeService(),
      this.getProjectorImageService(),
      this.getProjectorInputService()
    ];
  }

  getAccessoryInformationService() {
    this._accessoryInformation = new Service.AccessoryInformation();
    this._accessoryInformation
      .setCharacteristic(Characteristic.Name, this.name)
      .setCharacteristic(Characteristic.Manufacturer, 'Epson')
      .setCharacteristic(Characteristic.Model, 'Projector')
      .setCharacteristic(Characteristic.SerialNumber, '')
      .setCharacteristic(Characteristic.FirmwareRevision, this.config.version)
      .setCharacteristic(Characteristic.HardwareRevision, this.config.version);

    return this._accessoryInformation;
  }

  getBridgingStateService() {
    this._bridgingService = new Service.BridgingState();

    this._bridgingService.getCharacteristic(Characteristic.Reachable)
      .updateValue(this._isReachable);

    return this._bridgingService;
  }

  getProjectorPowerService() {
    this._projectorPowerService = new ProjectorPowerService(this.log, this.api, this._device, this.name);
    return this._projectorPowerService.getService();
  }

  getProjectorBulbService() {
    this._projectorBulbService = new ProjectorBulbService(this.log, this.api, this._device, this.name);
    return this._projectorBulbService.getService();
  }

  getProjectorColorModeService() {
    this._projectorColorModeService = new ProjectorColorModeService(this.log, this.api, this._device, this.name);
    return this._projectorColorModeService.getService();
  }

  getProjectorImageService() {
    this._projectorImageService = new ProjectorImageService(this.log, this.api, this._device, this.name);
    return this._projectorImageService.getService();
  }

  getProjectorInputService() {
    this._projectorInputService = new ProjectorInputService(this.log, this.api, this._device, this.name);
    return this._projectorInputService.getService();
  }

  async _onConnected() {
    this.log('Connected. Refreshing characteristics.');
    await this._refreshSerialNumber();
    await this._refreshProjectorStatus();

    this._setReachable(true);
  }

  async _refreshProjectorStatus() {
    this.log('Refresh projector status');

    try {
      const powerStatus = await this._refreshPowerStatus();

      await this._projectorPowerService.update(powerStatus);
      await this._projectorBulbService.update(powerStatus);

      if (powerStatus === '01') {
        await this._projectorColorModeService.update();
        await this._projectorImageService.update();
        await this._projectorInputService.update();
      }

      // Schedule another update
      setTimeout(() => {
        this._refreshProjectorStatus();
      }, this.config.pollingInterval);
    }
    catch (e) {
      // Do not leak the exception
      this.log(`Failed to refresh projector status: ${e}`);
    }
  }

  async _refreshSerialNumber() {
    const serialNumber = await this._device.execute('SNO?');
    this.log(`Projector serial number: ${serialNumber.constructor.name}`);

    this._accessoryInformation.setCharacteristic(Characteristic.SerialNumber, serialNumber);
  }

  async _refreshPowerStatus() {
    const powerState = await this._device.execute('PWR?');
    const matches = powerRegex.exec(powerState);
    if (matches === null) {
      throw new Error('Failed to process PWR? response');
    }

    return matches[1];
  }

  _onDisconnected() {
    this.log('Disconnected');
    this._setReachable(false);
  }

  _setReachable(state) {
    this.log(`Reachable: ${state}`);
    if (this._isReachable === state) {
      return;
    }

    this._isReachable = state;

    this._bridgingService.getCharacteristic(Characteristic.Reachable)
      .updateValue(this._isReachable);
  }
}

module.exports = ProjectorAccessory;
