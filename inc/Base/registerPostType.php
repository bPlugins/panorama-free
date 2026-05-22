<?php
namespace BPPIV\Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class registerPostType{

    public function register(){
        add_action( 'init', [$this, 'init']);
        add_action( 'admin_menu', [$this, 'admin_menu']);
        add_shortcode('panorama', [$this, 'bppiv_shortcode']);
        add_shortcode('virtual-tour', [$this, 'bppiv_virtual_tour_shortcode']);
        add_filter( 'manage_bppiv-image-viewer_posts_columns', [$this, 'bppiv_columns_head_only_panorama'], 10 );
        add_action( 'manage_bppiv-image-viewer_posts_custom_column', [$this, 'bppiv_columns_content_only_panorama'], 10, 2);
        add_filter( 'manage_virtual_tour_posts_columns', [$this, 'bppiv_columns_head_only_virtual_tour'], 10 );
        add_action( 'manage_virtual_tour_posts_custom_column', [$this, 'bppiv_columns_content_only_virtual_tour'], 10, 2);
        add_action( 'edit_form_after_title', [$this, 'bppiv_shortcode_area'] );
        add_filter( 'admin_footer_text', [$this, 'bppiv_admin_footer'] );
        add_filter( 'gettext', [$this, 'bppiv_change_publish_button'], 10, 2 );
        add_filter( 'post_updated_messages', [$this, 'bppiv_updated_messages'] );
        add_action( 'admin_head-post.php', [$this, 'bppiv_hide_publishing_actions'] );
        add_action( 'admin_head-post-new.php', [$this, 'bppiv_hide_publishing_actions'] );
        if ( is_admin() ) {
            add_filter('post_row_actions', [$this, 'bppiv_remove_row_actions'],  10, 2 );
        }

        add_filter('template_include', [$this, 'bppiv_load_custom_template']);
       
    }

    public function bppiv_load_custom_template($template) {

        if (is_singular(['bppiv-image-viewer', 'virtual_tour', 'product_spot'])) {

            $plugin_template = BPPIV_PATH . 'inc/templates/single-bppiv-image-viewer.php';

            if (file_exists($plugin_template)) {
                return $plugin_template;
            }
        }

        return $template;
    }

    public function init(){
        $labels = array(
            'name'           => __( 'Panorama Viewer', 'panorama' ),
            'menu_name'      => __( 'Panorama Viewer', 'panorama' ),
            'name_admin_bar' => __( 'Panorama Viewer', 'panorama' ),
            'add_new'        => __( 'Add New', 'panorama' ),
            'add_new_item'   => __( 'Add New', 'panorama' ),
            'new_item'       => __( 'New Panorama ', 'panorama' ),
            'edit_item'      => __( 'Edit Panorama ', 'panorama' ),
            'view_item'      => __( 'View Panorama ', 'panorama' ),
            'all_items'      => __( 'All Panoramas', 'panorama' ),
            'not_found'      => __( 'Sorry, we couldn\'t find the Panorama you are looking for.', 'panorama' ),
        );
        $args = array(
            'labels'          => $labels,
            'description'     => __( 'Panorama Options.', 'panorama' ),
            'public'          => true,
            'show_ui'         => true,
            'show_in_menu'    => true,
            'menu_icon'       => 'dashicons-welcome-view-site',
            'query_var'       => true,
            'rewrite'         => array(
            'slug' => 'panorama',
        ),
        'capability_type' => 'post',
        'has_archive'     => false,
        'hierarchical'    => false,
        'menu_position'   => 20,
        'supports'        => array( 'title' ),
        );
        \register_post_type( 'bppiv-image-viewer', $args );

       
        register_post_type('virtual_tour', [
            'labels' => [
                'name' => '360° Virtual Tour',
                'singular_name' => 'Virtual Tour',
                'add_new' => 'Add New',
                'add_new_item' => 'Add New Tour',
                'edit_item' => 'Edit Tour',
                'not_found' => 'There was no tour please add one',
                'search_items' => 'Search Tour',
                'view_item' => 'View Tour',
                'not_found_in_trash' => 'No Tour found in trash',
                'item_updated' => 'Tour updated',
            ],
            'public' => true,
            'publicly_queryable' => false,
            'exclude_from_search' => true,
            'has_archive' => false,
            "show_in_rest" => true,
            "template_lock" => "all",
            "template" => [["panorama/virtual-tour"]],
            'show_in_menu' => 'edit.php?post_type=bppiv-image-viewer', 
        ]);

        register_post_type('product_spot', [
            'labels' => [
                'name' => 'Product Spot',
                'singular_name' => 'Product Spot',
                'add_new' => 'Add New',
                'add_new_item' => 'Add New Product Spot',
                'edit_item' => 'Edit Product Spot',
                'not_found' => 'There was no product spot please add one',
                'search_items' => 'Search Product Spot',
                'view_item' => 'View Product Spot',
                'not_found_in_trash' => 'No Product Spot found in trash',
                'item_updated' => 'Product Spot updated',
            ],
            'public' => true,
            'publicly_queryable' => false,
            'exclude_from_search' => true,
            'has_archive' => false,
            'show_in_rest' => true,
            'menu_icon' => 'dashicons-products',
            'template' => [['psb/product-spot']],
            'template_lock' => 'all',
            'show_in_menu' => 'edit.php?post_type=bppiv-image-viewer', 
        ]);
    }

