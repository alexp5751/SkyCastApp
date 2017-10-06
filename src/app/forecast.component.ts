import { Component, OnInit } from '@angular/core';
import { DarkSkyService } from './darksky.service'
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'forecast',
    templateUrl: 'forecast.component.html'
})

export class ForecastComponent implements OnInit {
    subscription: Subscription;
    forecastWeather: object = {};

    constructor(private darkskyService: DarkSkyService, private ref: ChangeDetectorRef) {
        this.subscription = darkskyService.weatherUpdated$.subscribe(
            res => {
                this.forecastWeather = res['currently'];
                console.log(this.forecastWeather);
                ref.detectChanges();
            });
    }

    ngOnInit() { }
}