"use strict";

const inherits = require('util').inherits;

module.exports = {
  registerWith: function (hap) {

    const Characteristic = hap.Characteristic;
    const Service = hap.Service;

    ////////////////////////////////////////////////////////////////////////////
    // Cooling Down Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ProjectorCoolingDown = function () {
      Characteristic.call(this, 'Cooling Down', Characteristic.ProjectorCoolingDown.UUID);
      this.setProps({
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.ProjectorCoolingDown.UUID = '89B41ABE-E147-4F06-835D-815C1E1AEFAD';
    inherits(Characteristic.ProjectorCoolingDown, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Warming Up Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ProjectorWarmingUp = function () {
      Characteristic.call(this, 'Warming Up', Characteristic.ProjectorWarmingUp.UUID);
      this.setProps({
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.ProjectorWarmingUp.UUID = '71AE17B1-4F0B-41E7-ABB9-B32AAEF3B9C8';
    inherits(Characteristic.ProjectorWarmingUp, Characteristic);

    ////////////////////////////////////////////////////////////////////////////
    // Abnormal Standby Characteristic
    ////////////////////////////////////////////////////////////////////////////
    Characteristic.ProjectorAbnormalStandby = function () {
      Characteristic.call(this, 'Abnormal Standby', Characteristic.ProjectorAbnormalStandby.UUID);
      this.setProps({
        format: Characteristic.Formats.BOOL,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
      });
      this.value = this.getDefaultValue();
    };
    Characteristic.ProjectorAbnormalStandby.UUID = '36FDF001-A2C2-4FF5-B6AB-951994FDC85A';
    inherits(Characteristic.ProjectorAbnormalStandby, Characteristic);


    ////////////////////////////////////////////////////////////////////////////
    // Projector Power Status Service
    ////////////////////////////////////////////////////////////////////////////
    Service.ProjectorPowerStatusService = function (displayName, subtype) {
      Service.call(this, displayName, Service.ProjectorPowerStatusService.UUID, subtype);

      // Required Characteristics
      this.addCharacteristic(Characteristic.ProjectorAbnormalStandby);
      this.addCharacteristic(Characteristic.ProjectorCoolingDown);
      this.addCharacteristic(Characteristic.ProjectorWarmingUp);

      // Optional Characteristics
      this.addOptionalCharacteristic(Characteristic.Name);
    };

    Service.ProjectorPowerStatusService.UUID = 'CC2D009C-0046-4169-9C94-08FDFCA90B39';
    inherits(Service.ProjectorPowerStatusService, Service);
  }
};