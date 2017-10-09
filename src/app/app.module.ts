import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatTabsModule, MatTableModule, MatExpansionModule, MatGridListModule, MatSelectModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map.component';
import { WeatherComponent } from './weather.component';
import { CurrentlyComponent } from './currently.component';
import { HistoricComponent } from './historic.component';
import { ForecastComponent } from './forecast.component';
import { ChartsComponent } from './charts.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    WeatherComponent,
    CurrentlyComponent,
    HistoricComponent,
    ForecastComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
