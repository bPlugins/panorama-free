<?php
namespace BPPIV\Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Blocks {

	public function register() {
		add_action( 'init', [ $this, 'bppiv_register_blocks' ] );
	}

	public function bppiv_register_blocks() {
		register_block_type( BPPIV_PATH . 'build/blocks/parent' );
		register_block_type( BPPIV_PATH . 'build/blocks/image-360' );
		register_block_type( BPPIV_PATH . 'build/blocks/image-3d' );
		register_block_type( BPPIV_PATH . 'build/blocks/video' );
		register_block_type( BPPIV_PATH . 'build/blocks/video-360' );
		register_block_type( BPPIV_PATH . 'build/blocks/google-street' );
		register_block_type( BPPIV_PATH . 'build/blocks/gallery' );
		register_block_type( BPPIV_PATH . 'build/blocks/tour' );
		register_block_type( BPPIV_PATH . 'build/blocks/gutenberg-block' );
		register_block_type( BPPIV_PATH . 'build/blocks/virtual' );
		register_block_type( BPPIV_PATH . 'build/blocks/product-spot' );
	}
}
