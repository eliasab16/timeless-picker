import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {
  @ViewChild('wheel', { static: true, read: ElementRef }) wheel: ElementRef = {} as ElementRef;
  // How many items are displayed on the wheel. Must be odd so that the selection is in the middle
  // of the wheel
  @Input() visibleItemsCount = 7;
  // Enables scrolling using the mouse wheel
  @Input() enableMouseWheel = true;
  // A list of the data to display, ordered relatively - i.e. items ordered relative to each
  // other, and not necessarily according to how they are displayed on the wheel.
  @Input() displayData: string[] = [];
  // The index of the item the user wishes to display in the middle upon initialization. The index
  // of the item within the displayData list.
  @Input() selectedItemIndex: number = 0;
  // An infinite wheel means that items can be scrolled in an infinite loop (the user can scroll
  // past the last item and before the first item). Otherwise, it's a picker bounded by it's
  // first and last items.
  @Input() infiniteWheelStyle: boolean = true;
  // Number of items in input data
  itemsCount: number = 0;
  cumulativeVelocity: number = 0;
  // A normalized, cumulative measurement of user swipe distance to compare against the
  // distThreshold to determine actual movement of the picker. The speed of user swiping is
  // factored in. After an actual movement is triggered, the value is reset to zero.
  movementMeasure: number = 0;
  // A threshold that divides the movement measurement to control actual picker movement.
  distThreshold = 550;
  // The index (relative to the number of visible items on the picker
  wheelMiddleIndex = 0;
  // The number of items/numbers to be available for selection
  range: number[] = [];
  // Maps order (as displayed to the user - or wheel index) to the item-id (the index of the
  // item within the input data list - which in turn is mapped to displayed values).
  orderMapping: {[key: number]: number} = {};
  valueMapping: {[key: number]: string} = {};

  constructor() {
    this.moveWheelUp = this.moveWheelUp.bind(this);
    this.moveWheelDown = this.moveWheelDown.bind(this);
  }

  ngOnInit() {
    // Ensures that the selected item index is not beyond the range of the number of items.
    this.selectedItemIndex %= this.displayData.length;
    this.wheelMiddleIndex = (this.visibleItemsCount - 1) / 2;
    if (!this.infiniteWheelStyle) {
      this.displayData = this.adaptDataForBoundedStyle();
    }
    this.itemsCount = this.displayData.length;
    this.range = Array.from({ length: this.visibleItemsCount }, (_, i) => i);
    this.range.map(num => {
      this.orderMapping[num] = num;

    });
    this.adjustItemsOrder();

    const mc = new Hammer.Manager(this.wheel.nativeElement);
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
    if (!this.infiniteWheelStyle && this.orderMapping[this.wheelMiddleIndex] === (this.displayData.length-this.wheelMiddleIndex-1)) {
      return;
    }
    for (let i = 0; i < this.visibleItemsCount; i++) {
      this.orderMapping[i] = (this.orderMapping[i] + 1) % this.itemsCount;
    }
  }

  moveWheelDown() {
    if (!this.infiniteWheelStyle && this.orderMapping[this.wheelMiddleIndex] === this.wheelMiddleIndex) {
      return;
    }
    for (let i = 0; i < this.visibleItemsCount; i++) {
      this.orderMapping[i] = ((this.orderMapping[i] - 1 + this.itemsCount) % this.itemsCount);
    }
  }

  // Scroll the wheel to the clicked number, with animation.
  numberClicked(index: number) {
    if (index < this.visibleItemsCount) {
      if (index < this.wheelMiddleIndex) {
        this.callFor(this.moveWheelDown, this.wheelMiddleIndex - index, 90);
      } else if (index > this.wheelMiddleIndex) {
        this.callFor(this.moveWheelUp, index - this.wheelMiddleIndex, 90);
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

  getSelection() {
    return this.orderMapping[this.wheelMiddleIndex];
  }
  opacityMap: { [key: number]: number } = {
    0: 0.15,
    6: 0.15,
    1: 0.35,
    5: 0.35,
    2: 0.5,
    4: 0.5,
  }

  onMouseWheel(event: any) {
    if (this.enableMouseWheel) {
      if (event.deltaY > 0) {
        this.moveWheelDown();
      } else if (event.deltaY < 0) {
        this.moveWheelUp();
      }
    }
  }

  adjustItemsOrder() {
    // The number of steps needed to move the target item (specified by the user) to the middle
    // of the wheel.
    const distance = this.wheelMiddleIndex - this.selectedItemIndex;
    const offset = ((- distance % this.itemsCount) + this.itemsCount) % this.itemsCount;
    for (let i = 0; i < this.itemsCount; i++) {
      this.orderMapping[i] = (this.orderMapping[i] + offset) % this.itemsCount;
    }
  }

  // Adds padding (or empty placeholder items) to the beginning and end of the input data list
  // if the user chooses the bounded wheel mode. This allows the wheel to scroll the first and
  // last items.
  adaptDataForBoundedStyle(): string[] {
    const paddingCount = Math.floor(this.visibleItemsCount / 2);
    const emptyPaddingArray = Array(paddingCount).fill('');
    this.selectedItemIndex += paddingCount;
    return emptyPaddingArray.concat(this.displayData, emptyPaddingArray);
  }
}
