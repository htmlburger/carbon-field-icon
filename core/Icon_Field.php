<?php

namespace Carbon_Field_Icon;

use Carbon_Fields\Field\Predefined_Options_Field;
use Carbon_Fields\Value_Set\Value_Set;

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
	 * Create a field from a certain type with the specified label.
	 *
	 * @access public
	 *
	 * @param string $type  Field type
	 * @param string $name  Field name
	 * @param string $label Field label
	 * @return void
	 */
	public function __construct( $type, $name, $label ) {
		$this->set_value_set( new Value_Set( Value_Set::TYPE_MULTIPLE_PROPERTIES, [
			'provider' => '',
			'icon'     => '',
		] ) );

		parent::__construct( $type, $name, $label );
	}

	/**
	 * {@inheritDoc}
	 */
	public static function field_type_activated() {
		$dir = \Carbon_Field_Icon\DIR . '/languages/';
		$domain = 'carbon-field-icon';
		$domain_ui = 'carbon-field-icon-ui';
		$locale = get_locale();
		$path = $dir . $domain . '-' . $locale . '.mo';
		$path_ui = $dir . $domain_ui . '-' . $locale . '.mo';
		load_textdomain( $domain, $path );
		load_textdomain( $domain_ui, $path_ui );
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

		$assets_suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		// Enqueue field styles
		wp_enqueue_style(
			'carbon-field-icon',
			$root_uri . '/build/bundle' . $assets_suffix . '.css',
			[],
			\Carbon_Field_Icon\VERSION
		);

		// Enqueue field scripts
		wp_enqueue_script(
			'carbon-field-icon',
			$root_uri . '/build/bundle' . $assets_suffix . '.js',
			[ 'carbon-fields-core' ],
			\Carbon_Field_Icon\VERSION
		);
	}

	/**
	 * Get option array by it's value.
	 *
	 * @access protected
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
	public function get_formatted_value() {
		$value = $this->get_value();
		$option_value = $this->get_option_by_value( $value['icon'] );

		return $option_value;
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_options() {
		$raw_options = parent::get_options();

		if ( empty( $raw_options ) ) {
			$this->add_fontawesome_options(); // By default, FontAwesome icons are used

			$raw_options = parent::get_options();
		}

		$options = [];

		foreach ( $raw_options as $key => $raw ) {
			$value = isset( $raw['value'] ) ? $raw['value'] : $key;

			$option = wp_parse_args( $raw, [
				'value'        => $value,
				'name'         => $value,
				'class'        => '',
				'search_terms' => [],
				'provider'     => 'custom',
			] );

			$options[ $value ] = $option;
		}

		return apply_filters(
			'carbon_field_icon_options',
			$options,
			$this->get_base_name()
		);
	}

	/**
	 * {@inheritDoc}
	 */
	public function set_value_from_input( $input ) {
		if ( ! isset( $input[ $this->get_name() ] ) ) {
			$this->set_value( null );
			return $this;
		}

		$value_set = [
			'provider' => '',
			'icon'     => '',
		];

		foreach ( $value_set as $key => $v ) {
			if ( isset( $input[ $this->get_name() ][ $key ] ) ) {
				$value_set[ $key ] = $input[ $this->get_name() ][ $key ];
			}
		}

		$value_set[ Value_Set::VALUE_PROPERTY ] = $value_set['icon'];

		$this->set_value( $value_set );
		return $this;
	}

	/**
	 * Adds options from the given provider.
	 *
	 * @access public
	 *
	 * @param  string $provider
	 * @return $this
	 */
	public function add_provider_options( $provider ) {
		if ( ! isset( static::$providers[ $provider ] ) ) {
			throw new \Exception( 'Trying to use non-registered icon provider - ' . $provider );
		}

		return $this->add_options( static::$providers[ $provider ]->parse_options() );
	}

	/**
	 * Add all bundled fontawesome options.
	 *
	 * @access public
	 *
	 * @return $this
	 */
	public function add_fontawesome_options() {
		return $this->add_provider_options( 'fontawesome' );
	}

	/**
	 * Add all bundled dashicon options.
	 *
	 * @access public
	 *
	 * @return $this
	 */
	public function add_dashicons_options() {
		return $this->add_provider_options( 'dashicons' );
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

		$value_set = $this->get_value();

		$field_data = array_merge( $field_data, [
			'value'   => [
				'icon'     => $value_set['icon'],
				'provider' => $value_set['provider'],
				'value'    => $value_set[ Value_Set::VALUE_PROPERTY ],
			],
			'options' => array_values( $this->get_options() ),
		] );

		return $field_data;
	}
}
