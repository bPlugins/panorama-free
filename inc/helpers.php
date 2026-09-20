<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'bppiv_get_woo_template' ) ) {
	function bppiv_get_woo_template( $template ) {
		$path = BPPIV_PATH . 'inc/Woocommerce/template/' . $template;
		if ( file_exists( $path ) ) {
			require $path;
		}
	}
}

if ( ! function_exists( 'bppiv_isset' ) ) {
	// get values from csf
	function bppiv_isset( $array ) {
		return function( $key1, $isBoolean = false, $default = false, $key2 = '' ) use ( $array ) {
			if ( isset( $array[ $key1 ][ $key2 ] ) ) {
				return $isBoolean ? (bool) $array[ $key1 ][ $key2 ] : $array[ $key1 ][ $key2 ];
			}
			if ( isset( $array[ $key1 ] ) ) {
				return $isBoolean ? (bool) $array[ $key1 ] : $array[ $key1 ];
			}
			return $default;
		};
	}
}

if ( ! function_exists( 'bppiv_resolve_media_url' ) ) {
	/**
	 * Resolve a stored panorama image/video URL through WordPress's own attachment
	 * pipeline, so CDN and image-optimization plugins that hook into
	 * `wp_get_attachment_image_src` (Envira CDN, WP Rocket CDN, Imagify, etc.) get a
	 * chance to rewrite it.
	 *
	 * Falls back to the original, untouched URL whenever the value isn't a URL that
	 * matches a local attachment (e.g. an externally hosted panorama, or a URL that's
	 * already been rewritten to a CDN domain) — this keeps existing panoramas working
	 * exactly as they do today; nothing changes for them.
	 *
	 * @param string $url Stored image/video URL.
	 * @return string
	 */
	function bppiv_resolve_media_url( $url ) {
		if ( empty( $url ) || ! is_string( $url ) ) {
			return $url;
		}

		if ( ! function_exists( 'attachment_url_to_postid' ) || ! function_exists( 'wp_get_attachment_image_url' ) ) {
			return $url;
		}

		$attachment_id = attachment_url_to_postid( $url );

		// WordPress automatically down-scales large uploads (over the "big image"
		// threshold) and points the attachment at a new "-scaled" file, but the URL we
		// originally saved still has the pre-scale filename. That's exactly the size of
		// photo a panorama usually is, so try that exact, known WordPress naming
		// pattern next — it's a precise, deterministic match (not a fuzzy search), so
		// it can't accidentally resolve to the wrong image.
		if ( ! $attachment_id ) {
			$scaled_url = preg_replace( '/(\.[a-zA-Z0-9]+)$/', '-scaled$1', $url, 1 );
			if ( $scaled_url && $scaled_url !== $url ) {
				$attachment_id = attachment_url_to_postid( $scaled_url );
			}
		}

		if ( ! $attachment_id ) {
			return $url;
		}

		$resolved_url = wp_get_attachment_image_url( $attachment_id, 'full' );

		return $resolved_url ? $resolved_url : $url;
	}
}
