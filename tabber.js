// ==================
// tabber.js
// Authors: Eric Fortin, Alexia E. Smith
// ==================

(function($) {
	$.fn.tabber = function() {
		return this.each(function() {
			// create tabs
			var $this = $(this),
			    tabContent = $this.children('.tabbertab'),
			    nav = $('<ul>').addClass('tabbernav');
			tabContent.each(function() {
				var anchor = $('<a>').text(this.title).attr('title', this.title).attr('href', 'javascript:void(0);');
				$('<li>').append(anchor).appendTo(nav);
			});
			$this.prepend(nav);

			/**
			 * Internal helper function for showing content
			 * @param  string title to show, matching only 1 tab
			 * @return true if matching tab could be shown
			 */
			function showContent(title) {
				var content = tabContent.filter('[title="' + title + '"]');
				if (content.length !== 1) return false;
				tabContent.hide();
				content.show();
				nav.find('.tabberactive').removeClass('tabberactive');
				nav.find('a[title="' + title + '"]').parent().addClass('tabberactive');
				return true;
			}
			// setup initial state
			showContent(tabContent.first().attr('title'));

			// Repond to clicks on the nav tabs
			nav.on('click', 'a', function(e) {
				var title = $(this).attr('title');
				e.preventDefault();
				showContent(title);
				$(window).scroll();
			});

			$this.addClass('tabberlive');
		});
	};
})(jQuery);

$(document).ready(function() {
	$('.tabber').tabber();
});
