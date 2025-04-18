(function (angular) {
    'use strict';
    debugger;
    var mod = angular.module('ngPrint', []);

    function printDirective() {
        debugger;
        var printSection = document.getElementById('printSection');

        // if there is no printing section, create one
        if (!printSection) {
            printSection = document.createElement('div');
            printSection.id = 'printSection';
            document.body.appendChild(printSection);
        }
        
        function link(scope, element, attrs) {
            debugger;
            element.on('click', function () {
                var elemToPrint = document.getElementById(attrs.printElementId);
                if (elemToPrint) {
                    printElement(elemToPrint);
                }
            });

            if (window.matchMedia) {
                debugger;
                var mediaQueryList = window.matchMedia('print');
                mediaQueryList.addListener(function(mql) {
                    if (!mql.matches) {
                        afterPrint();
                    } else {
                        // before print (currently does nothing)
                    }
                });
            }

            window.onafterprint = afterPrint;
        }

        function afterPrint() {
            debugger;
            // clean the print section before adding new content
            printSection.innerHTML = '';
        }

        function printElement(elem) {
            debugger;
            // clones the element you want to print
            var domClone = elem.cloneNode(true);
            printSection.innerHTML = '';
            printSection.appendChild(domClone);
            window.print();
        }

        return {
            link: link,
            restrict: 'A'
        };
    }

    mod.directive('ngPrint', [printDirective]);
}(window.angular));
