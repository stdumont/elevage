/**
 * Directive permettant de rendre une div loadable.
 * Attention : les classe CSS overlay, loadable et loadable-hidden doivent être préalablement définie
 * 
    .loadable {
        position:relative;
    }
    .loadable > .overlay,
    .overlay-wrapper > .overlay,
    .loadable > .loading-img,
    .overlay-wrapper > .loading-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .loadable .overlay,
    .overlay-wrapper .overlay {
      z-index: 50;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 3px;
    }
    .loadable .overlay > .fa,
    .overlay-wrapper .overlay > .fa {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -15px;
      margin-top: -15px;
      color: #000;
      font-size: 30px;
    }
    .loadable .overlay.dark,
    .overlay-wrapper .overlay.dark {
      background: rgba(0, 0, 0, 0.5);
    }

    .overlay {
        cursor: wait;
    }
 * 
 * @author Adrien Dessilly
 */
angular.module('elevageApp').directive('ngLoadable', function() {

    return {
        restrict: 'A', //attribute

        scope: {
            ngLoadable: '=',
        },

        link: function(scope, element, attrs) {

            scope.setLoading = function(loading) {
                if (loading) {
                    $(element).children('.overlay').removeClass('loadingHidden');
                } else {
                    $(element).children('.overlay').addClass('loadingHidden');
                }
            };

            $(element).addClass('loadable');
            element.append(
                '<div class="loadingHidden overlay">' +
                '<i class="fa fa-refresh fa-spin"></i>' +
                '</div>'
            );

            scope.$watch('ngLoadable', function(newVal, oldVal) {
                scope.setLoading(newVal);
            });
        }
    };

});


angular.module('elevageApp').directive('ngLoadableCell', function() {

    return {
        restrict: 'A', //attribute

        scope: {
            ngLoadableCell: '=',
        },

        link: function(scope, element, attrs) {

            scope.setLoading = function(loading) {
                if (loading) {
                    $(element).children('.overlay').removeClass('loadingHidden');
                } else {
                    $(element).children('.overlay').addClass('loadingHidden');
                }
            };

            $(element).addClass('loadable');
            element.append(
                '<div class="loadingHidden overlay">' +
                '<i class="fa fa-refresh fa-spin" style="font-size:15px;margin-top:-8px;margin-left:-8px;"></i>' +
                '</div>'
            );

            scope.$watch('ngLoadableCell', function(newVal, oldVal) {
                scope.setLoading(newVal);
            });
        }
    };

});