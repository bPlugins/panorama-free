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

    // A trashed panorama is shown to no one, like the Virtual Tour and Product Spot shortcodes.
    if ( 'trash' === get_post_status( $id ) ) {
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

    // Nothing added for the chosen type yet: editors get a note instead of an empty black viewer, visitors nothing.
    if ( class_exists( '\BPPIV\Base\LivePreview' ) && ! \BPPIV\Base\LivePreview::has_media( $bppiv_meta ) ) {
        return current_user_can( 'edit_post', $id ) ? bppiv_empty_panorama_notice( $bppiv_meta, $id ) : '';
    }

    return bppiv_render_panorama_meta( $bppiv_meta );
}
add_shortcode( 'panorama', 'bppiv_image_viewer' );

/**
 * Renders a panorama from its settings (the `_bppivimages_` meta array).
 * Used by the [panorama] shortcode and the settings live preview.
 *
 * @param array $bppiv_meta Panorama settings.
 * @return string Block markup, or '' when no type or media is set.
 */
function bppiv_render_panorama_meta( $bppiv_meta ) {
    $bppiv_block = null;

    if ( ! is_array( $bppiv_meta ) ) {
        $bppiv_meta = array();
    }

    $bppiv_width  = '100%';
    $bppiv_height = '320px';

    if ( isset( $bppiv_meta['bppiv_image_width']['width'] ) ) {
        $bppiv_width = $bppiv_meta['bppiv_image_width']['width'] . ( isset( $bppiv_meta['bppiv_image_width']['unit'] ) ? $bppiv_meta['bppiv_image_width']['unit'] : '' );
    }
    if ( isset( $bppiv_meta['bppiv_image_height']['height'] ) ) {
        $bppiv_height = $bppiv_meta['bppiv_image_height']['height'] . ( isset( $bppiv_meta['bppiv_image_height']['unit'] ) ? $bppiv_meta['bppiv_image_height']['unit'] : '' );
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


// Shortcode for Product Spot Panorama viewer.
function bppiv_panorama_product_viewer_callback( $attrs ) {
    return '<div class="bppiv-empty-notice" style="padding: 16px 20px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; text-align: center; color: #64748b; font-size: 14px; margin: 15px 0;">' . esc_html__( 'Product Panorama viewer is not available.', 'panorama' ) . '</div>';
}
add_shortcode( 'panorama_product_viewer', 'bppiv_panorama_product_viewer_callback' );

if ( ! function_exists( 'bppiv_empty_panorama_notice' ) ) {
    /**
     * What a panorama shows its editors while the chosen type has no image / video yet.
     *
     * @param array $bppiv_meta Panorama settings.
     * @param int   $id         Panorama ID.
     * @return string
     */
    function bppiv_empty_panorama_notice( $bppiv_meta, $id ) {
        $type     = isset( $bppiv_meta['bppiv_type'] ) ? sanitize_key( $bppiv_meta['bppiv_type'] ) : '';
        $messages = array(
            'image'    => __( 'No image has been added yet.', 'panorama' ),
            'image360' => __( 'No 360° image has been added yet.', 'panorama' ),
            'video'    => __( 'No video has been added yet.', 'panorama' ),
            'video2'   => __( 'No 360° video has been added yet.', 'panorama' ),
            'gallery'  => __( 'No gallery items have been added yet.', 'panorama' ),
            'tour360'  => __( 'No scenes have been added to this tour yet.', 'panorama' ),
            'gstreet'  => __( 'No Street View Panorama ID has been added yet.', 'panorama' ),
        );
        $message  = isset( $messages[ $type ] ) ? $messages[ $type ] : __( 'No image or video has been added yet.', 'panorama' );
        $icon     = in_array( $type, array( 'video', 'video2' ), true )
            ? '<rect x="2" y="5" width="15" height="14"/><path d="M17 10l5-3v10l-5-3z"/>'
            : '<rect x="3" y="4" width="18" height="16"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>';

        ob_start();
        ?>
        <div class="bppiv-empty-panorama" data-panorama-id="<?php echo esc_attr( $id ); ?>" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;box-sizing:border-box;width:100%;min-height:200px;margin:0 0 20px;padding:28px 20px;border:1px dashed #b7c8e4;background:#f6f9ff;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#146ef5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><?php echo $icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Fixed SVG markup. ?></svg>
            <p style="margin:0;color:#334155;font-size:15px;font-weight:500;line-height:1.5;"><?php echo esc_html( $message ); ?></p>
        </div>
        <?php
        return (string) ob_get_clean();
    }
}
