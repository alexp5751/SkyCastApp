import { Component } from '@angular/core';
import { LocationUpdateService } from './locationupdate.service';
import { LatLng } from './latlng';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocationUpdateService]
})
export class AppComponent {
  title: string = 'SkyCast App';
  address: string = '201 17th St NW #430, Atlanta, GA 30363';
  geocoder: any;
  gmap: any;

  constructor(private locationUpdateService: LocationUpdateService) {

  }

  ngOnInit() {
    this.geocoder = new google.maps.Geocoder();
    this.gmap = new google.maps.Map(document.getElementById('map'), {
      zoom: 5
    });
    this.geocodeAddress(this.gmap);
  }

  geocodeAddress(map) {
    var self = this;
    this.geocoder.geocode({ 'address': this.address }, function (results, status) {
      console.log(self.address);
      if (status === 'OK') {
        var coordinates = results[0].geometry.location;
        map.setCenter(coordinates);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });

        coordinates = new LatLng(coordinates.lat(), coordinates.lng());
        self.locationUpdateService.updateLocation(coordinates);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
