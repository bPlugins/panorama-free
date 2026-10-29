<?php
namespace BPPIV\Elementor\Widgets;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Shared base for all Panorama Elementor widgets.
 *
 * Each widget turns its Elementor settings into the attributes of an existing
 * Panorama block and renders that block through render_block(). The frontend
 * markup, scripts and styles are therefore exactly the same as the Gutenberg
 * block and the [panorama] shortcode — no separate viewer code is involved.
 */
abstract class Base extends Widget_Base {

	const PRO_URL = 'https://bplugins.com/products/panorama/pricing';

	/**
	 * Registered block name this widget renders, e.g. "panorama/image-360".
	 *
	 * @return string
	 */
	abstract protected function get_block_name();

	/**
	 * Build block attributes from the widget settings.
	 *
	 * Only the keys the widget controls need to be returned; everything else is
	 * filled from the block.json defaults. Return an empty array when required
	 * content (e.g. the image) is missing.
	 *
	 * @param array $settings Widget settings.
	 * @return array
	 */
	abstract protected function get_block_attributes( $settings );

	/**
	 * Message shown in the editor while required content is missing.
	 *
	 * @return string
	 */
	protected function get_placeholder_text() {
		return esc_html__( 'Select a media file to display the panorama.', 'panorama' );
	}

	public function get_categories() {
		return array( 'bppiv-panorama' );
	}

	public function get_keywords() {
		return array( 'panorama', '360', 'virtual tour', 'vr', 'viewer' );
	}

	public function get_custom_help_url() {
		return 'https://bplugins.com/docs/panorama/';
	}

	/**
	 * @return \WP_Block_Type|null
	 */
	protected function get_block_type() {
		return \WP_Block_Type_Registry::get_instance()->get_registered( $this->get_block_name() );
	}

	public function get_script_depends() {
		$handles = array();
		$type    = $this->get_block_type();

		if ( $type && ! empty( $type->view_script_handles ) ) {
			$handles = array_merge( $handles, (array) $type->view_script_handles );
		}

		$handles[] = 'bppiv-elementor';

		return $handles;
	}

	public function get_style_depends() {
		$handles = array();
		$type    = $this->get_block_type();

		if ( $type ) {
			$handles = array_merge( (array) $type->style_handles, (array) $type->view_style_handles );
		}

		return $handles;
	}

