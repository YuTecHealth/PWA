function bleconnect(){
navigator.bluetooth.requestDevice({
    optionalServices: [0xa000],
    //'713d0002-503e-4c75-ba94-3148f18d941e'
    acceptAllDevices: true//
})
.then(device => {
    console.log(device);
      bluetoothDevice = device;
      bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
      return device.gatt.connect();
})
.then(server => {
    return server.getPrimaryService(0xa000);
})
.then(service => {
    console.log(service);
    return service.getCharacteristic(0xa001);
})
.then(chara => {
    console.log(chara);
    let lock = true;
    chara.startNotifications().then(c => {
        c.addEventListener('characteristicvaluechanged', function(e){
           let ecgfromble = Array.from(new Uint8Array(this.value.buffer));
           ecgfromble.forEach(ecgchart);
         //  ecgchart(ecgfromble[1]);
        // smoothie.addTimeSeries(line1);

        });
    })
})
