<?php
namespace BPPIV\Elementor\Widgets;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Saved Panorama — embeds a panorama, virtual tour or product spot that was
 * already created in the WordPress admin, through its existing shortcode.
 * This lets existing users reuse their work in Elementor without rebuilding it.
 */
class SavedPanorama extends Base {

	/**
	 * Post type => array( group label, shortcode tag ).
	 *
	 * @return array
	 */
	protected function get_sources() {
		return array(
			'bppiv-image-viewer' => array( esc_html__( 'Panoramas', 'panorama' ), 'panorama' ),
			'virtual_tour'       => array( esc_html__( '360° Virtual Tours', 'panorama' ), 'virtual-tour' ),
			'product_spot'       => array( esc_html__( 'Product Spots', 'panorama' ), 'product_spot' ),
		);
	}

	public function get_name() {
		return 'bppiv-saved-panorama';
	}

	public function get_title() {
		return esc_html__( 'Saved Panorama', 'panorama' );
	}

	public function get_icon() {
		return 'eicon-shortcode';
	}

	public function get_keywords() {
		return array( 'panorama', '360', 'shortcode', 'saved', 'virtual tour', 'product spot' );
	}

	protected function get_block_name() {
		return '';
	}

	protected function get_block_attributes( $settings ) {
		return array();
	}

	/**
	 * A saved item can be any panorama type, so every Panorama block asset is a dependency.
	 */
	protected function get_block_types() {
		$types = array();

		foreach ( \WP_Block_Type_Registry::get_instance()->get_all_registered() as $name => $type ) {
			if ( 0 === strpos( $name, 'panorama/' ) || 'psb/product-spot' === $name ) {
				$types[] = $type;
			}
		}

		return $types;
	}

	public function get_script_depends() {
		$handles = array();

		foreach ( $this->get_block_types() as $type ) {
			$handles = array_merge( $handles, (array) $type->view_script_handles );
		}

		$handles[] = 'bppiv-elementor';

		return array_values( array_unique( $handles ) );
	}

	public function get_style_depends() {
		$handles = array();

		foreach ( $this->get_block_types() as $type ) {
			$handles = array_merge( $handles, (array) $type->style_handles, (array) $type->view_style_handles );
		}

		return array_values( array_unique( $handles ) );
	}

	protected function get_item_options() {
		$groups = array();

		foreach ( $this->get_sources() as $post_type => $source ) {
			if ( ! post_type_exists( $post_type ) ) {
				continue;
			}

			$posts = get_posts(
				array(
					'post_type'      => $post_type,
					'post_status'    => 'publish',
					'posts_per_page' => 200,
					'orderby'        => 'date',
					'order'          => 'DESC',
					'no_found_rows'  => true,
				)
			);

			if ( empty( $posts ) ) {
				continue;
			}

			$options = array();
			foreach ( $posts as $post ) {
				$title = '' !== $post->post_title ? $post->post_title : __( '(no title)', 'panorama' );

				// Elementor prints option labels unescaped, so escape them here.
				$options[ $post_type . ':' . $post->ID ] = esc_html( $title . ' (#' . $post->ID . ')' );
			}

			$groups[ $post_type ] = array(
				'label'   => $source[0],
				'options' => $options,
			);
		}

		return $groups;
	}

	protected function register_controls() {
		$this->start_controls_section(
			'section_saved',
			array( 'label' => esc_html__( 'Saved Panorama', 'panorama' ) )
		);

		$groups = $this->get_item_options();

		if ( empty( $groups ) ) {
			$this->add_control(
				'no_items_notice',
				array(
					'type'            => Controls_Manager::RAW_HTML,
					'raw'             => sprintf(
						'%s <a href="%s" target="_blank">%s</a>',
						esc_html__( 'No saved panoramas found.', 'panorama' ),
						esc_url( admin_url( 'post-new.php?post_type=bppiv-image-viewer' ) ),
						esc_html__( 'Create one', 'panorama' )
					),
					'content_classes' => 'elementor-panel-alert elementor-panel-alert-info',
				)
			);
		}

		$this->add_control(
			'saved_item',
			array(
				'label'       => esc_html__( 'Select Item', 'panorama' ),
				'type'        => Controls_Manager::SELECT,
				'label_block' => true,
				'groups'      => array_merge( array( '' => esc_html__( '— Select —', 'panorama' ) ), $groups ),
				'default'     => '',
			)
		);

		$this->add_control(
			'saved_item_help',
			array(
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => esc_html__( 'Settings of a saved item are edited from the Panorama Viewer menu in your dashboard. To build a viewer directly in Elementor, use the other Panorama widgets instead.', 'panorama' ),
				'content_classes' => 'elementor-descriptor',
			)
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$value    = isset( $settings['saved_item'] ) ? (string) $settings['saved_item'] : '';
		$parts    = explode( ':', $value );
		$sources  = $this->get_sources();

		if ( 2 !== count( $parts ) || ! isset( $sources[ $parts[0] ] ) || ! absint( $parts[1] ) ) {
			$this->render_placeholder( esc_html__( 'Select a saved panorama, virtual tour or product spot.', 'panorama' ) );
			return;
		}

		$post_id = absint( $parts[1] );

		if ( get_post_type( $post_id ) !== $parts[0] ) {
			$this->render_placeholder( esc_html__( 'The selected item no longer exists.', 'panorama' ) );
			return;
		}

		echo do_shortcode( sprintf( '[%s id="%d"]', $sources[ $parts[0] ][1], $post_id ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Shortcode output is escaped by its own callback.
	}
}
