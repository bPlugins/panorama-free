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


// Shortcode for Product Spot Panorama viewer.
function bppiv_panorama_product_viewer_callback( $attrs ) {

    ob_start();

    $meta = get_post_meta( get_the_ID(), '_bppiv_product_', true );
    if ( ! is_array( $meta ) ) {
        return '';
    }

    $video360 = isset( $meta['video360'] ) ? $meta['video360'] : '0';
    $type     = isset( $meta['type'] )     ? sanitize_key( $meta['type'] ) : '';

    if ( '1' === $video360 && 'video' === $type ) {
        wp_enqueue_script( 'bppiv-panolens' );
    } elseif ( 'image' === $type ) {
        wp_enqueue_script( 'bppiv-pannellum-js' );
        wp_enqueue_style( 'bppiv-pannellum-css' );
    }

    wp_enqueue_script( 'bppiv-product' );
    wp_enqueue_style( 'bppiv-product' );

    $attributes = '';
    if ( ! empty( $meta['video_autoplay'] ) ) {
        $attributes .= ' autoplay';
    }
    if ( ! empty( $meta['video_mute'] ) ) {
        $attributes .= ' muted';
    }
    if ( ! empty( $meta['video_loop'] ) ) {
        $attributes .= ' loop';
    }
    if ( ! empty( $meta['video_show_controls'] ) ) {
        $attributes .= ' controls';
    }

    $video_src = isset( $meta['video_src'] ) ? esc_url( $meta['video_src'] ) : '';
    ?>
    <div id="bppiv_product_panorama" data-settings="<?php echo esc_attr( wp_json_encode( $meta ) ); ?>">
        <?php if ( 'video' === $type && '0' === $video360 ) : ?>
            <video style="max-width: 100%;" <?php echo esc_attr( $attributes ); ?> src="<?php echo esc_url( $video_src ); ?>"></video>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'panorama_product_viewer', 'bppiv_panorama_product_viewer_callback' );
