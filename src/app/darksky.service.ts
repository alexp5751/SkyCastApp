import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DarkSkyService {
    private weatherUpdatedSource = new Subject<object>();
    weatherUpdated$ = this.weatherUpdatedSource.asObservable();

    constructor(private http: HttpClient) { }

    updateWeather(latitude: number, longitude: number) {
        this.http.get('/api/weather/' + latitude + ',' + longitude).subscribe(
            weather => {
                console.log(weather);
                this.weatherUpdatedSource.next(weather);
            },
            err => {
                console.log(err);
            });
    }
}