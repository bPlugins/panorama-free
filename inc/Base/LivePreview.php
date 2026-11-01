<?php
namespace BPPIV\Base;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Live preview for the panorama settings and the WooCommerce product panorama settings.
 *
 * The unsaved settings are posted to a frontend URL and rendered with the same code
 * the shortcode / product page uses, so the preview matches the real output. Nothing
 * is saved and nothing runs unless the edit screen asks for a preview.
 */
class LivePreview {

    const QUERY_VAR = 'bppiv_live_preview';

    /**
     * Post types with a preview => their settings meta key.
     *
     * @return array
     */
    private static function screens() {
        $screens = array( 'bppiv-image-viewer' => '_bppivimages_' );

        if ( class_exists( 'WooCommerce' ) ) {
            $screens['product'] = '_bppiv_product_';
        }

        return $screens;
    }

    public function register() {
        add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
        add_action( 'template_redirect', array( $this, 'render_preview' ), 0 );
    }

    public function add_meta_box( $post_type ) {
        if ( ! isset( self::screens()[ $post_type ] ) ) {
            return;
        }

        add_meta_box( 'bppiv-live-preview', esc_html__( 'Live Preview', 'panorama' ), array( $this, 'meta_box' ), $post_type, 'normal', 'low' );
    }

    public function meta_box() {
        ?>
        <div class="bppiv-live-preview">
            <div class="bppiv-live-preview__bar">
                <span class="bppiv-live-preview__status" aria-live="polite"></span>
                <button type="button" class="button bppiv-live-preview__refresh"><?php esc_html_e( 'Refresh', 'panorama' ); ?></button>
            </div>
            <iframe class="bppiv-live-preview__frame" title="<?php esc_attr_e( 'Panorama live preview', 'panorama' ); ?>"></iframe>
            <p class="description"><?php esc_html_e( 'The preview updates as you change the settings. Click Update to save them.', 'panorama' ); ?></p>
        </div>
        <?php
    }

    public function enqueue_assets( $hook ) {
        if ( 'post.php' !== $hook && 'post-new.php' !== $hook ) {
            return;
        }

        $screen  = get_current_screen();
        $post    = get_post();
        $screens = self::screens();
        if ( ! $screen || ! $post || ! isset( $screens[ $screen->post_type ] ) ) {
            return;
        }

        wp_enqueue_style( 'bppiv-live-preview', BPPIV_PLUGIN_DIR . 'public/assets/css/live-preview.css', array(), BPPIV_VERSION );
        wp_enqueue_script( 'bppiv-live-preview', BPPIV_PLUGIN_DIR . 'public/assets/js/live-preview.js', array(), BPPIV_VERSION, true );

        $config = array(
            'url'     => add_query_arg( self::QUERY_VAR, '1', home_url( '/', is_ssl() ? 'https' : 'http' ) ),
            'nonce'   => wp_create_nonce( 'bppiv_live_preview_' . $post->ID ),
            'postId'  => $post->ID,
            'metaKey' => $screens[ $screen->post_type ],
            // Panorama settings: preview beside the fields. Product page: below (the main column is narrow there).
            'layout'  => 'product' === $screen->post_type ? 'stack' : 'split',
            'i18n'    => array(
                'title'   => __( 'Live Preview', 'panorama' ),
                'loading' => __( 'Updating preview…', 'panorama' ),
                'error'   => __( 'The preview could not be loaded. Click Refresh to try again.', 'panorama' ),
            ),
        );
        wp_add_inline_script( 'bppiv-live-preview', 'window.bppivLivePreview = ' . wp_json_encode( $config, JSON_HEX_TAG | JSON_HEX_AMP ) . ';', 'before' );
    }

