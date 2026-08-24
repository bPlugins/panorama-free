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
                'title'        => __('Panorama Format', 'panorama') . ' <span style="background:#146ef5;color:#fff;font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;text-transform:uppercase;line-height:1.2;display:inline-block;vertical-align:middle;letter-spacing:0.5px;margin-left:5px;">NEW</span>',
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
                'subtitle'   => esc_html__('Choose where to display the 3D viewer on the single product page', 'panorama'),
                'options'    => array(
                  'none'    => esc_html__('None', 'panorama'),
                  'top'     => esc_html__('Top of the product image', 'panorama'),
                  'bottom'  => esc_html__('Bottom of the product image', 'panorama'),
                  'replace' => esc_html__('Replace Product Image with 3D', 'panorama'),
                  'tab'     => esc_html__('360° View Tab (Product Details Tab)', 'panorama'),
                ),
                'default'    => 'none'
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
                  <div style="margin-top: 30px; padding: 25px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                    <h4 style="margin: 0 0 20px 0; color: #146ef5; font-size: 18px; display: flex; align-items: center; gap: 10px;">
                      <span>🚀</span> ' . __('Unlock Premium Experience', 'panorama') . '
                    </h4>
                    <ul style="list-style: none; padding: 0; margin: 0 0 25px 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Product Shortcode:', 'panorama') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Use shortcode to display panorama anywhere on your product page.', 'panorama') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Video Panorama:', 'panorama') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Select Video as panorama type for your WooCommerce products.', 'panorama') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Auto Rotate Speed:', 'panorama') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Control rotation speed in degrees per second.', 'panorama') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Show/Hide Controls:', 'panorama') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Toggle default panorama controls visibility.', 'panorama') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Initial View:', 'panorama') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Set custom starting pitch, yaw, and zoom values.', 'panorama') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Video Controls:', 'panorama') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Auto Play, Mute, Loop, and Show Controls for video panorama.', 'panorama') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Title & Author:', 'panorama') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Display custom title and author info on the panorama viewer.', 'panorama') . '</span></div>
                      </li>
                    </ul>
                    <div style="display: flex; align-items: center; gap: 15px; border-top: 1px solid #edf2f7; padding-top: 20px;">
                      <a href="' . admin_url('admin.php?page=bppiv-support#/pricing') . '" target="_blank" style="background: #146ef5; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">' . __('Upgrade to Pro Now', 'panorama') . '</a>
                    </div>
                  </div>
                ',
              ),
            
              ) // End fields
        ) );
    }
}