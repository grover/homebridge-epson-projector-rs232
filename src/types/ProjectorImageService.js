"use strict";

const inherits = require('util').inherits;

module.exports = {
  registerWith: function (hap) {

    const Characteristic = hap.Characteristic;
    const Service = hap.Service;

    ////////////////////////////////////////////////////////////////////////////
    // Brightness Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.PictureBrightness = function () {
      Characteristic.call(this, 'Brightness', Characteristic.PictureBrightness.UUID);
      this.setProps({
        format: Characteristic.Formats.INT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
        minValue: -24,
        maxValue: 24
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.PictureBrightness.UUID = '0D69EA63-62B6-4E29-A964-F5327E82C840';
    inherits(Characteristic.PictureBrightness, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Contrast Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.PictureContrast = function () {
      Characteristic.call(this, 'Contrast', Characteristic.PictureContrast.UUID);
      this.setProps({
        format: Characteristic.Formats.INT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
        minValue: -24,
        maxValue: 24
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.PictureContrast.UUID = '61C2901B-5AAA-485E-9831-EF8F9A53D76D';
    inherits(Characteristic.PictureContrast, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Density Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.PictureDensity = function () {
      Characteristic.call(this, 'Density', Characteristic.PictureDensity.UUID);
      this.setProps({
        format: Characteristic.Formats.INT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
        minValue: -32,
        maxValue: 32
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.PictureDensity.UUID = '8BD80C74-CB89-4FF2-BE37-85808F3B45B0';
    inherits(Characteristic.PictureDensity, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Tint Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.PictureTint = function () {
      Characteristic.call(this, 'Tint', Characteristic.PictureTint.UUID);
      this.setProps({
        format: Characteristic.Formats.INT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
        minValue: -32,
        maxValue: 32
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.PictureTint.UUID = '212B23AD-FA14-4A5A-968C-A0001B822817';
    inherits(Characteristic.PictureTint, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Tint Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.PictureSharpness = function () {
      Characteristic.call(this, 'Sharpness', Characteristic.PictureSharpness.UUID);
      this.setProps({
        format: Characteristic.Formats.INT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
        minValue: -5,
        maxValue: 5
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.PictureSharpness.UUID = '540AE490-361D-4C9A-9005-674ACAB5A808';
    inherits(Characteristic.PictureSharpness, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Color Temperature Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.PictureColorTemperature = function () {
      Characteristic.call(this, 'Color Temperature', Characteristic.PictureColorTemperature.UUID);
      this.setProps({
        format: Characteristic.Formats.INT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
        minValue: -3,
        maxValue: 6
      });

      this.value = this.getDefaultValue();
    };
    Characteristic.PictureColorTemperature.UUID = '29C4B7DF-97DC-48FD-B476-E8AED6FC4D16';
    inherits(Characteristic.PictureColorTemperature, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Flesh Tone Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.PictureFleshTone = function () {
      Characteristic.call(this, 'Flesh Tone', Characteristic.PictureFleshTone.UUID);
      this.setProps({
        format: Characteristic.Formats.UINT8,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
        minValue: 0,
        maxValue: 6
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.PictureFleshTone.UUID = '3FDF373D-610A-48A6-8C1A-D92364C3EAED';
    inherits(Characteristic.PictureFleshTone, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Noise Reduction Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.PictureNoiseReductionTone = function () {
      Characteristic.call(this, 'Noise Reduction', Characteristic.PictureNoiseReductionTone.UUID);
      this.setProps({
        format: Characteristic.Formats.UINT8,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
        minValue: 1,
        maxValue: 4
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.PictureNoiseReductionTone.UUID = '5810A15A-F051-498B-BD8B-7C8279380262';
    inherits(Characteristic.PictureNoiseReductionTone, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Super Resolution Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.PictureSuperResolution = function () {
      Characteristic.call(this, 'Super Resolution', Characteristic.PictureSuperResolution.UUID);
      this.setProps({
        format: Characteristic.Formats.UINT8,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
        minValue: 0,
        maxValue: 5
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.PictureSuperResolution.UUID = '5529374C-74FC-4B7F-AD0C-4FAE13DE8D12';
    inherits(Characteristic.PictureSuperResolution, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Projector Picture Service
    ////////////////////////////////////////////////////////////////////////////
    Service.ProjectorImageService = function (displayName, subtype) {
      Service.call(this, displayName, Service.ProjectorImageService.UUID, subtype);

      this.addOptionalCharacteristic(Characteristic.Name);

      // Required Characteristics
      this.addCharacteristic(Characteristic.PictureBrightness);
      this.addCharacteristic(Characteristic.PictureContrast);
      this.addCharacteristic(Characteristic.PictureDensity);
      this.addCharacteristic(Characteristic.PictureTint);
      this.addCharacteristic(Characteristic.PictureSharpness);
      this.addCharacteristic(Characteristic.PictureColorTemperature);
      this.addCharacteristic(Characteristic.PictureFleshTone);
      this.addCharacteristic(Characteristic.PictureNoiseReductionTone);
      this.addCharacteristic(Characteristic.PictureSuperResolution);
    };

    Service.ProjectorImageService.UUID = 'F2F08DB3-C659-48B0-A8A4-8B1711652772';
    inherits(Service.ProjectorImageService, Service);
  }
};