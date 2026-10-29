<?php
namespace BPPIV\Elementor\Widgets;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Google Street View — renders the panorama/google-street block.
 */
class GoogleStreet extends Base {

	public function get_name() {
		return 'bppiv-google-street';
	}

	public function get_title() {
		return esc_html__( 'Google Street View', 'panorama' );
	}

	public function get_icon() {
		return 'eicon-google-maps';
	}

	protected function get_block_name() {
		return 'panorama/google-street';
	}

	protected function get_placeholder_text() {
		return esc_html__( 'Enter a Google Street View panorama ID to display the viewer.', 'panorama' );
	}

	protected function get_initial_view_fields() {
		return array(
			'x' => array( esc_html__( 'Camera X', 'panorama' ), -61.42 ),
			'y' => array( esc_html__( 'Camera Y', 'panorama' ), -8.95 ),
			'z' => array( esc_html__( 'Camera Z', 'panorama' ), 120 ),
		);
	}

	protected function register_controls() {
		$this->start_controls_section(
			'section_street',
			array( 'label' => esc_html__( 'Street View', 'panorama' ) )
		);

		$this->add_control(
			'pano_id',
			array(
				'label'       => esc_html__( 'Panorama ID', 'panorama' ),
				'type'        => Controls_Manager::TEXT,
				'label_block' => true,
				'placeholder' => 'e.g. JmSoPsBPhqWvaBmOqfFzgA',
				'description' => esc_html__( 'Open the location in Google Maps Street View, then copy the text after "panoid=" (or after "!1s") in the browser URL.', 'panorama' ),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_settings',
			array( 'label' => esc_html__( 'Viewer Settings', 'panorama' ) )
		);

		$this->add_control(
			'auto_rotate',
			array(
				'label'   => esc_html__( 'Auto Rotate', 'panorama' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->add_control(
			'auto_rotate_speed',
			array(
				'label'     => esc_html__( 'Rotate Speed', 'panorama' ),
				'type'      => Controls_Manager::NUMBER,
				'min'       => -100,
				'max'       => 100,
				'step'      => 0.1,
				'default'   => 1,
				'condition' => array( 'auto_rotate' => 'yes' ),
			)
		);

		$this->add_control(
			'hide_controls',
			array(
				'label'   => esc_html__( 'Hide Default Controls', 'panorama' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => '',
			)
		);

		$this->add_initial_view_controls( $this->get_initial_view_fields() );

		$this->end_controls_section();

		$this->register_extra_controls();

		$this->register_layout_controls();
	}

	protected function register_extra_controls() {
		$this->register_pro_notice(
			array(
				esc_html__( 'Auto-rotate activation delay', 'panorama' ),
			)
		);
	}

	protected function get_block_attributes( $settings ) {
		$pano_id = self::text( $settings, 'pano_id' );

		if ( '' === $pano_id ) {
			return array();
		}

		return array(
			'panoId'  => $pano_id,
			'options' => array(
				'autoRotate'      => self::is_on( $settings, 'auto_rotate' ),
				'autoRotateSpeed' => self::number( $settings, 'auto_rotate_speed', 1 ),
				'hideDefaultCtrl' => self::is_on( $settings, 'hide_controls' ),
				'initialView'     => self::is_on( $settings, 'initial_view' ),
				'initialPosition' => self::get_initial_view( $settings, $this->get_initial_view_fields() ),
			),
			'layout'  => self::get_layout( $settings ),
		);
	}
}
