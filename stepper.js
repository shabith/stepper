/*
|--------------------------------------------------------------------------
| ui-stepper Module
|--------------------------------------------------------------------------
|
| Creates a simple a simple numeric step input.
| Bootstrap friendly.
|
|   @package	ui-step-number
|   @item		Angular Directive
|   @category	Angular Module
|   @author		Vlad Blindu
|   @link		http://www.blinduben.ro
*/


angular.module("ui.stepper", ['ui.stepnumber', 'ui.stepdate']);



angular.module("ui.stepnumber", [])

.directive('stepNumber',['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        require:"ngModel",
        scope:{},
        template:'\
            <ng-form name="stepNumberForm" class="form-inline" novalidate>\
                <div class="step-number"\
                    ng-class="{\'fake-focus\':editFocus}">\
                    <span class="input-group-btn">\
                        <button class="btn btn-primary btn-xs"\
                        type="button"\
                        ng-disabled="incDisable"\
                        ng-click="inc()"><i class="glyphicon glyphicon-plus"></i></button>\
                    </span>\
                    <input type="text"\
                    ng-style="setWidth()"\
                    name="value"\
                    ng-model="value"\
                    ng-focus="selectAll($event)"\
                    ng-blur="validate($event)"\
                    ng-keyUp="key($event)"\
                    class="input-xs">\
                    <span class="input-group-btn">\
                        <button class="btn btn-primary btn-xs"\
                                type="button"\
                                ng-disabled="decDisable"\
                                ng-click="dec()"><i class="glyphicon glyphicon-minus"></i></button>\
                    </span>\
                </div>\
            </ng-form>',

        link:function(scope,element,attrs, ngModelCtrl){

            var max = parseInt(attrs.max,10);
            var min = parseInt(attrs.min,10);

            console.log(max, min)

            var input = scope.stepNumberForm.value;

            scope.$watch(ngModelCtrl,
                    function(){
                        scope.value = ngModelCtrl.$viewValue;
                        lastValidValue = !isNaN(scope.value) ? scope.value : max ? max : min ? scope.min : 0 ;
                        initValue = lastValidValue;
                        scope.initValue = true;
                    });

            scope.incDisable = false;
            scope.decDisable = false;

            scope.editFocus = false;

            scope.setWidth = function(){
                    var width = attrs.max ? attrs.max.length : 2;
                    width =8 + width*8;
                    return {width:width.toString()+'px'};
            }

            input.$parsers.unshift(function (inputValue) {
                var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' '); }).join('');
                input.$viewValue = digits;
                input.$render();
                return digits;
            });

            scope.inc = function(){
                var num = parseInt(scope.value,10);
                if(!isNaN(max)) {
                    if( num < max ) {
                        num++;
                        scope.incDisable = false;
                    }
                    if (num > min) scope.decDisable = false;
                    if (num == max) scope.incDisable = true;
                }
                else num++;
                scope.value = num.toString().length<2 ? '0'+num.toString() : num.toString();
                ngModelCtrl.$setViewValue(scope.value);
                ngModelCtrl.$render();
            }

            scope.dec = function(){
                var num = parseInt(scope.value,10);
                if(!isNaN(min)) {
                    if( num > min) {
                        num--;
                        scope.decDisable = false;
                    } else scope.decDisable = true;
                    if (num < scope.max) scope.incDisable = false;
                    if (num == min) scope.decDisable = true;
                }
                else num--;
                scope.value = num.toString().length<2 ? '0'+num.toString() : num.toString();
                ngModelCtrl.$setViewValue(scope.value);
                ngModelCtrl.$render();
            }

            scope.validate = function($event){
                scope.editFocus = false;
                var val = parseInt(scope.value,10);
                if(isNaN(val)) scope.value = lastValidValue;
                else {

                    if (val<min) {
                        scope.value = min.toString();
                        scope.decDisable = true;
                        scope.incDisable = false;
                    }
                    if (val>max) {
                       scope.value = max.toString();
                       scope.incDisable = true;
                       scope.decDisable = false;
                    }
                    lastValidValue = scope.value;
                }
                ngModelCtrl.$setViewValue(scope.value);
                ngModelCtrl.$render();
            }

            scope.selectAll = function($event){
                scope.editFocus = true;
                $timeout(function(){
                    $event.target.select();
                },0);
            }

            scope.key = function($event){
                switch($event.keyCode){
                    case 27:
                        scope.value = initValue;
                        ngModelCtrl.$setViewValue(scope.value);
                        ngModelCtrl.$render();
                        element.blur();
                        break;
                    case 13:
                        scope.validate($event);
                        $timeout(function(){
                            scope.editfocus=false;},0);
                        break;
                }
            }
        }
    }
}]);

angular.module("ui.stepdate", ['ui.stepnumber'])

.directive('stepDate',['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        scope:{},
            require:"ngModel",
        template:'\
            <ng-form name="stepDateForm" class="form-inline" novalidate>\
                <table>\
                    <tr>\
                        <td>\Day:</td>\
                        <td>\Month:</td>\
                        <td>\Year:</td>\
                    <tr>\
                        <td>\
                            <step-number\
                                name="day"\
                                ng-model="stepDate.day"\
                                ng-change="refresh()"\
                                max="31"\
                                min="1">\
                            </step-number>\
                        </td>\
                        <td>\
                            <step-number\
                                name="month"\
                                ng-model="stepDate.month"\
                                ng-change="refresh()"\
                                max="12"\
                                min="1">\
                            </step-number>\
                        </td>\
                        <td>\
                            <step-number\
                                name="year"\
                                ng-model="stepDate.year"\
                                ng-change="refresh()"\
                                max="3000"\
                                min="2000">\
                            </step-number>\
                        </td>\
                    <tr>\
                </table>\
            </ng-form>',

        link:function(scope,element,attrs, ngDateModelCtrl){
            scope.stepDate = {};
            scope.$watch(ngDateModelCtrl.$viewValue, function(){
                    scope.stepDate.day = ngDateModelCtrl.$viewValue.split('-')[2];
                    scope.stepDate.month = ngDateModelCtrl.$viewValue.split('-')[1];
                    scope.stepDate.year = ngDateModelCtrl.$viewValue.split('-')[0];
                    scope.stepDateForm.day.$setViewValue(scope.stepDate.day);
                    scope.stepDateForm.month.$setViewValue(scope.stepDate.month);
                    scope.stepDateForm.year.$setViewValue(scope.stepDate.year);
                });

            scope.refresh = function(){
                ngDateModelCtrl.$setViewValue(scope.stepDate.year + '-' +
                                            scope.stepDate.month + '-' +
                                            scope.stepDate.day);
                ngDateModelCtrl.$render();
            }
        }
    }
}]);
