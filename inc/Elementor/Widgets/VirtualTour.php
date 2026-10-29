<?php
namespace BPPIV\Elementor\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * 360° Virtual Tour — renders the panorama/virtual-tour block.
 *
 * Scenes (including their initial view) are edited with an Elementor
 * repeater. Hotspots are placed visually in the "Edit Hotspots" modal (the
 * same editor the Gutenberg block uses) and stored as JSON in the hidden
 * "tour_data" control, keyed by scene id.
 */
class VirtualTour extends Base {

	const FREE_SCENE_LIMIT   = 6;
	const FREE_HOTSPOT_LIMIT = 6;
	const CUBE_FACES         = array( 'front', 'right', 'back', 'left', 'up', 'down' );

	public function get_name() {
		return 'bppiv-virtual-tour';
	}

	public function get_title() {
		return esc_html__( '360° Virtual Tour', 'panorama' );
	}

	public function get_icon() {
		return 'eicon-map-pin';
	}

	public function get_keywords() {
		return array( 'virtual tour', 'tour', '360', 'panorama', 'hotspot', 'scene' );
	}

	protected function get_block_name() {
		return 'panorama/virtual-tour';
	}

	protected function get_placeholder_text() {
		return esc_html__( 'Add at least one scene with a 360° image to display the tour.', 'panorama' );
	}

	/** @return int|null Maximum scenes (null = unlimited). */
	protected function get_scene_limit() {
		return self::FREE_SCENE_LIMIT;
	}

	/** @return int|null Maximum hotspots per scene (null = unlimited). */
	protected function get_hotspot_limit() {
		return self::FREE_HOTSPOT_LIMIT;
	}

	/** @return string[] Hotspot types that are rendered. */
	protected function get_hotspot_types() {
		return array( 'scene', 'info', 'link' );
	}

