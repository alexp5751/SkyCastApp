import { Component } from '@angular/core';
import { LocationUpdateService } from './locationupdate.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
    searches: string[] = [];
    name: string;
    apiMessage: string;

    constructor(private locationUpdateService: LocationUpdateService, private ref: ChangeDetectorRef, private http: HttpClient) { }

    ngOnInit() {
        var self = this;
        this.geocoder = new google.maps.Geocoder();
        this.gmap = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: { lat: 33.7915558, lng: -84.3946626 }
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
                        self.addToSearches(self.address);
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
    }

    geocodeAddress(map) {
        var self = this;
        this.geocoder.geocode({ 'address': this.address }, function (results, status) {
            if (status === 'OK') {
                self.addToSearches(self.address);
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

    addToSearches(address: string) {
        var index = this.searches.indexOf(address);
        if (index == -1) {
            this.searches.unshift(address);
            if (this.searches.length > 5) {
                this.searches = this.searches.slice(0, 5);
            }
        } else {
            this.searches.splice(0, 0, this.searches.splice(index, 1)[0]);
        }
    }

    save() {
        if (this.searches.length > 1 && this.name) {
            const body = {
                'name': this.name,
                'searches': this.searches
            }
            this.http.post('/api/save', body).subscribe(
                res => {
                    console.log(res);
                    this.apiMessage = 'Searches successfully saved for ' + this.name + '.';
                },
                err => {
                    console.log(err);
                    this.apiMessage = 'Something went wrong saving searches for ' + this.name + '.';

                }
            );
        } else {
            alert('You must have made at least one search and filled out the Username field to save.')
        }
    }

    load() {
        if (this.name) {
            this.http.get('/api/load/' + this.name).subscribe(
                res => {
                    this.searches = res['searches'];
                    this.apiMessage = 'Searches successfully loaded for ' + this.name + '. Check the recent searches selection.';
                },
                err => {
                    console.log(err);
                    this.apiMessage = 'No searches saved for ' + this.name + '.';
                }
            );
        } else {
            alert('You must fill out the Username field before you can load.');
        }
    }
}
