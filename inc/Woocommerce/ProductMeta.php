<?php
namespace BPPIV\Woocommerce;

class ProductMeta{

    public function register(){
        $prefix = '_bppiv_product_';

        wp_enqueue_style('bppiv-readonly');
        
        \CSF::createMetabox( $prefix, array(
            'title'        => esc_html__('Panorama Settings', 'panorama-viewer'),
            'post_type'    =>  'product',
            'show_restore' => true,
        ));

        \CSF::createSection( $prefix, array(
            'fields' => array(

              array(
                'id'           => 'image_src',
                'type'         => 'upload',
                'library'      => 'image',
                'button_title' => __('Upload Panoramic Image', 'panorama-viewer'),
                'title'        => __('Panoramic Image', 'panorama-viewer'),
                'desc'         => __('Upload or paste the URL of a panoramic image. For best results, use an equirectangular panoramic image.', 'panorama-viewer'),
              ),
              array(
                'id'       => 'autoRotate',
                'type'     => 'switcher',
                'title'    => __('Auto Rotate ?', 'panorama-viewer'),
                'desc'     => __('Enable or Disable Auto Rotate', 'panorama-viewer'),
                'text_on'  => 'Yes',
                'text_off' => 'No',
                'default'  => false
              ),
              array(
                'id'         => 'viewer_position',
                'type'       => 'radio',
                'title'      => esc_html__('Image/Video Position', 'panorama-viewer'),
                'options'    => array(
                  'none' => esc_html__('None', 'panorama-viewer'),
                  'top' => esc_html__('Top of the product image', 'panorama-viewer'),
                  'bottom' => esc_html__('Bottom of the product image','panorama-viewer'),
                  'replace' => esc_html__('Replace Product Image with 3D', 'panorama-viewer')
                ),
                'default'    => 'none'
              ),
              // Pro Feature Notice
              array(
                'type' => 'content',
                'content' => '
                  <div style="margin-top: 30px; padding: 25px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                    <h4 style="margin: 0 0 20px 0; color: #146ef5; font-size: 18px; display: flex; align-items: center; gap: 10px;">
                      <span>🚀</span> ' . __('Unlock Premium Experience', 'panorama-viewer') . '
                    </h4>
                    <ul style="list-style: none; padding: 0; margin: 0 0 25px 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Product Shortcode:', 'panorama-viewer') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Use shortcode to display panorama anywhere on your product page.', 'panorama-viewer') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Video Panorama:', 'panorama-viewer') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Select Video as panorama type for your WooCommerce products.', 'panorama-viewer') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Auto Rotate Speed:', 'panorama-viewer') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Control rotation speed in degrees per second.', 'panorama-viewer') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Show/Hide Controls:', 'panorama-viewer') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Toggle default panorama controls visibility.', 'panorama-viewer') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Initial View:', 'panorama-viewer') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Set custom starting pitch, yaw, and zoom values.', 'panorama-viewer') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Video Controls:', 'panorama-viewer') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Auto Play, Mute, Loop, and Show Controls for video panorama.', 'panorama-viewer') . '</span></div>
                      </li>
                      <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                        <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                        <div><strong style="color: #2d3748;">' . __('Title & Author:', 'panorama-viewer') . '</strong> <span style="color: #718096; font-size: 13px;">' . __('Display custom title and author info on the panorama viewer.', 'panorama-viewer') . '</span></div>
                      </li>
                    </ul>
                    <div style="display: flex; align-items: center; gap: 15px; border-top: 1px solid #edf2f7; padding-top: 20px;">
                      <a href="' . admin_url('admin.php?page=bppiv-support#/pricing') . '" target="_blank" style="background: #146ef5; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">' . __('Upgrade to Pro Now', 'panorama-viewer') . '</a>
                    </div>
                  </div>
                ',
              ),
            
              ) // End fields
        ) );
    }
}