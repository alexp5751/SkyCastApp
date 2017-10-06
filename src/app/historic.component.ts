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
    historicWeather: object = {};

    constructor(private darkskyService: DarkSkyService, private ref: ChangeDetectorRef) {
        this.subscription = darkskyService.weatherUpdated$.subscribe(
            res => {
                this.historicWeather = res['currently'];
                console.log(this.historicWeather);
                ref.detectChanges();
            });
    }

    ngOnInit() { }
}