	protected function render() {
		$type = $this->get_block_type();
		if ( ! $type ) {
			return;
		}

		$attributes = $this->get_block_attributes( $this->get_settings_for_display() );

		if ( empty( $attributes ) ) {
			$this->render_placeholder( $this->get_placeholder_text() );
			return;
		}

		$block = array(
			'blockName'    => $this->get_block_name(),
			'attrs'        => self::merge_attributes( $this->get_block_defaults( $type ), $attributes ),
			'innerBlocks'  => array(),
			'innerHTML'    => '',
			'innerContent' => array(),
		);

		echo render_block( $block ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Output is escaped in the block's render.php.
	}

	/* ---------------------------------------------------------------------
	 * Helpers: rendering
	 * ------------------------------------------------------------------- */

	protected function is_editor() {
		if ( ! class_exists( '\Elementor\Plugin' ) ) {
			return false;
		}

		$plugin = \Elementor\Plugin::$instance;

		return ( isset( $plugin->editor ) && $plugin->editor->is_edit_mode() )
			|| ( isset( $plugin->preview ) && $plugin->preview->is_preview_mode() );
	}

	/**
	 * Editor-only hint. Nothing is printed on the live site.
	 *
	 * @param string $message Already-escaped message.
	 */
	protected function render_placeholder( $message ) {
		if ( ! $this->is_editor() ) {
			return;
		}

		printf(
			'<div class="bppiv-el-placeholder" style="padding:24px;border:2px dashed #c3c4c7;border-radius:8px;background:#f8fafc;color:#50575e;text-align:center;font-size:14px;">%s</div>',
			esc_html( $message )
		);
	}

	protected function get_block_defaults( $type ) {
		$defaults = array();

		foreach ( (array) $type->attributes as $key => $schema ) {
			if ( is_array( $schema ) && array_key_exists( 'default', $schema ) ) {
				$defaults[ $key ] = $schema['default'];
			}
		}

		return $defaults;
	}

	/**
	 * Deep-merge widget values over block defaults. Associative arrays are merged
	 * key by key; lists (scenes, hotspots, galleries) are replaced as a whole.
	 */
	protected static function merge_attributes( $defaults, $values ) {
		foreach ( $values as $key => $value ) {
			if ( is_array( $value ) && isset( $defaults[ $key ] ) && is_array( $defaults[ $key ] )
				&& ! self::is_list( $value ) && ! self::is_list( $defaults[ $key ] ) ) {
				$defaults[ $key ] = self::merge_attributes( $defaults[ $key ], $value );
			} else {
				$defaults[ $key ] = $value;
			}
		}

		return $defaults;
	}

	private static function is_list( $value ) {
		if ( array() === $value ) {
			return false;
		}

		return array_keys( $value ) === range( 0, count( $value ) - 1 );
	}

	/* ---------------------------------------------------------------------
	 * Helpers: reading settings
	 * ------------------------------------------------------------------- */

	protected static function is_on( $settings, $key ) {
		return isset( $settings[ $key ] ) && 'yes' === $settings[ $key ];
	}

	protected static function number( $settings, $key, $default ) {
		return ( isset( $settings[ $key ] ) && is_numeric( $settings[ $key ] ) ) ? (float) $settings[ $key ] : $default;
	}

	protected static function text( $settings, $key, $default = '' ) {
		return isset( $settings[ $key ] ) && is_string( $settings[ $key ] ) ? sanitize_text_field( $settings[ $key ] ) : $default;
	}

	/**
	 * URL from a media control pair registered with add_media_controls().
	 */
	protected static function media_url( $settings, $id ) {
		$source = isset( $settings[ $id . '_source' ] ) ? $settings[ $id . '_source' ] : 'library';

		if ( 'url' === $source ) {
			$url = isset( $settings[ $id . '_url' ] ) ? $settings[ $id . '_url' ] : '';
		} else {
			$url = isset( $settings[ $id ]['url'] ) ? $settings[ $id ]['url'] : '';
		}

		return is_string( $url ) ? esc_url_raw( trim( $url ) ) : '';
	}

	/**
	 * Converts a slider value (array of size + unit) to a CSS length string.
	 */
	protected static function slider_to_css( $value ) {
		if ( ! is_array( $value ) || ! isset( $value['size'] ) || '' === $value['size'] || ! is_numeric( $value['size'] ) ) {
			return '';
		}

		$unit = isset( $value['unit'] ) && in_array( $value['unit'], array( 'px', '%', 'vw', 'vh', 'em', 'rem' ), true ) ? $value['unit'] : 'px';

		return ( (float) $value['size'] ) . $unit;
	}

	/**
	 * Desktop / tablet / mobile values of a responsive control, each falling
	 * back to the next larger device (Elementor's own inheritance rule).
	 */
	protected static function responsive( $settings, $key, $convert, $fallback ) {
		$values   = array();
		$previous = $fallback;

		foreach ( array( 'desktop' => '', 'tablet' => '_tablet', 'mobile' => '_mobile' ) as $device => $suffix ) {
			$raw   = isset( $settings[ $key . $suffix ] ) ? $settings[ $key . $suffix ] : null;
			$value = call_user_func( $convert, $raw );

			if ( '' === $value || null === $value ) {
				$value = $previous;
			}

			$values[ $device ] = $value;
			$previous          = $value;
		}

		return $values;
	}

	protected static function align_value( $value ) {
		return in_array( $value, array( 'start', 'center', 'end' ), true ) ? $value : '';
	}

	/* ---------------------------------------------------------------------
	 * Helpers: shared controls
	 * ------------------------------------------------------------------- */

	/**
	 * Media Library / External URL picker.
	 *
	 * @param string $id         Control id.
	 * @param string $label      Label.
	 * @param string $media_type image|video.
	 * @param array  $condition  Extra condition.
	 */
	protected function add_media_controls( $id, $label, $media_type = 'image', $condition = array() ) {
		$this->add_control(
			$id . '_source',
			array(
				'label'     => $label,
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
				'condition' => $condition,
			)
		);

		$this->add_control(
			$id,
			array(
				'type'        => Controls_Manager::MEDIA,
				'media_types' => array( $media_type ),
				'default'     => array( 'url' => '' ),
				'condition'   => array_merge( $condition, array( $id . '_source' => 'library' ) ),
			)
		);

		$this->add_control(
			$id . '_url',
			array(
				'type'        => Controls_Manager::TEXT,
				'input_type'  => 'url',
				'placeholder' => 'https://',
				'label_block' => true,
				'condition'   => array_merge( $condition, array( $id . '_source' => 'url' ) ),
			)
		);
	}

	/**
	 * Style tab: width, height and alignment — the block's own "layout" attribute.
	 *
	 * Tablet and mobile inherit the desktop value until they are changed
	 * (Elementor's standard responsive behaviour).
	 *
	 * @param int|false $height Default height in px, or false when the block has no height.
	 */
	protected function register_layout_controls( $height = 320 ) {
		$this->start_controls_section(
			'section_layout',
			array(
				'label' => esc_html__( 'Layout', 'panorama' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_responsive_control(
			'viewer_width',
			array(
				'label'      => esc_html__( 'Width', 'panorama' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( '%', 'px', 'vw' ),
				'range'      => array(
					'%'  => array( 'min' => 10, 'max' => 100 ),
					'px' => array( 'min' => 100, 'max' => 2000 ),
					'vw' => array( 'min' => 10, 'max' => 100 ),
				),
				'default'    => array( 'unit' => '%', 'size' => 100 ),
			)
		);

		if ( false !== $height ) {
			$this->add_responsive_control(
				'viewer_height',
				array(
					'label'          => esc_html__( 'Height', 'panorama' ),
					'type'           => Controls_Manager::SLIDER,
					'size_units'     => array( 'px', 'vh' ),
					'range'          => array(
						'px' => array( 'min' => 100, 'max' => 1200 ),
						'vh' => array( 'min' => 10, 'max' => 100 ),
					),
					'default'        => array( 'unit' => 'px', 'size' => $height ),
				)
			);
		}

		$this->add_responsive_control(
			'viewer_align',
			array(
				'label'   => esc_html__( 'Alignment', 'panorama' ),
				'type'    => Controls_Manager::CHOOSE,
				'options' => array(
					'start'  => array(
						'title' => esc_html__( 'Left', 'panorama' ),
						'icon'  => 'eicon-h-align-left',
					),
					'center' => array(
						'title' => esc_html__( 'Center', 'panorama' ),
						'icon'  => 'eicon-h-align-center',
					),
					'end'    => array(
						'title' => esc_html__( 'Right', 'panorama' ),
						'icon'  => 'eicon-h-align-right',
					),
				),
				'default' => 'center',
				'toggle'  => false,
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Block "layout" attribute from the controls added by register_layout_controls().
	 *
	 * @param array     $settings Widget settings.
	 * @param int|false $height   Same value passed to register_layout_controls().
	 */
	protected static function get_layout( $settings, $height = 320 ) {
		$layout = array(
			'alignSl' => self::responsive( $settings, 'viewer_align', array( __CLASS__, 'align_value' ), 'center' ),
			'width'   => self::responsive( $settings, 'viewer_width', array( __CLASS__, 'slider_to_css' ), '100%' ),
		);

		if ( false !== $height ) {
			$layout['height'] = self::responsive( $settings, 'viewer_height', array( __CLASS__, 'slider_to_css' ), $height . 'px' );
		}

		return $layout;
	}

	/**
	 * "Initial View" switcher plus three number fields.
	 *
	 * @param array $fields key => array( label, default ).
	 */
	protected function add_initial_view_controls( $fields ) {
		$this->add_control(
			'initial_view',
			array(
				'label'       => esc_html__( 'Custom Initial View', 'panorama' ),
				'type'        => Controls_Manager::SWITCHER,
				'default'     => '',
				'separator'   => 'before',
				'description' => esc_html__( 'Rotate the preview to the view you want and click "Set as Initial View", or type the values below.', 'panorama' ),
			)
		);

		foreach ( $fields as $key => $field ) {
			$this->add_control(
				'initial_' . $key,
				array(
					'label'     => $field[0],
					'type'      => Controls_Manager::NUMBER,
					'default'   => $field[1],
					'step'      => 0.01,
					'condition' => array( 'initial_view' => 'yes' ),
				)
			);
		}
	}

	protected static function get_initial_view( $settings, $fields ) {
		$values  = array();
		$enabled = self::is_on( $settings, 'initial_view' );

		// While the switch is off the hidden fields keep old values, so use the defaults.
		foreach ( $fields as $key => $field ) {
			$values[ $key ] = $enabled ? self::number( $settings, 'initial_' . $key, $field[1] ) : $field[1];
		}

		return $values;
	}

	/**
	 * "Pro Features" section listing what the Pro version adds.
	 *
	 * @param string[] $features Feature labels.
	 */
	protected function register_pro_notice( $features ) {
		$this->start_controls_section(
			'section_pro_features',
			array(
				'label' => esc_html__( 'Pro Features', 'panorama' ),
			)
		);

		$items = '';
		foreach ( $features as $feature ) {
			$items .= '<li class="bppiv-el-pro__item"><i class="eicon-check" aria-hidden="true"></i><span>' . esc_html( $feature ) . '</span></li>';
		}

		$this->add_control(
			'pro_features_notice',
			array(
				'type' => Controls_Manager::RAW_HTML,
				'raw'  => '<div class="bppiv-el-pro">'
					. '<div class="bppiv-el-pro__head"><span class="bppiv-el-pro__badge"><i class="eicon-lock" aria-hidden="true"></i></span>'
					. '<div><p class="bppiv-el-pro__title">' . esc_html__( 'Unlock with Panorama Pro', 'panorama' ) . '</p>'
					. '<p class="bppiv-el-pro__subtitle">' . esc_html__( 'Get these extra features for this widget:', 'panorama' ) . '</p></div></div>'
					. '<ul class="bppiv-el-pro__list">' . $items . '</ul>'
					. '<a class="bppiv-el-pro__btn" href="' . esc_url( self::PRO_URL ) . '" target="_blank" rel="noopener noreferrer">'
					. esc_html__( 'Upgrade to Pro', 'panorama' ) . ' <i class="eicon-arrow-right" aria-hidden="true"></i>'
					. '<span class="screen-reader-text">' . esc_html__( '(opens in a new tab)', 'panorama' ) . '</span></a>'
					. '</div>',
			)
		);

		$this->end_controls_section();
	}
}
