<?php
namespace BPPIV\Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Admin {

	public function register() {
		add_action( 'admin_enqueue_scripts', [ $this, 'bppiv_popup_modal' ] );
		add_filter( 'plugin_row_meta', [ $this, 'bppiv_plugin_row_meta' ], 10, 2 );
		add_filter( 'plugin_action_links_' . plugin_basename( BPPIV__FILE__ ), [ $this, 'bppiv_plugin_action_links' ] );
		add_action( 'init', [ $this, 'bppiv_load_metaboxes' ], 0 );
	}

	public function bppiv_popup_modal() {
		wp_add_inline_script( 'jquery-core', <<<'JS'
			jQuery(document).ready(function($){
				$('.pano-help-link').on('click', function(e){
					e.preventDefault();
					if ($('#pano-help-modal').length === 0) {
						$('body').append(`
							<div id='pano-help-modal' style='
								position:fixed; top:0; left:0; width:100%; height:100%;
								background:rgba(0,0,0,0.5); z-index:9999;
								display:flex; justify-content:center; align-items:center;'>
								<div style='
									background:#fff; padding:20px; max-width:500px; width:90%;
									border-radius:6px; box-shadow:0 5px 15px rgba(0,0,0,0.3);'>
									<h3>How to Find Google Street View Panorama ID</h3>
									<ol>
										<li>Open <b>Google Maps</b></li>
										<li>Search your location</li>
										<li>Drag the yellow Street View icon onto a road</li>
										<li>Copy the URL from your browser</li>
										<li>Find <b>panoid=</b> in the URL</li>
										<li>Copy the text after <b>panoid=</b></li>
									</ol>
									<p>Example: <code>https://www.google.com/maps/...panoid=JmSoPsBPhqWvaBmOqfFzgA</code></p>
									<p>Panorama ID: <code>JmSoPsBPhqWvaBmOqfFzgA</code></p>
									<button id='pano-help-close' style='margin-top:10px; cursor:pointer;'>Close</button>
								</div>
							</div>
						`);
					}
					$('#pano-help-modal').fadeIn();
					$('#pano-help-close').on('click', function(){ $('#pano-help-modal').fadeOut(); });
					$('#pano-help-modal').on('click', function(e){ if(e.target.id==='pano-help-modal'){ $(this).fadeOut(); } });
				});
			});
JS
		);
	}

	public function bppiv_plugin_row_meta( $plugin_meta, $plugin_file ) {
		if ( false !== strpos( $plugin_file, 'panorama/panorama.php' ) && time() < strtotime( '2025-12-05' ) ) {
			$url           = 'https://bplugins.com/coupons/?from=plugins.php&plugin=panorama';
			$plugin_meta[] = '<a href="' . esc_url( $url ) . '" target="_blank" rel="noopener noreferrer" style="font-weight:600;color:#146ef5;">' . esc_html__( '🎉 Black Friday Sale - Get up to 80% OFF Now!', 'panorama' ) . '</a>';
		}
		return $plugin_meta;
	}

	public function bppiv_plugin_action_links( $links ) {
		$help_url  = admin_url( 'edit.php?post_type=bppiv-image-viewer&page=bppiv-support' );
		$help_link = '<a href="' . esc_url( $help_url ) . '" style="color:#FF7A00;font-weight:bold;">'
			. esc_html__( 'Help &amp; Demos', 'panorama' ) . '</a>';
		$links[]   = $help_link;
		return $links;
	}

	public function bppiv_load_metaboxes() {
		if ( function_exists( 'panorama_fs' ) && panorama_fs()->is_free_plan() ) {
			require_once BPPIV_PATH . 'inc/metabox-options-free.php';
		}
	}
}
