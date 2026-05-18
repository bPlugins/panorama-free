<?php
add_action('wp_enqueue_scripts', function(){
    global $wp_scripts, $wp_styles;

    $wp_scripts->queue = [];
    $wp_styles->queue  = [];

}, 999);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <title>Panorama</title>
   <?php wp_head(); ?>
   <style>
    #wpadminbar {
        display: none;
    }
    body {
        margin: 0;
        padding: 0;
    }
   </style>
</head>
<body>

    <?php 
        $post_type = get_post_type();
        if ($post_type === 'virtual_tour') {
            echo do_shortcode('[virtual-tour id="' . get_the_ID() . '"]');
        }
        elseif ($post_type === 'product_spot') {
            echo do_shortcode('[product_spot id="' . get_the_ID() . '"]');
        }
        else {
            echo wp_kses_post(do_shortcode('[panorama id="' . get_the_ID() . '"]')); 
        }
    ?>

    <?php wp_footer(); ?>

    <script>
        function sendHeight() {
            const height = document.body.scrollHeight;
            window.parent.postMessage({ iframeHeight: height, panoramaId: "panorama_<?php echo get_the_ID(); ?>"}, "*");
        }

        window.onload = sendHeight;
        window.onresize = sendHeight;
    </script>
</body>
</html>