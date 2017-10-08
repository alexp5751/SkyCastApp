import { Component } from '@angular/core';
import { LocationUpdateService } from './locationupdate.service';
import { ChangeDetectorRef } from '@angular/core';
import { LatLng } from './latlng';

declare var google: any;

@Component({
    selector: 'map-search',
    templateUrl: './map.component.html'
})
export class MapComponent {
    address: string = '201 17th St NW #430, Atlanta, GA 30363';
    geocoder: any;
    gmap: any;
    marker: any;

    constructor(private locationUpdateService: LocationUpdateService, private ref: ChangeDetectorRef) { }

    ngOnInit() {
        var self = this;
        this.geocoder = new google.maps.Geocoder();
        this.gmap = new google.maps.Map(document.getElementById('map'), {
            zoom: 5
        });
        this.marker = new google.maps.Marker({
            map: this.gmap
        });
        this.gmap.addListener('click', function (event) {
            self.geocoder.geocode({ 'location': event.latLng }, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        self.marker.setMap(null);
                        self.marker = null;
                        self.marker = new google.maps.Marker({
                            map: self.gmap,
                            position: event.latLng
                        })
                        self.address = results[0].formatted_address;
                        var coordinates = new LatLng(event.latLng.lat(), event.latLng.lng());
                        self.ref.detectChanges();
                        self.locationUpdateService.updateLocation(coordinates);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }

            })
        });
        this.geocodeAddress(this.gmap);
    }

    geocodeAddress(map) {
        var self = this;
        this.geocoder.geocode({ 'address': this.address }, function (results, status) {
            if (status === 'OK') {
                var coordinates = results[0].geometry.location;
                map.setCenter(coordinates);
                self.marker.setMap(null);
                self.marker = null;
                self.marker = new google.maps.Marker({
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
