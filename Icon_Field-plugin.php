<?php
/*
Plugin Name: Carbon Field: Icon
Description: Extends the base Carbon Fields with an Icon field. 
Version: 1.0.0
*/

/**
 * Set text domain
 * @see https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
 */
load_plugin_textdomain( 'carbon-field-icon', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' ); 

/**
 * Hook field initialization
 */
add_action( 'after_setup_theme', 'crb_init_carbon_field_icon', 15 );
function crb_init_carbon_field_icon() {
	if ( class_exists( 'Carbon_Fields\\Field\\Field' ) ) {
		include_once dirname(__FILE__) . '/Icon_Field.php';
	}
}
