<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$id = wp_unique_id( 'productSpot-' );

$bppiv_resolved_attributes = $attributes;
if ( ! empty( $bppiv_resolved_attributes['img']['url'] ) ) {
	$bppiv_resolved_attributes['img']['url'] = bppiv_resolve_media_url( $bppiv_resolved_attributes['img']['url'] );
}
?>
<div
    <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
    id='<?php echo esc_attr( $id ); ?>'
    data-attributes='<?php echo esc_attr( wp_json_encode( $bppiv_resolved_attributes ) ); ?>'
>
</div>