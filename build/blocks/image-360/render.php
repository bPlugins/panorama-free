<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$id = wp_unique_id( 'bBlocksImage360Viewer-' );

$bppiv_resolved_attributes = $attributes;
if ( ! empty( $bppiv_resolved_attributes['imageUrl'] ) ) {
	$bppiv_resolved_attributes['imageUrl'] = bppiv_resolve_media_url( $bppiv_resolved_attributes['imageUrl'] );
}
if ( ! empty( $bppiv_resolved_attributes['previewImgUrl'] ) ) {
	$bppiv_resolved_attributes['previewImgUrl'] = bppiv_resolve_media_url( $bppiv_resolved_attributes['previewImgUrl'] );
}
if ( ! empty( $bppiv_resolved_attributes['cubeMap'] ) && is_array( $bppiv_resolved_attributes['cubeMap'] ) ) {
	foreach ( $bppiv_resolved_attributes['cubeMap'] as $bppiv_face => $bppiv_face_url ) {
		if ( ! empty( $bppiv_face_url ) ) {
			$bppiv_resolved_attributes['cubeMap'][ $bppiv_face ] = bppiv_resolve_media_url( $bppiv_face_url );
		}
	}
}
?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> id='<?php echo esc_attr( $id ); ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $bppiv_resolved_attributes ) ); ?>'></div>