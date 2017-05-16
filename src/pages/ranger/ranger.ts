import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Paho } from 'ng2-mqtt/mqttws31';

@IonicPage({
  name: 'RangerPage'
})
@Component({
  selector: 'page-ranger',
  templateUrl: 'ranger.html',
})
export class RangerPage {
  contrast: number = 0;
  message: string;
  client: any;

//m = mqtt.Client("ad7cad07680c47ff80677b3c19bbe6dc", 120, "mbltest01/nodemcu01", "e61m/mza6z5HY0eD4n/sbagP6mkDZeFfmmxSh5KER0w=")
//m:lwt("/lwt", "offline", 0, 0)
//m:on("connect", function(client) print ("connected") end)
//m:on("offline", function(client) print ("offline") end)
//m:on("message", function(client, topic, message) print(topic .. ":" ) if message ~= nil then print(message) end end)
//m:connect("mbltest01.mqtt.iot.gz.baidubce.com", 1883, 0, 1, function(client) print("connected") end, function(client, reason) print("failed reason: "..reason) end)
//m:connect("mbltest01.mqtt.iot.gz.baidubce.com", 1884, 1, 1, function(client) print("connected") end, function(client, reason) print("failed reason: "..reason) end)
//m:subscribe("nodemcu01", 0, function(client) print("subscribe success") end)
//m:unsubscribe("nodemcu01", function(client) print("unsubscribe success") end)
//m:publish("letv1s01", "200", 0, 0, function(client) print("sent") end)
//m:close()

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.client = new Paho.MQTT.Client("mbltest01.mqtt.iot.gz.baidubce.com", Number("8884"), "/mqtt", "DeviceId-s42mw9zs48");

    this.client.onConnectionLost = (response) => {
      console.log("onConnectionLost: " + response.errorCode);
      console.log("onConnectionLost: " + response.errorMessage);
    };

    this.client.onMessageArrived = (message) => {
      console.log("onMessageArrived: " + message.payloadString);
      console.log(message);

      this.message = message.payloadString;

      let contrast: number = Number(this.message);

      if (contrast >= -200 && contrast <= 200) {
        this.contrast = contrast;
      }
      else if (contrast < -200) {
        this.contrast = -200;
      }
      else if (contrast > 200) {
        this.contrast = 200;
      }
    };

    this.client.onMessageDelivered = (message) => {
      console.log("onMessageDelivered: " + message.payloadString);
      console.log(message);
    };

    this.client.connect({
      useSSL: true,
      userName: "mbltest01/letv1s01",
      password: "hzrU8ekRn7MR7X4ycTO6OzbKbRDaaK5tmaLVY+Ue/58=",
      invocationContext: {
        userName: "mbltest01/letv1s01"
      },
      onSuccess: (context) => {
        console.log("connect.onSuccess");
        console.log(context);
        console.log(this);

        this.client.subscribe("letv1s01", {
          invocationContext: {
            topic: "letv1s01"
          },
          onSuccess: (response) => {
            console.log("subscribe.onSuccess: " + response.grantedQos);
            console.log(response.invocationContext);
          },
          onFailure: (response) => {
            console.log("subscribe.onFailure: " + response.errorCode);
            console.log(response.invocationContext);
          }
        });

        let message: any = new Paho.MQTT.Message("Hello");
        message.destinationName = "nodemcu01";

        this.client.send(message);
      },
      onFailure: (response) => {
        console.log("connect.onFailure: " + response.errorCode);
        console.log("connect.onFailure: " + response.errorMessage);
        console.log(response.invocationContext);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RangerPage');
  }

  slide(event) {
    console.log(event);

    let message: any = new Paho.MQTT.Message(String(event.value));
    message.destinationName = "nodemcu01";

    this.client.send(message);
  }
}
