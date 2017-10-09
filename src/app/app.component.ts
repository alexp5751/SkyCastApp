import { Component } from '@angular/core';
import { LocationUpdateService } from './locationupdate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [LocationUpdateService]
})
export class AppComponent {
  title: string = 'SkyCast App';

  constructor() { }
}