    /**
     * Prints the preview document for the edit screen and stops.
     */
    public function render_preview() {
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- only a flag; the nonce is checked below.
        if ( ! isset( $_GET[ self::QUERY_VAR ] ) ) {
            return;
        }

        $post_id   = isset( $_POST['post_id'] ) ? absint( $_POST['post_id'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Missing -- checked below.
        $nonce     = isset( $_POST['_bppiv_preview_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['_bppiv_preview_nonce'] ) ) : '';
        $post_type = $post_id ? get_post_type( $post_id ) : '';
        $screens   = self::screens();

        if ( ! $post_id || ! isset( $screens[ $post_type ] ) || ! wp_verify_nonce( $nonce, 'bppiv_live_preview_' . $post_id ) || ! current_user_can( 'edit_post', $post_id ) ) {
            wp_die( esc_html__( 'Sorry, you are not allowed to preview this panorama.', 'panorama' ), '', array( 'response' => 403 ) );
        }

        $key  = $screens[ $post_type ];
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- sanitized with wp_kses_post_deep(), like the saved settings.
        $meta = isset( $_POST[ $key ] ) && is_array( $_POST[ $key ] ) ? wp_kses_post_deep( wp_unslash( $_POST[ $key ] ) ) : array();

        nocache_headers();
        header( 'X-Robots-Tag: noindex, nofollow' );
        show_admin_bar( false );

        // Register the theme and plugin assets the frontend would load.
        do_action( 'wp_enqueue_scripts' );

        if ( 'product' === $post_type ) {
            $html = self::product_markup( $meta );
        } else {
            $html = self::has_media( $meta ) ? bppiv_render_panorama_meta( $meta ) : '';
        }

        wp_register_style( 'bppiv-live-preview-frame', false, array(), BPPIV_VERSION );
        wp_enqueue_style( 'bppiv-live-preview-frame' );
        wp_add_inline_style( 'bppiv-live-preview-frame', 'html,body{margin:0;background:#fff;}body{padding:12px;box-sizing:border-box;}.bppiv-live-preview-empty{margin:40px 0;text-align:center;color:#646970;font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;}' );
        ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<?php
        wp_print_styles();
        wp_print_head_scripts();
?>
</head>
<body class="bppiv-live-preview-body">
<?php
        if ( '' === trim( (string) $html ) ) {
            echo '<p class="bppiv-live-preview-empty">' . esc_html__( 'Choose a panorama type and add an image or video to see the preview.', 'panorama' ) . '</p>';
        } else {
            echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- viewer markup, escaped where it is built (render_block / product view).
        }

        wp_print_footer_scripts();

        // Previews must not count as views in Analytics.
        wp_print_inline_script_tag( 'window.bppivAnalyticsData = { enabled: false };' );
?>
</body>
</html>
        <?php
        exit;
    }

    /**
     * Whether the panorama settings have the image / video the selected type needs.
     * Gallery and Tour show their own empty state, so they always render.
     *
     * @param array $meta Panorama settings.
     * @return bool
     */
    private static function has_media( $meta ) {
        $type = isset( $meta['bppiv_type'] ) ? sanitize_key( $meta['bppiv_type'] ) : '';
        $keys = array(
            'image'    => array( 'bppiv_image_src' ),
            'image360' => array( 'image_src_360', 'cubemap_front_360' ),
            'video'    => array( 'bppiv_video_src' ),
            'video2'   => array( 'bppiv_video_src' ),
            'gstreet'  => array( 'bppiv_pano_id' ),
        );

        if ( '' === $type ) {
            return false;
        }
        if ( ! isset( $keys[ $type ] ) ) {
            return true;
        }

        foreach ( $keys[ $type ] as $key ) {
            $value = isset( $meta[ $key ] ) ? $meta[ $key ] : '';
            if ( is_array( $value ) ) {
                $value = isset( $value['url'] ) ? $value['url'] : '';
            }
            if ( '' !== trim( (string) $value ) ) {
                return true;
            }
        }

        return false;
    }

    /**
     * WooCommerce product viewer markup for the given settings.
     *
     * @param array $meta Product panorama settings.
     * @return string
     */
    private static function product_markup( $meta ) {
        $class = class_exists( '\BPPIV\Woocommerce\ProductViewPro' ) ? '\BPPIV\Woocommerce\ProductViewPro' : '\BPPIV\Woocommerce\ProductView';
        if ( ! class_exists( $class ) || ! method_exists( $class, 'render_preview' ) ) {
            return '';
        }

        $type = isset( $meta['type'] ) ? $meta['type'] : 'image';
        $src  = 'video' === $type ? ( isset( $meta['video_src'] ) ? $meta['video_src'] : '' ) : ( isset( $meta['image_src'] ) ? $meta['image_src'] : '' );
        if ( '' === $src && empty( $meta['cubemap_front_360'] ) ) {
            return '';
        }

        $view = new $class();
        return $view->render_preview( $meta );
    }
}
