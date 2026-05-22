<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'admin_enqueue_scripts', 'bppiv_custom_admin_style' );
add_action('admin_menu', 'bppiv_add_submenu_page');
add_action( 'admin_enqueue_scripts', 'bppiv_adminEnqueueScripts' );

function bppiv_custom_admin_style() {
    wp_register_style( 'bppiv_admin_custom_css', plugin_dir_url(__FILE__) . 'style.css', false, BPPIV_VERSION );
    wp_enqueue_style( 'bppiv_admin_custom_css' );
}

function bppiv_add_submenu_page(){
    add_submenu_page(
        'edit.php?post_type=bppiv-image-viewer',
        'Help & Demos',
        '<span style="color: #f18500; font-weight: 600;">Help & Demos</span>', 
        'manage_options', 
        'bppiv-support',
        'bppiv_dashboard_page'
    );
}

function bppiv_dashboard_page(){ ?>
    <div
        id='bppivCurrentDashboard'
        data-info='<?php echo esc_attr( wp_json_encode( [
            'version' => BPPIV_VERSION,
            'isPremium' => false,
            'hasPro' => false,
            'deleteDataOnUninstall' => (bool) get_option( 'bppiv_delete_data_on_uninstall', false ),
            'uninstallNonce'        => wp_create_nonce( 'bppiv_uninstall_nonce' ),
        ] ) ); ?>'
    ></div> 
<?php }

function bppiv_adminEnqueueScripts( $screen ) {

    if( $screen == 'bppiv-image-viewer_page_bppiv-support'){
        wp_enqueue_style( 'current-admin-dashboard-style', BPPIV_PLUGIN_DIR . 'build/style-admin-dashboard.css', [], BPPIV_VERSION );
        wp_enqueue_style( 'current-admin-dashboard', BPPIV_PLUGIN_DIR . 'build/admin-dashboard.css', [], BPPIV_VERSION );
        wp_enqueue_script( 'current-admin-dashboard', BPPIV_PLUGIN_DIR . 'build/admin-dashboard.js', [ 'react', 'react-dom', 'wp-util' ], BPPIV_VERSION, true );
    }

    $current = function_exists('get_current_screen') ? get_current_screen() : null;
    $post_type = $current && isset($current->post_type) ? $current->post_type : '';

    if ( in_array( $post_type, ['bppiv-image-viewer', 'virtual_tour', 'product_spot', 'product'], true ) ) {
        wp_enqueue_script('current-admin-post', BPPIV_PLUGIN_DIR . 'build/admin-post.js', [], BPPIV_VERSION, true);
        wp_enqueue_style('current-admin-post', BPPIV_PLUGIN_DIR . 'build/admin-post.css', [], BPPIV_VERSION);
    }
}




  






