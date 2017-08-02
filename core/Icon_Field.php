<?php

namespace Carbon_Field_Icon;

use Carbon_Fields\Field\Predefined_Options_Field;

class Icon_Field extends Predefined_Options_Field {

	/**
	 * Fontawesome option cache
	 *
	 * @var array
	 */
	private static $fontawesome_options_cache = array();

	/**
	 * Dashicons option cache
	 *
	 * @var array
	 */
	private static $dashicons_options_cache = array();

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

		# Enqueue CSS
		wp_enqueue_style( 'fontawesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', array(), '4.7.0' );
		wp_enqueue_style( 'carbon-field-icon', $root_uri . '/assets/css/field.css', array(), \Carbon_Field_Icon\VERSION );

		# Enqueue JS
		wp_enqueue_script( 'carbon-field-icon', $root_uri . '/assets/js/bundle.js', array( 'carbon-fields-boot' ), \Carbon_Field_Icon\VERSION );

		wp_localize_script( 'carbon-field-icon', 'carbonFieldIconL10n', apply_filters( 'carbon_field_icon_l10n', array(
			'selectIcon' => __( 'Select Icon', 'carbon-field-icon' ),
			'search' => __( 'Search ...', 'carbon-field-icon' ),
			'noResults' => __( 'No results found', 'carbon-field-icon' ),
		) ) );
	}

	/**
	 * Get an array of default options
	 *
	 * @return array
	 */
	protected function get_default_option() {
		$options = array(
			'value' => '',
			'name' => __( 'None', 'carbon-field-icon' ),
			'class'=>'fa',
			'contents'=>'&nbsp;',
			'categories' => array(),
		);
		return $options;
	}

	/**
	 * {@inheritDoc}
	 */
	public function get_options() {
		$default_option = $this->get_default_option();
		$raw_options = parent::get_options();
		if ( empty( $raw_options ) ) {
			$raw_options = static::get_fontawesome_options();
		}
		$raw_options = array_merge( array( $default_option['value'] => $default_option ), $raw_options );

		$options = array();
		foreach ( $raw_options as $key => $raw ) {
			$value = isset( $raw['value'] ) ? $raw['value'] : $key;
			$option = array(
				'value' => $value,
				'name' => isset( $raw['name'] ) ? $raw['name'] : $value,
				'class' => isset( $raw['class'] ) ? $raw['class'] : '',
				'contents' => isset( $raw['contents'] ) ? $raw['contents'] : '',
				'categories' => isset( $raw['categories'] ) ? $raw['categories'] : array(),
			);
			$options[ $value ] = $option;
		}
		$options = apply_filters( 'carbon_field_icon_options', $options, $this->get_base_name() );
		return $options;
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
		$value = $this->get_value();
		$formatted_value = $this->get_option_by_value( $value );
		if ( $formatted_value === null ) {
			$formatted_value = $value;
		}
		return $formatted_value;
	}

	/**
	 * {@inheritDoc}
	 */
	public function to_json( $load ) {
		$field_data = parent::to_json( $load );

		$field_data = array_merge( $field_data, array(
			'value' => $this->get_value(),
			'options' => array_values( $this->get_options() ),
		) );

		return $field_data;
	}

	/**
	 * Get array of fontawesome options
	 *
	 * @return array
	 */
	public static function get_fontawesome_options() {
		if ( empty( static::$fontawesome_options_cache ) ) {
			$data = json_decode( file_get_contents( \Carbon_Field_Icon\DIR . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'fontawesome.json' ), TRUE );

			foreach ( $data as $icon ) {
				$value = $icon['id'];
				static::$fontawesome_options_cache[ $value ] = array(
					'value' => $value,
					'name' => $icon['name'],
					'class' => 'fa fa-' . $icon['id'],
					'contents' => '',
					'categories' => $icon['categories'],
				);
			}
		}
		return static::$fontawesome_options_cache;
	}

	/**
	 * Add all bundled fontawesome options
	 */
	public function add_fontawesome_options() {
		return $this->add_options( static::get_fontawesome_options() );
	}

	/**
	 * Get array of dashicon options
	 *
	 * @return array
	 */
	public static function get_dashicons_options() {
		if ( empty( static::$dashicons_options_cache ) ) {
			$data = json_decode( file_get_contents( \Carbon_Field_Icon\DIR . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'dashicons.json' ), TRUE );

			foreach ( $data as $icon ) {
				$value = $icon['id'];
				static::$dashicons_options_cache[ $value ] = array(
					'value' => $value,
					'name' => $icon['name'],
					'class' => 'dashicons-before ' . $icon['id'],
					'contents' => '',
					'categories' => $icon['categories'],
				);
			}
		}
		return static::$dashicons_options_cache;
	}

	/**
	 * Add all bundled dashicon options
	 */
	public function add_dashicons_options() {
		return $this->add_options( static::get_dashicons_options() );
	}
}
