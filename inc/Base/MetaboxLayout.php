<?php
namespace BPPIV\Base;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Layout of the "Panorama Settings" boxes of panoramas and WooCommerce products (only how
 * the fields are shown; field ids and saved data never change):
 * - settings defined as one long list are grouped into tabs (Configuration, Rotation &
 *   Controls, Dimensions, Styles), like the free version;
 * - the lines under a field title become a "?" tooltip that says what the field does.
 */
class MetaboxLayout {

    const PREFIX = '_bppivimages_';

    const PRODUCT_PREFIX = '_bppiv_product_';

    /**
     * Field id => tab. Fields not listed stay in Configuration.
     */
    private static function tab_map() {
        $tabs = array(
            'controls'   => array(
                'bppiv_auto_rotate', 'bppiv_speed', 'auto_rotate_inactivity_delay', 'control_show_hide',
                'initial_view', 'initial_view_property', 'initial_view_image_property',
                'initial_view_video', 'initial_view_video_property', 'custom_control', 'is_motion_button',
                'bppiv_auto_load', 'previewImgUrl', 'loadButtonText', 'draggable_360', 'compass_360', 'orientation_360',
                'bppiv_auto_play', 'bppiv_video_mute', 'bppiv_video_autoplay', 'bppiv_video_loop', 'control_show_hide_video',
                'video_fullscreen_ctrl', 'video_setting_ctrl', 'video_video_range_ctrl', 'video_volume_control', 'video_default_volume', 'video_play_pause_ctrl',
                'video_progress_ctrl', 'video_volume_ctrl', 'video2_fullscreen_ctrl', 'video_remaining_time_ctrl',
                'video_pip_ctrl', 'video_playback_speed_ctrl', 'mouse_zoom', 'disable_keyboard_ctrl', 'double_click_zoom',
            ),
            'dimensions' => array(
                'bppiv_image_width', 'bppiv_image_height', 'bppiv_alignment',
                'bppiv_gallery_limit', 'bppiv_gallery_column', 'bppiv_gallery_column_gap',
            ),
            'styles'     => array(
                'gallery_title_typography', 'gallery_desc_typography', 'bppiv_enable_readmore', 'gallery_readmore_color',
                'loadMore_btn_text', 'loadMore_text_color', 'loadMore_btn_bg', 'loadMore_text_hover_color', 'loadMore_hover_bg',
                'motion_button_text_color', 'motion_button_btn_bg', 'hover_motion_button_text_color', 'hover_motion_button_btn_bg',
            ),
        );

        $map = array();
        foreach ( $tabs as $tab => $ids ) {
            foreach ( $ids as $id ) {
                $map[ $id ] = $tab;
            }
        }
        return $map;
    }

