<?php
namespace BPPIV\Elementor;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Elementor integration loader.
 *
 * Every hook used here is fired by Elementor itself, so nothing in this class
 * runs (and no Elementor class is touched) when Elementor is not active.
 */
class Elementor {

	const MIN_ELEMENTOR_VERSION = '3.5.0';
	const CATEGORY              = 'bppiv-panorama';
	const PRO_URL               = 'https://bplugins.com/products/panorama/pricing';

	public function register() {
		add_action( 'elementor/elements/categories_registered', array( $this, 'register_category' ) );
		add_action( 'elementor/widgets/register', array( $this, 'register_widgets' ) );
		add_action( 'elementor/frontend/after_register_scripts', array( $this, 'register_scripts' ) );
		add_action( 'elementor/editor/after_enqueue_styles', array( $this, 'editor_styles' ) );
		add_action( 'elementor/editor/after_enqueue_scripts', array( $this, 'editor_scripts' ) );
		add_action( 'elementor/preview/enqueue_styles', array( $this, 'preview_styles' ) );
	}

	/**
	 * Editor preview only: style for the viewers' "Set as Initial View" button.
	 */
	public function preview_styles() {
		wp_enqueue_style(
			'bppiv-elementor-preview',
			BPPIV_PLUGIN_DIR . 'public/assets/css/elementor-preview.css',
			array(),
			BPPIV_VERSION
		);
	}

	protected function is_compatible() {
		return defined( 'ELEMENTOR_VERSION' ) && version_compare( ELEMENTOR_VERSION, self::MIN_ELEMENTOR_VERSION, '>=' );
	}

	/**
	 * Whether Pro features are unlocked.
	 */
	protected function is_premium() {
		return false;
	}

	public function register_category( $elements_manager ) {
		if ( ! $this->is_compatible() ) {
			return;
		}

		$elements_manager->add_category(
			self::CATEGORY,
			array(
				'title' => esc_html__( 'Panorama Viewer', 'panorama' ),
				'icon'  => 'eicon-video-camera',
			)
		);
	}

	public function register_scripts() {
		wp_register_script(
			'bppiv-elementor',
			BPPIV_PLUGIN_DIR . 'public/assets/js/elementor-handler.js',
			array( 'jquery' ),
			BPPIV_VERSION,
			true
		);
	}

	public function editor_styles() {
		wp_enqueue_style(
			'bppiv-elementor-editor',
			BPPIV_PLUGIN_DIR . 'public/assets/css/elementor-editor.css',
			array(),
			BPPIV_VERSION
		);
	}

	/**
	 * Visual hotspot editor used by the 360° Virtual Tour widget.
	 */
	public function editor_scripts() {
		$asset_file = BPPIV_PATH . 'public/elementor/elementor-editor.asset.php';

		if ( ! $this->is_compatible() || ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = include $asset_file;

		if ( ! wp_script_is( 'bppiv-pannellum-js', 'registered' ) ) {
			wp_register_script( 'bppiv-pannellum-js', BPPIV_PLUGIN_DIR . 'public/assets/js/library/pannellum.js', array(), BPPIV_VERSION, true );
		}

		if ( ! wp_style_is( 'bppiv-pannellum-css', 'registered' ) ) {
			wp_register_style( 'bppiv-pannellum-css', BPPIV_PLUGIN_DIR . 'public/assets/css/library/pannellum.min.css', array(), '2.5.6' );
		}

		wp_enqueue_script(
			'bppiv-elementor-editor-app',
			BPPIV_PLUGIN_DIR . 'public/elementor/elementor-editor.js',
			array_merge( $asset['dependencies'], array( 'jquery', 'bppiv-pannellum-js' ) ),
			$asset['version'],
			true
		);

		wp_add_inline_script(
			'bppiv-elementor-editor-app',
			'window.bppivElementor = ' . wp_json_encode(
				array(
					'isPremium'  => $this->is_premium(),
					'pricingUrl' => self::PRO_URL,
				)
			) . ';',
			'before'
		);

		wp_set_script_translations( 'bppiv-elementor-editor-app', 'panorama', BPPIV_PATH . 'languages' );

		wp_enqueue_style(
			'bppiv-elementor-editor-app-style',
			BPPIV_PLUGIN_DIR . 'public/elementor/style-elementor-editor.css',
			array( 'wp-components', 'bppiv-pannellum-css' ),
			$asset['version']
		);

		wp_enqueue_style(
			'bppiv-elementor-editor-app',
			BPPIV_PLUGIN_DIR . 'public/elementor/elementor-editor.css',
			array( 'bppiv-elementor-editor-app-style' ),
			$asset['version']
		);
	}

	/**
	 * Widget class names (in BPPIV\Elementor\Widgets), keyed by their file
	 * path relative to inc/Elementor/Widgets/ (without ".php").
	 *
	 * @return array
	 */
	protected function get_widgets() {
		return array(
			'Image360'      => 'Image360',
			'Image3D'       => 'Image3D',
			'Video'         => 'Video',
			'Video360'      => 'Video360',
			'GoogleStreet'  => 'GoogleStreet',
			'VirtualTour'   => 'VirtualTour',
			'ProductSpot'   => 'ProductSpot',
			'Gallery'       => 'Gallery',
			'Tour'          => 'Tour',
			'SavedPanorama' => 'SavedPanorama',
		);
	}

	public function register_widgets( $widgets_manager ) {
		if ( ! $this->is_compatible() ) {
			return;
		}

		require_once BPPIV_PATH . 'inc/Elementor/Widgets/Base.php';

		foreach ( $this->get_widgets() as $file => $class ) {
			$path = BPPIV_PATH . 'inc/Elementor/Widgets/' . $file . '.php';
			if ( ! file_exists( $path ) ) {
				continue;
			}

			require_once $path;

			$class = '\\BPPIV\\Elementor\\Widgets\\' . $class;
			if ( class_exists( $class ) ) {
				$widgets_manager->register( new $class() );
			}
		}
	}
}
