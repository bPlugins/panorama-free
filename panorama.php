<?php

/**
 * Plugin Name: Panorama - 360 degree Virtual Tour, Panoramic Image viewer and More
 * Description: A lite Weight Plugin that helps you, Easily display panoramic 360 degree images / videos into WordPress Website in Post, Page, Widget Area using shortCode. 
 * Plugin URI:  https://bplugins.com/products/panorama
 * Version: 1.7.0
 * Author: bPlugins
 * Author URI: http://abuhayatpolash.com
 * License: GPLv2 or later
 * Text Domain: panorama
 * Domain Path: /languages
 * Requires at least: 6.3
 * Requires PHP: 7.1
 */

if ( !defined( 'ABSPATH' ) ) {
    exit;
}

if ( function_exists( 'panorama_fs' ) ) {
    panorama_fs()->set_basename( true, __FILE__ );
} else {
    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedFunctionFound
    function panorama_fs() {
        global $panorama_fs;

        if ( ! isset( $panorama_fs ) ) {
            if ( ! defined( 'WP_FS__PRODUCT_8824_MULTISITE' ) ) {
                define( 'WP_FS__PRODUCT_8824_MULTISITE', true );
            }

            require_once dirname( __FILE__ ) . '/vendor/freemius/start.php';

            // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
            $panorama_fs = fs_dynamic_init( array(
                'id'                  => '8824',
                'slug'                => 'panorama',
                'type'                => 'plugin',
                'public_key'          => 'pk_a112d1d1d66d3b480dbea5690d3ff',
                'is_premium'          => false,
                'premium_suffix'      => 'Pro',
                'has_premium_version' => true,
                'has_addons'          => false,
                'has_paid_plans'      => true,
                'trial'               => array(
                    'days'               => 7,
                    'is_require_payment' => false,
                ),
                'menu'                => array(
                    'slug'       => 'edit.php?post_type=bppiv-image-viewer',
                    'first-path' => 'edit.php?post_type=bppiv-image-viewer&page=bppiv-support#welcome',
                ),
            ) );
        }

        return $panorama_fs;
    }

    panorama_fs();
    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
    do_action( 'panorama_fs_loaded' );

    define( 'BPPIV_PLUGIN_DIR', plugin_dir_url( __FILE__ ) );
    define( 'BPPIV_VERSION', ( isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ) ? time() : '1.7.0' );
    defined( 'BPPIV_PATH' )     || define( 'BPPIV_PATH',     plugin_dir_path( __FILE__ ) );
    defined( 'BPPIV__FILE__' )  || define( 'BPPIV__FILE__',  __FILE__ );
    define( 'BPPIV_HAS_PRO', false );

    require_once 'vendor/csf/codestar-framework.php';
    require_once 'admin/ads/submenu.php';
    require_once 'product-spot.php';

    require_once BPPIV_PATH . 'inc/helpers.php';

    $bppiv_init_file = BPPIV_PATH . 'inc/Init.php';
    if ( file_exists( $bppiv_init_file ) ) {
        require_once $bppiv_init_file;
    }
    if ( class_exists( 'BPPIV\\Init' ) ) {
        \BPPIV\Init::instance();
    }
    
    // Register activation redirect option
    register_activation_hook( __FILE__, 'bppiv_plugin_activate' );
    function bppiv_plugin_activate() {
        add_option( 'bppiv_do_activation_redirect', true );
    }

    // Handle redirect on admin initialization
    add_action( 'admin_init', 'bppiv_plugin_redirect' );
    function bppiv_plugin_redirect() {
        if ( get_option( 'bppiv_do_activation_redirect', false ) ) {
            delete_option( 'bppiv_do_activation_redirect' );

            // Prevent redirect on bulk activation, ajax, cron, or REST API request
            // phpcs:ignore WordPress.Security.NonceVerification.Recommended
            if ( isset( $_GET['activate-multi'] ) || 
                 ( defined( 'DOING_AJAX' ) && DOING_AJAX ) || 
                 ( defined( 'DOING_CRON' ) && DOING_CRON ) || 
                 ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
                return;
            }

            wp_safe_redirect( admin_url( 'edit.php?post_type=bppiv-image-viewer&page=bppiv-support' ) );
            exit;
        }
    }

    require_once 'shortcode.php';
}