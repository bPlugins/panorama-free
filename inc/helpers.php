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
