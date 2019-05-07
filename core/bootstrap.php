<?php

use Carbon_Fields\Carbon_Fields;
use Carbon_Fields\Pimple\Container as PimpleContainer;
use Carbon_Field_Icon\Icon_Field;
use Carbon_Field_Icon\Providers\Dashicons_Provider;
use Carbon_Field_Icon\Providers\Font_Awesome_Provider;

define( 'Carbon_Field_Icon\\VERSION', '3.0.0' );
define( 'Carbon_Field_Icon\\DIR', dirname( __DIR__ ) );

Carbon_Fields::extend( Icon_Field::class, function( $container ) {
	return new Icon_Field( $container['arguments']['type'], $container['arguments']['name'], $container['arguments']['label'] );
} );

Carbon_Fields::instance()->ioc['icon_field_providers'] = function () {
	return new PimpleContainer();
};

Carbon_Fields::instance()->ioc['icon_field_providers']['dashicons'] = function( $container ) {
	return new Dashicons_Provider();
};

Carbon_Fields::instance()->ioc['icon_field_providers']['fontawesome'] = function( $container ) {
	return new Font_Awesome_Provider();
};

Icon_Field::add_provider( [ 'fontawesome', 'dashicons' ] );

do_action( 'carbon_fields_icon_field_loaded' );
