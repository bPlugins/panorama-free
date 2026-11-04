<?php
namespace BPPIV\Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class EnqueueAssets{

    public function register(){
        add_action('enqueue_block_assets', [$this, 'bppiv_registerFrontEndAssets']);
        add_action('admin_enqueue_scripts', [$this, 'bppiv_registerBackendAssets']);
        add_action('admin_enqueue_scripts', [$this, 'bppiv_registerFrontEndAssets']);
        add_action('admin_enqueue_scripts', [$this, 'printAnalyticsEditorData'], 1);
        add_action('enqueue_block_editor_assets', [$this, 'printAnalyticsEditorData'], 1);
        add_action('wp_head', [$this, 'printAnalyticsFrontendData'], 1);
    }

    public function printAnalyticsEditorData() {
        $analytics_data = [
            'endpoint'   => esc_url_raw(rest_url('bppiv/v1/track-analytics')),
            'enabled'    => true,
            'isWcActive' => class_exists('WooCommerce'),
        ];
        wp_register_script('bppiv-editor-analytics-data', '', [], BPPIV_VERSION, false);
        wp_enqueue_script('bppiv-editor-analytics-data');
        wp_add_inline_script('bppiv-editor-analytics-data', 'window.bppivAnalyticsData = ' . wp_json_encode( $analytics_data, JSON_HEX_TAG | JSON_HEX_AMP ) . '; window.bppivEditorData = ' . wp_json_encode( $analytics_data, JSON_HEX_TAG | JSON_HEX_AMP ) . ';', 'before');
    }

    public function printAnalyticsFrontendData() {
        if (is_admin()) {
            return;
        }
        $analytics_data = [
            'endpoint'   => esc_url_raw(rest_url('bppiv/v1/track-analytics')),
            'enabled'    => true,
            'isWcActive' => class_exists('WooCommerce'),
        ];
        echo "<script id='bppiv-analytics-data-js'>window.bppivAnalyticsData = " . wp_json_encode( $analytics_data, JSON_HEX_TAG | JSON_HEX_AMP ) . ";</script>\n";
    }

    public function bppiv_registerFrontEndAssets(){
        wp_register_script( 'bppiv-three', BPPIV_PLUGIN_DIR . 'public/assets/js/three.min.js',[], BPPIV_VERSION, true);
        wp_register_script( 'bppiv-panolens', BPPIV_PLUGIN_DIR . 'public/assets/js/panolens.min.js', array( 'bppiv-three' ), BPPIV_VERSION, true );

        //videojs
        wp_register_script( 'videojs', BPPIV_PLUGIN_DIR . 'public/assets/js/lib/video.min.js', [], BPPIV_VERSION, true );
        wp_register_script( 'videojs-vr', BPPIV_PLUGIN_DIR . 'public/assets/js/lib/videojs-vr.min.js', array( 'videojs' ), BPPIV_VERSION, true );
        wp_register_script( 'videojs-init', BPPIV_PLUGIN_DIR . 'build/videojs-init.js', array( 'videojs', 'videojs-vr' ), BPPIV_VERSION, true );
        wp_register_style( 'videojs', BPPIV_PLUGIN_DIR . 'public/assets/css/lib/video-js.min.css', [], BPPIV_VERSION, 'all' );
        wp_register_style( 'videojs-vr', BPPIV_PLUGIN_DIR . 'public/assets/css/lib/videojs-vr.css', array( 'videojs' ), BPPIV_VERSION, 'all' );
        
        
        //Pannellum
        wp_register_script( 'bppiv-pannellum-js', BPPIV_PLUGIN_DIR . 'public/assets/js/library/pannellum.js', [], file_exists(BPPIV_PATH . 'public/assets/js/library/pannellum.js') ? filemtime(BPPIV_PATH . 'public/assets/js/library/pannellum.js') : BPPIV_VERSION, true);
        wp_register_script( 'bppiv-init', BPPIV_PLUGIN_DIR . 'build/scripts.js', array( 'jquery', 'bppiv-three', 'bppiv-panolens' ), BPPIV_VERSION, true );

        wp_register_script( 'bppiv-product', BPPIV_PLUGIN_DIR . 'public/assets/js/product.js', array(), BPPIV_VERSION, true );
        wp_register_style( 'bppiv-product', BPPIV_PLUGIN_DIR . 'public/assets/css/product.css', array(), BPPIV_VERSION, 'all' );
        
        //Pannellum CSS
        wp_register_style( 'bppiv-pannellum-css', BPPIV_PLUGIN_DIR . 'public/assets/css/library/pannellum.min.css', [], '2.5.6' );
        
        // style
        wp_register_style( 'bppiv-font-material', 'https://fonts.googleapis.com/icon?family=Material+Icons', [], BPPIV_VERSION );
        wp_register_style( 'bppiv-main-style', BPPIV_PLUGIN_DIR . 'public/assets/css/style.css', [], BPPIV_VERSION );

        $analytics_data = [
            'endpoint' => esc_url_raw(rest_url('bppiv/v1/track-analytics')),
            'enabled'  => true,
        ];
        $handles = ['bppiv-init', 'bppiv-product', 'panorama-virtual-tour-view-script', 'panorama-image-360-view-script', 'panorama-tour-view-script'];
        foreach ($handles as $h) {
            wp_localize_script($h, 'bppivAnalyticsData', $analytics_data);
        }
    }
    
