import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ConfigService {

  config = {
    'serverUrl': 'http://54.237.191.160/MealsyOnlineOrderingServices/api/v1'
  };

  public static findIP(onNewIP) { //  onNewIp - your listener function for new IPs
    // compatibility for firefox and chrome
    // @ts-ignore
    const myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    const pc = new myPeerConnection({iceServers: []}),
      noop = function () {
      },
      localIPs = {},
      ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

    function ipIterate(ip) {
      if (!localIPs[ip]) {
        onNewIP(ip);
      }
      localIPs[ip] = true;
    }

    // create a bogus data channel
    pc.createDataChannel('');
    pc.createOffer(function (sdp) {
      sdp.sdp.split('\n').forEach(function (line) {
        if (line.indexOf('candidate') < 0) {
          return;
        }
        line.match(ipRegex).forEach(ipIterate);
      });
      pc.setLocalDescription(sdp, noop, noop);
    }, noop); // create offer and set local description
    // listen for candidate events
    pc.onicecandidate = function (ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) {
        return;
      }
      ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
    };
  }


  getConfig() {
    return this.config;
  }
}
