<?php

namespace Carbon_Field_Icon;

use Carbon_Fields\Field\Predefined_Options_Field;

class Icon_Field extends Predefined_Options_Field {
	/**
	 * Registered providers.
	 *
	 * @static
	 * @access public
	 *
	 * @var array
	 */
	public static $providers = [];

	/**
	 * {@inheritDoc}
	 */
	public static function field_type_activated() {
		$dir = \Carbon_Field_Icon\DIR . '/languages/';
		$locale = get_locale();
		$path = $dir . $locale . '.mo';
		load_textdomain( 'carbon-field-icon', $path );
	}

	/**
	 * {@inheritDoc}
	 */
	public static function admin_enqueue_scripts() {
		$root_uri = \Carbon_Fields\Carbon_Fields::directory_to_url( \Carbon_Field_Icon\DIR );

		foreach ( static::$providers as $provider_name => $provider ) {
			if ( method_exists( $provider, 'enqueue_assets' ) ) {
				$provider->enqueue_assets();
			}
		}

		// Enqueue field styles
		wp_enqueue_style(
			'carbon-field-icon',
			$root_uri . '/build/bundle.css',
			[],
			\Carbon_Field_Icon\VERSION
		);

		// Enqueue field scripts
		wp_enqueue_script(
			'carbon-field-icon',
			$root_uri . '/build/bundle.js',
			[ 'carbon-fields-core' ],
			\Carbon_Field_Icon\VERSION
		);
	}

	/**
	 * Get an array of default options
	 *
	 * @return array
	 */
	protected function get_default_option() {
		return array(
			'value'        => '',
			'name'         => __( 'None', 'carbon-field-icon' ),
			'class'        => 'fa',
			'search_terms' => [],
		);
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_options() {
		$default_option = $this->get_default_option();
		$raw_options = parent::get_options();

		if ( empty( $raw_options ) ) {
			$this->add_provider( 'fontawesome' ); // By default, FontAwesome icons are used
		}

		$raw_options = array_merge( [
			$default_option['value'] => $default_option,
		], $raw_options );

		$options = [];

		foreach ( $raw_options as $key => $raw ) {
			$value = isset( $raw['value'] ) ? $raw['value'] : $key;
			$option = [
				'value'        => $value,
				'name'         => isset( $raw['name'] ) ? $raw['name'] : $value,
				'class'        => isset( $raw['class'] ) ? $raw['class'] : '',
				'search_terms' => isset( $raw['search_terms'] ) ? $raw['search_terms'] : [],
			];

			$options[ $value ] = $option;
		}

		return apply_filters(
			'carbon_field_icon_options',
			$options,
			$this->get_base_name()
		);
	}

	/**
	 * Get option array by it's value.
	 *
	 * @param  string       $value
	 * @return array|null
	 */
	protected function get_option_by_value( $value ) {
		$options = $this->get_options();

		foreach ( $options as $option ) {
			if ( $option['value'] === $value ) {
				return $option;
			}
		}

		return null;
	}

	/**
	 * {@inheritDoc}
	 */
	public function set_value( $value ) {
		if ( is_array( $value ) && isset( $value['value'] ) ) {
			$value = $value['value'];
		}

		return parent::set_value( $value );
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_formatted_value() {
		$value           = $this->get_value();
		$formatted_value = $this->get_option_by_value( $value );

		if ( $formatted_value === null ) {
			$formatted_value = $value;
		}

		return $formatted_value;
	}

	/**
	 * Add all bundled fontawesome options
	 */
	public function add_fontawesome_options() {
		return $this->add_options( static::$providers['fontawesome']->parse_options() );
	}

	/**
	 * Add all bundled dashicon options.
	 *
	 * @access public
	 *
	 * @return $this
	 */
	public function add_dashicons_options() {
		return $this->add_options( static::$providers['dashicons']->parse_options() );
	}

	/**
	 * Adds a new provider.
	 *
	 * @static
	 * @access public
	 *
	 * @param  array|string $providers
	 * @return void
	 */
	public static function add_provider( $providers ) {
		if ( ! is_array( $providers ) ) {
			$providers = [ $providers ];
		}

		foreach ( $providers as $provider_name ) {
			$provider = \Carbon_Fields\Carbon_Fields::resolve( $provider_name, 'icon_field_providers' );

			static::$providers[ $provider_name ] = $provider;
		}
	}

	/**
	 * {@inheritDoc}
	 */
	public function to_json( $load ) {
		$field_data = parent::to_json( $load );

		$field_data = array_merge( $field_data, [
			'value' => $this->get_value(),
			'options' => array_values( $this->get_options() ),
		] );

		return $field_data;
	}
}
