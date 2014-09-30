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
        scope:{
            active:"="
        },
        template:'\
            <ng-form name="stepNumberForm" novalidate \>\
                <div class="step-number"\
                    tabindex="{{$id}}"\
                    ng-class="{\'fake-focus\': fakeFocus}"\
                    ng-keyup="keyControl($event)">\
                    <span\
						ng-disabled="incDisable"\
                        class="btn-primary"\
						ng-click="inc()">\
						<i class="glyphicon glyphicon-plus ">\
						</i>\
                    </span>\
                    <div class="stepper-mask">\
                    <input type="text"\
                    ng-style="setWidth()"\
                    name="value"\
                    ng-keyup="keyControl($event)"\
                    ng-model="value"\
                    ng-focus="selectAll($event)"\
                    ng-blur="validate()"\
                    class="input-xs">\
                    </div>\
                    <span\
						ng-disabled="decDisable"\
                        class="btn-primary"\
						ng-click="dec()">\
						<i class="glyphicon glyphicon-minus">\
						</i>\
                    </span>\
                </div>\
            </ng-form>',

        link:function(scope,element,attrs, ngModelCtrl){
			console.log("digits:  "+(!isNaN(parseInt(attrs.digits,10))) );
            var max = parseInt(attrs.max,10),
                min = parseInt(attrs.min,10),
				digits = (!isNaN(parseInt(attrs.digits,10))) ? parseInt(attrs.digits,10) : 1,
                lastValidValue = '';

            var input = scope.stepNumberForm.value;
			var fixedLen = function(num){
				var str = num.toString(),
					len = str.length, blank = "0000000000";
				return len<digits ? blank.substring(0,(digits-len))+str : str;
			}

            scope.$watch(ngModelCtrl,
                    function(){
                        ngModelCtrl.$viewValue = fixedLen(ngModelCtrl.$viewValue);
						scope.value = ngModelCtrl.$viewValue;
                        lastValidValue = scope.value;
                    });

            scope.fakeFocus = false;
            
            scope.incDisable = false;
            scope.decDisable = false;

            scope.setWidth = function(){
                    width =8 + digits*8;

                    console.log('digits:', digits,"    w:",width.toString()+'px');

                    return {width:width.toString()+'px'};
            }

            input.$parsers.unshift(function (inputValue) {
                var digits = inputValue.replace( /[^0-9]+/g, '');
                input.$viewValue = digits;
                input.$render();
                return digits;
            });

            scope.keyControl = function(event){
            	if(event.target.tagName == 'DIV') switch(event.keyCode) {
							case 27:
								var elem = element.find('div');
								scope.value = lastValidValue;
								event.preventDefault();
								$timeout(function(){elem[0].blur();},0);
								break;
							case 13:
								var elem = element.find('div');
								scope.validate();
								event.preventDefault();
								$timeout(function(){elem[0].blur();},0);
								break;
							case 187:
								scope.inc();
								break;
							case 189:
								scope.dec();
								break;
							case 39:
								scope.inc();
								break;
							case 37:
								scope.dec();
								break;
							default:
							event.preventDefault();
						}
            	else switch(event.keyCode) {
                    	case 27:
                        	var elem = element.find('input');
                        	scope.value = lastValidValue;
                        	event.preventDefault();
                        	$timeout(function(){elem[0].blur();},0);
                        	break;
                    	case 13:
                        	var elem = element.find('input');
                        	scope.validate();
                        	event.preventDefault();
                        	$timeout(function(){elem[0].blur();},0);
                        	break;
                    	default:
                        event.preventDefault();
                	}

            }

            scope.inc = function(){
                var num = parseInt(scope.value,10);
                if(!isNaN(min)) {
                    if( num < max) {
                        num++;
                        scope.decDisable = false;
                    }
                    if(num==max) scope.incDisable = true;
                }
                else num++;
                scope.value = fixedLen(num);
                ngModelCtrl.$setViewValue(scope.value);
                ngModelCtrl.$render();
            }

            scope.dec = function(){
                var num = parseInt(scope.value,10);
                if(!isNaN(min)) {
                    if( num > min) {
                        num--;
                        scope.incDisable = false;
                    }
                    if(num==min)scope.decDisable = true;
                }
                else num--;
                scope.value = fixedLen(num);
                ngModelCtrl.$setViewValue(scope.value);
                ngModelCtrl.$render();
            }

            scope.validate = function(){
                scope.fakeFocus = false;
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
                scope.fakeFocus = true;
                $timeout(function(){
                    $event.target.select();
                },0);
            }
        }
    }
 }])

angular.module("ui.stepdate", ['ui.stepnumber'])

.directive('stepDate',['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        scope:{},
            require:"ngModel",
        template:'\
            <ng-form name="stepDateForm" class="form-inline" novalidate>\
                        <div class="step-date">Day:\
                            <step-number\
                                name="day"\
                                ng-model="stepDate.day"\
                                ng-change="refresh()"\
                                max="31"\
                                min="1"\
                                digits="2">\
                            </step-number>\
                        </div>\
                        <div class="step-date">Month:\
                            <step-number\
                                name="month"\
                                ng-model="stepDate.month"\
                                ng-change="refresh()"\
                                max="12"\
                                min="1"\
                                digits="2">\
                            </step-number>\
                        </div>\
                        <div class="step-date">Year:\
                            <step-number\
                                name="year"\
                                ng-model="stepDate.year"\
                                ng-change="refresh()"\
                                max="3000"\
                                min="2000"\
                                digits="4">\
                            </step-number>\
                        </div>\
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
