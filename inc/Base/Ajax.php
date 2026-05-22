<?php
namespace BPPIV\Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Ajax {

	public function register() {
		add_action( 'wp_ajax_bppivSaveUninstallOption', [ $this, 'save_uninstall_option' ] );
	}

	public function save_uninstall_option() {
		// Check nonce.
		$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';
		if ( ! wp_verify_nonce( $nonce, 'bppiv_uninstall_nonce' ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid security token.', 'panorama' ) ) );
		}

		// Check user capability.
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'You do not have permission to manage options.', 'panorama' ) ) );
		}

		// Check enabled post value.
		$enabled = isset( $_POST['enabled'] ) && filter_var( $_POST['enabled'], FILTER_VALIDATE_BOOLEAN );

		// Update option.
		update_option( 'bppiv_delete_data_on_uninstall', $enabled );

		wp_send_json_success( array(
			'enabled' => $enabled,
			'message' => $enabled 
				? __( 'Data will be deleted on uninstall.', 'panorama' ) 
				: __( 'Data will be preserved on uninstall.', 'panorama' )
		) );
	}
}
