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

    return render_block( $bppiv_block );
}
add_shortcode( 'panorama', 'bppiv_image_viewer' );


// Shortcode for Product Spot Panorama viewer (Pro Feature).
function bppiv_panorama_product_viewer_callback( $attrs ) {
    return '<div class="bppiv-pro-shortcode-notice" style="padding: 12px 16px; background: #fff8f6; border-left: 4px solid #cf222e; border-radius: 4px; font-size: 13px; color: #cf222e;">' . esc_html__( 'Product shortcode is a Pro feature. Please upgrade to Panorama Viewer Pro to use this shortcode.', 'panorama' ) . '</div>';
}
add_shortcode( 'panorama_product_viewer', 'bppiv_panorama_product_viewer_callback' );
