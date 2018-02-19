'use strict';

let Characteristic;

const mapColorTemperature = {
  offset: 3,
  values: [0, 25, 51, 76, 102, 128, 153, 179, 204, 230]
};

const mapSeries4 = {
  offset: 32,
  values: [0, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63, 66, 70, 74, 78, 82, 86, 90, 94, 98, 102, 106, 110, 114, 118, 122, 126, 129, 133, 137, 141, 145, 149, 153, 157, 161, 165, 169, 173, 177, 181, 185, 189, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252]
};

const mapSeries5 = {
  offset: 24,
  values: [0, 5, 10, 15, 20, 26, 31, 36, 41, 47, 52, 57, 62, 67, 73, 78, 83, 88, 94, 99, 104, 109, 114, 120, 125, 130, 135, 141, 146, 151, 156, 161, 167, 172, 177, 182, 188, 193, 198, 203, 208, 214, 219, 224, 229, 235, 240, 245, 250]
};

const mapSharpness = {
  offset: 5,
  values: [0, 23, 46, 69, 93, 116, 139, 162, 186, 209, 232]
};

const mapFleshTone = {
  offset: 0,
  values: [0, 36, 73, 109, 146, 182, 219]
};

const mapNoiseReduction = {
  offset: -1,
  values: [1, 2, 3, 4]
};

class ProjectorImageService {
  constructor(log, api, device, name) {

    this.log = log;

    this._device = device;

    Characteristic = api.hap.Characteristic;

    this._characteristics = [
      { cmd: 'BRIGHT', characteristic: Characteristic.PictureBrightness, map: mapSeries5 },
      { cmd: 'CONTRAST', characteristic: Characteristic.PictureContrast, map: mapSeries5 },
      { cmd: 'DENSITY', characteristic: Characteristic.PictureDensity, map: mapSeries4 },
      { cmd: 'TINT', characteristic: Characteristic.PictureTint, map: mapSeries4 },
      { cmd: 'SHARP', characteristic: Characteristic.PictureSharpness, map: mapSharpness },
      { cmd: 'CTEMP', characteristic: Characteristic.PictureColorTemperature, map: mapColorTemperature },
      { cmd: 'FCOLOR', characteristic: Characteristic.PictureFleshTone, map: mapFleshTone },
      { cmd: 'NRS', characteristic: Characteristic.PictureNoiseReductionTone, map: mapNoiseReduction },
      { cmd: 'SUPERRES', characteristic: Characteristic.PictureSuperResolution },
    ];

    this._service = new api.hap.Service.ProjectorImageService(name);

    for (let c of this._characteristics) {
      this._service
        .getCharacteristic(c.characteristic)
        .on('set', this._setCharacteristic.bind(this, c));
    }
  }

  getService() {
    return this._service;
  }

  async update() {
    for (let c of this._characteristics) {
      try {
        await this._refreshCharacteristic(c);
      }
      catch (e) {
        this.log(`Failed to refresh ${c.cmd} - likely not supported in the current mode: ${e}`);
      }
    }
  }

  async _refreshCharacteristic(c) {
    const status = await this._device.execute(`${c.cmd}?`);
    if (!c.regex) {
      c.regex = new RegExp(`${c.cmd}=([0-9]+)`);
    }

    const matches = c.regex.exec(status);
    if (matches !== null) {
      let value = Number.parseInt(matches[1]);
      if (c.map) {
        const index = c.map.values.indexOf(value);
        value = index - c.map.offset;
      }

      this._service
        .getCharacteristic(c.characteristic)
        .updateValue(value);
    }
    else {
      this.log(`Failed to update characteristic state: ${c.cmd}`);
    }
  }

  async _setCharacteristic(c, value, callback) {
    this.log(`Set projector picture characteristic ${c.cmd} to ${value}`);
    try {
      if (c.map) {
        value = c.map.values[value + c.map.offset];
      }

      const cmd = `${c.cmd} ${value}`;
      this.log(`Sending ${cmd}`);

      await this._device.execute(cmd);
      callback(undefined);
    }
    catch (e) {
      this.log(`Failed to set characteristic ${e}`);
      callback(e);
    }
  }
}

module.exports = ProjectorImageService;
