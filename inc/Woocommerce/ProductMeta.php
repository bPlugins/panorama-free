<?php
namespace BPPIV\Woocommerce;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class ProductMeta{

    public function register(){
        $prefix = '_bppiv_product_';

        wp_enqueue_style('bppiv-readonly');
        
        \CSF::createMetabox( $prefix, array(
            'title'        => esc_html__('Panorama Settings', 'panorama'),
            'post_type'    =>  'product',
            'show_restore' => true,
        ));

        \CSF::createSection( $prefix, array(
            'fields' => array(

              array(
                'id'           => 'panorama_format_360',
                'type'         => 'button_set',
                'title'        => __('Panorama Format', 'panorama') . ' <span style="background:#146ef5;color:#fff;font-size:9px;font-weight:700;padding:2px 6px;border-radius:0;text-transform:uppercase;line-height:1.2;display:inline-block;vertical-align:middle;letter-spacing:0.5px;margin-left:5px;">NEW</span>',
                'desc'         => __('Choose Equirectangular for standard 360° panoramic images, Cubemap to upload 6 cube face images, or Cylindrical for smartphone panoramas.', 'panorama'),
                'options'      => array(
                  'equirectangular' => __('Equirectangular (Default)', 'panorama'),
                  'cubemap'         => __('Cubemap (6 Faces)', 'panorama'),
                  'cylindrical'     => __('Cylindrical', 'panorama'),
                ),
                'default'      => 'equirectangular',
              ),
              array(
                'id'           => 'image_src',
                'type'         => 'upload',
                'library'      => 'image',
                'button_title' => __('Upload Panoramic Image', 'panorama'),
                'title'        => __('Panoramic Image', 'panorama'),
                'desc'         => __('Upload or paste the URL of a panoramic image. For best results, use an equirectangular panoramic image.', 'panorama'),
                'dependency'   => array( 'panorama_format_360', '!=', 'cubemap' ),
              ),
              array(
                'id'           => 'cubemap_front_360',
                'type'         => 'upload',
                'library'      => 'image',
                'button_title' => __('Upload Front Image', 'panorama'),
                'title'        => __('Front Face (f)', 'panorama'),
                'dependency'   => array( 'panorama_format_360', '==', 'cubemap' ),
              ),
              array(
                'id'           => 'cubemap_right_360',
                'type'         => 'upload',
                'library'      => 'image',
                'button_title' => __('Upload Right Image', 'panorama'),
                'title'        => __('Right Face (r)', 'panorama'),
                'dependency'   => array( 'panorama_format_360', '==', 'cubemap' ),
              ),
              array(
                'id'           => 'cubemap_back_360',
                'type'         => 'upload',
                'library'      => 'image',
                'button_title' => __('Upload Back Image', 'panorama'),
                'title'        => __('Back Face (b)', 'panorama'),
                'dependency'   => array( 'panorama_format_360', '==', 'cubemap' ),
              ),
              array(
                'id'           => 'cubemap_left_360',
                'type'         => 'upload',
                'library'      => 'image',
                'button_title' => __('Upload Left Image', 'panorama'),
                'title'        => __('Left Face (l)', 'panorama'),
                'dependency'   => array( 'panorama_format_360', '==', 'cubemap' ),
              ),
              array(
                'id'           => 'cubemap_up_360',
                'type'         => 'upload',
                'library'      => 'image',
                'button_title' => __('Upload Top Image', 'panorama'),
                'title'        => __('Top / Up Face (u)', 'panorama'),
                'dependency'   => array( 'panorama_format_360', '==', 'cubemap' ),
              ),
              array(
                'id'           => 'cubemap_down_360',
                'type'         => 'upload',
                'library'      => 'image',
                'button_title' => __('Upload Bottom Image', 'panorama'),
                'title'        => __('Bottom / Down Face (d)', 'panorama'),
                'dependency'   => array( 'panorama_format_360', '==', 'cubemap' ),
              ),
              array(
                'id'           => 'haov_360',
                'type'         => 'spinner',
                'title'        => __('Horizontal Angle of View (HAOV)', 'panorama'),
                'desc'         => __('Horizontal coverage in degrees (e.g. 180° to 360°). Default is 360.', 'panorama'),
                'default'      => 360,
                'min'          => 60,
                'max'          => 360,
                'step'         => 1,
                'dependency'   => array( 'panorama_format_360', '==', 'cylindrical' ),
              ),
              array(
                'id'           => 'vaov_360',
                'type'         => 'spinner',
                'title'        => __('Vertical Angle of View (VAOV)', 'panorama'),
                'desc'         => __('Vertical coverage in degrees (e.g. 30° to 180°). Default is 180.', 'panorama'),
                'default'      => 180,
                'min'          => 20,
                'max'          => 180,
                'step'         => 1,
                'dependency'   => array( 'panorama_format_360', '==', 'cylindrical' ),
              ),
              array(
                'id'           => 'voffset_360',
                'type'         => 'spinner',
                'title'        => __('Vertical Offset (vOffset)', 'panorama'),
                'desc'         => __('Vertical offset in degrees (e.g. -30° to 30°). Default is 0.', 'panorama'),
                'default'      => 0,
                'min'          => -30,
                'max'          => 30,
                'step'         => 1,
                'dependency'   => array( 'panorama_format_360', '==', 'cylindrical' ),
              ),
              array(
                'id'         => 'viewer_position',
                'type'       => 'radio',
                'title'      => esc_html__('Viewer Position', 'panorama'),
                'subtitle'   => esc_html__('Choose where to display the 360° viewer on the single product page', 'panorama'),
                'options'    => array(
                  'none'    => esc_html__('None', 'panorama'),
                  'top'     => esc_html__('Top of the product image', 'panorama'),
                  'bottom'  => esc_html__('Bottom of the product image', 'panorama'),
                  'replace' => esc_html__('Replace Product Image with 360° View', 'panorama'),
                  'tab'     => esc_html__('360° View Tab (Product Details Tab)', 'panorama'),
                ),
                'default'    => 'top',
                'class'      => 'bppiv-viewer-position-field'
              ),
              array(
                'id'       => 'autoRotate',
                'type'     => 'switcher',
                'title'    => __('Auto Rotate ?', 'panorama'),
                'desc'     => __('Enable or Disable Auto Rotate', 'panorama'),
                'text_on'  => 'Yes',
                'text_off' => 'No',
                'default'  => false
              ),
              // Pro Feature Notice
              array(
                'type' => 'content',
                'content' => '
                  <div class="bppiv-pro-notice-box">
                    <div class="bppiv-pro-notice-head">
                      <span class="bppiv-pro-notice-icon dashicons dashicons-unlock" aria-hidden="true"></span>
                      <h4 class="bppiv-pro-notice-title">' . esc_html__('Unlock More with Panorama Pro', 'panorama') . '</h4>
                    </div>
                    <p class="bppiv-pro-notice-intro">' . esc_html__('Upgrade to use these features on your product pages:', 'panorama') . '</p>
                    <ul class="bppiv-pro-notice-list">
                      <li>
                        <span class="bppiv-pro-notice-check dashicons dashicons-yes" aria-hidden="true"></span>
                        <div><strong>' . esc_html__('Product Shortcode', 'panorama') . '</strong>: <span class="bppiv-pro-notice-desc">' . esc_html__('Use shortcode to display panorama anywhere on your product page.', 'panorama') . '</span></div>
                      </li>
                      <li>
                        <span class="bppiv-pro-notice-check dashicons dashicons-yes" aria-hidden="true"></span>
                        <div><strong>' . esc_html__('Video Panorama', 'panorama') . '</strong>: <span class="bppiv-pro-notice-desc">' . esc_html__('Select Video as panorama type for your WooCommerce products.', 'panorama') . '</span></div>
                      </li>
                      <li>
                        <span class="bppiv-pro-notice-check dashicons dashicons-yes" aria-hidden="true"></span>
                        <div><strong>' . esc_html__('Auto Rotate Speed', 'panorama') . '</strong>: <span class="bppiv-pro-notice-desc">' . esc_html__('Control rotation speed in degrees per second.', 'panorama') . '</span></div>
                      </li>
                      <li>
                        <span class="bppiv-pro-notice-check dashicons dashicons-yes" aria-hidden="true"></span>
                        <div><strong>' . esc_html__('Show/Hide Controls', 'panorama') . '</strong>: <span class="bppiv-pro-notice-desc">' . esc_html__('Toggle default panorama controls visibility.', 'panorama') . '</span></div>
                      </li>
                      <li>
                        <span class="bppiv-pro-notice-check dashicons dashicons-yes" aria-hidden="true"></span>
                        <div><strong>' . esc_html__('Initial View', 'panorama') . '</strong>: <span class="bppiv-pro-notice-desc">' . esc_html__('Set custom starting pitch, yaw, and zoom values.', 'panorama') . '</span></div>
                      </li>
                      <li>
                        <span class="bppiv-pro-notice-check dashicons dashicons-yes" aria-hidden="true"></span>
                        <div><strong>' . esc_html__('Video Controls', 'panorama') . '</strong>: <span class="bppiv-pro-notice-desc">' . esc_html__('Auto Play, Mute, Loop, and Show Controls for video panorama.', 'panorama') . '</span></div>
                      </li>
                      <li>
                        <span class="bppiv-pro-notice-check dashicons dashicons-yes" aria-hidden="true"></span>
                        <div><strong>' . esc_html__('Title & Author', 'panorama') . '</strong>: <span class="bppiv-pro-notice-desc">' . esc_html__('Display custom title and author info on the panorama viewer.', 'panorama') . '</span></div>
                      </li>
                    </ul>
                    <div class="bppiv-pro-notice-foot">
                      <a class="bppiv-pro-notice-btn" href="' . esc_url( admin_url('admin.php?page=bppiv-support#/pricing') ) . '" target="_blank"><span class="dashicons dashicons-star-filled" aria-hidden="true"></span>' . esc_html__('Upgrade to Pro', 'panorama') . '</a>
                      <span class="bppiv-pro-notice-note">' . esc_html__('Your products and settings are kept.', 'panorama') . '</span>
                    </div>
                  </div>
                ',
              ),

              ) // End fields
        ) );
    }
}