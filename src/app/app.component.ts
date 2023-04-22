import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timeless-picker';
  timeChangeIso(newTime: string) {
    const time = new Date(newTime);
    console.log(`new iso time:`, time.getHours(), time.getMinutes(), time.getSeconds());
  }

  timeChangeSimple(newTime: string) {
    console.log(`new simple time:`, newTime);
  }
}
