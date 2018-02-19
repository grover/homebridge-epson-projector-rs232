'use strict';

const inherits = require('util').inherits;

module.exports = {
  registerWith: function (hap) {

    const Characteristic = hap.Characteristic;
    const Service = hap.Service;

    ////////////////////////////////////////////////////////////////////////////
    // HDMI 1 Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.InputHDMI1 = function () {
      Characteristic.call(this, 'HDMI 1', Characteristic.InputHDMI1.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.InputHDMI1.UUID = '97C11EAC-68A6-45FA-9C6B-7B01F84CA6A2';
    inherits(Characteristic.InputHDMI1, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // HDMI 2 Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.InputHDMI2 = function () {
      Characteristic.call(this, 'HDMI 2', Characteristic.InputHDMI2.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.InputHDMI2.UUID = '97BFCDF3-8E4A-4C00-BFEF-87C2AC531E95';
    inherits(Characteristic.InputHDMI2, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Component Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.InputComponent = function () {
      Characteristic.call(this, 'Component', Characteristic.InputComponent.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.InputComponent.UUID = '1416E521-0617-45E5-AABC-F37E78C7D2C9';
    inherits(Characteristic.InputComponent, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Input Video Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.InputVideo = function () {
      Characteristic.call(this, 'Video', Characteristic.InputVideo.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.InputVideo.UUID = '8C5F0AC3-7E0F-4ED8-B90E-AEF4CF36561B';
    inherits(Characteristic.InputVideo, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Input PC Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.InputPC = function () {
      Characteristic.call(this, 'PC', Characteristic.InputPC.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.InputPC.UUID = 'C05F1F43-0F34-4D8C-839D-7FE39A27E3D9';
    inherits(Characteristic.InputPC, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Projector Input Service
    ////////////////////////////////////////////////////////////////////////////
    Service.ProjectorInputService = function (displayName, subtype) {
      Service.call(this, displayName, Service.ProjectorInputService.UUID, subtype);

      this.addOptionalCharacteristic(Characteristic.Name);

      // Required Characteristics
      this.addCharacteristic(Characteristic.InputHDMI1);
      this.addCharacteristic(Characteristic.InputHDMI2);
      this.addCharacteristic(Characteristic.InputComponent);
      this.addCharacteristic(Characteristic.InputPC);
      this.addCharacteristic(Characteristic.InputVideo);
    };

    Service.ProjectorInputService.UUID = 'A80636B7-59DB-4BC3-BF44-47F23523B86C';
    inherits(Service.ProjectorInputService, Service);
  }
};