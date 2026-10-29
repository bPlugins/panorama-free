<?php
namespace BPPIV\Elementor\Widgets;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Image 3D — renders the panorama/image-3d block.
 */
class Image3D extends Base {

	public function get_name() {
		return 'bppiv-image-3d';
	}

	public function get_title() {
		return esc_html__( 'Image 3D', 'panorama' );
	}

	public function get_icon() {
		return 'eicon-image-box';
	}

	protected function get_block_name() {
		return 'panorama/image-3d';
	}

	protected function get_placeholder_text() {
		return esc_html__( 'Select a panoramic image to display the 3D viewer.', 'panorama' );
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
			'section_image',
			array( 'label' => esc_html__( 'Panorama Image', 'panorama' ) )
		);

		$this->add_media_controls( 'image', esc_html__( 'Image', 'panorama' ) );

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
				esc_html__( 'Device motion (gyroscope) button', 'panorama' ),
				esc_html__( 'Motion button colors', 'panorama' ),
				esc_html__( 'Auto-rotate inactivity delay', 'panorama' ),
			)
		);
	}

	protected function get_block_attributes( $settings ) {
		$image_url = self::media_url( $settings, 'image' );

		if ( '' === $image_url ) {
			return array();
		}

		return array(
			'imageUrl' => $image_url,
			'options'  => array(
				'autoRotate'      => self::is_on( $settings, 'auto_rotate' ),
				'autoRotateSpeed' => self::number( $settings, 'auto_rotate_speed', 1 ),
				'hideDefaultCtrl' => self::is_on( $settings, 'hide_controls' ),
				'initialView'     => self::is_on( $settings, 'initial_view' ),
				'initialPosition' => self::get_initial_view( $settings, $this->get_initial_view_fields() ),
			),
			'layout'   => self::get_layout( $settings ),
		);
	}
}
