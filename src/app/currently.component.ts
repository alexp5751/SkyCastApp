import { Component, OnInit } from '@angular/core';
import { DarkSkyService } from './darksky.service'
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import 'rxjs/add/observable/of';

@Component({
    selector: 'currently',
    templateUrl: 'currently.component.html'
})
export class CurrentlyComponent implements OnInit {
    subscription: Subscription;
    current: object;
    hourly: Hour[];
    dataSource: HourDataSource;
    displayedColumns = ['time', 'icon', 'temperature', 'precipProbability', 'windSpeed'];

    constructor(private darkskyService: DarkSkyService, private ref: ChangeDetectorRef) {
        this.subscription = darkskyService.weatherUpdated$.subscribe(
            res => {
                this.current = res['forecast']['currently'];
                this.hourly = res['forecast']['hourly']['data'].slice(0, 25);
                this.dataSource = new HourDataSource(this.hourly);
                ref.detectChanges();
            });

    }

    ngOnInit() {

    }

    round(x: number) {
        return Math.round(x);
    }

    prettifyTime(x: number) {
        var time: Date = new Date(x * 1000);
        var prettyTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return prettyTime;
    }
}

interface Hour {
    icon: string;
    apparentTemperature: number;
    precipProbability: number;
    temperature: number;
    time: number;
    windSpeed: number;
}

export class HourDataSource extends DataSource<any> {

    constructor(private hours: Hour[]) {
        super();
    }

    connect(): Observable<Hour[]> {
        return Observable.of(this.hours);
    }

    disconnect() { }
}