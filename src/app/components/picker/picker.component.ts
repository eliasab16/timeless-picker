import {Component, OnInit} from '@angular/core';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {
  ngOnInit() {
    const element = document.getElementById('picker');
    if (!element) return;

    const mc = new Hammer.Manager(element);
    const swipe = new Hammer.Swipe({ direction: Hammer.DIRECTION_VERTICAL });
    mc.add(swipe);
    mc.on('swipeup', (event: any) => {
      this.onSwipeUp(event);
    });
    mc.on('swipedown', (event: any) => {
      this.onSwipeDown(event);
    });
  }

  components = [
    { order: 1 },
    { order: 2 },
    { order: 3 },
    { order: 4 },
    { order: 5 },
    { order: 6 },
    { order: 7 },
    { order: 8 },
    { order: 9 },
    { order: 10 },
    { order: 11 },
    { order: 12 }
  ];

  onSwipeUp(event: any) {
    console.log(`event up velocity: `, event.velocityY);
    this.components.forEach((c) => {
      c.order = (c.order % 12) + 1;
    })
  }

  onSwipeDown(event: any) {
    console.log(`event down velocity: `, event.velocityY);
    this.components.forEach((c) => {
      c.order = ((c.order -2 + 12) % 12) + 1;
    })
  }
}
