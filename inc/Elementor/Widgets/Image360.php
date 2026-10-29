<?php
namespace BPPIV\Elementor\Widgets;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Image 360° — renders the panorama/image-360 block.
 */
class Image360 extends Base {

	const CUBE_FACES = array( 'front', 'right', 'back', 'left', 'up', 'down' );

	public function get_name() {
		return 'bppiv-image-360';
	}

	public function get_title() {
		return esc_html__( 'Image 360°', 'panorama' );
	}

	public function get_icon() {
		return 'eicon-image-rollover';
	}

	protected function get_block_name() {
		return 'panorama/image-360';
	}

	protected function get_placeholder_text() {
		return esc_html__( 'Select a 360° image to display the panorama.', 'panorama' );
	}

	protected function get_initial_view_fields() {
		return array(
			'pitch' => array( esc_html__( 'Pitch', 'panorama' ), 0 ),
			'yaw'   => array( esc_html__( 'Yaw', 'panorama' ), 0 ),
			'hfov'  => array( esc_html__( 'Zoom (HFOV)', 'panorama' ), 120 ),
		);
	}

	protected function register_controls() {
		$this->start_controls_section(
			'section_image',
			array( 'label' => esc_html__( 'Panorama Image', 'panorama' ) )
		);

		$this->add_control(
			'panorama_format',
			array(
				'label'   => esc_html__( 'Image Format', 'panorama' ),
				'type'    => Controls_Manager::SELECT,
				'options' => array(
					'equirectangular' => esc_html__( 'Equirectangular', 'panorama' ),
					'cubemap'         => esc_html__( 'Cubemap', 'panorama' ),
					'cylindrical'     => esc_html__( 'Cylindrical', 'panorama' ),
				),
				'default' => 'equirectangular',
			)
		);

		$this->add_media_controls( 'image', esc_html__( 'Image', 'panorama' ), 'image', array( 'panorama_format!' => 'cubemap' ) );

		$this->add_control(
			'cubemap_notice',
			array(
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => esc_html__( 'Upload all six cube faces.', 'panorama' ),
				'content_classes' => 'elementor-panel-alert elementor-panel-alert-info',
				'condition'       => array( 'panorama_format' => 'cubemap' ),
			)
		);

		foreach ( self::CUBE_FACES as $face ) {
			$this->add_control(
				'cube_' . $face,
				array(
					/* translators: %s: cube face name, e.g. Front. */
					'label'     => sprintf( esc_html__( '%s Face', 'panorama' ), ucfirst( $face ) ),
					'type'      => Controls_Manager::MEDIA,
					'default'   => array( 'url' => '' ),
					'condition' => array( 'panorama_format' => 'cubemap' ),
				)
			);
		}

		$cylindrical = array( 'panorama_format' => 'cylindrical' );

		$this->add_control(
			'haov',
			array(
				'label'     => esc_html__( 'Horizontal Angle (HAOV)', 'panorama' ),
				'type'      => Controls_Manager::NUMBER,
				'min'       => 60,
				'max'       => 360,
				'default'   => 360,
				'condition' => $cylindrical,
			)
		);

		$this->add_control(
			'vaov',
			array(
				'label'     => esc_html__( 'Vertical Angle (VAOV)', 'panorama' ),
				'type'      => Controls_Manager::NUMBER,
				'min'       => 20,
				'max'       => 180,
				'default'   => 180,
				'condition' => $cylindrical,
			)
		);

		$this->add_control(
			'voffset',
			array(
				'label'     => esc_html__( 'Vertical Offset', 'panorama' ),
				'type'      => Controls_Manager::NUMBER,
				'min'       => -30,
				'max'       => 30,
				'default'   => 0,
				'condition' => $cylindrical,
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
				'label'       => esc_html__( 'Rotate Speed', 'panorama' ),
				'type'        => Controls_Manager::NUMBER,
				'min'         => -100,
				'max'         => 100,
				'step'        => 0.1,
				'default'     => 1,
				'description' => esc_html__( 'Use a negative value to rotate the other way.', 'panorama' ),
				'condition'   => array( 'auto_rotate' => 'yes' ),
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

		$this->add_control(
			'orientation',
			array(
				'label'       => esc_html__( 'Gyroscope (Device Orientation)', 'panorama' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'description' => esc_html__( 'Lets mobile visitors look around by moving their device.', 'panorama' ),
			)
		);

		$this->add_initial_view_controls( $this->get_initial_view_fields() );

		$this->end_controls_section();

		$this->register_extra_controls();

		$this->register_layout_controls();
	}

	/**
	 * Additional content sections (the Pro version adds its controls here).
	 */
	protected function register_extra_controls() {
		$this->register_pro_notice(
			array(
				esc_html__( 'Preview image with "Click to Load" button', 'panorama' ),
				esc_html__( 'Custom navigation controls', 'panorama' ),
				esc_html__( 'Compass', 'panorama' ),
				esc_html__( 'Title & author overlay', 'panorama' ),
				esc_html__( 'Mouse wheel, keyboard & double-click zoom control', 'panorama' ),
				esc_html__( 'Disable dragging', 'panorama' ),
				esc_html__( 'Auto-rotate inactivity delay', 'panorama' ),
			)
		);
	}

	protected function get_block_attributes( $settings ) {
		$format = isset( $settings['panorama_format'] ) && in_array( $settings['panorama_format'], array( 'equirectangular', 'cubemap', 'cylindrical' ), true )
			? $settings['panorama_format']
			: 'equirectangular';

		$cube_map = array();
		foreach ( self::CUBE_FACES as $face ) {
			$cube_map[ $face ] = isset( $settings[ 'cube_' . $face ]['url'] ) ? esc_url_raw( $settings[ 'cube_' . $face ]['url'] ) : '';
		}

		$image_url = 'cubemap' === $format ? '' : self::media_url( $settings, 'image' );

		if ( 'cubemap' === $format ? in_array( '', $cube_map, true ) : '' === $image_url ) {
			return array();
		}

		return array(
			'imageUrl'       => $image_url,
			'panoramaFormat' => $format,
			'haov'           => self::number( $settings, 'haov', 360 ),
			'vaov'           => self::number( $settings, 'vaov', 180 ),
			'vOffset'        => self::number( $settings, 'voffset', 0 ),
			'cubeMap'        => $cube_map,
			'options'        => array(
				'isRotate'            => self::is_on( $settings, 'auto_rotate' ),
				'autoRotateSpeed'     => self::number( $settings, 'auto_rotate_speed', 1 ),
				'hideDefaultCtrl'     => self::is_on( $settings, 'hide_controls' ),
				'orientation'         => self::is_on( $settings, 'orientation' ),
				'initialView'         => self::is_on( $settings, 'initial_view' ),
				'initialViewPosition' => self::get_initial_view( $settings, $this->get_initial_view_fields() ),
			),
			'layout'         => self::get_layout( $settings ),
		);
	}
}
