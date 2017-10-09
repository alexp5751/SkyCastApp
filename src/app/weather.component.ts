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
  subscription: Subscription;
  resized: boolean = false;

  constructor(private locationUpdateService: LocationUpdateService, private ref: ChangeDetectorRef, private darkskyService: DarkSkyService) {
    this.subscription = locationUpdateService.locationUpdated$.subscribe(
      res => {
        this.darkskyService.updateWeather(res.latitude, res.longitude);
        ref.detectChanges();
      });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  resize() {
    if (!this.resized) {
      window.dispatchEvent(new Event('resize'));
      this.resized = true;
    }
  }
}