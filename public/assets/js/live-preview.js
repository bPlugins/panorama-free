/**
 * Live preview for the panorama settings and the WooCommerce product panorama settings.
 * Posts the unsaved settings to the preview URL and shows the result in an iframe.
 */
( function () {
	'use strict';

	var config = window.bppivLivePreview;
	var postbox = document.getElementById( 'bppiv-live-preview' );
	var box = postbox ? postbox.querySelector( '.bppiv-live-preview' ) : null;
	var form = document.getElementById( 'post' );

	if ( ! config || ! box || ! form || ! window.fetch || ! window.FormData ) {
		return;
	}

	var frame = box.querySelector( '.bppiv-live-preview__frame' );
	var status = box.querySelector( '.bppiv-live-preview__status' );
	var prefix = config.metaKey + '[';
	var lastSent = null;
	var timer = null;
	var controller = null;
	var resizeObserver = null;
	var popupObserver = null;
	var popupTimer = null;

	// Status and Refresh go in the box header, so the preview gets the whole box.
	var header = postbox.querySelector( '.postbox-header' );
	var bar = box.querySelector( '.bppiv-live-preview__bar' );
	if ( header && bar ) {
		bar.classList.add( 'is-in-header' );
		header.insertBefore( bar, header.querySelector( '.handle-actions' ) );
	}

	var settingsBox = document.getElementById( config.metaKey );
	var screenOption = document.getElementById( 'bppiv-live-preview-hide' );
	var side = 'side' === config.layout;
	box.classList.add( side ? 'is-side' : 'is-stack' );

	if ( ! side && settingsBox && settingsBox.parentNode && settingsBox.nextElementSibling !== postbox ) {
		// Product page: keep the preview right below the settings box.
		settingsBox.parentNode.insertBefore( postbox, settingsBox.nextSibling );
	}

	var previewEnabled = function () {
		return ! screenOption || screenOption.checked;
	};

	// Panorama settings: the preview sits in the right column, which is widened while it is shown there.
	var syncWideColumn = function () {
		document.body.classList.toggle( 'bppiv-lp-wide', side && previewEnabled() && !! postbox.closest( '#side-sortables' ) );
	};
	syncWideColumn();

	var isOpen = function () {
		return previewEnabled() && ! postbox.classList.contains( 'closed' ) && ! postbox.classList.contains( 'hide-if-js' ) && postbox.offsetParent !== null;
	};

	if ( screenOption ) {
		screenOption.addEventListener( 'change', function () {
			syncWideColumn();
			if ( previewEnabled() ) {
				lastSent = null;
				setTimeout( function () {
					update( true );
				}, 0 );
			}
		} );
	}

	var collect = function () {
		var data = new FormData();
		new FormData( form ).forEach( function ( value, name ) {
			if ( 0 === name.indexOf( prefix ) && 'string' === typeof value ) {
				data.append( name, value );
			}
		} );
		return data;
	};

	var signature = function ( data ) {
		var parts = [];
		data.forEach( function ( value, name ) {
			parts.push( name + '=' + value );
		} );
		return parts.join( '&' );
	};

	// A shown fixed layer that covers most of the frame (hidden tooltips and small buttons do not count).
	var popupOpen = function ( doc, win ) {
		return Array.prototype.some.call( doc.body.querySelectorAll( '*' ), function ( el ) {
			var css = win.getComputedStyle( el );
			if ( 'fixed' !== css.position || 'hidden' === css.visibility || 0 === parseFloat( css.opacity ) ) {
				return false;
			}
			var rect = el.getBoundingClientRect();
			return rect.width >= win.innerWidth * 0.6 && rect.height >= win.innerHeight * 0.6;
		} );
	};

	// Height of the preview content. Measured from the elements, not the document, so the
	// iframe's own height (and fixed popups) never feed back into it.
	var fit = function () {
		try {
			var doc = frame.contentDocument;
			var win = frame.contentWindow;
			if ( ! doc || ! doc.body || ! win ) {
				return;
			}
			var bottom = 0;
			Array.prototype.forEach.call( doc.body.children, function ( el ) {
				if ( /^(SCRIPT|STYLE|LINK|TEMPLATE)$/.test( el.tagName ) || 'fixed' === win.getComputedStyle( el ).position ) {
					return;
				}
				var rect = el.getBoundingClientRect();
				// 1px screen-reader helpers (e.g. WooCommerce's cart live region) do not count.
				if ( rect.height > 1 ) {
					bottom = Math.max( bottom, rect.bottom + win.pageYOffset );
				}
			} );
			var style = win.getComputedStyle( doc.body );
			var height = Math.ceil( bottom + parseFloat( style.paddingBottom || 0 ) );
			// A gallery item opens in a popup that fills the frame: give it room.
			if ( popupOpen( doc, win ) ) {
				height = Math.max( height, Math.round( frame.clientWidth * 0.65 ), 320 );
			}
			frame.style.height = Math.min( Math.max( height, 120 ), 2000 ) + 'px';
		} catch ( e ) {}
	};

	var update = function ( force ) {
		if ( ! isOpen() ) {
			return;
		}

		var data = collect();
		var key = signature( data );
		if ( ! force && key === lastSent ) {
			return;
		}
		lastSent = key;

		data.append( 'post_id', config.postId );
		data.append( '_bppiv_preview_nonce', config.nonce );

		if ( controller ) {
			controller.abort();
		}
		controller = window.AbortController ? new window.AbortController() : null;

		box.classList.add( 'is-loading' );
		postbox.classList.add( 'is-loading' );
		status.textContent = config.i18n.loading;

		window.fetch( config.url, {
			method: 'POST',
			body: data,
			credentials: 'same-origin',
			signal: controller ? controller.signal : undefined,
		} )
			.then( function ( response ) {
				if ( ! response.ok ) {
					throw new Error( response.status );
				}
				return response.text();
			} )
			.then( function ( html ) {
				frame.srcdoc = html;
			} )
			.catch( function ( error ) {
				if ( error && 'AbortError' === error.name ) {
					return;
				}
				lastSent = null;
				box.classList.remove( 'is-loading' );
				postbox.classList.remove( 'is-loading' );
				status.textContent = config.i18n.error;
			} );
	};

	var schedule = function () {
		clearTimeout( timer );
		timer = setTimeout( function () {
			update( false );
		}, 700 );
	};

	frame.addEventListener( 'load', function () {
		if ( ! frame.srcdoc ) {
			return;
		}
		box.classList.remove( 'is-loading' );
		postbox.classList.remove( 'is-loading' );
		status.textContent = '';
		fit();

		if ( resizeObserver ) {
			resizeObserver.disconnect();
		}
		if ( popupObserver ) {
			popupObserver.disconnect();
		}
		var win = frame.contentWindow;
		if ( win && win.ResizeObserver && frame.contentDocument && frame.contentDocument.body ) {
			resizeObserver = new win.ResizeObserver( fit );
			resizeObserver.observe( frame.contentDocument.body );
		}
		// Opening or closing a popup does not change the page size, only its content and classes.
		if ( win && win.MutationObserver && frame.contentDocument && frame.contentDocument.body ) {
			popupObserver = new win.MutationObserver( function () {
				if ( ! popupTimer ) {
					popupTimer = setTimeout( function () {
						popupTimer = null;
						fit();
						// Again once the popup's open / close animation is over.
						setTimeout( fit, 600 );
					}, 100 );
				}
			} );
			popupObserver.observe( frame.contentDocument.body, { attributes: true, attributeFilter: [ 'class' ], childList: true, subtree: true } );
		}
	} );

	var onEdit = function ( event ) {
		if ( event.target && event.target.name && 0 === event.target.name.indexOf( prefix ) ) {
			schedule();
		}
	};
	form.addEventListener( 'input', onEdit );
	form.addEventListener( 'change', onEdit );

	// Media, color and repeater fields can change values without an event; a cheap check catches them.
	setInterval( function () {
		if ( ! document.hidden ) {
			update( false );
		}
	}, 2000 );

	postbox.querySelector( '.bppiv-live-preview__refresh' ).addEventListener( 'click', function () {
		update( true );
	} );

	if ( window.jQuery ) {
		window.jQuery( document ).on( 'postbox-toggled', function ( event, toggled ) {
			if ( toggled && 'bppiv-live-preview' === toggled.id ) {
				update( true );
			}
		} );
		// The box can be dragged between columns.
		window.jQuery( document ).on( 'sortstop', function () {
			syncWideColumn();
			setTimeout( fit, 50 );
		} );
	}

	update( true );
}() );
