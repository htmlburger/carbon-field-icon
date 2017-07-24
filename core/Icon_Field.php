<?php

namespace Carbon_Field_Icon;

use Carbon_Fields\Field\Predefined_Options_Field;

class Icon_Field extends Predefined_Options_Field {

	private static $fontawesome_options_cache = array();

	private static $dashicons_options_cache = array();

	public $none_label = '';

	public $button_label = '';

	public $no_results_label = '';

	public $search_label = '';

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
	public function admin_init() {
		$this->none_label = __( 'None', 'carbon-field-icon' );
		$this->button_label = __( 'Select Icon', 'carbon-field-icon' );
		$this->search_label = __( 'Search ...', 'carbon-field-icon' );
		$this->no_results_label = __( 'No results found', 'carbon-field-icon' );
	}

	/**
	 * {@inheritDoc}
	 */
	public static function admin_enqueue_scripts() {
		$root_uri = \Carbon_Fields\Carbon_Fields::directory_to_url( \Carbon_Field_Icon\DIR );

		# Enqueue JS
		wp_enqueue_script( 'carbon-field-icon', $root_uri . '/assets/js/bundle.js', array( 'carbon-fields-boot' ) );

		# Enqueue CSS
		wp_enqueue_style( 'fontawesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', array(), '4.7.0' );
		wp_enqueue_style( 'carbon-field-icon', $root_uri . '/assets/css/field.css' );
	}

	/**
	 * Get an array of default options
	 *
	 * @return array
	 */
	protected function get_default_options() {
		$options = array(
			array(
				'name' => $this->none_label,
				'id' => '',
				'class'=>'fa',
				'contents'=>'&nbsp;',
				'categories' => array(),
			),
		);
		return $options;
	}

	/**
	 * {@inheritDoc}
	 */
	public function to_json( $load ) {
		$field_data = parent::to_json( $load );
		$this->load_options();

		$options = $this->options;
		if ( empty( $options ) ) {
			$options = static::get_fontawesome_options();
		}
		$options = $this->get_default_options() + $options;
		$options = apply_filters( 'carbon_field_icon_options', $options, $this->get_base_name() );

		foreach ( $options as $key => $value ) {
			if ( ! isset( $value['name'] ) ) {
				$value['name'] = $key;
			}
			if ( ! isset( $value['id'] ) ) {
				$value['id'] = $key;
			}
			if ( ! isset( $value['class'] ) ) {
				$value['class'] = '';
			}
			if ( ! isset( $value['contents'] ) ) {
				$value['contents'] = '';
			}
			if ( ! isset( $value['categories'] ) ) {
				$value['categories'] = array();
			}
			$options[ $key ] = $value;
		}

		$field_data = array_merge( $field_data, array(
			'options' => $options,
			'search_label' => $this->search_label,
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
				static::$fontawesome_options_cache[] = array(
					'name'=>$icon['name'],
					'id'=>$icon['id'],
					'class'=>'fa fa-' . $icon['id'],
					'contents'=>'',
					'categories'=>$icon['categories'],
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
				static::$dashicons_options_cache[] = array(
					'name'=>$icon['name'],
					'id'=>$icon['id'],
					'class'=>'dashicons-before ' . $icon['id'],
					'contents'=>'',
					'categories'=>$icon['categories'],
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
