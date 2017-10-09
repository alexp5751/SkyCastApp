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
    historicWeather: object[];
    hourly: object[] = [];
    step: number = 0;

    // universal options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    showYAxisLabel = true;
    autoScale = true;

    // temperature options
    xAxisLabel = 'Time';
    yAxisLabel = 'Temperature';
    colors = {
        domain: ['#FF4C4C', '#4C4CFF', '#FF9999', '#9999FF']
    };

    constructor(private darkskyService: DarkSkyService, private ref: ChangeDetectorRef) {
        this.subscription = darkskyService.weatherUpdated$.subscribe(
            res => {
                this.historicWeather = res['historic'].map(function (x) {
                    x['daily']['data'][0]['hourly'] = x['hourly']['data'];
                    return x['daily']['data'][0];
                });
                this.hourly = [];
                for (var i: number = 0; i < this.historicWeather.length; i++) {
                    this.hourly.push(this.getData(this.historicWeather[i]['hourly']));
                }
                this.ref.detectChanges();
                window.dispatchEvent(new Event('resize'));
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

    update() {
        this.ref.detectChanges();
    }

    getData(hourly: any[]) {
        var data = {
            'name': 'Temperature',
            'series': hourly.map(function (x: any) {
                return {
                    "name": new Date(x['time'] * 1000).toLocaleTimeString(),
                    "value": x['temperature']
                }
            })
        }
        return [data];
    }
}