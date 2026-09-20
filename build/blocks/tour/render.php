<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$id = wp_unique_id( 'bBlocksTourViewer-' );

$bppiv_resolved_attributes = $attributes;
if ( ! empty( $bppiv_resolved_attributes['previewImgUrl'] ) ) {
	$bppiv_resolved_attributes['previewImgUrl'] = bppiv_resolve_media_url( $bppiv_resolved_attributes['previewImgUrl'] );
}
if ( ! empty( $bppiv_resolved_attributes['tour_360'] ) && is_array( $bppiv_resolved_attributes['tour_360'] ) ) {
	foreach ( $bppiv_resolved_attributes['tour_360'] as $bppiv_scene_key => $bppiv_scene ) {
		if ( ! empty( $bppiv_scene['tour_img'] ) ) {
			$bppiv_resolved_attributes['tour_360'][ $bppiv_scene_key ]['tour_img'] = bppiv_resolve_media_url( $bppiv_scene['tour_img'] );
		}
		if ( ! empty( $bppiv_scene['cubeMap'] ) && is_array( $bppiv_scene['cubeMap'] ) ) {
			foreach ( $bppiv_scene['cubeMap'] as $bppiv_face => $bppiv_face_url ) {
				if ( ! empty( $bppiv_face_url ) ) {
					$bppiv_resolved_attributes['tour_360'][ $bppiv_scene_key ]['cubeMap'][ $bppiv_face ] = bppiv_resolve_media_url( $bppiv_face_url );
				}
			}
		}
	}
}
?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> id='<?php echo esc_attr( $id ); ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $bppiv_resolved_attributes ) ); ?>'></div>