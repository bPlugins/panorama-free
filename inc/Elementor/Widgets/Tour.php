<?php
namespace BPPIV\Elementor\Widgets;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Tour 360° — renders the panorama/tour block.
 *
 * Tour 360° is a Pro feature: the free version only shows what it offers and
 * points to the free 360° Virtual Tour widget.
 */
class Tour extends Base {

	public function get_name() {
		return 'bppiv-tour';
	}

	public function get_title() {
		return esc_html__( 'Tour 360°', 'panorama' );
	}

	public function get_icon() {
		return 'eicon-slides';
	}

	public function get_keywords() {
		return array( 'tour', '360', 'panorama', 'scenes' );
	}

	protected function get_block_name() {
		return 'panorama/tour';
	}

	/**
	 * Whether the full widget is available (true in Pro with an active license).
	 */
	protected function is_available() {
		return false;
	}

	protected function register_controls() {
		if ( $this->is_available() ) {
			$this->register_tour_controls();
			return;
		}

		$this->start_controls_section(
			'section_tour',
			array( 'label' => esc_html__( 'Tour', 'panorama' ) )
		);

		$this->add_control(
			'pro_only_notice',
			array(
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => esc_html__( 'Tour 360° is available in Panorama Pro. For a free multi-scene tour with hotspots, use the "360° Virtual Tour" widget.', 'panorama' ),
				'content_classes' => 'elementor-panel-alert elementor-panel-alert-warning',
			)
		);

		$this->end_controls_section();

		$this->register_pro_notice(
			array(
				esc_html__( 'Multiple linked 360° scenes', 'panorama' ),
				esc_html__( 'Scene navigation hotspots', 'panorama' ),
				esc_html__( 'Preview image with "Click to Load" button', 'panorama' ),
				esc_html__( 'Compass, zoom and keyboard controls', 'panorama' ),
			)
		);
	}

	/**
	 * Full controls (added by the Pro version).
	 */
	protected function register_tour_controls() {}

	protected function get_block_attributes( $settings ) {
		return array();
	}

	protected function render() {
		if ( $this->is_available() ) {
			parent::render();
			return;
		}

		$this->render_placeholder( esc_html__( 'Tour 360° is available in Panorama Pro.', 'panorama' ) );
	}
}
