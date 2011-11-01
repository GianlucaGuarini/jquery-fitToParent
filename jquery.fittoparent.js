// Copyright (c) 2011 Brian Reavis

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
			allowEnlargement: false
		}, options);

		$(this).each(function() {
			var $this = $(this);

			var parent = $this.parent();
			var parentWidth = parent.innerWidth();
			var parentHeight = parent.innerHeight();

			var originalSize = $this.data('original-size');
			if (!originalSize) {
				originalSize = {
					width:  $this.width(),
					height: $this.height()
				};
				$this.data('original-size', originalSize);
			}

			var currentSize = {
				width:  originalSize.width,
				height: originalSize.height
			};

			var scale = 1;
			if (o.fitX && (o.allowEnlargement || currentSize.width > parentWidth)) {
				scale = parentWidth / currentSize.width;
				currentSize.width = Math.floor(currentSize.width * scale);
				currentSize.height = Math.floor(currentSize.height * scale);
			}

			if (o.fitY && (o.allowEnlargement || currentSize.height > parentHeight)) {
				var newScale = parentHeight / currentSize.height;
				if (o.allowEnlargement ? (newScale > scale) : true) {
					currentSize.width = Math.floor(currentSize.width * newScale);
					currentSize.height = Math.floor(currentSize.height * newScale);
					scale = newScale;
				}
			}

			$this.css({
				top: Math.round((parentHeight - currentSize.height) / 2),
				left: Math.round((parentWidth - currentSize.width) / 2),
				width: currentSize.width,
				height: currentSize.height,
				position: 'relative'
			});
		});
	};
})(jQuery);