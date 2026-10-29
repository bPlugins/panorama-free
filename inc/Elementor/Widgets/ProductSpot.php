<?php
namespace BPPIV\Elementor\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Product Spot — renders the psb/product-spot block.
 */
class ProductSpot extends Base {

	const FREE_HOTSPOT_LIMIT = 3;

	public function get_name() {
		return 'bppiv-product-spot';
	}

	public function get_title() {
		return esc_html__( 'Product Spot', 'panorama' );
	}

	public function get_icon() {
		return 'eicon-image-hotspot';
	}

	public function get_keywords() {
		return array( 'product spot', 'hotspot', 'image hotspot', 'tooltip', 'panorama' );
	}

	protected function get_block_name() {
		return 'psb/product-spot';
	}

	protected function get_placeholder_text() {
		return esc_html__( 'Select an image to add product hotspots.', 'panorama' );
	}

	/**
	 * Maximum hotspots rendered (null = unlimited).
	 *
	 * @return int|null
	 */
	protected function get_hotspot_limit() {
		return self::FREE_HOTSPOT_LIMIT;
	}

	protected function register_controls() {
		$this->start_controls_section(
			'section_image',
			array( 'label' => esc_html__( 'Image', 'panorama' ) )
		);

		$this->add_media_controls( 'image', esc_html__( 'Image', 'panorama' ) );

		$this->add_control(
			'image_alt',
			array(
				'label'       => esc_html__( 'Alt Text', 'panorama' ),
				'type'        => Controls_Manager::TEXT,
				'label_block' => true,
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_hotspots',
			array( 'label' => esc_html__( 'Hotspots', 'panorama' ) )
		);

		$repeater = new Repeater();
		$this->register_hotspot_fields( $repeater );

		$this->add_control(
			'hotspots',
			array(
				'label'       => esc_html__( 'Hotspots', 'panorama' ),
				'type'        => Controls_Manager::REPEATER,
				'fields'      => $repeater->get_controls(),
				'default'     => array(
					array(
						'title'       => esc_html__( 'Hotspot Title 1', 'panorama' ),
						'description' => esc_html__( 'Hotspot Description 1', 'panorama' ),
						'pos_x'       => array( 'unit' => '%', 'size' => 30 ),
						'pos_y'       => array( 'unit' => '%', 'size' => 40 ),
					),
					array(
						'title'       => esc_html__( 'Hotspot Title 2', 'panorama' ),
						'description' => esc_html__( 'Hotspot Description 2', 'panorama' ),
						'pos_x'       => array( 'unit' => '%', 'size' => 65 ),
						'pos_y'       => array( 'unit' => '%', 'size' => 60 ),
					),
				),
				'title_field' => '{{ title }}',
			)
		);

		$limit = $this->get_hotspot_limit();
		if ( $limit ) {
			$this->add_control(
				'hotspots_limit_notice',
				array(
					'type'            => Controls_Manager::RAW_HTML,
					/* translators: %d: maximum number of hotspots. */
					'raw'             => sprintf( esc_html__( 'The free version shows up to %d hotspots. Upgrade to Pro for unlimited hotspots.', 'panorama' ), $limit ),
					'content_classes' => 'elementor-descriptor',
				)
			);
		}

		$this->end_controls_section();

		$this->start_controls_section(
			'section_settings',
			array( 'label' => esc_html__( 'Settings', 'panorama' ) )
		);

		$this->add_control(
			'theme',
			array(
				'label'   => esc_html__( 'Tooltip Theme', 'panorama' ),
				'type'    => Controls_Manager::SELECT,
				'options' => array(
					'simple'    => esc_html__( 'Simple', 'panorama' ),
					'sidepanel' => esc_html__( 'Side Panel', 'panorama' ),
					'tippy'     => esc_html__( 'Tippy', 'panorama' ),
				),
				'default' => 'simple',
			)
		);

		$this->add_control(
			'alignment',
			array(
				'label'   => esc_html__( 'Alignment', 'panorama' ),
				'type'    => Controls_Manager::CHOOSE,
				'options' => array(
					'left'   => array(
						'title' => esc_html__( 'Left', 'panorama' ),
						'icon'  => 'eicon-h-align-left',
					),
					'center' => array(
						'title' => esc_html__( 'Center', 'panorama' ),
						'icon'  => 'eicon-h-align-center',
					),
					'right'  => array(
						'title' => esc_html__( 'Right', 'panorama' ),
						'icon'  => 'eicon-h-align-right',
					),
				),
				'default' => 'center',
				'toggle'  => false,
			)
		);

		$this->add_control(
			'global_icon',
			array(
				'label'       => esc_html__( 'Hotspot Icon', 'panorama' ),
				'type'        => Controls_Manager::ICONS,
				'skin'        => 'inline',
				'label_block' => false,
				'default'     => array(
					'value'   => '',
					'library' => '',
				),
				'description' => esc_html__( 'Leave empty to use the default plus icon.', 'panorama' ),
			)
		);

		$this->register_extra_settings_controls();

		$this->end_controls_section();

		$this->register_extra_controls();

		$this->register_style_controls();
	}

	/**
	 * Fields of one hotspot.
	 *
	 * @param Repeater $repeater Repeater.
	 */
	protected function register_hotspot_fields( $repeater ) {
		$repeater->add_control(
			'title',
			array(
				'label'       => esc_html__( 'Title', 'panorama' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => esc_html__( 'Hotspot Title', 'panorama' ),
				'label_block' => true,
			)
		);

		$repeater->add_control(
			'description',
			array(
				'label'   => esc_html__( 'Description', 'panorama' ),
				'type'    => Controls_Manager::TEXTAREA,
				'default' => esc_html__( 'Hotspot Description', 'panorama' ),
			)
		);

		$repeater->add_control(
			'pos_x',
			array(
				'label'      => esc_html__( 'Horizontal Position', 'panorama' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( '%' ),
				'range'      => array( '%' => array( 'min' => 0, 'max' => 100, 'step' => 0.1 ) ),
				'default'    => array( 'unit' => '%', 'size' => 50 ),
			)
		);

		$repeater->add_control(
			'pos_y',
			array(
				'label'      => esc_html__( 'Vertical Position', 'panorama' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( '%' ),
				'range'      => array( '%' => array( 'min' => 0, 'max' => 100, 'step' => 0.1 ) ),
				'default'    => array( 'unit' => '%', 'size' => 50 ),
			)
		);
	}

	/**
	 * Extra controls inside the Settings section (the Pro version adds its controls here).
	 */
	protected function register_extra_settings_controls() {}

	protected function register_extra_controls() {
		$this->register_pro_notice(
			array(
				esc_html__( 'Unlimited hotspots', 'panorama' ),
				esc_html__( 'Custom icon for each hotspot', 'panorama' ),
				esc_html__( 'Show / hide hotspot title and description', 'panorama' ),
				esc_html__( 'Image border radius', 'panorama' ),
				esc_html__( 'Hotspot padding and border', 'panorama' ),
				esc_html__( 'Tooltip radius and padding', 'panorama' ),
				esc_html__( 'Title & description typography', 'panorama' ),
				esc_html__( 'Side panel button layout', 'panorama' ),
			)
		);
	}

	protected function add_color_control( $id, $label, $default, $condition = array() ) {
		$this->add_control(
			$id,
			array(
				'label'     => $label,
				'type'      => Controls_Manager::COLOR,
				'default'   => $default,
				'condition' => $condition,
			)
		);
	}

	protected function register_style_controls() {
		$this->start_controls_section(
			'section_style_image',
			array(
				'label' => esc_html__( 'Image', 'panorama' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_responsive_control(
			'image_width',
			array(
				'label'      => esc_html__( 'Max Width', 'panorama' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( '%', 'px' ),
				'range'      => array(
					'%'  => array( 'min' => 10, 'max' => 100 ),
					'px' => array( 'min' => 100, 'max' => 2000 ),
				),
				'default'    => array( 'unit' => '%', 'size' => 100 ),
			)
		);

		$this->register_extra_image_style_controls();

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_hotspot',
			array(
				'label' => esc_html__( 'Hotspot', 'panorama' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$sizes = array(
			'hotspot_width'  => array( esc_html__( 'Width', 'panorama' ), 24, 10, 100, true ),
			'hotspot_height' => array( esc_html__( 'Height', 'panorama' ), 24, 10, 100, true ),
			'icon_width'     => array( esc_html__( 'Icon Width', 'panorama' ), 20, 6, 80, false ),
			'icon_height'    => array( esc_html__( 'Icon Height', 'panorama' ), 20, 6, 80, false ),
		);

		foreach ( $sizes as $id => $size ) {
			$args = array(
				'label'      => $size[0],
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array( 'px' => array( 'min' => $size[2], 'max' => $size[3] ) ),
				'default'    => array( 'unit' => 'px', 'size' => $size[1] ),
			);

			if ( $size[4] ) {
				$this->add_responsive_control( $id, $args );
			} else {
				$this->add_control( $id, $args );
			}
		}

		$this->add_color_control( 'hotspot_color', esc_html__( 'Icon Color', 'panorama' ), '#fff' );
		$this->add_color_control( 'hotspot_bg', esc_html__( 'Background Color', 'panorama' ), '#0f34da' );

		$this->register_extra_hotspot_style_controls();

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_info',
			array(
				'label' => esc_html__( 'Tooltip', 'panorama' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'info_bg',
			array(
				'label'       => esc_html__( 'Background Color', 'panorama' ),
				'type'        => Controls_Manager::COLOR,
				'default'     => '',
				'description' => esc_html__( 'Leave empty to use the theme default.', 'panorama' ),
			)
		);

		$this->add_color_control( 'title_color', esc_html__( 'Title Color', 'panorama' ), '#111827' );
		$this->add_color_control( 'desc_color', esc_html__( 'Description Color', 'panorama' ), '#374151' );

		$this->register_extra_info_style_controls();

		$this->end_controls_section();

		$sidepanel = array( 'theme' => 'sidepanel' );

		$this->start_controls_section(
			'section_style_buttons',
			array(
				'label'     => esc_html__( 'Side Panel Buttons', 'panorama' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => $sidepanel,
			)
		);

		$this->add_color_control( 'btn_color', esc_html__( 'Text Color', 'panorama' ), '#4b5563' );
		$this->add_color_control( 'btn_bg', esc_html__( 'Background Color', 'panorama' ), '#f9f9f9' );
		$this->add_color_control( 'btn_hover_color', esc_html__( 'Hover Text Color', 'panorama' ), '#4b5563' );
		$this->add_color_control( 'btn_hover_bg', esc_html__( 'Hover Background Color', 'panorama' ), '#c8c0c091' );
		$this->add_color_control( 'btn_active_color', esc_html__( 'Active Text Color', 'panorama' ), '#ffffff' );
		$this->add_color_control( 'btn_active_bg', esc_html__( 'Active Background Color', 'panorama' ), '#0f34da' );

		$this->register_extra_button_style_controls();

		$this->end_controls_section();
	}

	// Hooks for the Pro version.
	protected function register_extra_image_style_controls() {}
	protected function register_extra_hotspot_style_controls() {}
	protected function register_extra_info_style_controls() {}
	protected function register_extra_button_style_controls() {}

	protected static function color( $settings, $key, $default ) {
		$value = isset( $settings[ $key ] ) ? sanitize_text_field( $settings[ $key ] ) : '';

		return '' !== $value ? $value : $default;
	}

	/**
	 * Keeps only safe SVG markup (the block expects icons as SVG code).
	 */
	protected static function sanitize_svg( $svg ) {
		if ( ! is_string( $svg ) || '' === trim( $svg ) ) {
			return '';
		}

		$common = array(
			'class'           => true,
			'id'              => true,
			'fill'            => true,
			'fill-rule'       => true,
			'clip-rule'       => true,
			'stroke'          => true,
			'stroke-width'    => true,
			'stroke-linecap'  => true,
			'stroke-linejoin' => true,
			'opacity'         => true,
			'transform'       => true,
		);

		$allowed = array(
			'svg'      => array_merge(
				$common,
				array(
					'xmlns'       => true,
					'viewbox'     => true,
					'width'       => true,
					'height'      => true,
					'aria-hidden' => true,
					'role'        => true,
					'focusable'   => true,
				)
			),
			'g'        => $common,
			'path'     => array_merge( $common, array( 'd' => true ) ),
			'circle'   => array_merge( $common, array( 'cx' => true, 'cy' => true, 'r' => true ) ),
			'ellipse'  => array_merge( $common, array( 'cx' => true, 'cy' => true, 'rx' => true, 'ry' => true ) ),
			'rect'     => array_merge( $common, array( 'x' => true, 'y' => true, 'width' => true, 'height' => true, 'rx' => true, 'ry' => true ) ),
			'line'     => array_merge( $common, array( 'x1' => true, 'y1' => true, 'x2' => true, 'y2' => true ) ),
			'polyline' => array_merge( $common, array( 'points' => true ) ),
			'polygon'  => array_merge( $common, array( 'points' => true ) ),
			'title'    => array(),
		);

		$svg = trim( wp_kses( $svg, $allowed ) );

		return 0 === strpos( $svg, '<svg' ) ? $svg : '';
	}

	/**
	 * SVG markup of an Elementor Icons control value (icon library or uploaded SVG).
	 */
	protected static function icon_svg( $icon ) {
		if ( empty( $icon['value'] ) || ! class_exists( '\Elementor\Icons_Manager' ) ) {
			return '';
		}

		try {
			// Returns inline <svg> for icon libraries and uploaded SVGs.
			$svg = \Elementor\Icons_Manager::try_get_icon_html( $icon, array( 'aria-hidden' => 'true' ) );
		} catch ( \Throwable $e ) {
			return '';
		}

		return self::sanitize_svg( (string) $svg );
	}

	protected static function px( $settings, $key, $default ) {
		$value = isset( $settings[ $key ] ) ? self::slider_to_css( $settings[ $key ] ) : '';

		return '' !== $value ? $value : $default;
	}

	protected function get_block_attributes( $settings ) {
		$image_url = self::media_url( $settings, 'image' );

		if ( '' === $image_url ) {
			return array();
		}

		$theme = isset( $settings['theme'] ) && in_array( $settings['theme'], array( 'simple', 'sidepanel', 'tippy' ), true ) ? $settings['theme'] : 'simple';

		$alignment = isset( $settings['alignment'] ) && in_array( $settings['alignment'], array( 'left', 'center', 'right' ), true ) ? $settings['alignment'] : 'center';

		$hotspots = array();
		$items    = isset( $settings['hotspots'] ) && is_array( $settings['hotspots'] ) ? $settings['hotspots'] : array();
		$limit    = $this->get_hotspot_limit();

		if ( $limit ) {
			$items = array_slice( $items, 0, $limit );
		}

		foreach ( array_values( $items ) as $index => $item ) {
			$hotspots[] = $this->get_hotspot_attributes( $item, $index + 1 );
		}

		$hotspot_width  = self::responsive( $settings, 'hotspot_width', array( __CLASS__, 'slider_to_css' ), '24px' );
		$hotspot_height = self::responsive( $settings, 'hotspot_height', array( __CLASS__, 'slider_to_css' ), '24px' );

		// Same tooltip defaults the block editor applies when a theme is chosen.
		$theme_info_bg = 'simple' === $theme ? '#F6F6F6' : '#F1F1F1';

		$attributes = array(
			'align'     => '',
			'alignment' => $alignment,
			'themeSl'   => $theme,
			'img'       => array(
				'url'   => $image_url,
				'alt'   => self::text( $settings, 'image_alt' ),
				'title' => '',
			),
			'hotspots'  => $hotspots,
			'styles'    => array(
				'width'    => self::responsive( $settings, 'image_width', array( __CLASS__, 'slider_to_css' ), '100%' ),
				'hotspot'  => array(
					'width'      => $hotspot_width,
					'height'     => $hotspot_height,
					'colors'     => array(
						'color' => self::color( $settings, 'hotspot_color', '#fff' ),
						'bg'    => self::color( $settings, 'hotspot_bg', '#0f34da' ),
					),
					'iconWidth'  => self::px( $settings, 'icon_width', '20px' ),
					'iconHeight' => self::px( $settings, 'icon_height', '20px' ),
				),
				'info'     => array(
					'bg' => self::color( $settings, 'info_bg', $theme_info_bg ),
				),
				'title'    => array( 'color' => self::color( $settings, 'title_color', '#111827' ) ),
				'desc'     => array( 'color' => self::color( $settings, 'desc_color', '#374151' ) ),
				'btnGroup' => array(
					'index'       => array(
						'colors'      => array(
							'color' => self::color( $settings, 'btn_color', '#4b5563' ),
							'bg'    => self::color( $settings, 'btn_bg', '#f9f9f9' ),
						),
						'hoverColors' => array(
							'color' => self::color( $settings, 'btn_hover_color', '#4b5563' ),
							'bg'    => self::color( $settings, 'btn_hover_bg', '#c8c0c091' ),
						),
					),
					'activeIndex' => array(
						'colors' => array(
							'color' => self::color( $settings, 'btn_active_color', '#ffffff' ),
							'bg'    => self::color( $settings, 'btn_active_bg', '#0f34da' ),
						),
					),
				),
			),
		);

		if ( 'tippy' === $theme ) {
			$attributes['styles']['info']['padding'] = '0px';
		}

		$global_icon = isset( $settings['global_icon'] ) ? self::icon_svg( $settings['global_icon'] ) : '';
		if ( '' !== $global_icon ) {
			$attributes['globalIcon'] = $global_icon;
		}

		return $this->add_pro_attributes( $attributes, $settings );
	}

	/**
	 * One hotspot item in the block format.
	 */
	protected function get_hotspot_attributes( $item, $id ) {
		$x = isset( $item['pos_x']['size'] ) && is_numeric( $item['pos_x']['size'] ) ? (float) $item['pos_x']['size'] : 50;
		$y = isset( $item['pos_y']['size'] ) && is_numeric( $item['pos_y']['size'] ) ? (float) $item['pos_y']['size'] : 50;

		return array(
			'id'          => $id,
			'icon'        => '',
			'x'           => max( 0, min( 100, $x ) ),
			'y'           => max( 0, min( 100, $y ) ),
			'title'       => isset( $item['title'] ) ? wp_kses_post( $item['title'] ) : '',
			'description' => isset( $item['description'] ) ? wp_kses_post( $item['description'] ) : '',
		);
	}

	/**
	 * Pro-only attributes (the Pro version overrides this).
	 */
	protected function add_pro_attributes( $attributes, $settings ) {
		return $attributes;
	}
}
