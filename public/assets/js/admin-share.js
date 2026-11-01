/**
 * Panorama edit screen: copy the shortcode / embed code and open the embed dialog.
 */
( function () {
	'use strict';

	var i18n = window.bppivShare || { copied: 'Copied!', failed: 'Press Ctrl+C to copy' };

	var copyText = function ( text, field ) {
		if ( navigator.clipboard && window.isSecureContext ) {
			return navigator.clipboard.writeText( text );
		}
		// Fallback for http:// sites, where the Clipboard API is not available.
		var area = field || document.createElement( 'textarea' );
		if ( ! field ) {
			area.value = text;
			area.setAttribute( 'readonly', '' );
			area.style.position = 'fixed';
			area.style.left = '-9999px';
			document.body.appendChild( area );
		}
		area.focus();
		area.select();
		var ok = false;
		try {
			ok = document.execCommand( 'copy' );
		} catch ( e ) {}
		if ( ! field ) {
			document.body.removeChild( area );
		}
		return ok ? Promise.resolve() : Promise.reject();
	};

	var flash = function ( button, done ) {
		var label = button.querySelector( '.bppiv-copy-btn__text' );
		var icon = button.querySelector( '.dashicons' );
		if ( ! button.dataset.label ) {
			button.dataset.label = label ? label.textContent : '';
		}
		clearTimeout( button.bppivTimer );
		button.classList.toggle( 'is-copied', done );
		button.classList.toggle( 'is-failed', ! done );
		if ( label ) {
			label.textContent = done ? i18n.copied : i18n.failed;
		}
		if ( icon ) {
			icon.className = 'dashicons ' + ( done ? 'dashicons-yes' : 'dashicons-warning' );
		}
		button.bppivTimer = setTimeout( function () {
			button.classList.remove( 'is-copied', 'is-failed' );
			if ( label ) {
				label.textContent = button.dataset.label;
			}
			if ( icon ) {
				icon.className = 'dashicons dashicons-admin-page';
			}
		}, 2000 );
	};

	document.addEventListener( 'click', function ( event ) {
		var button = event.target.closest( '.bppiv-copy-btn' );
		if ( ! button ) {
			return;
		}
		var field = button.dataset.copyTarget ? document.querySelector( button.dataset.copyTarget ) : null;
		var text = field ? field.value : button.dataset.copy;
		if ( ! text ) {
			return;
		}
		copyText( text, field ).then(
			function () {
				flash( button, true );
			},
			function () {
				flash( button, false );
			}
		);
	} );

	// Embed dialog
	var modal = document.getElementById( 'bppiv-embed-modal' );
	var opener = document.querySelector( '.bppiv-embed-btn' );
	if ( ! modal || ! opener ) {
		return;
	}

	var open = function () {
		modal.hidden = false;
		document.body.classList.add( 'bppiv-modal-open' );
		var code = modal.querySelector( '#bppiv-iframe-code' );
		if ( code ) {
			code.focus();
			code.select();
		}
	};
	var close = function () {
		modal.hidden = true;
		document.body.classList.remove( 'bppiv-modal-open' );
		opener.focus();
	};

	opener.addEventListener( 'click', open );
	modal.querySelector( '.bppiv-close' ).addEventListener( 'click', close );
	modal.addEventListener( 'click', function ( event ) {
		if ( event.target === modal ) {
			close();
		}
	} );
	document.addEventListener( 'keydown', function ( event ) {
		if ( 'Escape' === event.key && ! modal.hidden ) {
			close();
		}
	} );
}() );
