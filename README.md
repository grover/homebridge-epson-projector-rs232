# homebridge-epson-projector

A homebridge plugin to control [Epson EH-TW7200 LCD projectors](https://www.epson.de/products/projectors/home-cinema/epson-eh-tw7200) connected via an RS-232 serial interface. This plugin enables the integration of the projector in HomeKit automations, create rules and scenes that depend upon the state of the projector, and enables scenes to control the TW7200 projector.

## Supported Epson projectors

Epson projectors that have a RS-232 interface are likely to implement the [ESC/VP21 protocol](https://www.google.de/search?q=ESC/VP21+protocol) that is used by this plugin. While the feature set exposed on the interface differs in the projectors, basic functionality should work in almost all of them. Specifically this plugin is compatible with the following models:

* EH-TW7200
* EH-TW8200  (not verified)
* EH-TW8200W (not verified)
* EH-TW9200 (not verified)
* EH-TW9200W (not verified)
* PL-HomeCinema 5030UB (not verified)
* PL-HomeCinema 5030UBe (not verified)
* PL-HomeCinema 6030UB (not verified)
* PL-HomeCinema 4030 (not verified)

The above models share the same set of commands that are used by this plugin. Other models not on the list might be compatible to a certain extent, see [Contributing](#Contributing) for more.

## Installation instructions

After [Homebridge](https://github.com/nfarina/homebridge) has been installed:

 ```sudo npm install -g homebridge-epson-projector-rs232 --unsafe-perm```

### Configuration

```json
{
  "bridge": {
      ...
  },
  "platforms": [
    {
      "platform": "EpsonProjector",
      "devices": [
        {
          "name": "Epson EH-TW7200",
          "port": "/dev/serial0",
          "pollingInterval": 60000
        }
      ]
    }
  ]
}
```

The configuration of a projector consists of the platform name, a list of devices, the name of the projector and the port it 
is connected to. The polling interval regulates how often the plugin should query the projector for the current status. Note that
the default value is 60000 milliseconds. You can go as low as 1000 milliseconds if you require faster status updates in HomeKit. The projector will be polled with this frequency at all times, when it's powered on and powered off.

## Hardware setup

Unfortunately I'm not a hardware expert on setting this up. I've found the following configuration to work for me on a Raspberry Pi Zero W, however be aware that you might break stuff if electrons flow in unexpected amounts and directions. Also please be careful when working with electricity and electrical circuits. I will in no way take responsibility for your actions.

You need a serial cable to connect the projector to a computer or a Raspberry Pi. A USB powered serial adapter might work for you, I've good experience with (real) FTDI chips.

If you're creating your own solution for this, it is recommended that you use a MAX3232 IC to connect the projector with the Raspberry Pi for proper circuit protection to both devices.

### Disable serial TTY on RPi

On a Raspberry Pi you additionally need to:

- Disable the login shell on the serial port
- Keep the serial port hardware enabled

If you run homebridge, the user account running homebridge must be a member of the dialout group.

## Supported clients

This platform and the switches it creates have been verified to work with the following apps on iOS 11:

* Home (only the Power switch is available in the Home app, all other services are `Not supported`.)
* Elgato Eve

## Some asks for friendly gestures

If you use this and like it - please leave a note by staring this package here or on GitHub.

If you use it and have a problem, file an issue at [GitHub](https://github.com/grover/homebridge-epson-projector/issues) - I'll try to help.

If you tried this, but don't like it: tell me about it in an issue too. I'll try my best
to address these in my spare time.

If you fork this, go ahead - I'll accept pull requests for enhancements.

## Contributing

You can contribute to this homebridge plugin in following ways:

- [Report issues](https://github.com/grover/homebridge-epson-projector/issues) and help verify fixes as they are checked in.
- Review the [source code changes](https://github.com/grover/homebridge-epson-projector/pulls).
- Contribute bug fixes.
- Contribute changes to extend support to other Epson projectors

Pull requests are accepted.

## License

MIT License

Copyright (c) 2017 Michael Fröhlich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


