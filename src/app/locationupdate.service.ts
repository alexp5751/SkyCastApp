import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LatLng } from './latlng';

@Injectable()
export class LocationUpdateService {

  // Observable string sources
  private locationUpdatedSource = new Subject<LatLng>();

  // Observable string streams
  locationUpdated$ = this.locationUpdatedSource.asObservable();

  updateLocation(location: LatLng) {
    this.locationUpdatedSource.next(location);
  }
}