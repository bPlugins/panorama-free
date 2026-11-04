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

// Panorama and WooCommerce product settings: show the selected type next to the "Panorama Settings" title.
( function () {
	'use strict';

	var i18n = window.bppivShare || {};

	var addBadge = function ( prefix, typeField, fallback, describe ) {
		var settings = document.getElementById( prefix );
		if ( ! settings ) {
			return;
		}
		var title = settings.querySelector( '.postbox-header h2, .postbox-header h3, .hndle' );
		var labels = {};
		settings.querySelectorAll( 'input[type=radio][name="' + prefix + '[' + typeField + ']"]' ).forEach( function ( input ) {
			var item = input.closest( '.csf--sibling' ) || input.closest( 'label' );
			if ( item ) {
				// The type name only, without the "PRO" badge.
				labels[ input.value ] = Array.prototype.filter.call( item.childNodes, function ( node ) {
					return node.nodeType === 3;
				} ).map( function ( node ) {
					return node.textContent;
				} ).join( '' ).trim();
			}
		} );
		if ( ! title || ( ! Object.keys( labels ).length && ! fallback ) ) {
			return;
		}

		var badge = document.createElement( 'button' );
		badge.type = 'button';
		badge.className = 'bppiv-type-badge';
		badge.title = i18n.changeType || '';
		badge.innerHTML = '<span class="bppiv-type-badge__label"></span><strong></strong>';
		badge.firstChild.textContent = i18n.type || 'Type:';
		title.appendChild( badge );

		// Opens Configuration, where the type is changed.
		badge.addEventListener( 'click', function ( event ) {
			event.preventDefault();
			event.stopPropagation();
			jQuery( settings ).find( '.csf-nav-metabox a' ).first().trigger( 'click' );
		} );

		var update = function () {
			var checked = settings.querySelector( 'input[name="' + prefix + '[' + typeField + ']"]:checked' );
			var name = checked && labels[ checked.value ] ? labels[ checked.value ] : fallback;
			if ( name && describe ) {
				name = describe( settings, checked ? checked.value : '', name );
			}
			badge.lastChild.textContent = name || '';
			badge.hidden = ! name;
		};
		// CSF switches values with jQuery's trigger(), which native listeners do not hear.
		jQuery( settings ).on( 'change', update );
		update();
	};

	addBadge( '_bppivimages_', 'bppiv_type', '' );

	// Products: Image or Video (a 360° video says so); the free version has images only.
	addBadge( '_bppiv_product_', 'type', i18n.image || 'Image', function ( settings, value, name ) {
		var is360 = settings.querySelector( 'input[name="_bppiv_product_[video360]"]' );
		return 'video' === value && is360 && '1' === is360.value ? ( i18n.video360 || '360° Video' ) : name;
	} );
}() );

