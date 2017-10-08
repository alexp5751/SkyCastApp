import { Component, OnInit } from '@angular/core';
import { DarkSkyService } from './darksky.service'
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'historic',
    templateUrl: 'historic.component.html'
})

export class HistoricComponent implements OnInit {
    subscription: Subscription;
    historicWeather: object[] = [];
    step: number = 0;

    constructor(private darkskyService: DarkSkyService, private ref: ChangeDetectorRef) {
        this.subscription = darkskyService.weatherUpdated$.subscribe(
            res => {
                this.historicWeather = res['historic'].map(function (x) {
                    x['daily']['data'][0]['hourly'] = x['hourly'];
                    return x['daily']['data'][0];
                });
                this.setStep(-1);
            });
    }

    ngOnInit() { }

    setStep(i: number) {
        this.step = i;
        this.ref.detectChanges();
    }

    prettifyTime(x: number) {
        var time: Date = new Date(x * 1000);
        var prettyTime = time.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        return prettyTime;
    }
}