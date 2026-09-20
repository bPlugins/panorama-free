<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// Shortcode for Panorama (free).

function bppiv_image_viewer( $atts ) {
    $atts = shortcode_atts( array( 'id' => 0 ), $atts, 'panorama' );
    $id   = absint( $atts['id'] );

    if ( ! $id ) {
        return '';
    }

    $bppiv_block = null;
    // Check Post-Type.
    $post_type = get_post_type( $id );
    if ( 'bppiv-image-viewer' !== $post_type ) {
        return '';
    }

    // Security Check: Password Protection, Post Status & Read Capability
    if ( post_password_required( $id ) ) {
        return '';
    }

    if ( 'publish' !== get_post_status( $id ) && ! current_user_can( 'read_post', $id ) ) {
        return '';
    }

    // Meta Data.
    $bppiv_meta = get_post_meta( $id, '_bppivimages_', true );
    if ( ! is_array( $bppiv_meta ) ) {
        $bppiv_meta = array();
    }

    $bppiv_width  = '100%';
    $bppiv_height = '320px';

    if ( isset( $bppiv_meta['bppiv_image_width']['width'] ) ) {
        $bppiv_width = $bppiv_meta['bppiv_image_width']['width'] . $bppiv_meta['bppiv_image_width']['unit'];
    }
    if ( isset( $bppiv_meta['bppiv_image_height']['height'] ) ) {
        $bppiv_height = $bppiv_meta['bppiv_image_height']['height'] . $bppiv_meta['bppiv_image_height']['unit'];
    }

    $pan_type  = isset( $bppiv_meta['bppiv_type'] ) ? sanitize_key( $bppiv_meta['bppiv_type'] ) : '';
    $get_value = bppiv_isset( $bppiv_meta );

    if ( file_exists( BPPIV_PATH . "blocks/{$pan_type}.php" ) ) {
        include BPPIV_PATH . "blocks/{$pan_type}.php";
    }

    if ( is_string( $bppiv_block ) ) {
        return $bppiv_block;
    }

    if ( ! $bppiv_block ) {
        return '';
    }

    return render_block( $bppiv_block );
}
add_shortcode( 'panorama', 'bppiv_image_viewer' );


// Shortcode for Product Spot Panorama viewer.
function bppiv_panorama_product_viewer_callback( $attrs ) {
    return '<div class="bppiv-empty-notice" style="padding: 16px 20px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; text-align: center; color: #64748b; font-size: 14px; margin: 15px 0;">' . esc_html__( 'Product Panorama viewer is not available.', 'panorama' ) . '</div>';
}
add_shortcode( 'panorama_product_viewer', 'bppiv_panorama_product_viewer_callback' );
