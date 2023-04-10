import {Component, OnInit} from '@angular/core';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {
  cumulativeVelocity: number = 0;
  totalDistance: number = 0;
  distThreshold = 550;

  constructor() {
    this.onPanUp = this.onPanUp.bind(this);
    this.onPanDown = this.onPanDown.bind(this);
  }

  ngOnInit() {
    const element = document.getElementById('picker');
    if (!element) return;

    const mc = new Hammer.Manager(element);
    const pan = new Hammer.Pan({
      direction: Hammer.DIRECTION_VERTICAL,
      threshold: 5,
    });
    mc.add(pan);
    mc.on('panup', (event: any) => {
      this.transition(0, event);
    });
    mc.on('pandown', (event: any) => {
      this.transition(1, event);
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
    { order: 12 },
    { order: 13 },
    { order: 14 },
    { order: 15 },
    { order: 16 },
    { order: 17 },
    { order: 18 },
    { order: 19 },
    { order: 20 },
    { order: 21 },
    { order: 22 },
    { order: 23 },
    { order: 24 }
  ];

  //  direction: 0 -> up, 1 -> down
  transition(direction: number, event: any) {
    const factor = this.speedFactor(event.velocityY);
    console.log(`factor`, factor);
    this.totalDistance += event.distance * factor;
    if (this.totalDistance > this.distThreshold) {
      const times = Math.round(this.totalDistance / this.distThreshold);
      // const factoredTimes = Math.round(times * this.speedFactor(event.velocityY));
      if (times > 1) {
        console.log(`factored times:`, times);
      }
      this.totalDistance = 0;
      if (direction === 0) {
        this.callFor(this.onPanUp, times);
      } else {
        this.callFor(this.onPanDown, times);
      }
    }
  }

  callFor(fn: any, times: number) {
    for (let i = 0; i < times; i++) {
      fn();
    }
  }

  private speedFactor(velocity: number) {
    // this bounded function rewards high scroll speeds by returning > 1 factors and penalizes slow
    // speeds with < 1 values. Used to factor the movement distance calculation. The idea is to
    // improve user experience with variable scrolling speeds.
    // const factor = 8 / (1 + Math.exp(6 - Math.abs(velocity)));
    const factor = Math.exp(Math.abs(velocity)-2);
    return Math.min(Math.max(factor, 0.25), 8);
  }

  onPanUp() {
    this.components.forEach((c) => {
      c.order = (c.order % 12) + 1;
    })
  }

  onPanDown() {
    this.components.forEach((c) => {
      c.order = ((c.order -2 + 12) % 12) + 1;
    })
  }

  private debounce = (fn: any) => {
    const time = 20;
    const threshold = 2.2;
    let timeout: any;

    return function(this: any, event: any) {
      console.log(`distance`, event.distance);
      const currentSpeed = Math.abs(event.velocityY);
      this.cumulativeVelocity += currentSpeed * (Math.exp(2*currentSpeed) - 1);

      const functionCall = () => fn.call(this, event);
      clearTimeout(timeout);

      if (this.cumulativeVelocity > threshold) {
        this.cumulativeVelocity = 0;
        functionCall();
      } else {
        timeout = setTimeout(functionCall, time);
      }
    }.bind(this); // bind this to the class instance
  }
}
