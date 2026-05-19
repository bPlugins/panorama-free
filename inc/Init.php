<?php
 
 namespace BPPIV;
 
 if (!defined('ABSPATH')) {
     exit;
 } 
 
 class Init{
     private static $instance = null;
     private function __construct() {
         add_action('woocommerce_after_register_post_type', [$this, 'load_woocommerce_files']);
     }
 
     public static function instance() {
 		if ( is_null( self::$instance ) ) {
 			self::$instance = new self();
 			self::$instance->init();
 		}
 		return self::$instance;
 	}
 
     public static function get_services(){
         return [
             Base\registerPostType::class,
             Woocommerce\ProductView::class,
             Base\EnqueueAssets::class,
         ];
     }
 
     public static function get_woocommerce_services(){
         return [
             Woocommerce\ProductMeta::class,
         ];
     }
 
     public static function init(){
         foreach(self::get_services() as $class){
             if($class = self::require_file($class)){
                 $services = self::instantiate($class);
                 if(method_exists($services, 'register')){
                     $services->register();
                 }
             }
         }
     }
 
     public function load_woocommerce_files(){
         foreach(self::get_woocommerce_services() as $class){
             if($class = self::require_file($class)){
                 $services = self::instantiate($class);
                 if(method_exists($services, 'register')){
                     $services->register();
                 }
             }
         }
     }
 
    public static function require_file($class){
        $file = str_replace('\\', '/', $class);
        $file = BPPIV_PATH.str_replace('BPPIV', 'inc', $file).'.php';
        if(file_exists($file)){
            require_once($file);
            return $class;
        }
        return false;
    }
 
     private static function instantiate($class){
         if(class_exists($class)){
             return new $class();
         }
 
         return new \stdClass();
     }
 }