	protected function register_controls() {
		$this->start_controls_section(
			'section_scenes',
			array( 'label' => esc_html__( 'Scenes', 'panorama' ) )
		);

		$repeater = new Repeater();
		$this->register_scene_fields( $repeater );

		$this->add_control(
			'scenes',
			array(
				'label'       => esc_html__( 'Scenes', 'panorama' ),
				'type'        => Controls_Manager::REPEATER,
				'fields'      => $repeater->get_controls(),
				'default'     => array(
					array( 'scene_title' => esc_html__( 'Scene 1', 'panorama' ) ),
				),
				'title_field' => '{{ scene_title }}',
			)
		);

		$limit = $this->get_scene_limit();
		if ( $limit ) {
			$this->add_control(
				'scenes_limit_notice',
				array(
					'type'            => Controls_Manager::RAW_HTML,
					'raw'             => sprintf(
						/* translators: 1: maximum scenes, 2: maximum hotspots per scene. */
						esc_html__( 'The free version shows up to %1$d scenes and %2$d hotspots per scene.', 'panorama' ),
						$limit,
						(int) $this->get_hotspot_limit()
					),
					'content_classes' => 'elementor-descriptor',
				)
			);
		}

		$this->add_control(
			'edit_hotspots',
			array(
				'type'        => Controls_Manager::BUTTON,
				'label'       => esc_html__( 'Hotspots', 'panorama' ),
				'text'        => esc_html__( 'Edit Hotspots', 'panorama' ),
				'event'       => 'bppiv:editTourHotspots',
				'separator'   => 'before',
				'description' => esc_html__( 'Opens the visual editor: click on a scene to add a hotspot, click a hotspot to edit or delete it, and set each scene\'s default view.', 'panorama' ),
			)
		);

		$this->add_control(
			'tour_data',
			array(
				'type'    => Controls_Manager::HIDDEN,
				'default' => '',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_settings',
			array( 'label' => esc_html__( 'Tour Settings', 'panorama' ) )
		);

		$this->add_control(
			'show_labels',
			array(
				'label'       => esc_html__( 'Always Show Hotspot Labels', 'panorama' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
			)
		);

		$this->add_control(
			'scene_list',
			array(
				'label'   => esc_html__( 'Show Scene List', 'panorama' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => '',
			)
		);

		$this->add_control(
			'scene_list_style',
			array(
				'label'     => esc_html__( 'Scene List Style', 'panorama' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'index'   => esc_html__( 'Sidebar', 'panorama' ),
					'hamMenu' => esc_html__( 'Hamburger Menu', 'panorama' ),
				),
				'default'   => 'index',
				'condition' => array( 'scene_list' => 'yes' ),
			)
		);

		$this->add_control(
			'scene_list_align',
			array(
				'label'     => esc_html__( 'Sidebar Position', 'panorama' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'left'  => array(
						'title' => esc_html__( 'Left', 'panorama' ),
						'icon'  => 'eicon-h-align-left',
					),
					'right' => array(
						'title' => esc_html__( 'Right', 'panorama' ),
						'icon'  => 'eicon-h-align-right',
					),
				),
				'default'   => 'right',
				'toggle'    => false,
				'condition' => array(
					'scene_list'       => 'yes',
					'scene_list_style' => 'index',
				),
			)
		);

		$this->add_control(
			'auto_rotate',
			array(
				'label'     => esc_html__( 'Auto Rotate', 'panorama' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => '',
				'separator' => 'before',
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
			'auto_rotate_delay',
			array(
				'label'       => esc_html__( 'Resume Rotation After (ms)', 'panorama' ),
				'type'        => Controls_Manager::NUMBER,
				'min'         => 0,
				'step'        => 100,
				'default'     => 3000,
				'description' => esc_html__( 'Time without interaction before auto rotation starts again.', 'panorama' ),
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
			'draggable',
			array(
				'label'   => esc_html__( 'Allow Dragging', 'panorama' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
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

		$this->register_extra_settings_controls();

		$this->end_controls_section();

		$this->register_extra_controls();

		$this->register_layout_controls( 500 );
	}

	/**
	 * Fields of one scene.
	 *
	 * @param Repeater $repeater Repeater.
	 */
	protected function register_scene_fields( $repeater ) {
		$repeater->add_control(
			'scene_title',
			array(
				'label'       => esc_html__( 'Title', 'panorama' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => esc_html__( 'Scene', 'panorama' ),
				'label_block' => true,
			)
		);

		$repeater->add_control(
			'scene_author',
			array(
				'label'       => esc_html__( 'Author', 'panorama' ),
				'type'        => Controls_Manager::TEXT,
				'label_block' => true,
			)
		);

		$repeater->add_control(
			'show_title_author',
			array(
				'label'   => esc_html__( 'Show Title & Author', 'panorama' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$repeater->add_control(
			'panorama_format',
			array(
				'label'     => esc_html__( 'Image Format', 'panorama' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'equirectangular' => esc_html__( 'Equirectangular', 'panorama' ),
					'cubemap'         => esc_html__( 'Cubemap', 'panorama' ),
					'cylindrical'     => esc_html__( 'Cylindrical', 'panorama' ),
				),
				'default'   => 'equirectangular',
				'separator' => 'before',
			)
		);

		$not_cubemap = array( 'panorama_format!' => 'cubemap' );

		$repeater->add_control(
			'image_source',
			array(
				'label'     => esc_html__( '360° Image', 'panorama' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'library' => array(
						'title' => esc_html__( 'Media Library', 'panorama' ),
						'icon'  => 'eicon-image',
					),
					'url'     => array(
						'title' => esc_html__( 'External URL', 'panorama' ),
						'icon'  => 'eicon-link',
					),
				),
				'default'   => 'library',
				'toggle'    => false,
				'condition' => $not_cubemap,
			)
		);

		$repeater->add_control(
			'image',
			array(
				'type'      => Controls_Manager::MEDIA,
				'default'   => array( 'url' => '' ),
				'condition' => array_merge( $not_cubemap, array( 'image_source' => 'library' ) ),
			)
		);

		$repeater->add_control(
			'image_url',
			array(
				'type'        => Controls_Manager::TEXT,
				'input_type'  => 'url',
				'placeholder' => 'https://',
				'label_block' => true,
				'condition'   => array_merge( $not_cubemap, array( 'image_source' => 'url' ) ),
			)
		);

		foreach ( self::CUBE_FACES as $face ) {
			$repeater->add_control(
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

		$repeater->add_control(
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

		$repeater->add_control(
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

		$repeater->add_control(
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

		$repeater->add_control(
			'initial_view_heading',
			array(
				'label'       => esc_html__( 'Initial View', 'panorama' ),
				'type'        => Controls_Manager::HEADING,
				'separator'   => 'before',
				'description' => esc_html__( 'Or use "Set Default View" in Edit Hotspots.', 'panorama' ),
			)
		);

		$view = array(
			'hfov'  => array( esc_html__( 'Zoom (HFOV)', 'panorama' ), 110, 30, 120 ),
			'pitch' => array( esc_html__( 'Pitch', 'panorama' ), 0, -90, 90 ),
			'yaw'   => array( esc_html__( 'Yaw', 'panorama' ), 5, -180, 180 ),
		);

		foreach ( $view as $id => $field ) {
			$repeater->add_control(
				$id,
				array(
					'label'   => $field[0],
					'type'    => Controls_Manager::NUMBER,
					'default' => $field[1],
					'min'     => $field[2],
					'max'     => $field[3],
					'step'    => 0.1,
				)
			);
		}
	}

	/**
	 * Extra controls inside the Tour Settings section (the Pro version adds its controls here).
	 */
	protected function register_extra_settings_controls() {}

	protected function register_extra_controls() {
		$this->register_pro_notice(
			array(
				esc_html__( 'Unlimited scenes', 'panorama' ),
				esc_html__( 'Unlimited hotspots per scene', 'panorama' ),
				esc_html__( 'Video, image and WooCommerce product hotspots', 'panorama' ),
				esc_html__( 'Compass', 'panorama' ),
				esc_html__( 'Mouse wheel, keyboard & double-click zoom control', 'panorama' ),
			)
		);
	}

	/* ---------------------------------------------------------------------
	 * Attributes
	 * ------------------------------------------------------------------- */

	/**
	 * Scene id used by the block. Built from Elementor's stable repeater item id,
	 * so hotspots keep pointing to the right scene when scenes are reordered.
	 * Must match sceneId() in src/elementor/editor.js.
	 */
	protected static function scene_id( $item, $index ) {
		$raw = isset( $item['_id'] ) ? preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $item['_id'] ) : '';

		return 'scene_' . ( '' !== $raw ? $raw : $index );
	}

	protected static function scene_image( $item ) {
		$source = isset( $item['image_source'] ) ? $item['image_source'] : 'library';

		if ( 'url' === $source ) {
			$url = isset( $item['image_url'] ) ? $item['image_url'] : '';
		} else {
			$url = isset( $item['image']['url'] ) ? $item['image']['url'] : '';
		}

		return is_string( $url ) ? esc_url_raw( trim( $url ) ) : '';
	}

	protected static function decode_tour_data( $settings ) {
		$raw = isset( $settings['tour_data'] ) && is_string( $settings['tour_data'] ) ? $settings['tour_data'] : '';
		if ( '' === $raw ) {
			return array();
		}

		$data = json_decode( $raw, true );

		return is_array( $data ) ? $data : array();
	}

	/**
	 * Sanitize one hotspot coming from the visual editor.
	 *
	 * @param array    $spot      Raw hotspot.
	 * @param string[] $scene_ids Valid scene ids.
	 * @return array|null
	 */
	protected function sanitize_hotspot( $spot, $scene_ids ) {
		if ( ! is_array( $spot ) || ! isset( $spot['type'] ) || ! in_array( $spot['type'], $this->get_hotspot_types(), true ) ) {
			return null;
		}

		if ( ! isset( $spot['pitch'], $spot['yaw'] ) || ! is_numeric( $spot['pitch'] ) || ! is_numeric( $spot['yaw'] ) ) {
			return null;
		}

		$type = $spot['type'];
		$text = isset( $spot['text'] ) ? $spot['text'] : '';

		// Product titles can arrive as a REST "rendered" object.
		if ( is_array( $text ) ) {
			$text = isset( $text['rendered'] ) ? $text['rendered'] : '';
		}

		$clean = array(
			'pitch' => (float) $spot['pitch'],
			'yaw'   => (float) $spot['yaw'],
			'type'  => $type,
			'text'  => is_string( $text ) ? wp_kses_post( $text ) : '',
		);

		if ( 'scene' === $type ) {
			$target = isset( $spot['sceneId'] ) ? (string) $spot['sceneId'] : '';
			if ( ! in_array( $target, $scene_ids, true ) ) {
				return null;
			}
			$clean['sceneId'] = $target;

			if ( isset( $spot['targetPitch'], $spot['targetYaw'] ) && is_numeric( $spot['targetPitch'] ) && is_numeric( $spot['targetYaw'] ) ) {
				$clean['targetPitch'] = (float) $spot['targetPitch'];
				$clean['targetYaw']   = (float) $spot['targetYaw'];
				$clean['lookAt']      = array(
					'pitch' => $clean['targetPitch'],
					'yaw'   => $clean['targetYaw'],
				);
			}
		}

		if ( 'link' === $type ) {
			$clean['linkUrl']    = isset( $spot['linkUrl'] ) && is_string( $spot['linkUrl'] ) ? esc_url_raw( $spot['linkUrl'] ) : '';
			$clean['linkTarget'] = isset( $spot['linkTarget'] ) && '_self' === $spot['linkTarget'] ? '_self' : '_blank';
		}

		if ( 'video' === $type ) {
			$clean['videoSource'] = isset( $spot['videoSource'] ) && in_array( $spot['videoSource'], array( 'youtube', 'vimeo', 'self-hosted' ), true ) ? $spot['videoSource'] : 'youtube';

			$video = isset( $spot['videoUrl'] ) && is_string( $spot['videoUrl'] ) ? trim( $spot['videoUrl'] ) : '';

			// YouTube / Vimeo also accept a bare video id (e.g. "dQw4w9WgXcQ").
			if ( 'self-hosted' !== $clean['videoSource'] && preg_match( '/^[A-Za-z0-9_-]+$/', $video ) ) {
				$clean['videoUrl'] = $video;
			} else {
				$clean['videoUrl'] = esc_url_raw( $video );
			}
		}

		if ( 'image' === $type ) {
			$clean['imageUrl'] = isset( $spot['imageUrl'] ) && is_string( $spot['imageUrl'] ) ? esc_url_raw( $spot['imageUrl'] ) : '';
		}

		if ( 'product' === $type ) {
			$clean['productId']    = isset( $spot['productId'] ) ? absint( $spot['productId'] ) : 0;
			$clean['productTitle'] = isset( $spot['productTitle'] ) && is_string( $spot['productTitle'] ) ? wp_kses_post( $spot['productTitle'] ) : '';
			$clean['productPrice'] = isset( $spot['productPrice'] ) && is_string( $spot['productPrice'] ) ? wp_kses_post( $spot['productPrice'] ) : '';
			$clean['productImage'] = isset( $spot['productImage'] ) && is_string( $spot['productImage'] ) ? esc_url_raw( $spot['productImage'] ) : '';
			$clean['productUrl']   = isset( $spot['productUrl'] ) && is_string( $spot['productUrl'] ) ? esc_url_raw( $spot['productUrl'] ) : '';
		}

		return $clean;
	}

	/**
	 * Scenes in the block format.
	 */
	protected function get_scenes( $settings ) {
		$items = isset( $settings['scenes'] ) && is_array( $settings['scenes'] ) ? array_values( $settings['scenes'] ) : array();
		$limit = $this->get_scene_limit();

		if ( $limit ) {
			$items = array_slice( $items, 0, $limit );
		}

		$scenes = array();

		foreach ( $items as $index => $item ) {
			$format = isset( $item['panorama_format'] ) && in_array( $item['panorama_format'], array( 'equirectangular', 'cubemap', 'cylindrical' ), true ) ? $item['panorama_format'] : 'equirectangular';
			$is_cylinder = 'cylindrical' === $format;

			$cube_map = array();
			foreach ( self::CUBE_FACES as $face ) {
				$cube_map[ $face ] = isset( $item[ 'cube_' . $face ]['url'] ) ? esc_url_raw( $item[ 'cube_' . $face ]['url'] ) : '';
			}

			$panorama = 'cubemap' === $format ? '' : self::scene_image( $item );

			// Skip scenes that have nothing to show yet.
			if ( 'cubemap' === $format ? in_array( '', $cube_map, true ) : '' === $panorama ) {
				continue;
			}

			$scenes[] = array(
				'tour_id'        => self::scene_id( $item, $index ),
				'isTitleAuthor'  => self::is_on( $item, 'show_title_author' ),
				'title'          => self::text( $item, 'scene_title' ),
				'author'         => self::text( $item, 'scene_author' ),
				'hfov'           => self::number( $item, 'hfov', 110 ),
				'pitch'          => self::number( $item, 'pitch', 0 ),
				'yaw'            => self::number( $item, 'yaw', 5 ),
				'type'           => 'equirectangular',
				'panorama'       => $panorama,
				'panoramaFormat' => $format,
				'haov'           => $is_cylinder ? self::number( $item, 'haov', 360 ) : 360,
				'vaov'           => $is_cylinder ? self::number( $item, 'vaov', 180 ) : 180,
				'vOffset'        => $is_cylinder ? self::number( $item, 'voffset', 0 ) : 0,
				'cubeMap'        => $cube_map,
				'hotSpots'       => array(),
			);

			// Pannellum shows "by" even for an empty author, so leave empty values out.
			$last = count( $scenes ) - 1;
			foreach ( array( 'title', 'author' ) as $key ) {
				if ( '' === $scenes[ $last ][ $key ] ) {
					unset( $scenes[ $last ][ $key ] );
				}
			}
		}

		$data      = self::decode_tour_data( $settings );
		$scene_ids = wp_list_pluck( $scenes, 'tour_id' );
		$hotspot_limit = $this->get_hotspot_limit();

		foreach ( $scenes as $i => $scene ) {
			$saved = isset( $data[ $scene['tour_id'] ] ) && is_array( $data[ $scene['tour_id'] ] ) ? $data[ $scene['tour_id'] ] : array();

			$spots = isset( $saved['hotSpots'] ) && is_array( $saved['hotSpots'] ) ? $saved['hotSpots'] : array();
			foreach ( $spots as $spot ) {
				if ( $hotspot_limit && count( $scenes[ $i ]['hotSpots'] ) >= $hotspot_limit ) {
					break;
				}

				$clean = $this->sanitize_hotspot( $spot, $scene_ids );
				if ( $clean ) {
					$scenes[ $i ]['hotSpots'][] = $clean;
				}
			}
		}

		return $scenes;
	}

	protected function get_block_attributes( $settings ) {
		$scenes = $this->get_scenes( $settings );

		if ( empty( $scenes ) ) {
			return array();
		}

		$list_style = isset( $settings['scene_list_style'] ) && 'hamMenu' === $settings['scene_list_style'] ? 'hamMenu' : 'index';
		$list_align = isset( $settings['scene_list_align'] ) && 'left' === $settings['scene_list_align'] ? 'left' : 'right';

		$attributes = array(
			'align'   => '',
			'scenes'  => $scenes,
			'options' => array(
				'isLabel'                   => self::is_on( $settings, 'show_labels' ),
				'isShowSceneHotspot'        => self::is_on( $settings, 'scene_list' ),
				'tabSl'                     => $list_style,
				'showSceneListAlign'        => $list_align,
				'isRotate'                  => self::is_on( $settings, 'auto_rotate' ),
				'autoRotateSpeed'           => self::number( $settings, 'auto_rotate_speed', 1 ),
				'autoRotateInactivityDelay' => self::number( $settings, 'auto_rotate_delay', 3000 ),
				'hideDefaultCtrl'           => self::is_on( $settings, 'hide_controls' ),
				'draggable'                 => self::is_on( $settings, 'draggable' ),
				'orientation'               => self::is_on( $settings, 'orientation' ),
			),
			'layout'  => self::get_layout( $settings, 500 ),
		);

		return $this->add_pro_attributes( $attributes, $settings );
	}

	/**
	 * Pro-only attributes (the Pro version overrides this).
	 */
	protected function add_pro_attributes( $attributes, $settings ) {
		return $attributes;
	}
}
