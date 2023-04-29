import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'base-picker',
  templateUrl: './base-picker.component.html',
  styleUrls: ['./base-picker.component.scss']
})
export class BasePickerComponent implements OnInit {
  @ViewChild('wheel', { static: true, read: ElementRef }) wheel: ElementRef = {} as ElementRef;

  // An infinite wheel means that items can be scrolled in an infinite loop (the user can scroll
  // past the last item and before the first item). Otherwise, it's a picker bounded by its
  // first and last items.
  @Input() infiniteWheelStyle = true;
  @Input() size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
  @Input() enableOpacity = true;
  // Draw a box around the middle (selected) element of each picker
  @Input() addBorder = false;


  // How many items are displayed on the wheel. Must be odd so that the selection is in the middle
  // of the wheel
  @Input() visibleItemsCount = 7;
  // A list of the data to display, ordered relatively - i.e. items ordered relative to each
  // other, and not necessarily according to how they are displayed on the wheel.
  @Input() displayData: string[] = [];
  // The index of the item the user wishes to display in the middle upon initialization. The index
  // of the item within the displayData list. E.g.: [a,b,c,d,e] -> 1 displays item b in the middle
  @Input() selectedItemIndex = 0;

  // Enables scrolling using the mouse wheel
  // todo: decide the default value
  @Input() enableMouseWheel = true;

  @Output() newSelectedIndex = new EventEmitter<number>();

  // Number of items in input data
  itemsCount = 0;
  cumulativeVelocity = 0;
  // A normalized, cumulative measurement of user swipe distance to compare against the
  // distThreshold to determine actual movement of the picker. The speed of user swiping is
  // factored in. After an actual movement is triggered, the value is reset to zero.
  movementMeasure = 0;
  // A threshold that divides the movement measurement to control actual picker movement.
  distThreshold = 550;
  // The index (relative to the number of visible items on the picker
  wheelMiddleIndex = 0;
  // A range of the count of visible items, e.g. range = [0 ... 6] if visibleItemsCount = 7
  range: number[] = [];
  // Maps order (as displayed to the user - or wheel index) to the item-id (the index of the
  // item within the input data list - which in turn is mapped to displayed values).
  orderMapping: {[key: number]: number} = {};
  // Opacity for each of the items based on position to give the impression of a 3D.
  opacityMapping: {[key: number]: number} = {}
  indexPaddingSize = 0;

  constructor() {
    this.moveWheelUp = this.moveWheelUp.bind(this);
    this.moveWheelDown = this.moveWheelDown.bind(this);
  }

  ngOnInit() {
    if (this.visibleItemsCount % 2 == 0 || this.visibleItemsCount < 3) {
      throw new Error('Number of visible items must be odd and between 3-9 (inclusive). Consult' +
        ' the documentations for more information.');
    }
    this.visibleItemsCount = Math.min(this.visibleItemsCount, 9);
    // Ensures that the selected item index is not beyond the range of the number of items.
    this.selectedItemIndex %= this.displayData.length;
    // This max is chosen for better aesthetics
    this.wheelMiddleIndex = (this.visibleItemsCount - 1) / 2;
    if (!this.infiniteWheelStyle) {
      this.indexPaddingSize = Math.floor(this.visibleItemsCount / 2);
      this.displayData = this.adaptDataForBoundedStyle();
    }
    this.itemsCount = this.displayData.length;
    this.range = Array.from({ length: this.visibleItemsCount }, (_, i) => i);
    this.range.map(num => {
      this.orderMapping[num] = num;
    });

    this.setOpacityMapping(this.range);
    this.adjustItemsOrder(this.orderMapping);

    // Set up the library that handles swipe/scroll actions
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

  callFor(func: any, times: number, timeout?: number) {
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        func();
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
    this.emitNewSelection();
  }

  moveWheelDown() {
    if (!this.infiniteWheelStyle && this.orderMapping[this.wheelMiddleIndex] === this.wheelMiddleIndex) {
      return;
    }
    for (let i = 0; i < this.visibleItemsCount; i++) {
      this.orderMapping[i] = ((this.orderMapping[i] - 1 + this.itemsCount) % this.itemsCount);
    }
    this.emitNewSelection();
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

  emitNewSelection() {
    this.newSelectedIndex
    .emit(this.orderMapping[this.wheelMiddleIndex - this.indexPaddingSize]);
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

  // Changes the order of the input data to align the user's choice of the initially selected item
  adjustItemsOrder(orderMapping: {[key: number]: number}) {
    // The number of steps needed to move the target item (specified by the user) to the middle
    // of the wheel.
    const distance = this.wheelMiddleIndex - this.selectedItemIndex;
    const offset = ((- distance % this.itemsCount) + this.itemsCount) % this.itemsCount;
    for (let i = 0; i < this.itemsCount; i++) {
      orderMapping[i] = (orderMapping[i] + offset) % this.itemsCount;
    }
  }

  // Adds padding (or empty placeholder items) to the beginning and end of the input data list
  // if the user chooses the bounded wheel mode. This allows the wheel to scroll to the first and
  // last items.
  adaptDataForBoundedStyle(): string[] {
    const emptyPaddingArray = Array(this.indexPaddingSize).fill('');
    this.selectedItemIndex += this.indexPaddingSize;
    return emptyPaddingArray.concat(this.displayData, emptyPaddingArray);
  }

  // Change the opacity (gradually) of the items before and after the selected item to give the
  // impression of a turning wheel.
  setOpacityMapping(range: number[]) {
    for (const index of range) {
      const k = Math.abs(index - this.wheelMiddleIndex);
      const numerator = 1 - Math.pow(Math.sin((index - this.wheelMiddleIndex) / 4), 2);
      const denominator = 1 + k;
      this.opacityMapping[index] = numerator / denominator;
    }
  }
}
