<?php
namespace BPPIV\Elementor\Widgets;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Video (panoramic video) — renders the panorama/video block.
 */
class Video extends Base {

	public function get_name() {
		return 'bppiv-video';
	}

	public function get_title() {
		return esc_html__( 'Panorama Video', 'panorama' );
	}

	public function get_icon() {
		return 'eicon-play';
	}

	protected function get_block_name() {
		return 'panorama/video';
	}

	protected function get_placeholder_text() {
		return esc_html__( 'Select a panoramic video to display the viewer.', 'panorama' );
	}

	protected function get_initial_view_fields() {
		return array(
			'x' => array( esc_html__( 'Camera X', 'panorama' ), 0 ),
			'y' => array( esc_html__( 'Camera Y', 'panorama' ), 0 ),
			'z' => array( esc_html__( 'Camera Z', 'panorama' ), 120 ),
		);
	}

	protected function register_controls() {
		$this->start_controls_section(
			'section_video',
			array( 'label' => esc_html__( 'Panorama Video', 'panorama' ) )
		);

		$this->add_media_controls( 'video', esc_html__( 'Video', 'panorama' ), 'video' );

		$this->end_controls_section();

		$this->start_controls_section(
			'section_settings',
			array( 'label' => esc_html__( 'Viewer Settings', 'panorama' ) )
		);

		$this->add_control(
			'autoplay',
			array(
				'label'       => esc_html__( 'Autoplay', 'panorama' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'description' => esc_html__( 'Most browsers only autoplay muted videos.', 'panorama' ),
			)
		);

		$this->add_control(
			'muted',
			array(
				'label'   => esc_html__( 'Muted', 'panorama' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => '',
			)
		);

		$this->add_control(
			'loop',
			array(
				'label'   => esc_html__( 'Loop', 'panorama' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->add_control(
			'control_bar',
			array(
				'label'   => esc_html__( 'Show Control Bar', 'panorama' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
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
				esc_html__( 'Show / hide the fullscreen button', 'panorama' ),
				esc_html__( 'Show / hide the settings button', 'panorama' ),
				esc_html__( 'Show / hide the progress bar & play/pause button', 'panorama' ),
			)
		);
	}

	protected function get_block_attributes( $settings ) {
		$video_url = self::media_url( $settings, 'video' );

		if ( '' === $video_url ) {
			return array();
		}

		return array(
			'videoUrl' => $video_url,
			'options'  => array(
				'autoplay'        => self::is_on( $settings, 'autoplay' ),
				'muted'           => self::is_on( $settings, 'muted' ),
				'loop'            => self::is_on( $settings, 'loop' ),
				'controlBar'      => self::is_on( $settings, 'control_bar' ),
				'initialView'     => self::is_on( $settings, 'initial_view' ),
				'initialPosition' => self::get_initial_view( $settings, $this->get_initial_view_fields() ),
			),
			'layout'   => self::get_layout( $settings ),
		);
	}
}
