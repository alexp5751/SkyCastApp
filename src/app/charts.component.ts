import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'charts',
    templateUrl: 'charts.component.html'
})

export class ChartsComponent implements OnInit, OnChanges {
    @Input() data: object[];
    temperatures: any[];
    pcpChances: any[];

    // universal options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    autoScale = true;

    // temperature options
    tempXAxisLabel = 'Date';
    tempYAxisLabel = 'Temperature';
    tempColorScheme = {
        domain: ['#FF4C4C', '#4C4CFF', '#FF9999', '#9999FF']
    };

    // precipChance options
    pcpXAxisLabel = 'Date';
    pcpYAxisLabel = 'Precipitation Chance'
    pcpColorScheme = {
        domain: ['#000066', '#CCCCFF']
    }

    constructor() { }

    onSelect(event) {
        //console.log(event);
    }

    ngOnInit() { }

    ngOnChanges() {
        this.temperatures = this.buildTemperatures();
        this.pcpChances = this.buildPcpChances();

    }

    buildTemperatures() {
        var highTemperatures = {
            "name": "High Temperatures",
            "series": this.data.map(function (x: any) {
                var item = {
                    "name": new Date(x['time'] * 1000).toLocaleDateString(),
                    "value": x['temperatureHigh']
                };
                return item;
            })
        }
        var lowTemperatures = {
            "name": "Low Temperatures",
            "series": this.data.map(function (x: any) {
                var item = {
                    "name": new Date(x['time'] * 1000).toLocaleDateString(),
                    "value": x['temperatureLow']
                };
                return item;
            })
        }
        var apparentHighTemperatures = {
            "name": "Apparent High Temperatures",
            "series": this.data.map(function (x: any) {
                var item = {
                    "name": new Date(x['time'] * 1000).toLocaleDateString(),
                    "value": x['apparentTemperatureHigh']
                };
                return item;
            })
        }
        var apparentLowTemperatures = {
            "name": "Apparent Low Temperatures",
            "series": this.data.map(function (x: any) {
                var item = {
                    "name": new Date(x['time'] * 1000).toLocaleDateString(),
                    "value": x['apparentTemperatureLow']
                };
                return item;
            })
        }
        return [highTemperatures, lowTemperatures, apparentHighTemperatures, apparentLowTemperatures];
    }

    buildPcpChances() {
        var chances = {
            "name": "Precipitation Chance",
            "series": this.data.map(function (x: any) {
                var item = {
                    "name": new Date(x['time'] * 1000).toLocaleDateString(),
                    "value": x['precipProbability']
                }
                return item;
            })
        }
        var humidity = {
            "name": "Humidity",
            "series": this.data.map(function (x: any) {
                var item = {
                    "name": new Date(x['time'] * 1000).toLocaleDateString(),
                    "value": x['humidity']
                }
                return item;
            })
        }
        return [chances, humidity];
    }
}