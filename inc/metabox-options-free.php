<?php if ( ! defined( 'ABSPATH' )  ) { die; } 

if ( ! class_exists( 'BPPIV_MetaBox' ) ) {
  class BPPIV_MetaBox {
    private $prefix = '_bppivimages_';

    public function init() {
      $this->register_metabox();
      add_filter( 'csf_sc__save', array( $this, 'exclude_fields_before_save' ), 10, 1 );
    }

    public function register_metabox() {
      if ( class_exists( 'CSF' ) ) {
        CSF::createMetabox( $this->prefix, array(
          'title'        => 'Panorama Settings',
          'post_type'    => 'bppiv-image-viewer',
          'show_restore' => true,
          'theme'        => 'light',
        ) );

        $this->configure();
        $this->gallery();
        $this->tour();
        $this->styles();
        $this->upcoming_section('Ads');
        $this->upcoming_section('Analytics');
      }
    }

    private function get_pro_badge($text = 'PRO') {
      return ' <span style="background:#146ef5;color:#fff;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:bold;margin-left:5px;vertical-align:middle;display:inline-block;line-height:1.4;">' . $text . '</span>';
    }

    private function get_upcoming_badge() {
      return ' <span style="background:#00d2ff;color:#fff;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:bold;margin-left:5px;vertical-align:middle;display:inline-block;line-height:1.4;">UPCOMING</span>';
    }

    public function configure() {
      CSF::createSection( $this->prefix, array(
        'title'  => 'Configuration',
        'icon'   => 'fa fa-cog',
        'fields' => array(
          array(
            'id'       => 'bppiv_type',
            'type'     => 'button_set',
            'title'    => 'Panorama Type.',
            'options'  => array(
              'image'   => 'Image 3D',
              'image360'=> 'Image 360°',
              'video'   => 'Video',
              'video2'   => 'Video 360°',
              'gallery'  => 'Gallery',
              'tour360'  => 'Tour 360°',
              'gstreet'  => 'Google Street View',
            ),
            'default'  => 'image'
          ),
          // --- ROBUST JS TO HIDE/SHOW TABS ---
          array(
            'type'    => 'callback',
            'function' => function() {
              ?>
              <script type="text/javascript">
                jQuery(document).ready(function($) {
                  function syncTabs() {
                    var type = $('input[name="_bppivimages_[bppiv_type]"]:checked').val();
                    if(!type) return;

                    var $tabs = $('.csf-nav ul li');
                    $tabs.show();
                    
                    // Finding tabs by their title text for 100% accuracy
                    var $galleryTab = $tabs.filter(function() { return $(this).text().indexOf('Actions') !== -1; });
                    var $tourTab = $tabs.filter(function() { return $(this).text().indexOf('Tour') !== -1; });
                    var $stylesTab = $tabs.filter(function() { return $(this).text().indexOf('Styles') !== -1; });

                    if (type === 'video' || type === 'video2' || type === 'gstreet') {
                        $galleryTab.hide();
                        $tourTab.hide();
                        $stylesTab.hide();
                    } else if (type === 'image' || type === 'image360') {
                        $galleryTab.hide();
                        $tourTab.hide();
                        $stylesTab.show();
                    } else if (type === 'gallery') {
                        $tourTab.hide();
                        $stylesTab.hide();
                        $galleryTab.show();
                    } else if (type === 'tour360') {
                        $galleryTab.hide();
                        $stylesTab.hide();
                        $tourTab.show();
                    }
                  }
                  $(document).on('change', 'input[name="_bppivimages_[bppiv_type]"]', syncTabs);
                  // Repeat check to ensure UI is ready
                  setTimeout(syncTabs, 300);
                  setTimeout(syncTabs, 1000);
                });
              </script>
              <?php
            }
          ),
          // --- CONTENT SOURCE ---
          array(
            'id'           => 'bppiv_image_src',
            'type'         => 'media',
            'library'      => 'image',
            'title'        => 'Image Source.',
            'dependency'   => array( 'bppiv_type', '==', 'image' ),
          ),
          array(
            'id'           => 'image_src_360',
            'type'         => 'upload',
            'library'      => 'image',
            'title'        => '360° Image Source.',
            'dependency'   => array( 'bppiv_type', '==', 'image360' ),
          ),
          array(
            'id'           => 'bppiv_video_src',
            'type'         => 'media',
            'library'      => 'video',
            'title'        => 'Video Source.',
            'dependency'   => array( 'bppiv_type', 'any', 'video,video2' ),
          ),
          // --- DIMENSIONS ---
          array(
            'id'           => 'bppiv_image_width',
            'type'         => 'dimensions',
            'title'        => 'Width',
            'default'      => array( 'width'  => '100', 'unit'   => '%' ),
            'height'       => false,
            'dependency'   => array( 'bppiv_type', '!=', 'gallery' ),
          ),
          array(
            'id'           => 'bppiv_image_height',
            'type'         => 'dimensions',
            'title'        => 'Height',
            'default'      => array( 'height' => '320', 'unit'   => 'px' ),
            'width'        => false,
            'dependency'   => array( 'bppiv_type', '!=', 'gallery' ),
          ),
          array(
            'id'       => 'bppiv_alignment',
            'type'     => 'select',
            'title'    => 'Viewer Alignment',
            'options'  => array( 'start' => 'Left', 'center' => 'Center', 'end' => 'Right' ),
            'default'  => 'center',
            'dependency'   => array( 'bppiv_type', '!=', 'gallery' ),
          ),
          // --- ROTATION & CONTROLS ---
          array(
            'id'       => 'bppiv_auto_rotate',
            'type'     => 'switcher',
            'title'    => 'Auto Rotate',
            'default'  => true,
            'dependency'   => array( 'bppiv_type', 'any', 'image,image360,tour360,gstreet' ),
          ),
          array(
            'id'       => 'bppiv_speed',
            'type'     => 'spinner',
            'title'    => 'Auto Rotate Speed',
            'default'  => 2.0,
            'dependency' => array( 'bppiv_type|bppiv_auto_rotate', 'any|==', 'image,image360,tour360,gstreet|true' ),
          ),
          array(
            'id'       => 'control_show_hide',
            'type'     => 'switcher',
            'title'    => 'Hide Default Control',
            'default'  => false,
            'dependency'   => array( 'bppiv_type', 'any', 'image,image360,tour360,gstreet' ),
          ),
          // --- VIDEO SPECIFIC ---
          array(
            'id'       => 'bppiv_video_mute',
            'type'     => 'switcher',
            'title'    => 'Video Mute',
            'dependency'   => array( 'bppiv_type', 'any', 'video,video2' ),
          ),
          array(
            'id'       => 'bppiv_video_autoplay',
            'type'     => 'switcher',
            'title'    => 'Video Auto Play',
            'default'  => true,
            'dependency'   => array( 'bppiv_type', 'any', 'video,video2' ),
          ),
          array(
            'id'       => 'bppiv_video_loop',
            'type'     => 'switcher',
            'title'    => 'Video Loop',
            'default'  => true,
            'dependency'   => array( 'bppiv_type', 'any', 'video,video2' ),
          ),
          // --- DYNAMIC PRO LISTS ---
          $this->pro_feature_list( array(
            'Initial View'     => 'Set custom starting coordinates for your panorama.',
            'Custom Branding'  => 'Add your custom watermark and remove our logo.',
            'Inactivity Delay' => 'Delay before auto-rotation starts after inactivity.',
          ), array( 'bppiv_type', 'any', 'image,image360,gstreet' ) ),

          $this->pro_feature_list( array(
            'Advanced Video'   => 'Quality control, buffering, and PiP for 360 videos.',
            'Fullscreen View'  => 'Enable immersive fullscreen playback control.',
            'Initial View'     => 'Set custom starting angle for video panoramas.',
          ), array( 'bppiv_type', 'any', 'video,video2' ) ),
        )
      ) );
    }

    public function gallery() {
      CSF::createSection( $this->prefix, array(
        'title'  => 'Actions' . $this->get_pro_badge(),
        'icon'   => 'fa fa-th',
        'fields' => array(
          $this->pro_feature_list( array(
            'Multi-item Gallery' => 'Display multiple panoramic scenes in one grid.',
            'AJAX Load More'     => 'Smooth loading of gallery items without refresh.',
          ) ),
        )
      ) );
    }

    public function tour() {
      CSF::createSection( $this->prefix, array(
        'title'  => 'Tour 360°' . $this->get_pro_badge(),
        'icon'   => 'fa fa-street-view',
        'fields' => array(
          $this->pro_feature_list( array(
            'Virtual Tour'       => 'Connect scenes into an interactive virtual tour.',
            'Hotspot Relations'  => 'Add clickable points for seamless navigation.',
          ) ),
        )
      ) );
    }

    public function styles() {
      CSF::createSection( $this->prefix, array(
        'title'  => 'Styles' . $this->get_pro_badge(),
        'icon'   => 'fa fa-paint-brush',
        'fields' => array(
          $this->pro_feature_list( array(
            'Device Motion'    => 'Enable motion/gyroscope navigation for mobile.',
            'Custom UI Colors' => 'Full control over button colors and hover effects.',
          ) ),
        )
      ) );
    }

    public function upcoming_section($title) {
      CSF::createSection( $this->prefix, array(
        'title' => $title . $this->get_upcoming_badge(),
        'fields' => array(
          array(
            'type' => 'content',
            'content' => '
              <div style="text-align:center; padding: 40px 20px; background: #f9f9f9; border: 1px dashed #ccc; border-radius: 12px;">
                <h3 style="color:#146ef5; margin-bottom:10px;">🚀 Coming Soon</h3>
                <p style="color:#666;">We are working hard to bring <strong>' . $title . '</strong> features.</p>
              </div>
            ',
          ),
        ),
      ) );
    }

    public function pro_feature_list( $features, $dependency = array() ) {
      $html = '
      <div class="bppiv-pro-notice-box" style="margin-top: 30px; padding: 25px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <h4 class="bppiv-pro-notice-title" style="margin: 0 0 20px 0; color: #146ef5; font-size: 18px; display: flex; align-items: center; gap: 10px;">
              <span>🚀</span> ' . __( 'Unlock Premium Experience', 'panorama-viewer' ) . '
          </h4>
          <ul class="bppiv-pro-notice-list" style="list-style: none; padding: 0; margin: 0 0 25px 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">';
      foreach ( $features as $title => $desc ) {
        $html .= '
              <li style="font-size: 14px; line-height: 1.5; color: #4a5568; display: flex; align-items: baseline; gap: 10px;">
                  <span style="color: #146ef5; font-weight: bold; font-size: 12px;">✔</span>
                  <div>
                    <strong style="color: #2d3748;">' . esc_html( $title ) . ':</strong> 
                    <span style="color: #718096; font-size: 13px;">' . esc_html( $desc ) . '</span>
                  </div>
              </li>';
      }
      $html .= '
          </ul>
          <div style="display: flex; align-items: center; gap: 15px; border-top: 1px solid #edf2f7; padding-top: 20px;">
              <a href="' . admin_url( 'admin.php?page=panorama-viewer-help-demo#/pricing' ) . '" target="_blank" style="background: #146ef5; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">' . __( 'Upgrade to Pro Now', 'panorama-viewer' ) . '</a>
          </div>
      </div>';
      $field = array( 'type' => 'content', 'content' => $html );
      if ( ! empty( $dependency ) ) { $field['dependency'] = $dependency; }
      return $field;
    }

    public function exclude_fields_before_save( $data ) {
      $exclude = array( 'bppiv_pan_gallery', 'bppiv_gallery_limit', 'bppiv_pano_id', 'auto_rotate_inactivity_delay', 'is_motion_button', 'initial_view', 'custom_control' );
      foreach ( $exclude as $id ) { if(isset($data[$id])) { unset( $data[ $id ] ); } }
      return $data;
    }
  }

  $bppiv_metabox = new BPPIV_MetaBox();
  $bppiv_metabox->init();
}