    /**
     * Field id => what the field does, shown in its "?" tooltip.
     */
    private static function help_texts() {
        return array(
            'bppiv_type'                     => __( 'What to show: a 3D image, a 360° image or video, a gallery, a virtual tour or a Google Street View.', 'panorama' ),
            'bppiv_image_src'                => __( 'The image to show. Upload it or paste an image link.', 'panorama' ),
            'panorama_format_360'            => __( 'Equirectangular for a normal 360° photo, Cubemap for 6 cube face images, Cylindrical for a phone panorama.', 'panorama' ),
            'haov_360'                       => __( 'How many degrees the image covers left to right. A full 360° photo is 360.', 'panorama' ),
            'vaov_360'                       => __( 'How many degrees the image covers top to bottom. A full 360° photo is 180.', 'panorama' ),
            'voffset_360'                    => __( 'Moves a partial panorama up or down, in degrees. Usually 0.', 'panorama' ),
            'image_src_360'                  => __( 'The 360° (equirectangular) photo to show. Upload it or paste an image link.', 'panorama' ),
            'cubemap_front_360'              => __( 'The cube face that looks forward.', 'panorama' ),
            'cubemap_right_360'              => __( 'The cube face on the right.', 'panorama' ),
            'cubemap_back_360'               => __( 'The cube face behind the viewer.', 'panorama' ),
            'cubemap_left_360'               => __( 'The cube face on the left.', 'panorama' ),
            'cubemap_up_360'                 => __( 'The cube face above the viewer (sky or ceiling).', 'panorama' ),
            'cubemap_down_360'               => __( 'The cube face below the viewer (floor or ground).', 'panorama' ),
            'bppiv_video_src'                => __( 'The 360° video to play. Upload it or paste a video link.', 'panorama' ),
            'bppiv_pan_gallery'              => __( 'Add the images and videos of the gallery, each with its own title and description.', 'panorama' ),
            'bppiv_gallery_limit'            => __( 'How many items show first. The rest appear with the Load More button.', 'panorama' ),
            'bppiv_gallery_column'           => __( 'How many items sit side by side in one row.', 'panorama' ),
            'bppiv_gallery_column_gap'       => __( 'Space between the gallery items.', 'panorama' ),
            'gallery_title_typography'       => __( 'Font, size and color of the item titles.', 'panorama' ),
            'gallery_desc_typography'        => __( 'Font, size and color of the item descriptions.', 'panorama' ),
            'bppiv_enable_readmore'          => __( 'Cuts long descriptions short and adds a Read More link.', 'panorama' ),
            'gallery_readmore_color'         => __( 'Color of the Read More / Read Less link.', 'panorama' ),
            'loadMore_btn_text'              => __( 'Text on the button that loads more gallery items.', 'panorama' ),
            'loadMore_text_color'            => __( 'Text color of the Load More button.', 'panorama' ),
            'loadMore_btn_bg'                => __( 'Background color of the Load More button.', 'panorama' ),
            'loadMore_text_hover_color'      => __( 'Text color of the Load More button on mouse over.', 'panorama' ),
            'loadMore_hover_bg'              => __( 'Background color of the Load More button on mouse over.', 'panorama' ),
            'tour_360'                       => __( 'Add the scenes of the tour and the hotspots that move visitors from one scene to another.', 'panorama' ),
            'bppiv_pano_id'                  => __( 'The ID of the Google Street View panorama to show.', 'panorama' ),
            'bppiv_image_width'              => __( 'Width of the viewer, e.g. 100% or 800px.', 'panorama' ),
            'bppiv_image_height'             => __( 'Height of the viewer.', 'panorama' ),
            'bppiv_alignment'                => __( 'Places the viewer on the left, center or right of the page.', 'panorama' ),
            'bppiv_auto_rotate'              => __( 'The view turns by itself after the page loads.', 'panorama' ),
            'bppiv_speed'                    => __( 'How fast the view turns. A negative value turns the other way.', 'panorama' ),
            'auto_rotate_inactivity_delay'   => __( 'Wait time (in milliseconds) before rotation starts again after the visitor stops moving the view.', 'panorama' ),
            'control_show_hide'              => __( 'Hides the built-in zoom and fullscreen buttons.', 'panorama' ),
            'initial_view'                   => __( 'Choose the angle and zoom the panorama opens with.', 'panorama' ),
            'initial_view_property'          => __( 'Opening angle and zoom: Pitch = up/down, Yaw = left/right, HFOV = zoom (smaller is closer).', 'panorama' ),
            'initial_view_image_property'    => __( 'Opening position: X = left/right, Y = up/down, Z = zoom.', 'panorama' ),
            'initial_view_video'             => __( 'Choose the angle and zoom the video opens with.', 'panorama' ),
            'initial_view_video_property'    => __( 'Opening position: X = left/right, Y = up/down, Z = zoom.', 'panorama' ),
            'custom_control'                 => __( 'Replaces the default buttons with a styled control bar.', 'panorama' ),
            'is_motion_button'               => __( 'Shows a button that lets phone visitors look around by moving their device.', 'panorama' ),
            'motion_button_text_color'       => __( 'Text color of the device motion button.', 'panorama' ),
            'motion_button_btn_bg'           => __( 'Background color of the device motion button.', 'panorama' ),
            'hover_motion_button_text_color' => __( 'Text color of the device motion button on mouse over.', 'panorama' ),
            'hover_motion_button_btn_bg'     => __( 'Background color of the device motion button on mouse over.', 'panorama' ),
            'bppiv_auto_load'                => __( 'Loads the panorama with the page. When off, visitors click a button to load it (faster pages).', 'panorama' ),
            'previewImgUrl'                  => __( 'Image shown before the panorama loads, mostly when Autoload is off.', 'panorama' ),
            'loadButtonText'                 => __( 'Text on the button that loads the panorama when Autoload is off.', 'panorama' ),
            'draggable_360'                  => __( 'Visitors can look around by dragging with the mouse or a finger.', 'panorama' ),
            'compass_360'                    => __( 'Shows a compass that points to where the visitor is looking.', 'panorama' ),
            'orientation_360'                => __( 'Phone and tablet visitors can look around by tilting their device.', 'panorama' ),
            'bppiv_auto_play'                => __( 'The video starts playing by itself. Browsers allow this only when the video is muted.', 'panorama' ),
            'bppiv_video_mute'               => __( 'The video starts without sound. Needed for Auto Play.', 'panorama' ),
            'bppiv_video_autoplay'           => __( 'The video starts playing by itself. Browsers allow this only when the video is muted.', 'panorama' ),
            'bppiv_video_loop'               => __( 'The video starts again when it ends.', 'panorama' ),
            'control_show_hide_video'        => __( 'Shows the video control bar.', 'panorama' ),
            'video_fullscreen_ctrl'          => __( 'Shows the fullscreen button.', 'panorama' ),
            'video_setting_ctrl'             => __( 'Shows the settings (quality) button.', 'panorama' ),
            'video_video_range_ctrl'         => __( 'Shows the seek bar and the play/pause button.', 'panorama' ),
            'video_volume_control'           => __( 'Shows a volume button and slider, so visitors can turn the sound up or down.', 'panorama' ),
            'video_default_volume'           => __( 'The volume the video starts at. Visitors can change it with the volume control.', 'panorama' ),
            'video_play_pause_ctrl'          => __( 'Shows the play/pause button.', 'panorama' ),
            'video_progress_ctrl'            => __( 'Shows the bar to jump to any part of the video.', 'panorama' ),
            'video_volume_ctrl'              => __( 'Shows the volume button.', 'panorama' ),
            'video2_fullscreen_ctrl'         => __( 'Shows the fullscreen button.', 'panorama' ),
            'video_remaining_time_ctrl'      => __( 'Shows how much of the video is left.', 'panorama' ),
            'video_pip_ctrl'                 => __( 'Shows the picture-in-picture button, to watch in a small floating window.', 'panorama' ),
            'video_playback_speed_ctrl'      => __( 'Shows the button to play the video slower or faster.', 'panorama' ),
            'title_author'                   => __( 'Shows a title and an author name on the panorama.', 'panorama' ),
            'title_360'                      => __( 'The title shown on the panorama.', 'panorama' ),
            'author_360'                     => __( 'The author name shown on the panorama.', 'panorama' ),
            'showByPrefix'                   => __( 'Adds "by" before the author name, e.g. "by Alex Doe".', 'panorama' ),
            'tourShowByPrefix'               => __( 'Adds "by" before the author name, e.g. "by Alex Doe".', 'panorama' ),
            'mouse_zoom'                     => __( 'Visitors can zoom with the mouse wheel.', 'panorama' ),
            'disable_keyboard_ctrl'          => __( 'Turns off moving the view with the arrow keys.', 'panorama' ),
            'double_click_zoom'              => __( 'Visitors can zoom in with a double click.', 'panorama' ),
        );
    }