    function admin_menu(){
        remove_submenu_page(
            'edit.php?post_type=bppiv-image-viewer',
            'post-new.php?post_type=bppiv-image-viewer'
        );
    }

    function bppiv_virtual_tour_shortcode($atts){
        $post_id = $atts['id'];
        $post = get_post( $post_id );

        if ( !$post ) {
            return '';
        }

        if ( post_password_required( $post ) ) {
            return get_the_password_form( $post );
        }

        switch ( $post->post_status ) {
            case 'publish':
                return $this->displayContent( $post );
                
            case 'private':
                if (current_user_can('read_private_posts')) {
                    return $this->displayContent( $post );
                }
                return '';
                
            case 'draft':
            case 'pending':
            case 'future':
                if ( current_user_can( 'edit_post', $post_id ) ) {
                    return $this->displayContent( $post );
                }
                return '';
                
            default:
                return '';
        }
    }

    function bppiv_shortcode($atts){
        $post_id = $atts['id'];
        $post = get_post( $post_id );

        if ( !$post ) {
            return '';
        }

        if ( post_password_required( $post ) ) {
            return get_the_password_form( $post );
        }

        switch ( $post->post_status ) {
            case 'publish':
                return $this->displayContent( $post );
                
            case 'private':
                if (current_user_can('read_private_posts')) {
                    return $this->displayContent( $post );
                }
                return '';
                
            case 'draft':
            case 'pending':
            case 'future':
                if ( current_user_can( 'edit_post', $post_id ) ) {
                    return $this->displayContent( $post );
                }
                return '';
                
            default:
                return '';
        }
    }
    
    function displayContent( $post ){
        $blocks = parse_blocks( $post->post_content );
        if (empty($blocks)) {
            return '';
        }
        return render_block( $blocks[0] );
    }

    function bppiv_columns_head_only_panorama( $defaults ){
        unset($defaults['date']);
        $defaults['directors_name'] = 'ShortCode';
        $defaults['date'] = 'Date';
        return $defaults;
    }

    function bppiv_columns_content_only_panorama( $column_name, $post_ID ){
        if ($column_name == 'directors_name') {
            echo '<div class="bPlAdminShortcode" id="bPlAdminShortcode-' . esc_attr($post_ID) . '">
                    <input value="[panorama id=' . esc_attr($post_ID) . ']" onclick="copyBPlAdminShortcode(\'' . esc_attr($post_ID) . '\')" readonly>
                    <span class="tooltip">Copy To Clipboard</span>
                  </div>';
        }
    }

    function bppiv_columns_head_only_virtual_tour( $defaults ){
        unset($defaults['date']);
        $defaults['shortcode'] = 'ShortCode';
        $defaults['date'] = 'Date';
        return $defaults;
    }

    function bppiv_columns_content_only_virtual_tour( $column_name, $post_ID ){
        if ($column_name == 'shortcode') {
            echo '<div class="bPlAdminShortcode" id="bPlAdminShortcode-' . esc_attr($post_ID) . '">
                    <input value="[virtual-tour id=' . esc_attr($post_ID) . ']" onclick="copyBPlAdminShortcode(\'' . esc_attr($post_ID) . '\')" readonly>
                    <span class="tooltip">Copy To Clipboard</span>
                  </div>';
        }
    }

