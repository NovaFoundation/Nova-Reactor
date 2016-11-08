(function(window, document, angular, undefined) {
	'use strict';
    
	angular.module('ngSlide', [])
		.value('config', {})
        .directive('slide', ['$timeout', '$rootScope', function($timeout, $rootScope) {
        	return {
        	    restrict: 'EA',
        		scope: {
					onVisible: "&?",
					onInvisible: "&?",
					onRenderable: "&?",
					onUnrenderable: "&?",
					onActive: "&?",
					onInactive: "&?",
					ngModel: "=?"
				},
        		link: function(scope, elements, attrs) {
					var element = d3.select(elements[0]);
					var node = element.node();
        			
					element.classed("slide", true);
					
					$rootScope.scroll = $rootScope.scroll || {};
					
					function refreshSlides(apply) {
						var scroll = document.body.scrollTop;
						var scrollBottom = scroll + $(window).height();
						
						$rootScope.scroll.top = scroll;
						$rootScope.scroll.bottom = scrollBottom;
						
						var y = node.offsetTop;
						var height = node.offsetHeight;
						var distance = Math.abs(scroll - y);
						
						scope.ngModel = scope.ngModel || {};
						
						var slide = scope.ngModel;
						
						var active = distance < 100;
						var visible = y + $(window).height() / 3 < scrollBottom && y + height > scroll;
						var rendering = y - 700 < scrollBottom && y + height + 700 > scroll;
						
						if (active != slide.active) {
							if (active) {
								if (scope.onActive) {
									scope.onActive();
								}
							} else if (scope.onInactive) {
								scope.onInactive();
							}
						}
						if (visible != slide.visible) {
							if (visible) {
								if (scope.onVisible) {
									scope.onVisible();
								}
							} else if (scope.onInvisible) {
								scope.onInvisible();
							}
						}
						if (rendering != slide.rendering) {
							if (rendering) {
								if (scope.onRenderable) {
									scope.onRenderable();
								}
							} else if (scope.onUnrenderable) {
								scope.onUnrenderable();
							}
						}
						
						slide.screenY = y - scroll;
						slide.active = active;
						slide.visible = visible;
						slide.rendering = rendering;
						
						element.classed("active", slide.active)
							.classed("visible", slide.visible)
							.classed("rendering", slide.rendering);
						
						if (apply !== false) {
							scope.$apply();
						}
					}
					
					window.addEventListener("scroll", refreshSlides, false);
					
					refreshSlides(false);
        		}
        	};
        }]).provider('slideConfig', function() {
			var self = this;
			this.config = {};
			this.$get = function() {
				var extend = {};
				extend.config = self.config;
				return extend;
			};
			return this;
		});
})(window, document, angular);