    /**
     * WooCommerce product box: field id => tab. Fields not listed stay in Configuration.
     */
    private static function product_tab_map() {
        $tabs = array(
            'controls' => array(
                'autoRotate', 'speed', 'showControls', 'initialView',
                'video_autoplay', 'video_mute', 'video_loop', 'video_show_controls',
            ),
            'details'  => array( 'title', 'author' ),
        );

        $map = array();
        foreach ( $tabs as $tab => $ids ) {
            foreach ( $ids as $id ) {
                $map[ $id ] = $tab;
            }
        }
        return $map;
    }

    /**
     * WooCommerce product box: field id => what the field does.
     */
    private static function product_help_texts() {
        $panorama = self::help_texts();
        return array(
            'type'                => __( 'Show a 360° image or a video on the product page.', 'panorama' ),
            'panorama_format_360' => $panorama['panorama_format_360'],
            'image_src'           => __( 'The 360° (equirectangular) photo of the product. Upload it or paste an image link.', 'panorama' ),
            'cubemap_front_360'   => $panorama['cubemap_front_360'],
            'cubemap_right_360'   => $panorama['cubemap_right_360'],
            'cubemap_back_360'    => $panorama['cubemap_back_360'],
            'cubemap_left_360'    => $panorama['cubemap_left_360'],
            'cubemap_up_360'      => $panorama['cubemap_up_360'],
            'cubemap_down_360'    => $panorama['cubemap_down_360'],
            'haov_360'            => $panorama['haov_360'],
            'vaov_360'            => $panorama['vaov_360'],
            'voffset_360'         => $panorama['voffset_360'],
            'video_src'           => __( 'The video of the product. Upload it or paste a video link.', 'panorama' ),
            'video360'            => __( 'Turn on for a 360° video, so visitors can drag to look around.', 'panorama' ),
            'viewer_position'     => __( 'Where the viewer shows on the product page: above or below the product images, instead of the main image, or in a "360° View" tab. "None" shows it only where you add the shortcode.', 'panorama' ),
            'autoRotate'          => $panorama['bppiv_auto_rotate'],
            'speed'               => $panorama['bppiv_speed'],
            'showControls'        => __( 'Shows the zoom and fullscreen buttons on the viewer.', 'panorama' ),
            'initialView'         => $panorama['initial_view_property'],
            'video_autoplay'      => $panorama['bppiv_auto_play'],
            'video_mute'          => $panorama['bppiv_video_mute'],
            'video_loop'          => $panorama['bppiv_video_loop'],
            'video_show_controls' => __( 'Shows the play, progress and volume controls on the video.', 'panorama' ),
            'title'               => __( 'A title shown in the top-left corner of the viewer.', 'panorama' ),
            'author'              => __( 'A credit name shown under the title.', 'panorama' ),
        );
    }

