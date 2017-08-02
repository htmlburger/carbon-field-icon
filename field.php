<?php
use Carbon_Fields\Carbon_Fields;
use Carbon_Field_Icon\Icon_Field;

define( 'Carbon_Field_Icon\\VERSION', '2.0.0' );
define( 'Carbon_Field_Icon\\DIR', __DIR__ );

Carbon_Fields::extend( Icon_Field::class, function( $container ) {
	return new Icon_Field( $container['arguments']['type'], $container['arguments']['name'], $container['arguments']['label'] );
} );