<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$id = wp_unique_id( 'bBlocksGalleryViewer-' );

$bppiv_resolved_attributes = $attributes;
if ( ! empty( $bppiv_resolved_attributes['galleries'] ) && is_array( $bppiv_resolved_attributes['galleries'] ) ) {
	foreach ( $bppiv_resolved_attributes['galleries'] as $bppiv_item_key => $bppiv_item ) {
		if ( ! empty( $bppiv_item['img'] ) ) {
			$bppiv_resolved_attributes['galleries'][ $bppiv_item_key ]['img'] = bppiv_resolve_media_url( $bppiv_item['img'] );
		}
		if ( ! empty( $bppiv_item['video'] ) ) {
			$bppiv_resolved_attributes['galleries'][ $bppiv_item_key ]['video'] = bppiv_resolve_media_url( $bppiv_item['video'] );
		}
	}
}
?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> id='<?php echo esc_attr( $id ); ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $bppiv_resolved_attributes ) ); ?>'></div>