<?php
// Shortcode for Panorama  Pro
function bppiv_image_viewer( $atts ){
    extract( shortcode_atts( array(
            'id'    => null,
    ), $atts ));

    $block = null;
    // Check Post-Type
    $post_type = get_post_type($id);
    if($post_type != 'bppiv-image-viewer'){
        return false;
    }
    // Meta Data
    $bppiv_meta = get_post_meta($id, '_bppivimages_', true); 

    $bppiv_width    = '100%';
    $bppiv_height   = '320px';

    if( isset($bppiv_meta['bppiv_image_width']['width']) ) {
        $bppiv_width = $bppiv_meta['bppiv_image_width']['width'].$bppiv_meta['bppiv_image_width']['unit'];
    }
    if( isset($bppiv_meta['bppiv_image_height']['height']) ) {
        $bppiv_height = $bppiv_meta['bppiv_image_height']['height'].$bppiv_meta['bppiv_image_height']['unit'];
    }

    $pan_type = isset($bppiv_meta['bppiv_type']) ? $bppiv_meta['bppiv_type'] : '';
    
    $get_value = bppiv_isset($bppiv_meta);

    if(file_exists(BPPIV_PATH."blocks/$pan_type.php")){
        include(BPPIV_PATH."blocks/$pan_type.php");
    }

    return render_block($block);
}
add_shortcode( 'panorama', 'bppiv_image_viewer' );

// Shortcode for Panorama  Pro
function panorama_product_viewer_callback( $attrs ){

    ob_start(); 

    $meta = get_post_meta(get_the_ID(), '_bppiv_product_', true);
    if($meta['video360'] === '1' && $meta['type'] === 'video'){
        wp_enqueue_script('bppiv-panolens');
    }else if($meta['type'] === 'image'){
        wp_enqueue_script('bppiv-pannellum-js');
        wp_enqueue_style('bppiv-pannellum-css');
    }

    wp_enqueue_script('bppiv-product');
    wp_enqueue_style('bppiv-product');

    $attributes = '';
    if($meta['video_autoplay']){
        $attributes .= ' autoplay';
    }

    if($meta['video_mute']){
        $attributes .= ' muted';
    }

    if($meta['video_loop']){
        $attributes .= ' loop';
    }

    if($meta['video_show_controls']){
        $attributes .= ' controls';
    }

   ?>
   <div id="bppiv_product_panorama" data-settings="<?php echo esc_attr(wp_json_encode($meta)) ?>">
        <?php if($meta['type'] === 'video' && $meta['video360'] === '0') { ?>
            <video style="max-width: 100%;" <?php echo esc_attr($attributes);  ?> src="<?php echo esc_url($meta['video_src']) ?>"></video>
        <?php } ?>
        
    </div>
   <?php
   return ob_get_clean();
}
add_shortcode( 'panorama_product_viewer', 'panorama_product_viewer_callback' );
