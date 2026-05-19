<?php
namespace BPPIV\Base;

class EnqueueAssets{

    public function register(){
        add_action('enqueue_block_assets', [$this, 'bppiv_registerFrontEndAssets']);
        add_action('admin_enqueue_scripts', [$this, 'bppiv_registerBackendAssets']);
        add_action('admin_enqueue_scripts', [$this, 'bppiv_registerFrontEndAssets']);
    }

    public function bppiv_registerFrontEndAssets(){
        wp_register_script( 'bppiv-three', BPPIV_PLUGIN_DIR . 'public/assets/js/three.min.js',[], BPPIV_VERSION, true);
        wp_register_script( 'bppiv-panolens', BPPIV_PLUGIN_DIR . 'public/assets/js/panolens.min.js', array( 'bppiv-three' ), BPPIV_VERSION, true );

        //videojs
        wp_register_script( 'videojs', BPPIV_PLUGIN_DIR . 'public/assets/js/lib/video.min.js', [], BPPIV_VERSION, true );
        wp_register_script( 'videojs-vr', BPPIV_PLUGIN_DIR . 'public/assets/js/lib/videojs-vr.min.js', [], BPPIV_VERSION, true );
        wp_register_script( 'videojs-init', BPPIV_PLUGIN_DIR . 'build/videojs-init.js', [], BPPIV_VERSION, true );
        wp_register_style( 'videojs', BPPIV_PLUGIN_DIR . 'public/assets/css/lib/video-js.min.css', [], BPPIV_VERSION, 'all' );
        wp_register_style( 'videojs-vr', BPPIV_PLUGIN_DIR . 'public/assets/css/lib/videojs-vr.css', [], BPPIV_VERSION, 'all' );
        
        
        //Pannellum
        wp_register_script( 'bppiv-pannellum-js', BPPIV_PLUGIN_DIR . 'public/assets/js/library/pannellum.js', [], BPPIV_VERSION, true);
        wp_register_script( 'bppiv-init', BPPIV_PLUGIN_DIR . 'build/scripts.js', array( 'jquery', 'bppiv-three', 'bppiv-panolens' ), BPPIV_VERSION, true );

        wp_register_script( 'bppiv-product', BPPIV_PLUGIN_DIR . 'public/assets/js/product.js', array(), BPPIV_VERSION, true );
        wp_register_style( 'bppiv-product', BPPIV_PLUGIN_DIR . 'public/assets/css/product.css', array(), BPPIV_VERSION, 'all' );
        
        //Pannellum CSS
        wp_register_style( 'bppiv-pannellum-css', BPPIV_PLUGIN_DIR . 'public/assets/css/library/pannellum.min.css', [], '2.5.6' );
        
        // style
        wp_register_style( 'bppiv-font-material', '//fonts.googleapis.com/icon?family=Material+Icons' );
        wp_register_style( 'bppiv-main-style', BPPIV_PLUGIN_DIR . 'public/assets/css/style.css', [], BPPIV_VERSION );
    }
    
     public function bppiv_registerBackendAssets($screen){
        $current = function_exists('get_current_screen') ? get_current_screen() : null;
        $post_type = $current && isset($current->post_type) ? $current->post_type : '';
        $screen_id = $current && isset($current->id) ? $current->id : '';
        $is_bppiv_screen = ($post_type === 'bppiv-image-viewer') || ($screen_id === 'bppiv-image-viewer_page_bppiv-support');

        if ( $is_bppiv_screen ) {
            wp_register_style( 'bppiv-custom-style', BPPIV_PLUGIN_DIR . 'public/assets/css/admin-style.css',[], BPPIV_VERSION );
            wp_enqueue_style( 'bppiv-custom-style' );
            
            // Script
            wp_register_script( 'bppiv-admin-script', BPPIV_PLUGIN_DIR . 'public/assets/js/admin-scripts.js', ['jquery'], BPPIV_VERSION, true );
            wp_enqueue_script( 'bppiv-admin-script' );
            
            wp_register_style( 'bppiv-readonly', BPPIV_PLUGIN_DIR . 'public/assets/css/readonly.css', [], BPPIV_VERSION );
            
            // classic editor preview (only for our CPT)
            wp_enqueue_script( 'classic-editor-preview', BPPIV_PLUGIN_DIR . 'build/classic-editor-preview.js', ['react', 'react-dom'], BPPIV_VERSION );

            // meta fields
            wp_register_script( 'bppiv-meta', BPPIV_PLUGIN_DIR . 'build/custom-codestar.js', ['jquery', 'wp-compose', 'lodash'], BPPIV_VERSION, true );
            wp_register_style( 'bppiv-meta', BPPIV_PLUGIN_DIR . 'build/custom-codestar.css', [], BPPIV_VERSION, 'all' );

            global $post;
            if ($screen === 'post.php' || $screen === 'post-new.php') {
                if (isset($post) && $post->post_type === 'bppiv-image-viewer') {
                    wp_add_inline_script('jquery-core', "
                        function bppiv_copy_to_clipboard(text) {
                            if (navigator.clipboard && window.isSecureContext) {
                                return navigator.clipboard.writeText(text);
                            } else {
                                var textArea = document.createElement('textarea');
                                textArea.value = text;
                                textArea.style.position = 'fixed';
                                textArea.style.left = '-9999px';
                                textArea.style.top = '0';
                                document.body.appendChild(textArea);
                                textArea.focus();
                                textArea.select();
                                var successful = document.execCommand('copy');
                                document.body.removeChild(textArea);
                                return successful ? Promise.resolve() : Promise.reject();
                            }
                        }

                        document.addEventListener('click', function(e){
                            var el = e.target.closest('.shortcode_copy');
                            if(!el) return;

                            bppiv_copy_to_clipboard(el.dataset.code).then(function(){
                                var original = el.innerHTML;
                                el.innerHTML = 'Copied!';
                                setTimeout(function(){
                                    el.innerHTML = original;
                                }, 1000);
                            });
                        });
                    ");
                }
            }
        }
    }
}



