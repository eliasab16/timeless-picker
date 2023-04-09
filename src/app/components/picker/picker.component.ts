import {Component, OnInit} from '@angular/core';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {
  cumulativeVelocity: number = 0;
  // A normalized, cumulative measurement of user swipe distance to compare against the
  // distThreshold to determine actual movement of the picker. The speed of user swiping is
  // factored in. After an actual movement is triggered, the value is reset to zero.
  movementMeasure: number = 0;
  // A threshold that divides the movement measurement to control actual picker movement.
  distThreshold = 550;
  // how many digits are displayed on the wheel. Should be one of (3, 5, 7).
  numberDigitsShow = 7;
  middleIndex = (this.numberDigitsShow - 1) / 2;

  constructor() {
    this.moveWheelUp = this.moveWheelUp.bind(this);
    this.moveWheelDown = this.moveWheelDown.bind(this);
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

  opacityMap: { [key: number]: number } = {
    0: 0.2,
    6: 0.2,
    1: 0.35,
    5: 0.35,
    2: 0.5,
    4: 0.5,
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
  // todo: sensitivity parameters interface for user to tune
  transition(direction: number, event: any) {
    const factor = this.speedFactor(event.velocityY);
    this.movementMeasure += event.distance * factor;
    if (this.movementMeasure > this.distThreshold) {
      const times = Math.round(this.movementMeasure / this.distThreshold);
      this.movementMeasure = 0;
      if (direction === 0) {
        this.callFor(this.moveWheelUp, times);
      } else {
        this.callFor(this.moveWheelDown, times);
      }
    }
  }

  callFor(fn: any, times: number, timeout?: number) {
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        fn();
      }, timeout ? timeout * i : 0);
    }
  }


  moveWheelUp() {
    this.components.forEach((c) => {
      c.order = (c.order % 24) + 1;
    })
  }

  moveWheelDown() {
    this.components.forEach((c) => {
      c.order = ((c.order -2 + 24) % 24 + 1);
    })
  }

  numberClicked(index: number) {
    if (index < this.numberDigitsShow) {
      if (index < this.middleIndex) {
        this.callFor(this.moveWheelDown, this.middleIndex - index, 90);
      } else if (index > this.middleIndex) {
        this.callFor(this.moveWheelUp, index - this.middleIndex, 90);
      }
    }
  }

  private speedFactor(velocity: number) {
    // this bounded function rewards high scroll speeds by returning > 1 factors and penalizes slow
    // speeds with < 1 values. Used to factor the movement distance calculation. The idea is to
    // improve user experience with variable scrolling speeds.
    // const factor = 8 / (1 + Math.exp(6 - Math.abs(velocity)));
    const factor = Math.exp(Math.abs(velocity)-1);
    return Math.min(Math.max(factor, 0.25), 8);
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
