/**
 * Panorama Viewer – Elementor integration.
 *
 * Each Panorama block view script mounts its viewer on DOMContentLoaded and also
 * listens for a "bppiv:mount" event. Elementor renders widgets after page load
 * (in the editor, and inside popups / tabs on the frontend), so whenever one of
 * our widgets becomes ready we fire that event to mount any viewer that has not
 * been mounted yet. Already-mounted viewers are skipped by the view scripts.
 */
( function ( $ ) {
	'use strict';

	var widgets = [
		'bppiv-image-360',
		'bppiv-image-3d',
		'bppiv-video',
		'bppiv-video-360',
		'bppiv-google-street',
		'bppiv-gallery',
		'bppiv-tour',
		'bppiv-virtual-tour',
		'bppiv-product-spot',
		'bppiv-saved-panorama'
	];

	function mountViewers() {
		var event;

		if ( typeof window.CustomEvent === 'function' ) {
			event = new window.CustomEvent( 'bppiv:mount' );
		} else {
			event = document.createEvent( 'CustomEvent' );
			event.initCustomEvent( 'bppiv:mount', false, false, null );
		}

		document.dispatchEvent( event );
	}

	/**
	 * Editor only: Elementor marks a widget as "empty" (and adds a placeholder
	 * icon) when it has no height ~200ms after rendering. Our viewers are drawn
	 * by JavaScript a moment later, so clear that state once they have a size.
	 */
	function clearEmptyState( $scope ) {
		if ( ! window.elementorFrontend.isEditMode || ! window.elementorFrontend.isEditMode() ) {
			return;
		}

		var el = $scope && $scope[ 0 ];
		if ( ! el ) {
			return;
		}

		[ 400, 1000, 2000, 4000 ].forEach( function ( delay ) {
			setTimeout( function () {
				var container = el.querySelector( '.elementor-widget-container' ) || el;

				if ( container.offsetHeight > 0 && el.classList.contains( 'elementor-widget-empty' ) ) {
					el.classList.remove( 'elementor-widget-empty' );
					$( el ).children( '.elementor-widget-empty-icon' ).remove();
				}
			}, delay );
		} );
	}

	function onElementReady( $scope ) {
		mountViewers();
		clearEmptyState( $scope );
	}

	function attachHandlers() {
		widgets.forEach( function ( name ) {
			window.elementorFrontend.hooks.addAction( 'frontend/element_ready/' + name + '.default', onElementReady );
		} );
	}

	if ( window.elementorFrontend && window.elementorFrontend.hooks ) {
		attachHandlers();
	} else {
		$( window ).on( 'elementor/frontend/init', attachHandlers );
	}
} )( jQuery );