    function bppiv_shortcode_area() {
        global $post;

        if ( ! $post || $post->post_type !== 'bppiv-image-viewer' ) {
            return;
        }


            define('BPPIV_META_FIELDS', [
                'id' => '_bppivimages_',
                'title' => 'Fieds',
                'sections' => [
                    [
                        'name' => 'first',
                        'title' => 'First Section',
                        'fields' => [
                            [
                                'id' => 'bppiv_type',
                                'title' => 'Text',
                                'field' => 'text',
                                'attributes' => [
                                    'style' => ['width' => '50%']
                                ]
                            ],
                        ]
                    ]
                ]
            ]);

            // wp_enqueue_style('bppiv-meta');
            // wp_enqueue_script('bppiv-meta');

            ?>

            <div class="panorama_shortcode">
                 <p class="shortcode_desc">
                    <?php echo esc_html__( 'Use this shortcode in your post or page, or click Embed to share it on other websites:', 'panorama' ); ?>
                </p>
                <code 
                    class="shortcode_copy" 
                    data-code="[panorama id='<?php echo esc_attr($post->ID); ?>']">
                    [panorama id='<?php echo esc_attr($post->ID); ?>']
                </code>

                <button type="button" class="bppiv-embed-btn">
                    <span class="dashicons dashicons-share"></span> Embed
                </button>
            </div>

            <div id="bppiv-embed-modal" class="bppiv-modal">
                <div class="bppiv-modal-content">

                    <span class="bppiv-close">&times;</span>

                    <h3>Embed Panorama</h3>
                    <?php
                        $meta = get_post_meta($post->ID, '_bppivimages_', true);
                        $height = 600;
                        $type = '';
                        if (is_array($meta)) {
                            if (isset($meta['bppiv_type'])) {
                                $type = $meta['bppiv_type'];
                            }
                        }
                        if ($type !== 'video2') {
                            if (is_array($meta) && isset($meta['bppiv_image_height']['height']) && is_numeric($meta['bppiv_image_height']['height'])) {
                                $height = (int) $meta['bppiv_image_height']['height'];
                            }
                        }
                        if ($type === 'video2') {
                            $iframe_code = sprintf(
                                '<iframe id="panorama_%s" src="%s" width="100%%" loading="lazy" frameborder="0" allowfullscreen></iframe>',
                                esc_attr($post->ID),
                                esc_url(get_permalink($post->ID))
                            );
                        } else {
                            $iframe_code = sprintf(
                                '<iframe id="panorama_%s" src="%s" width="100%%" height="%d" loading="lazy" frameborder="0" allowfullscreen></iframe>',
                                esc_attr($post->ID),
                                esc_url(get_permalink($post->ID)),
                                $height
                            );
                        }
                        $embed_code = $iframe_code;
                        if ($type === 'video2') {
                            $script_url = BPPIV_PLUGIN_DIR . 'public/assets/js/iframe-resizer.js';
                            // $embed_code = sprintf(
                            //     '<div>%s%s</div>',
                            //     $iframe_code,
                            //     "\n" . sprintf('<script src="%s"></script>', esc_url($script_url))
                            // );
                        // without div
                        // phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedScript
                        $embed_code = $iframe_code . "\n" . sprintf('<script src="%s"></script>', esc_url($script_url));
                        } 
                        // else {
                        //     $embed_code = sprintf('<div>%s</div>', $iframe_code);
                        // }
                    ?>
                    <textarea style="height: <?php echo ($type === 'video2') ? '146px' : '66px'; ?>;" id="bppiv-iframe-code" readonly><?php echo esc_html($embed_code); ?></textarea>
                   <?php if ($type === 'video2') : ?>
                        <p class="bppiv-embed-note">
                            <strong>Note:</strong> For Video 360°, the iframe and height-resizer script should work normally. 
                            If the video appears misaligned on your page, wrap both the iframe and the 
                            height-resizer script inside a <code>&lt;div&gt;</code> container to ensure proper 
                            alignment and automatic height adjustment.
                        </p>
                    <?php else : ?>
                        <p class="bppiv-embed-note">
                            <strong>Note:</strong> If the panorama appears misaligned on your page, wrap the iframe inside a 
                            <code>&lt;div&gt;</code> container. This usually fixes alignment issues in some editors.
                        </p>
                    <?php endif; ?>
                    <p class="bppiv-embed-note">
                        <strong>Note:</strong> If you copy the embed code and the panorama does not display correctly, 
                        please go to your WordPress admin dashboard → Settings → Permalinks and click 
                        <em>Save Changes</em>. This refreshes the URLs and ensures the embed works properly.
                    </p>
                    <button type="button" id="bppiv-copy-iframe" class="bppiv-copy-embed-btn">Copy Embed Code</button>

                </div>
            </div>

            <script>
               document.addEventListener("DOMContentLoaded", function(){
                    const modal = document.getElementById("bppiv-embed-modal");
                    const btn = document.querySelector(".bppiv-embed-btn");
                    const close = document.querySelector(".bppiv-close");
                    const copyBtn = document.getElementById("bppiv-copy-iframe");
                    const textarea = document.getElementById("bppiv-iframe-code");

                    if(btn){
                        btn.onclick = function(){
                            modal.style.display = "block";
                        }
                    }

                    if(close){
                        close.onclick = function(){
                            modal.style.display = "none";
                        }
                    }

                    window.onclick = function(e){
                        if(e.target == modal){
                            modal.style.display = "none";
                        }
                    }

                    if(copyBtn){
                        copyBtn.onclick = function(){
                            textarea.select();
                            textarea.setSelectionRange(0, 99999);

                            if (navigator.clipboard && window.isSecureContext) {
                                navigator.clipboard.writeText(textarea.value).then(function(){
                                    copyBtn.innerText = "Copied!";
                                    setTimeout(function(){
                                        copyBtn.innerText = "Copy Embed Code";
                                    }, 1500);
                                });
                            } else {
                                try {
                                    var successful = document.execCommand('copy');
                                    if (successful) {
                                        copyBtn.innerText = "Copied!";
                                        setTimeout(function(){
                                            copyBtn.innerText = "Copy Embed Code";
                                        }, 1500);
                                    }
                                } catch (err) {
                                    console.error('Fallback: Oops, unable to copy', err);
                                }
                            }
                        }
                    }

                });
            </script>
            <?php
    }


