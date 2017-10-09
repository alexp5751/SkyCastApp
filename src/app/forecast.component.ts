import { Component, OnInit } from '@angular/core';
import { DarkSkyService } from './darksky.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'forecast',
    templateUrl: 'forecast.component.html'
})

export class ForecastComponent implements OnInit {
    subscription: Subscription;
    forecastWeather: object[] = [];
    step: number = 0;

    constructor(private darkskyService: DarkSkyService, private ref: ChangeDetectorRef) {
        this.subscription = darkskyService.weatherUpdated$.subscribe(
            res => {
                this.forecastWeather = res['forecast']['daily']['data'];
                ref.detectChanges();
            });
    }

    ngOnInit() { }

    prettifyTime(x: number) {
        var time: Date = new Date(x * 1000);
        var prettyTime = time.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        return prettyTime;
    }

    update() {
        this.ref.detectChanges();
    }


}