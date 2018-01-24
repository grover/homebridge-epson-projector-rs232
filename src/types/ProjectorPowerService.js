"use strict";

const inherits = require('util').inherits;

module.exports = {
  registerWith: function (hap) {

    const Characteristic = hap.Characteristic;
    const Service = hap.Service;

    ////////////////////////////////////////////////////////////////////////////
    // Bulb Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ProjectorBulb = function () {
      Characteristic.call(this, 'Power', Characteristic.ProjectorBulb.UUID);
      this.setProps({
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.ProjectorBulb.UUID = '48E4B32E-EDA4-4529-BB3D-5D068FD74A76';
    inherits(Characteristic.ProjectorBulb, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Bulb Hours Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ProjectorBulbHours = function () {
      Characteristic.call(this, 'Bulb Hours', Characteristic.ProjectorBulbHours.UUID);
      this.setProps({
        format: Characteristic.Formats.INT,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.ProjectorBulbHours.UUID = '3A71AB9B-F67F-4952-B9E2-AB3967B7D81B';
    inherits(Characteristic.ProjectorBulbHours, Characteristic);


    ////////////////////////////////////////////////////////////////////////////
    // Projector Bulb Service
    ////////////////////////////////////////////////////////////////////////////
    Service.ProjectorBulbService = function (displayName, subtype) {
      Service.call(this, displayName, Service.ProjectorBulbService.UUID, subtype);

      // Required Characteristics
      this.addCharacteristic(Characteristic.ProjectorBulb);
      this.addCharacteristic(Characteristic.ProjectorBulbHours);

      // Optional Characteristics
      this.addOptionalCharacteristic(Characteristic.Name);
    };

    Service.ProjectorBulbService.UUID = 'E54C1D66-D422-4A0F-8DE9-4CAB73B3F04C';
    inherits(Service.ProjectorBulbService, Service);
  }
};