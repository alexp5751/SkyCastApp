import { Component, Input, OnDestroy } from '@angular/core';
import { LocationUpdateService } from './locationupdate.service';
import { DarkSkyService } from './darksky.service'
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  providers: [DarkSkyService]
})
export class WeatherComponent implements OnDestroy {
  latitude: number = 0.0;
  longitude: number = 0.0;
  subscription: Subscription;

  constructor(private locationUpdateService: LocationUpdateService, private ref: ChangeDetectorRef, private darkskyService: DarkSkyService) {
    this.subscription = locationUpdateService.locationUpdated$.subscribe(
      res => {
        this.latitude = res.latitude;
        this.longitude = res.longitude;
        this.loadWeather();
        ref.detectChanges();
      });
  }

  loadWeather() {
    this.darkskyService.updateWeather(this.latitude, this.longitude, Math.floor(Date.now() / 1000));
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}