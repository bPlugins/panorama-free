<?php
namespace BPPIV\Elementor\Widgets;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Panorama Gallery — renders the panorama/gallery block.
 *
 * Gallery is a Pro feature: the free version only shows what it offers.
 */
class Gallery extends Base {

	public function get_name() {
		return 'bppiv-gallery';
	}

	public function get_title() {
		return esc_html__( 'Panorama Gallery', 'panorama' );
	}

	public function get_icon() {
		return 'eicon-gallery-grid';
	}

	public function get_keywords() {
		return array( 'gallery', 'panorama', '360', 'grid', 'video' );
	}

	protected function get_block_name() {
		return 'panorama/gallery';
	}

	/**
	 * Whether the full widget is available (true in Pro with an active license).
	 */
	protected function is_available() {
		return false;
	}

	protected function register_controls() {
		if ( $this->is_available() ) {
			$this->register_gallery_controls();
			return;
		}

		$this->start_controls_section(
			'section_gallery',
			array( 'label' => esc_html__( 'Gallery', 'panorama' ) )
		);

		$this->add_control(
			'pro_only_notice',
			array(
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => esc_html__( 'Panorama Gallery is available in Panorama Pro.', 'panorama' ),
				'content_classes' => 'elementor-panel-alert elementor-panel-alert-warning',
			)
		);

		$this->end_controls_section();

		$this->register_pro_notice(
			array(
				esc_html__( 'Grid of 360° images and videos', 'panorama' ),
				esc_html__( 'Title & description for each item', 'panorama' ),
				esc_html__( 'Columns, gap and "Load More" button', 'panorama' ),
				esc_html__( 'Initial view and zoom for each item', 'panorama' ),
			)
		);
	}

	/**
	 * Full controls (added by the Pro version).
	 */
	protected function register_gallery_controls() {}

	protected function get_block_attributes( $settings ) {
		return array();
	}

	protected function render() {
		if ( $this->is_available() ) {
			parent::render();
			return;
		}

		$this->render_placeholder( esc_html__( 'Panorama Gallery is available in Panorama Pro.', 'panorama' ) );
	}
}
