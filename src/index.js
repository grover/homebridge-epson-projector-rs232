
const version = require('../package.json').version;

const process = require('process');

const ProjectorAccessory = require('./ProjectorAccessory');

const ProjectorBulbServiceTypes = require('./types/ProjectorBulbService');
const ProjectorColorModeServiceTypes = require('./types/ProjectorColorModeService');
const ProjectorImageServiceTypes = require('./types/ProjectorImageService');
const ProjectorInputServiceTypes = require('./types/ProjectorInputService');

const HOMEBRIDGE = {
  Accessory: null,
  Service: null,
  Characteristic: null,
  UUIDGen: null
};

const platformName = 'homebridge-epson-projector-rs232';
const platformPrettyName = 'EpsonProjector';

module.exports = (homebridge) => {
  HOMEBRIDGE.Accessory = homebridge.platformAccessory;
  HOMEBRIDGE.Service = homebridge.hap.Service;
  HOMEBRIDGE.Characteristic = homebridge.hap.Characteristic;
  HOMEBRIDGE.UUIDGen = homebridge.hap.uuid;
  HOMEBRIDGE.homebridge = homebridge;

  homebridge.registerPlatform(platformName, platformPrettyName, EpsonProjectorPlatform, false);


  ProjectorBulbServiceTypes.registerWith(homebridge.hap);
  ProjectorColorModeServiceTypes.registerWith(homebridge.hap);
  ProjectorImageServiceTypes.registerWith(homebridge.hap);
  ProjectorInputServiceTypes.registerWith(homebridge.hap);
}

process.on('uncaughtException', (err) => {
  console.error(err.toString());
});

const EpsonProjectorPlatform = class {
  constructor(log, config, api) {
    this.log = log;
    this.log('Epson Projector Platform Plugin Loaded');
    this.config = config;
    this.api = api;

    this.api.on('didFinishLaunching', this._didFinishLaunching.bind(this));
  }

  _didFinishLaunching() {
  }

  accessories(callback) {
    this._accessories = [];

    this.config.devices.forEach(device => {
      this._accessories.push(new ProjectorAccessory(this.api, this.log, device));
    });

    callback(this._accessories);
  }
}