    public function register() {
        add_filter( 'csf_' . self::PREFIX . '_args', array( $this, 'args' ), 20 );
        add_filter( 'csf_' . self::PREFIX . '_sections', array( $this, 'sections' ), 20 );
        add_filter( 'csf_' . self::PRODUCT_PREFIX . '_args', array( $this, 'args' ), 20 );
        add_filter( 'csf_' . self::PRODUCT_PREFIX . '_sections', array( $this, 'product_sections' ), 20 );
    }

    /**
     * Same light look in every version (the tabs are unreadable on the dark theme).
     *
     * @param array $args Metabox args.
     * @return array
     */
    public function args( $args ) {
        if ( is_array( $args ) ) {
            $args['theme'] = 'light';
        }
        return $args;
    }

    public function sections( $sections ) {
        $titles = array(
            'configuration' => array( __( 'Configuration', 'panorama' ), 'fas fa-cog' ),
            'controls'      => array( __( 'Rotation & Controls', 'panorama' ), 'fas fa-sliders-h' ),
            'dimensions'    => array( __( 'Dimensions', 'panorama' ), 'fas fa-expand' ),
            'styles'        => array( __( 'Styles', 'panorama' ), 'fas fa-paint-brush' ),
        );
        return $this->layout( $sections, self::tab_map(), $titles, self::help_texts() );
    }

    public function product_sections( $sections ) {
        $titles = array(
            'configuration' => array( __( 'Configuration', 'panorama' ), 'fas fa-cog' ),
            'controls'      => array( __( 'Rotation & Controls', 'panorama' ), 'fas fa-sliders-h' ),
            'details'       => array( __( 'Title & Author', 'panorama' ), 'fas fa-heading' ),
        );
        return $this->layout( $sections, self::product_tab_map(), $titles, self::product_help_texts() );
    }

    /**
     * @param array $sections Sections of the metabox.
     * @param array $map      Field id => tab.
     * @param array $titles   Tab => array( title, icon ); the first one is the default tab.
     * @param array $texts    Field id => tooltip text.
     * @return array
     */
    private function layout( $sections, $map, $titles, $texts ) {
        if ( ! is_array( $sections ) || ! $sections ) {
            return $sections;
        }

        // One untitled section with every field: group it into tabs.
        if ( 1 === count( $sections ) && empty( $sections[0]['title'] ) && ! empty( $sections[0]['fields'] ) ) {
            $sections = $this->split( $sections[0]['fields'], $map, $titles );
        }

        foreach ( $sections as $index => $section ) {
            if ( ! empty( $section['fields'] ) && is_array( $section['fields'] ) ) {
                foreach ( $section['fields'] as $i => $field ) {
                    $sections[ $index ]['fields'][ $i ] = $this->field( $field, $texts );
                }
            }
        }

        return $sections;
    }

