Angular - stepper
=================

A simple step numeric input written with angular and bootstrap styling. It also contains a simple date input element 
if you don't want to use the bootstrap's datepicker.
No JQuery needed, no extra dependency needed.

Being writen by someone that does this as a hobby, it sure needs a lot of inprovments and also testing outside webkit.
I can't imagine what IE does with it and, to tell you the truth, using IE should get you ashamed not angry because 
of impropper rendering.

The library contains two directives:

1 step-number
usage: 
    <step-number ng-model="yourVar" max="youMaxValue" min = "yourMinValue"></step-number>

2 step-date
usage: 
    <step-date ng-model="yourDate"></step-date>
    
It has no support for ESC, ENTER (+/-) and (up/down) keys yet. I plan adding this feature in the near future.

Enjoy!
