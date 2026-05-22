<?php
namespace BPPIV\Woocommerce;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class ProductView{

    private $meta = null;

    public function register(){
        // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        add_action('woocommerce_loaded', [$this, 'woocommerce_loaded']);
        // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        add_action('bp3d_product_model_before', [$this, 'model']);
        // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        add_action('bp3d_product_model_after', [$this, 'model']);
    }

    public function woocommerce_loaded(){
        $this->meta = get_post_meta(get_the_ID(), '_bppiv_product_', true);
        $viewer_position = $this->meta['viewer_position'] ?? 'none';
        if($viewer_position === 'none'){
            return;
        }
        
        // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        remove_action('woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20);
        // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        add_action('woocommerce_before_single_product_summary',[$this, 'bp3d_product_models'], 25);
    }

    public function bp3d_product_models(){
        if ( ! function_exists( 'wc_get_gallery_image_html' ) ) {
            return;
        }
        
        $this->meta = get_post_meta(get_the_ID(), '_bppiv_product_', true);
        $viewer_position = $this->meta['viewer_position'] ?? 'none';

        if($viewer_position === 'none'){
            // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
            add_action('woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 30);
            return;
        }

        global $product;
        
        // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        $columns           = apply_filters( 'woocommerce_product_thumbnails_columns', 4 );
        $post_thumbnail_id = $product->get_image_id();
        // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
        $wrapper_classes   = apply_filters( 'woocommerce_single_product_image_gallery_classes', array(
            'woocommerce-product-gallery',
            'woocommerce-product-gallery--' . ( $post_thumbnail_id ? 'with-images' : 'without-images' ),
            'woocommerce-product-gallery--columns-' . absint( $columns ),
            'images',
        ) );
        
        ?>
        
        <div class="product-panorama-wrap">
            <div class="<?php echo esc_attr( implode( ' ', array_map( 'sanitize_html_class', $wrapper_classes ) ) ); ?>" data-columns="<?php echo esc_attr( $columns ); ?>">
                <!-- Custom hook for 3d-viewer -->
                <?php  
                if($viewer_position === 'top') {
                    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
                    do_action( 'bp3d_product_model_before' ); ?>
                        <style>
                            .woocommerce div.product div.images .woocommerce-product-gallery__trigger {
                                position: absolute;
                                top: 385px;
                            }
                        </style>
                    <?php		
                }
        
                if($viewer_position === 'replace') {
                    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
                    add_filter( 'woocommerce_single_product_image_thumbnail_html',function($content){
                        return '';
                    }, 10, 2 );
                    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
                    do_action( 'bp3d_product_model_before' ); 	
                }
                ?>
        
                <figure class="woocommerce-product-gallery__wrapper">
                    <?php
        
                    if ( $post_thumbnail_id ) {
                        $html = wc_get_gallery_image_html( $post_thumbnail_id, true );
                    } else {
                        $html  = '<div class="woocommerce-product-gallery__image--placeholder">';
                        $html .= sprintf( '<img src="%s" alt="%s" class="wp-post-image" />', esc_url( wc_placeholder_img_src( 'woocommerce_single' ) ), esc_html__( 'Awaiting product image', 'panorama' ) );
                        $html .= '</div>';
                    }

                    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
                    echo wp_kses_post( apply_filters( 'woocommerce_single_product_image_thumbnail_html', $html, $post_thumbnail_id ) );
                    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
                    do_action( 'woocommerce_product_thumbnails' );
                    ?>
                </figure>
            </div>
            <?php  
                if( $viewer_position === 'bottom') {
                    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
                    do_action( 'bp3d_product_model_after' ); 
                }
            ?>
        
        </div> <!-- End of Product modal wrap --> 
        <?php
    }

    public function model(){
        
        if($this->meta['video360'] === '1' && $this->meta['type'] == 'video'){
            wp_enqueue_script('bppiv-panolens');
        }else if($this->meta['type'] == 'image') {
            wp_enqueue_script('bppiv-pannellum-js');
            wp_enqueue_style('bppiv-pannellum-css');
        }

        wp_enqueue_script('bppiv-product');
        wp_enqueue_style('bppiv-product');

        $attributes = '';
        if($this->meta['video_autoplay']){
            $attributes .= ' autoplay';
        }

        if($this->meta['video_mute']){
            $attributes .= ' muted';
        }

        if($this->meta['video_loop']){
            $attributes .= ' loop';
        }

        if($this->meta['video_show_controls']){
            $attributes .= ' controls';
        }

       ?>
       <div id="bppiv_product_panorama" data-settings="<?php echo esc_attr(wp_json_encode($this->meta)) ?>">
            <?php if($this->meta['type'] === 'video' && $this->meta['video360'] === '0') { ?>
                <video style="max-width: 100%;" <?php echo esc_attr($attributes);  ?> src="<?php echo esc_url($this->meta['video_src']) ?>"></video>
            <?php } ?>
        </div>

       <?php
    }
}

