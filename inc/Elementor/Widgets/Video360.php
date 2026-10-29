<?php
namespace BPPIV\Elementor\Widgets;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Video 360° — renders the panorama/video-360 block.
 */
class Video360 extends Base {

	public function get_name() {
		return 'bppiv-video-360';
	}

	public function get_title() {
		return esc_html__( 'Video 360°', 'panorama' );
	}

	public function get_icon() {
		return 'eicon-youtube';
	}

	protected function get_block_name() {
		return 'panorama/video-360';
	}

	protected function get_placeholder_text() {
		return esc_html__( 'Select a 360° video to display the viewer.', 'panorama' );
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
			array( 'label' => esc_html__( '360° Video', 'panorama' ) )
		);

		$this->add_media_controls( 'video', esc_html__( 'Video', 'panorama' ), 'video' );

		$this->end_controls_section();

		$this->start_controls_section(
			'section_settings',
			array( 'label' => esc_html__( 'Viewer Settings', 'panorama' ) )
		);

		$switches = array(
			'autoplay' => array( esc_html__( 'Autoplay', 'panorama' ), 'yes' ),
			'loop'     => array( esc_html__( 'Loop', 'panorama' ), 'yes' ),
			'play'     => array( esc_html__( 'Play / Pause Button', 'panorama' ), 'yes' ),
			'progress' => array( esc_html__( 'Progress Bar', 'panorama' ), 'yes' ),
			'volume'   => array( esc_html__( 'Volume Control', 'panorama' ), 'yes' ),
		);

		foreach ( $switches as $key => $switch ) {
			$this->add_control(
				$key,
				array(
					'label'   => $switch[0],
					'type'    => Controls_Manager::SWITCHER,
					'default' => $switch[1],
				)
			);
		}

		$this->add_initial_view_controls( $this->get_initial_view_fields() );

		$this->end_controls_section();

		$this->register_extra_controls();

		$this->register_layout_controls( false );
	}

	protected function register_extra_controls() {
		$this->register_pro_notice(
			array(
				esc_html__( 'Remaining time display', 'panorama' ),
				esc_html__( 'Picture-in-Picture button', 'panorama' ),
				esc_html__( 'Fullscreen button', 'panorama' ),
				esc_html__( 'Playback speed control', 'panorama' ),
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
				'loop'            => self::is_on( $settings, 'loop' ),
				'play'            => self::is_on( $settings, 'play' ),
				'progress'        => self::is_on( $settings, 'progress' ),
				'volume'          => self::is_on( $settings, 'volume' ),
				'initialView'     => self::is_on( $settings, 'initial_view' ),
				'initialPosition' => self::get_initial_view( $settings, $this->get_initial_view_fields() ),
			),
			'layout'   => self::get_layout( $settings, false ),
		);
	}
}
