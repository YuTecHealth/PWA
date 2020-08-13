smoothie = new SmoothieChart();
var timeconstant=0;
smoothie.streamTo(document.getElementById("mycanvas"));
var line1 = new TimeSeries();

function ecgchart(input_value){

// Add a random value to each line every second
line1.append(new Date().getTime(), input_value);
timeconstant=timeconstant+1;
if(timeconstant%40==0){
    smoothie.addTimeSeries(line1);
   }
// Add to SmoothieChart new Date().getTime()
}

function bleconnectfunc(){
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
    chara.startNotifications().then(c => {
        c.addEventListener('characteristicvaluechanged', function(e){
        });
    })
})
.catch(error => {console.log(error)});
};
