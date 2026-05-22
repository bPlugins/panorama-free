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
        $this->controls();
        $this->dymensions();
        $this->styles();
        // $this->upcoming_section('Ads');
      }
    }

    private function get_pro_badge($text = 'PRO') {
      return ' <span style="background:#146ef5;color:#fff;padding:0px 5px;border-radius:4px;font-size:10px;font-weight:bold;margin-left:5px;vertical-align:middle;display:inline-block;line-height:1.4;">' . $text . '</span>';
    }

    // private function get_upcoming_badge() {
    //   return ' <span style="background:#00d2ff;color:#fff;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:bold;margin-left:5px;vertical-align:middle;display:inline-block;line-height:1.4;">UPCOMING</span>';
    // }

    public function configure() {
      CSF::createSection( $this->prefix, array(
        'title'  => 'Configuration',
        'icon'   => 'fa fa-cog',
        'fields' => array(
          array(
            'id'       => 'bppiv_type',
            'type'     => 'button_set',
            'title'    => 'Panorama Type',
            'subtitle' => 'Choose your panorama type.',
            'desc'     => 'Choose from 3D images, 360° photos/videos, galleries, virtual tours, or Google Street View.',
            'options'  => array(
              'image'   => 'Image 3D',
              'image360'=> 'Image 360°',
              'video'   => 'Video',
              'video2'   => 'Video 360°',
              'gallery'  => 'Gallery' . $this->get_pro_badge(),
              'tour360'  => 'Tour 360°' . $this->get_pro_badge(),
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
                    var $stylesTab = $tabs.filter(function() { return $(this).text().indexOf('Styles') !== -1; });
                    var $controlsTab = $tabs.filter(function() { return $(this).text().indexOf('Rotation') !== -1; });
                    var $dimensionsTab = $tabs.filter(function() { return $(this).text().indexOf('Dimensions') !== -1; });

                    if (type === 'video' || type === 'video2') {
                        $stylesTab.hide();
                    } else if (type === 'gstreet') {
                        $stylesTab.hide();
                    } else if (type === 'image') {
                    } else if (type === 'image360') {
                        $stylesTab.hide();
                    } else if (type === 'gallery') {
                        $controlsTab.hide();
                        $dimensionsTab.hide();
                    } else if (type === 'tour360') {
                        $stylesTab.hide();
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
          array(
            'id'           => 'bppiv_content',
            'type'         => 'content',
            'title'        => ' ',
            'content'         => __('We have a new 360° Virtual Tour Viewer. <a href="edit.php?post_type=virtual_tour">click here</a> to create', 'panorama'),
            'dependency'   => array( 'bppiv_type', '==', 'tour360' ),
          ),
          // --- CONTENT SOURCE ---
          array(
            'id'           => 'bppiv_image_src',
            'type'         => 'media',
            'library'      => 'image',
            'title'        => 'Image Source',
            'desc'         => 'Upload your 360° panoramic image here.',
            'dependency'   => array( 'bppiv_type', '==', 'image' ),
          ),
          array(
            'id'           => 'image_src_360',
            'type'         => 'upload',
            'library'      => 'image',
            'title'        => 'Image Source.',
            'desc'         => 'Upload your 360° panoramic image here.',
            'dependency'   => array( 'bppiv_type', '==', 'image360' ),
          ),
          array(
            'id'           => 'bppiv_video_src',
            'type'         => 'media',
            'library'      => 'video',
            'title'        => 'Video Source.',
            'desc'         => 'Upload your 360° panoramic video here.',
            'dependency'   => array( 'bppiv_type', 'any', 'video,video2' ),
          ),

           array(
            'id'           => 'bppiv_pano_id',
            'type'         => 'text',
            'title'        => __('Panorama ID', 'panorama'),
            'desc' => __('Input here Google Street View Panorama Id. <a href="#" class="pano-help-link">How to find it?</a>', 'panorama'),
            'placeholder'  => 'Paste panorama ID here',
            'default'      => 'JmSoPsBPhqWvaBmOqfFzgA',
            'dependency'   => array('bppiv_type', '==', 'gstreet'),
          ),
          
          $this->pro_feature_list( array(
            'Multi-item Gallery'      => 'Display multiple panoramic scenes or videos in a single unified grid.',
            'Custom Layout & Columns' => 'Control gallery limits, grid columns, and column spacing layout.',
            'AJAX Load More'          => 'Enable smooth asynchronous loading for items in your gallery.',
          ), array( 'bppiv_type', '==', 'gallery' ) ),

          $this->pro_feature_list( array(
            'Virtual Tour Creation'    => 'Create immersive virtual tours by connecting multiple 360° scenes.',
            'Interactive Hotspots'     => 'Add clickable hotspots to navigate between different panoramic locations.',
            'Custom Scene Management'  => 'Set custom titles, authors, and initial views for each scene in your tour.',
            'Seamless Navigation'      => 'Provide a smooth transition experience as users move between scenes.',
            'Advanced Controls'        => 'Enable compass, zoom, and orientation features for a better tour experience.',
          ), array( 'bppiv_type', '==', 'tour360' ) )
        )
      ) );
    }

   public function styles() {
      CSF::createSection( $this->prefix, array(
        'title'  => 'Styles' . $this->get_pro_badge(),
        'icon'   => 'fa fa-paint-brush',
        'fields' => array(
          array(
            'type'    => 'content',
            'content' => $this->pro_feature_html( array(
              'Device Motion'    => 'Enable motion/gyroscope navigation for mobile.',
              'Custom UI Colors' => 'Full control over button colors and hover effects.',
            ) ),
            'class'   => 'bppiv-styles-image3d',
          ),

          array(
            'type'    => 'content',
            'content' => $this->pro_feature_html( array(
              'Load More Button Text'  => 'Customize the typography and custom text on the action button.',
              'Load More Text Color'   => 'Full control over text color settings matching your layout.',
              'Button Background'      => 'Apply custom button background colors to fit your brand.',
              'Hover Background Color' => 'Animate and change background colors on button hover states.',
            ) ),
            'class'   => 'bppiv-styles-gallery',
          ),

          array(
            'type'     => 'callback',
            'function' => function() {
              ?>
              <script type="text/javascript">
                jQuery(document).ready(function($) {
                  function syncStylesTab() {
                    var type = $('input[name="_bppivimages_[bppiv_type]"]:checked').val();
                    if(!type) return;

                    $('.bppiv-styles-image3d, .bppiv-styles-gallery').hide();

                    if (type === 'gallery') {
                      $('.bppiv-styles-gallery').show();
                    } else {
                      $('.bppiv-styles-image3d').show();
                    }
                  }
                  
                  $(document).on('change', 'input[name="_bppivimages_[bppiv_type]"]', syncStylesTab);
                  
                  setTimeout(syncStylesTab, 300);
                  setTimeout(syncStylesTab, 1000);
                });
              </script>
              <?php
            }
          ),
        )
      ) );
    }

    public function controls() {
      CSF::createSection( $this->prefix, array(
        'title'  => 'Rotation & Controls',
        'icon'   => 'fa fa-sliders',
        'fields' => array(
          // --- Image/360 fields (hidden for video via CSS class) ---
          array(
            'id'       => 'bppiv_auto_rotate',
            'type'     => 'switcher',
            'title'    => 'Auto Rotate',
            'desc'     => 'Enable this to make the panorama rotate automatically when loaded.',
            'default'  => true,
            'class'    => 'bppiv-ctrl-image',
          ),
          array(
            'id'       => 'bppiv_speed',
            'type'     => 'spinner',
            'title'    => 'Auto Rotate Speed',
            'desc'     => 'Set the speed of rotation. Higher values mean faster rotation.',
            'default'  => 2.0,
            'dependency' => array( 'bppiv_auto_rotate', '==', 'true' ),
            'class'    => 'bppiv-ctrl-image',
          ),
          array(
            'id'       => 'control_show_hide',
            'type'     => 'switcher',
            'title'    => 'Hide Default Control',
            'desc'     => 'Turn this on to hide the built-in navigation and zoom buttons.',
            'default'  => false,
            'class'    => 'bppiv-ctrl-image',
          ),
          // --- Video only fields ---
          array(
            'id'       => 'bppiv_auto_play',
            'type'     => 'switcher',
            'title'    => 'Auto Play',
            'desc'     => 'Automatically start playing the video. Note: Most browsers require "Muted" for this to work.',
            'default'  => false,
            'class'    => 'bppiv-ctrl-video-only',
          ),
          array(
            'id'       => 'bppiv_video_mute',
            'type'     => 'switcher',
            'title'    => 'Video Mute',
            'desc'     => 'Mute the video audio by default. Recommended for autoplay compatibility.',
            'class'    => 'bppiv-ctrl-video-only',
          ),
          // --- Shared field (video & video2) ---
          array(
            'id'       => 'bppiv_video_loop',
            'type'     => 'switcher',
            'title'    => 'Video Loop',
            'desc'     => 'Restart the video automatically once it reaches the end.',
            'default'  => true,
            'class'    => 'bppiv-ctrl-video',
          ),
          array(
            'id'       => 'control_show_hide_video',
            'type'     => 'switcher',
            'title'    => 'Control Bar',
            'desc'     => 'Toggle the visibility of the video playback control bar.',
            'default'  => true,
            'class'    => 'bppiv-ctrl-video-only',
          ),
          // --- Video2 only free fields ---
          array(
            'id'       => 'bppiv_video_autoplay',
            'type'     => 'switcher',
            'title'    => 'Auto Play',
            'desc'     => 'Enable or disable video auto play. Muting the video is often required for this.',
            'default'  => true,
            'class'    => 'bppiv-ctrl-video2',
          ),
          array(
            'id'       => 'video_play_pause_ctrl',
            'type'     => 'switcher',
            'title'    => 'Play/Pause Control',
            'desc'     => 'Toggle the visibility of the play and pause buttons on the player.',
            'default'  => true,
            'class'    => 'bppiv-ctrl-video2',
          ),
          array(
            'id'       => 'video_volume_ctrl',
            'type'     => 'switcher',
            'title'    => 'Volume Control',
            'desc'     => 'Show or hide the volume adjustment slider.',
            'default'  => true,
            'class'    => 'bppiv-ctrl-video2',
          ),

           // Pro features for Image 3D
           array(
             'type'    => 'content',
             'content' => $this->pro_feature_html( array(
               'Custom Start Position' => 'Choose exactly where viewers begin exploring your panorama.',
               'Smart Auto-Rotation'   => 'Fine-tune the delay before rotation resumes after user interaction.',
             ) ),
             'class'   => 'bppiv-pro-image3d',
           ),
           // Pro features for Image 360 
           array(
             'type'    => 'content',
             'content' => $this->pro_feature_html( array(
               'Custom Start Position' => 'Choose exactly where viewers begin exploring your panorama.',
               'Smart Auto-Rotation'   => 'Fine-tune the delay before rotation resumes after user interaction.',
               'Custom Control Bar'    => 'Replace the default controls with a fully customizable control bar.',
               'Instant Auto Load'     => 'Load the panorama automatically without requiring a click to start.',
               'Touch & Drag'          => 'Allow users to explore by dragging with mouse or touch gestures.',
               'Navigation Compass'    => 'Display an interactive compass to help users orient themselves.',
               'Title & Author Overlay' => 'Show a professional title and author credit over the panorama.',
               'Scroll Zoom'           => 'Let users zoom in and out using their mouse scroll wheel.',
               'Keyboard Navigation'   => 'Navigate the panorama using keyboard arrow keys for accessibility.',
               'Double-Click Zoom'     => 'Quickly zoom into a specific area with a double-click.',
             ) ),
             'class'   => 'bppiv-pro-image360',
           ),
           // Pro features for Video (normal)
           array(
             'type'    => 'content',
             'content' => $this->pro_feature_html( array(
               'Custom Start Angle'       => 'Define exactly where your video begins playing.',
               'Fullscreen Toggle'        => 'Let viewers enjoy an immersive fullscreen video experience.',
               'Playback Settings Panel'  => 'Give users control over quality, speed, and playback options.',
               'Seek Bar & Play/Pause'    => 'Navigate through the video timeline with a sleek progress bar.',
             ) ),
             'class'   => 'bppiv-pro-video',
           ),
           // Pro features for Video 360 (only actual pro fields)
           array(
             'type'    => 'content',
             'content' => $this->pro_feature_html( array(
               'Custom Start Angle'    => 'Define exactly where your 360° video begins playing.',
               'Progress Bar'          => 'Show or hide the video seek/progress bar.',
               'Fullscreen Toggle'     => 'Allow viewers to enter immersive fullscreen mode.',
               'Remaining Time'        => 'Display the remaining playback time on the player.',
               'Picture in Picture'    => 'Enable floating mini-player for multitasking.',
               'Playback Speed'        => 'Let viewers adjust video playback speed.',
             ) ),
             'class'   => 'bppiv-pro-video2',
           ),
           // JS to toggle fields and pro lists based on type
           array(
             'type'     => 'callback',
             'function' => function() {
               ?>
               <script type="text/javascript">
                 jQuery(document).ready(function($) {
                   function syncControlsTab() {
                     var type = $('input[name="_bppivimages_[bppiv_type]"]:checked').val();
                     if(!type) return;
                     // Hide all groups first
                     $('.bppiv-ctrl-image, .bppiv-ctrl-video, .bppiv-ctrl-video-only, .bppiv-ctrl-video2').hide();
                     $('.bppiv-pro-image3d, .bppiv-pro-image360, .bppiv-pro-video, .bppiv-pro-video2').hide();

                     if (type === 'image') {
                       $('.bppiv-ctrl-image').show();
                       $('.bppiv-pro-image3d').show();
                     } else if (type === 'image360' || type === 'tour360' || type === 'gstreet') {
                       $('.bppiv-ctrl-image').show();
                       $('.bppiv-pro-image360').show();
                     } else if (type === 'video') {
                       $('.bppiv-ctrl-video').show();
                       $('.bppiv-ctrl-video-only').show();
                       $('.bppiv-pro-video').show();
                     } else if (type === 'video2') {
                       $('.bppiv-ctrl-video').show();
                       $('.bppiv-ctrl-video2').show();
                       $('.bppiv-pro-video2').show();
                     }
                   }
                   $(document).on('change', 'input[name="_bppivimages_[bppiv_type]"]', syncControlsTab);
                   setTimeout(syncControlsTab, 300);
                   setTimeout(syncControlsTab, 1000);
                 });
               </script>
               <?php
             }
           ),
        )
      ) );
    }

    public function dymensions() {
      CSF::createSection( $this->prefix, array(
        'title'  => 'Dimensions',
        'icon'   => 'fa fa-expand',
        'fields' => array(
           // --- DIMENSIONS ---
          array(
            'id'       => 'bppiv_image_width',
            'type'         => 'dimensions',
            'title'        => 'Width',
            'desc'         => 'Set the width of the viewer (e.g., 100% or 800px).',
            'default'      => array( 'width'  => '100', 'unit'   => '%' ),
            'height'       => false
          ),
          array(
            'id'           => 'bppiv_image_height',
            'type'         => 'dimensions',
            'title'        => 'Height',
            'desc'         => 'Set the fixed height of the viewer in pixels.',
            'default'      => array( 'height' => '320', 'unit'   => 'px' ),
            'width'        => false,
            'class'        => 'bppiv-dim-height',
          ),
          array(
            'id'       => 'bppiv_alignment',
            'type'     => 'select',
            'title'    => 'Viewer Alignment',
            'desc'     => 'Align the viewer container to the left, center, or right of the page.',
            'options'  => array( 'start' => 'Left', 'center' => 'Center', 'end' => 'Right' ),
            'default'  => 'center'
          ),
          // JS to hide height for video2
          array(
            'type'     => 'callback',
            'function' => function() {
              ?>
              <script type="text/javascript">
                jQuery(document).ready(function($) {
                  function syncDimensions() {
                    var type = $('input[name="_bppivimages_[bppiv_type]"]:checked').val();
                    if(!type) return;
                    if (type === 'video2') {
                      $('.bppiv-dim-height').hide();
                    } else {
                      $('.bppiv-dim-height').show();
                    }
                  }
                  $(document).on('change', 'input[name="_bppivimages_[bppiv_type]"]', syncDimensions);
                  setTimeout(syncDimensions, 300);
                  setTimeout(syncDimensions, 1000);
                });
              </script>
              <?php
            }
          ),
        )
      ) );
    }

    // public function upcoming_section($title) {
    //   CSF::createSection( $this->prefix, array(
    //     'title' => $title . $this->get_upcoming_badge(),
    //     'fields' => array(
    //       array(
    //         'type' => 'content',
    //         'content' => '
    //           <div style="text-align:center; padding: 40px 20px; background: #f9f9f9; border: 1px dashed #ccc; border-radius: 12px;">
    //             <h3 style="color:#146ef5; margin-bottom:10px;">🚀 Coming Soon</h3>
    //             <p style="color:#666;">We are working hard to bring <strong>' . $title . '</strong> features.</p>
    //           </div>
    //         ',
    //       ),
    //     ),
    //   ) );
    // }

    public function pro_feature_html( $features ) {
      $html = '
      <div class="bppiv-pro-notice-box" style="margin-top: 30px; padding: 25px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <h4 class="bppiv-pro-notice-title" style="margin: 0 0 20px 0; color: #146ef5; font-size: 18px; display: flex; align-items: center; gap: 10px;">
              <span>🚀</span> ' . __( 'Unlock Pro Features', 'panorama' ) . '
          </h4>
          <ul class="bppiv-pro-notice-list" style="list-style: none; padding: 0; margin: 0 0 25px 0; display: grid; grid-template-columns: repeat(1, 1fr); gap: 15px;">';
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
              <a href="' . admin_url( 'admin.php?page=panorama-viewer-help-demo#/pricing' ) . '" target="_blank" style="background: #146ef5; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">' . __( 'Upgrade to Pro Now', 'panorama' ) . '</a>
          </div>
      </div>';
      return $html;
    }

    public function pro_feature_list( $features, $dependency = array() ) {
      $html = '
      <div class="bppiv-pro-notice-box" style="margin-top: 30px; padding: 25px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <h4 class="bppiv-pro-notice-title" style="margin: 0 0 20px 0; color: #146ef5; font-size: 18px; display: flex; align-items: center; gap: 10px;">
              <span>🚀</span> ' . __( 'Unlock Pro Features', 'panorama' ) . '
          </h4>
          <ul class="bppiv-pro-notice-list" style="list-style: none; padding: 0; margin: 0 0 25px 0; display: grid; grid-template-columns: repeat(1, 1fr); gap: 15px;">';
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
              <a href="' . admin_url( 'admin.php?page=panorama-viewer-help-demo#/pricing' ) . '" target="_blank" style="background: #146ef5; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">' . __( 'Upgrade to Pro Now', 'panorama' ) . '</a>
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