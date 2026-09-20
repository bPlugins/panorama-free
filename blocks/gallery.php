<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$bppiv_galleries = $get_value('bppiv_pan_gallery', false, [] );
$bppiv_items     = [];

if ( is_array( $bppiv_galleries ) ) {
    foreach ( $bppiv_galleries as $bppiv_key => $bppiv_gallery ) {
        if ( ! empty( $bppiv_gallery['panoramic_img']['url'] ) || ! empty( $bppiv_gallery['img'] ) ) {
            $bppiv_items[] = [
                "img"             => isset($bppiv_gallery['panoramic_img']['url']) ? $bppiv_gallery['panoramic_img']['url'] : ( isset($bppiv_gallery['img']) ? $bppiv_gallery['img'] : '' ),
                "isSetVideo"      => isset($bppiv_gallery['isSetVideo']) ? (bool)$bppiv_gallery['isSetVideo'] : ! empty($bppiv_gallery['gal_type_cheek']),
                "video"           => isset($bppiv_gallery['gal_type_video']['url']) ? $bppiv_gallery['gal_type_video']['url'] : ( isset($bppiv_gallery['video']) ? $bppiv_gallery['video'] : '' ),
                "fov"             => isset($bppiv_gallery['fov']) ? $bppiv_gallery['fov'] : 85,
                "initialPosition" => isset($bppiv_gallery['initial_view_pos']) ? [
                    "x" => isset($bppiv_gallery['initial_view_pos']['top']) ? $bppiv_gallery['initial_view_pos']['top'] : 0,
                    "y" => isset($bppiv_gallery['initial_view_pos']['right']) ? $bppiv_gallery['initial_view_pos']['right'] : 0,
                    "z" => isset($bppiv_gallery['initial_view_pos']['bottom']) ? $bppiv_gallery['initial_view_pos']['bottom'] : 120
                ] : null,
                "initialView"     => isset($bppiv_gallery['gallery_initial_view']) ? (bool)$bppiv_gallery['gallery_initial_view'] : false
            ];
        }
    }
}

if ( empty( $bppiv_items ) ) {
    $bppiv_block = '<div class="bppiv-empty-notice" style="padding: 16px 20px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; text-align: center; color: #64748b; font-size: 14px; margin: 15px 0;">' . esc_html__( 'No gallery items found to display.', 'panorama' ) . '</div>';
} else {
    $bppiv_gap_val = isset( $bppiv_meta['bppiv_gallery_column_gap']['width'] ) ? $bppiv_meta['bppiv_gallery_column_gap']['width'] . 'px' : '15px';

    $bppiv_block = [
        "blockName" => "panorama/gallery",
        "attrs" =>  [
            "galleries"    => $bppiv_items,
            "galleryLimit" => (int) $get_value('bppiv_gallery_limit', false, 6),
            "column"       => $get_value('bppiv_gallery_column', false, '3'),
            "gap"          => $bppiv_gap_val,
            "loadMoreBtn"  => [
                "text" => $get_value('loadMore_btn_text', false, 'Load More'),
                "colors" => [
                    "color" => $get_value('loadMore_text_color', false, '#ffffff'),
                    "bg"    => $get_value('loadMore_btn_bg', false, '#146ef5'),
                ],
                "hoverColors" => [
                    "color" => $get_value('loadMore_text_hover_color', false, '#ffffff'),
                    "bg"    => $get_value('loadMore_hover_bg', false, '#0d56c4'),
                ]
            ]
        ],
        "innerBlocks" => [],
        "innerHTML"   => "",
        "innerContent" => []
    ];
}