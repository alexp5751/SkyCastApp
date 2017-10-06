import { Component, OnInit } from '@angular/core';
import { DarkSkyService } from './darksky.service'
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'currently',
    templateUrl: 'currently.component.html'
})

export class CurrentlyComponent implements OnInit {
    subscription: Subscription;
    currentWeather: object = {};

    constructor(private darkskyService: DarkSkyService, private ref: ChangeDetectorRef) {
        this.subscription = darkskyService.weatherUpdated$.subscribe(
            res => {
                this.currentWeather = res['currently'];
                ref.detectChanges();
                console.log(this.currentWeather);
            });
    }

    ngOnInit() { }
}