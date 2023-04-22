import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timeless-picker';
  timeChangeIso(newTime: string) {
    console.log(`new iso time:`, newTime);
  }

  timeChangeSimple(newTime: string) {
    console.log(`new simple time:`, newTime);
  }
}
