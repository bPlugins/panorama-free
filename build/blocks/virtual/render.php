<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$id = wp_unique_id( 'bBlocksVirtualTour-' );

$bppiv_resolved_attributes = $attributes;
if ( ! empty( $bppiv_resolved_attributes['previewImgUrl'] ) ) {
	$bppiv_resolved_attributes['previewImgUrl'] = bppiv_resolve_media_url( $bppiv_resolved_attributes['previewImgUrl'] );
}
if ( ! empty( $bppiv_resolved_attributes['scenes'] ) && is_array( $bppiv_resolved_attributes['scenes'] ) ) {
	foreach ( $bppiv_resolved_attributes['scenes'] as $bppiv_scene_key => $bppiv_scene ) {
		if ( ! empty( $bppiv_scene['panorama'] ) ) {
			$bppiv_resolved_attributes['scenes'][ $bppiv_scene_key ]['panorama'] = bppiv_resolve_media_url( $bppiv_scene['panorama'] );
		}
		if ( ! empty( $bppiv_scene['cubeMap'] ) && is_array( $bppiv_scene['cubeMap'] ) ) {
			foreach ( $bppiv_scene['cubeMap'] as $bppiv_face => $bppiv_face_url ) {
				if ( ! empty( $bppiv_face_url ) ) {
					$bppiv_resolved_attributes['scenes'][ $bppiv_scene_key ]['cubeMap'][ $bppiv_face ] = bppiv_resolve_media_url( $bppiv_face_url );
				}
			}
		}
	}
}
?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> id='<?php echo esc_attr( $id ); ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $bppiv_resolved_attributes ) ); ?>'></div>