    function bppiv_admin_footer( $text ) {
        
        if ( 'bppiv-image-viewer' == get_post_type() ) {
            $url = 'https://wordpress.org/support/plugin/panorama/reviews/#new-post';
            /* translators: %s: Rating URL. */
            $text = sprintf( __( 'If you like <strong> Panorama Viewer </strong> please leave us a <a href="%s" target="_blank">&#9733;&#9733;&#9733;&#9733;&#9733;</a> rating. Your Review is very important to us as it helps us to grow more. ', 'panorama' ), $url );
        }
        
        return $text;
    }

    /*-------------------------------------------------------------------------------*/
    /* Change publish button to save.
    /*-------------------------------------------------------------------------------*/
    function bppiv_change_publish_button( $translation, $text )    {
        if ( 'bppiv-image-viewer' == get_post_type() ) {
            if ( $text == 'Publish' ) {
                return 'Save';
            }
        }
        return $translation;
    }

    /*-------------------------------------------------------------------------------*/
    // Remove post update massage and link
    /*-------------------------------------------------------------------------------*/
    function bppiv_updated_messages( $messages ){
        $messages['bppiv-image-viewer'][1] = __( 'Shortcode updated ', 'panorama' );
        return $messages;
    }

    // HIDE everything in PUBLISH metabox except Move to Trash & PUBLISH button
    function bppiv_hide_publishing_actions() {
        $my_post_type = 'bppiv-image-viewer';
        global $post;
        if ( ! $post || $post->post_type !== $my_post_type ) {
            return;
        }
        echo '
        <style type="text/css">
            #misc-publishing-actions,
            #minor-publishing-actions{
                display:none;
            }
        </style>
        ';
    }

    // Hide & Disabled View, Quick Edit and Preview Button
    function bppiv_remove_row_actions( $actions ) {
        global $post;

        if ( $post && in_array( $post->post_type, ['bppiv-image-viewer', 'virtual_tour', 'product_spot'], true ) ) {
            unset( $actions['view'] );
            unset( $actions['inline hide-if-no-js'] );
        }

        return $actions;
    }
    
}