     public function bppiv_registerBackendAssets($screen){
        $current = function_exists('get_current_screen') ? get_current_screen() : null;
        $post_type = $current && isset($current->post_type) ? $current->post_type : '';
        $screen_id = $current && isset($current->id) ? $current->id : '';
        $is_bppiv_screen = ($post_type === 'bppiv-image-viewer') || ($post_type === 'product') || ($screen_id === 'bppiv-image-viewer_page_bppiv-support');

        if ( $is_bppiv_screen ) {
            wp_register_style( 'bppiv-custom-style', BPPIV_PLUGIN_DIR . 'public/assets/css/admin-style.css',[], LivePreview::asset_version( 'public/assets/css/admin-style.css' ) );
            wp_enqueue_style( 'bppiv-custom-style' );
            
            // Script
            wp_register_script( 'bppiv-admin-script', BPPIV_PLUGIN_DIR . 'public/assets/js/admin-scripts.js', ['jquery'], LivePreview::asset_version( 'public/assets/js/admin-scripts.js' ), true );
            wp_enqueue_script( 'bppiv-admin-script' );
            
            wp_register_style( 'bppiv-readonly', BPPIV_PLUGIN_DIR . 'public/assets/css/readonly.css', [], BPPIV_VERSION );
            

            // meta fields
            wp_register_script( 'bppiv-meta', BPPIV_PLUGIN_DIR . 'build/custom-codestar.js', ['jquery', 'wp-compose', 'lodash'], BPPIV_VERSION, true );
            wp_register_style( 'bppiv-meta', BPPIV_PLUGIN_DIR . 'build/custom-codestar.css', [], BPPIV_VERSION, 'all' );

            global $post;
            if ($screen === 'post.php' || $screen === 'post-new.php') {
                if ( isset( $post ) && in_array( $post->post_type, array( 'bppiv-image-viewer', 'product' ), true ) ) {
                    // Shortcode / embed code copy buttons, the embed dialog and the panorama type in the settings header.
                    wp_enqueue_script( 'bppiv-admin-share', BPPIV_PLUGIN_DIR . 'public/assets/js/admin-share.js', array( 'jquery' ), LivePreview::asset_version( 'public/assets/js/admin-share.js' ), true );
                    wp_localize_script( 'bppiv-admin-share', 'bppivShare', array(
                        'copied'     => __( 'Copied!', 'panorama' ),
                        'failed'     => __( 'Press Ctrl+C to copy', 'panorama' ),
                        'type'       => __( 'Type:', 'panorama' ),
                        'changeType' => __( 'Change the panorama type in Configuration', 'panorama' ),
                        'image'      => __( 'Image', 'panorama' ),
                        'video360'   => __( '360° Video', 'panorama' ),
                    ) );
                }
            }
        }
    }
}



