class Weather {
    constructor() {
        this.apiKey = "j27uijB6GL4WaGH0c2GMomoDyA5u8Exs";
    }

    getCurrentWeatherInBudapest() {
        let budapestLocation = 'budapest, hu';
        this.getCurrentWeatherInLocation(budapestLocation);
    }

    getCurrentWeatherInLocation(location) {
        // let url = 'http://apidev.accuweather.com/locations/v1/search?q=' + location + '&apikey=' + this.apiKey;
        let url = 'http://apidev.accuweather.com/locations/v1/search?q=' + location + '&apikey=hoArfRosT1215';

        var xhr = this.createCORSRequest('GET', url);
        xhr.onload = function() {
            var text = xhr.responseText;
            var title = getTitle(text);
            alert('Response from CORS request to ' + url + ': ' + title);
        };

        xhr.onerror = function() {
            console.log('There was an error!');
        };

        xhr.withCredentials = true;
        xhr.send();

        if (!xhr) {
          throw new Error('CORS not supported');
        }

        $.getJSON(url, function(reply){
            console.log(reply);
        });
    }

    createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
      
          // Check if the XMLHttpRequest object has a "withCredentials" property.
          // "withCredentials" only exists on XMLHTTPRequest2 objects.
          xhr.open(method, url, true);
      
        } else if (typeof XDomainRequest != "undefined") {
      console.log('he');
          // Otherwise, check if XDomainRequest.
          // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
          xhr = new XDomainRequest();
          xhr.open(method, url);
      
        } else {
            console.log('not supp');
          // Otherwise, CORS is not supported by the browser.
          xhr = null;
      
        }
        return xhr;
      }
}