    /**
     * Groups one field list into tabs, keeping the original order inside each tab.
     *
     * @param array $fields Fields.
     * @param array $map    Field id => tab.
     * @param array $titles Tab => array( title, icon ).
     * @return array Sections.
     */
    private function split( $fields, $map, $titles ) {
        $groups  = array_fill_keys( array_keys( $titles ), array() );
        $default = key( $titles );
        $tab     = $default;

        foreach ( $fields as $field ) {
            if ( ! empty( $field['id'] ) ) {
                $tab = isset( $map[ $field['id'] ] ) ? $map[ $field['id'] ] : $default;
            }
            // A field without id (a notice) stays with the field before it.
            $groups[ $tab ][] = self::global_dependency( $field );
        }

        $sections = array();
        foreach ( $groups as $key => $list ) {
            if ( $list ) {
                $sections[] = array(
                    'title'  => $titles[ $key ][0],
                    'icon'   => $titles[ $key ][1],
                    'class'  => 'bppiv-auto-tab',
                    'fields' => $list,
                );
            }
        }
        return $sections;
    }

    /**
     * Dependencies on fields in another tab must look up their controller page-wide.
     *
     * @param array $field Field.
     * @return array
     */
    private static function global_dependency( $field ) {
        if ( empty( $field['dependency'] ) || ! is_array( $field['dependency'] ) ) {
            return $field;
        }

        $dependency = $field['dependency'];
        if ( is_array( reset( $dependency ) ) ) {
            foreach ( $dependency as $i => $rule ) {
                $rule              = array_pad( $rule, 4, '' );
                $rule[3]           = true;
                $dependency[ $i ] = $rule;
            }
        } else {
            $dependency    = array_pad( $dependency, 4, '' );
            $dependency[3] = true;
        }

        $field['dependency'] = $dependency;
        return $field;
    }

    /**
     * Short tooltip instead of a long description, and a hook class for the type picker.
     *
     * @param array $field Field.
     * @param array $texts Field id => tooltip text.
     * @return array
     */
    private function field( $field, $texts ) {
        if ( ! is_array( $field ) ) {
            return $field;
        }

        if ( isset( $field['id'] ) && 'bppiv_type' === $field['id'] ) {
            $field['class'] = trim( ( isset( $field['class'] ) ? $field['class'] : '' ) . ' bppiv-type-field' );
        }

        $plain_types = array( 'content', 'notice', 'heading', 'subheading', 'submessage', 'callback' );
        $type        = isset( $field['type'] ) ? $field['type'] : '';
        if ( in_array( $type, $plain_types, true ) || empty( $field['id'] ) ) {
            return $field;
        }

        // A text with a link (e.g. "How to find it?") stays under the field.
        $movable = function ( $text ) {
            return is_string( $text ) && '' !== trim( $text ) && false === stripos( $text, '<a' );
        };

        if ( isset( $texts[ $field['id'] ] ) ) {
            $help = $texts[ $field['id'] ];
        } elseif ( ! empty( $field['help'] ) ) {
            $help = $field['help'];
        } elseif ( $movable( isset( $field['desc'] ) ? $field['desc'] : '' ) ) {
            $help = $field['desc'];
        } elseif ( $movable( isset( $field['subtitle'] ) ? $field['subtitle'] : '' ) ) {
            $help = $field['subtitle'];
        } else {
            return $field;
        }

        // The tooltip says what the field does, so the lines under the title go.
        $field['help'] = $help;
        if ( isset( $field['subtitle'] ) && $movable( $field['subtitle'] ) ) {
            unset( $field['subtitle'] );
        }
        if ( isset( $field['desc'] ) && $movable( $field['desc'] ) ) {
            unset( $field['desc'] );
        }

        return $field;
    }
}
