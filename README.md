# Timeless Picker
## Intro

Timeless Picker is an out-of-the-box, highly-customizable, infinite wheel (time) picker for Angular 
application.

### Demo can be found here: [insert link]

The main goal of this project is to provide a general-purpose *infinite*-scroll wheel picker 
(ios-style), with a larger focus on time-pickers. I couldn't find any free infinite-scroll 
time pickers for Angular, so I decided to create one. And although there already exist 
general infinite-scroll packages, they however use lazy-loading techniques, which keep dynamically 
adding new elements to the DOM. This has many possible downsides, among which is 
decreased performance.

This project, on the other hand, mocks scrolling mathematically and programmatically, without 
adding any dynamically adding any new elements.


### Components

1) Base-picker: can be used in any situation where you need to display options for selection in 
   a scrollable wheel style.


2) Time-picker: you can build with it any time-selection component with any format and several 
   built-in styling options. It can also be flexibly customized beyond what's provided.

# How to use?

## Base-Picker:
### Basic 

[Add basic information on how to embed in html]

### Properties

| Property           | Input type                                                   | Default value    | Purpose                                                                                                                                                                                     |
|--------------------|--------------------------------------------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| infiniteWheelStyle | boolean                                                      | true             | An infinite wheel (true) means that items can be scrolled in an infinite loop. Otherwise (false), it's a picker bounded by itsfirst and last items.                                         |
| size               | 'xsmall',<br>'small',<br>'medium',<br>'large',<br>'xlarge'   | 'medium'         | The size of the picker. If you wish to customize the size, see this [add link].                                                                                                             |
| enableOpacity      | boolean                                                      | true             | Adds a gradient (fading) opacity for the items before and after the middle item. This creates the curvature illusion of a wheel.                                                            |
|                    |                                                              |                  |                                                                                                                                                                                             |
| displayData        | string[  ]                                                   | empty array: [ ] | A list of the data to display, ordered relatively - i.e. items ordered relative to each other, and not necessarily according to how they are displayed on the wheel.                        |
| selectedItemIndex  | number                                                       | 0                | The index of the item the user wishes to display in the middle upon initialization. The indexof the item within the displayData list. E.g.: [a,b,c,d,e] -> 1 displays item b in the middle. |
| visibleItemsCount  | number:<br> 3 &#124; 5 &#124; 7 &#124; 9                     | 7                | How many items are displayed on the wheel/picker. Must be odd so that the selection is in the middle of the wheel. The range restriction is for aesthetics purposes.                        |
|                    |                                                              |                  |                                                                                                                                                                                             |
| enableMouseWheel   | boolean                                                      | false            | Enables scrolling using the mouse wheel (relevant only for web apps).                                                                                                                       |


### Events

