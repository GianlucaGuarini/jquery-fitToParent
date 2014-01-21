// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function($) {
	$.fn.fitToParent = function(options) {
		var o = $.extend({
			fitX: true,
			fitY: true,
			fillArea: true,
			allowEnlargement: true,
			parent: null,
			inlcudepadding: true,
			scrollWrapper: false
		}, options);
		$(this).each(function() {
			var $this = $(this),
				imagePosition = {
					top: "auto",
					left: "auto",
					bottom: "auto",
					right: "auto"
				},
				// this value could be assigned to the image trough the data-alignement attribute
				// by default this value is center-center
				alignement = $this.data("alignement") || "center-center";

			var performScale = function() {
				var parent = o.parent || $this.parent(),
					parentWidth = o.inlcudepadding ? parent.innerWidth() : parent.width(),
					parentHeight = o.inlcudepadding ? parent.innerHeight() : parent.height(),
					originalSize = $this.data('original-size');
				if (!originalSize) {
					originalSize = {
						width: $this.width(),
						height: $this.height()
					};
					$this.data('original-size', originalSize);
				}

				var currentSize = {
					width: originalSize.width,
					height: originalSize.height
				};

				var scale = 1;
				if (o.fitX && (o.allowEnlargement || currentSize.width > parentWidth)) {
					scale = parentWidth / currentSize.width;
					currentSize.width = Math.floor(currentSize.width * scale) + 1;
					currentSize.height = Math.floor(currentSize.height * scale) + 1;
				}
				if (o.fitY) {
					var doScale = o.fillArea ? currentSize.height < parentHeight : currentSize.height > parentHeight,
						newScale = parentHeight / currentSize.height;

					//if (o.allowEnlargement) doScale = newScale > scale;
					if (doScale) {
						currentSize.width = Math.floor(currentSize.width * newScale) + 1;
						currentSize.height = Math.floor(currentSize.height * newScale) + 1;
						scale = newScale;
					}
				}

				// Deciding where to allign the image
				switch (alignement) {
					case "left-top":
						imagePosition.top = 0;
						imagePosition.left = 0;
						break;
					case "center-top":
						imagePosition.top = 0;
						imagePosition.left = Math.round((parentWidth - currentSize.width) / 2);
						break;
					case "right-top":
						imagePosition.top = 0;
						imagePosition.right = 0;
						break;
					case "left-center":
						imagePosition.top = Math.round((parentHeight - currentSize.height) / 2);
						imagePosition.left = 0;
						break;
					case "center-center":
						imagePosition.top = Math.round((parentHeight - currentSize.height) / 2);
						imagePosition.left = Math.round((parentWidth - currentSize.width) / 2);
						break;
					case "right-center":
						imagePosition.top = Math.round((parentHeight - currentSize.height) / 2);
						imagePosition.right = 0;
						break;
					case "left-bottom":
						imagePosition.bottom = 0;
						imagePosition.left = 0;
						break;
					case "center-bottom":
						imagePosition.bottom = 0;
						imagePosition.left = Math.round((parentWidth - currentSize.width) / 2);
						break;
					case "right-bottom":
						imagePosition.bottom = 0;
						imagePosition.right = 0;
						break;
					default:
						imagePosition.top = Math.round((parentHeight - currentSize.height) / 2);
						imagePosition.left = Math.round((parentWidth - currentSize.width) / 2);
				}
				if (o.scrollWrapper) {
					$this.css({
						width: currentSize.width,
						height: currentSize.height
					});
					parent.prop({
						scrollLeft: -imagePosition.left,
						scrollTop: -imagePosition.top
					});
				} else {
					$this.css({
						top: imagePosition.top,
						left: imagePosition.left,
						bottom: imagePosition.bottom,
						right: imagePosition.right,
						width: currentSize.width,
						height: currentSize.height
					});
				}

			};

			if ($this[0].tagName.toLowerCase() === 'img' && !$this[0].width) {
				$this[0].onload = performScale;
			} else {
				performScale();
			}
		});
	};
})(jQuery);
