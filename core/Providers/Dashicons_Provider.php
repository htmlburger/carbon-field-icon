<?php

namespace Carbon_Field_Icon\Providers;

class Dashicons_Provider implements Icon_Provider_Interface {
	const REVISION = '5d77d5d'; // Github Revision -- https://github.com/WordPress/dashicons

	/**
	 * Get the provider options.
	 *
	 * @access public
	 *
	 * @return array
	 */
	public function parse_options() {
		$options = [];

		$icons = json_decode( file_get_contents( \Carbon_Field_Icon\DIR . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'dashicons.json' ), true );

		foreach ( $icons as $icon ) {
			$value = $icon['id'];

			$options[ $value ] = array(
				'value'        => $value,
				'name'         => $icon['name'],
				'class'        => 'dashicons-before ' . $icon['id'],
				'search_terms' => [],
				'provider'     => 'dashicons',
			);
		}

		return $options;
	}
}
