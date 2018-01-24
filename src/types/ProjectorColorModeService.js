"use strict";

const inherits = require('util').inherits;

module.exports = {
  registerWith: function (hap) {

    const Characteristic = hap.Characteristic;
    const Service = hap.Service;

    ////////////////////////////////////////////////////////////////////////////
    // ColorModeDynamic Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ColorModeDynamic = function () {
      Characteristic.call(this, 'Dynamic', Characteristic.ColorModeDynamic.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.ColorModeDynamic.UUID = 'B17A3316-A32B-4290-B95C-94AEAD63A39B';
    inherits(Characteristic.ColorModeDynamic, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // ColorModeNatural Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ColorModeNatural = function () {
      Characteristic.call(this, 'Natural', Characteristic.ColorModeNatural.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.ColorModeNatural.UUID = 'AEA3FFED-CC9E-4560-BF99-078BA97162CE';
    inherits(Characteristic.ColorModeNatural, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // ColorModeLiving Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ColorModeLiving = function () {
      Characteristic.call(this, 'Living', Characteristic.ColorModeLiving.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.ColorModeLiving.UUID = '1B4F327F-2585-4E00-989C-1D2C8EB5EAEE';
    inherits(Characteristic.ColorModeLiving, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // ColorModeTHX Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ColorModeTHX = function () {
      Characteristic.call(this, 'THX', Characteristic.ColorModeTHX.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.ColorModeTHX.UUID = 'DCA7F962-B7E7-4C39-B8F2-59404F10994E';
    inherits(Characteristic.ColorModeTHX, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // ColorModeCinema Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ColorModeCinema = function () {
      Characteristic.call(this, 'Cinema', Characteristic.ColorModeCinema.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.ColorModeCinema.UUID = '13B6825E-DA76-4E56-860C-B739398EDA1F';
    inherits(Characteristic.ColorModeCinema, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // ColorMode3DCinema Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ColorMode3DCinema = function () {
      Characteristic.call(this, '3D Cinema', Characteristic.ColorMode3DCinema.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.ColorMode3DCinema.UUID = '84CAF761-E8EA-491E-8263-B146260A1848';
    inherits(Characteristic.ColorMode3DCinema, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // ColorMode3DDynamic Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ColorMode3DDynamic = function () {
      Characteristic.call(this, '3D Dynamic', Characteristic.ColorMode3DDynamic.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.ColorMode3DDynamic.UUID = 'C1244E94-16B0-4D8E-9533-8CC9065F8073';
    inherits(Characteristic.ColorMode3DDynamic, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // ColorMode3DTHX Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ColorMode3DTHX = function () {
      Characteristic.call(this, '3D THX', Characteristic.ColorMode3DTHX.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.ColorMode3DTHX.UUID = 'C6CF7BFF-D4F8-4B2E-B4A2-FD3653818EBB';
    inherits(Characteristic.ColorMode3DTHX, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // ColorModeBlackWhiteCinema Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ColorModeBlackWhiteCinema = function () {
      Characteristic.call(this, 'B&W Cinema', Characteristic.ColorModeBlackWhiteCinema.UUID);

      const props = {
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY],
      };

      this.setProps(props);
      this.value = this.getDefaultValue();
    };
    Characteristic.ColorModeBlackWhiteCinema.UUID = '4848304A-DF6E-4303-A405-03BB6094E650';
    inherits(Characteristic.ColorModeBlackWhiteCinema, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Projector ColorMode Service
    ////////////////////////////////////////////////////////////////////////////
    Service.ProjectorColorModeService = function (displayName, subtype) {
      Service.call(this, displayName, Service.ProjectorColorModeService.UUID, subtype);

      this.addOptionalCharacteristic(Characteristic.Name);

      // Required Characteristics
      this.addCharacteristic(Characteristic.ColorModeDynamic);
      this.addCharacteristic(Characteristic.ColorModeNatural);
      this.addCharacteristic(Characteristic.ColorModeLiving);
      this.addCharacteristic(Characteristic.ColorModeCinema);
      this.addCharacteristic(Characteristic.ColorMode3DCinema);
      this.addCharacteristic(Characteristic.ColorMode3DDynamic);

      // Optional color modes
      this.addCharacteristic(Characteristic.ColorModeTHX);
      this.addCharacteristic(Characteristic.ColorMode3DTHX);
      this.addCharacteristic(Characteristic.ColorModeBlackWhiteCinema);
    };

    Service.ProjectorColorModeService.UUID = 'E5B6D6A1-9A4A-44C2-89EB-989CD22AE5A5';
    inherits(Service.ProjectorColorModeService, Service);
  }
};