<?php
/**
 * Set text domain
 * @see https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
 */
load_plugin_textdomain( 'carbon-field-icon', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' ); 

/**
 * Add dir and url constants depending on loading method
 * @see https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
 */
if ( !defined( 'CARBON_FIELD_ICON_DIR' ) ) {
	define( 'CARBON_FIELD_ICON_DIR', dirname( __FILE__ ) );
}
if ( !defined( 'CARBON_FIELD_ICON_URL' ) ) {
	$theme_path = wp_normalize_path( get_template_directory() );
	$current_path = wp_normalize_path( dirname( __FILE__ ) );
	$relative_path = str_replace( $theme_path, '', $current_path );
	define( 'CARBON_FIELD_ICON_URL', get_template_directory_uri() . $relative_path . '/' );
}

/**
 * Hook field initialization
 */
add_action( 'after_setup_theme', 'crb_init_carbon_field_icon', 15 );
function crb_init_carbon_field_icon() {
	if ( class_exists( 'Carbon_Fields\\Field\\Field' ) ) {
		include_once dirname(__FILE__) . '/Icon_Field.php';
	}
}
