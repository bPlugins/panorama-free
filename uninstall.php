<?php
/**
 * Uninstall Panorama
 *
 * @package   panorama
 * @author    bPlugins
 * @license   GPLv2 or later
 */

// If uninstall not called from WordPress, exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// Check if user chose to delete data on uninstall.
if ( (bool) get_option( 'bppiv_delete_data_on_uninstall', false ) ) {
	// Delete options.
	delete_option( 'panoramaUtils' );
	delete_option( 'bppiv_delete_data_on_uninstall' );

	// Delete bppiv-image-viewer posts.
	$bppiv_posts = get_posts( array(
		'post_type'   => 'bppiv-image-viewer',
		'numberposts' => -1,
		'post_status' => 'any',
	) );

	if ( ! empty( $bppiv_posts ) ) {
		foreach ( $bppiv_posts as $post ) {
			wp_delete_post( $post->ID, true );
		}
	}

	// Delete product_spot posts.
	$bppiv_psb_posts = get_posts( array(
		'post_type'   => 'product_spot',
		'numberposts' => -1,
		'post_status' => 'any',
	) );

	if ( ! empty( $bppiv_psb_posts ) ) {
		foreach ( $bppiv_psb_posts as $post ) {
			wp_delete_post( $post->ID, true );
		}
	}

	// Delete virtual_tour posts.
	$bppiv_vt_posts = get_posts( array(
		'post_type'   => 'virtual_tour',
		'numberposts' => -1,
		'post_status' => 'any',
	) );

	if ( ! empty( $bppiv_vt_posts ) ) {
		foreach ( $bppiv_vt_posts as $post ) {
			wp_delete_post( $post->ID, true );
		}
	}
}
