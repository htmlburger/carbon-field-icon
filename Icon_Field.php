<?php

namespace Carbon_Fields\Field;

class Icon_Field extends Predefined_Options_Field {
	private static $fontawesome_options_cache = array();

	private static $dashicons_options_cache = array();

	public $none_label = '';

	public $button_label = '';

	public $no_results_label = '';

	/**
	 * Admin initialization actions
	 */
	public function admin_init() {
		$this->none_label = __( 'None', 'carbon-field-icon' );
		$this->button_label = __( 'Select Icon', 'carbon-field-icon' );
		$this->no_results_label = __( 'No results found', 'carbon-field-icon' );
	}

	/**
	 * Hook administration scripts and styles.
	 */
	public static function admin_enqueue_scripts() {
		$dir = plugin_dir_url( __FILE__ );
		wp_enqueue_style( 'fontawesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', array(), '4.7.0' );
		wp_enqueue_style( 'carbon-field-icon', $dir . 'css/field.css' );
		wp_enqueue_script( 'carbon-field-icon', $dir . 'js/field.js', array( 'carbon-fields' ) );
	}

	public function get_default_options() {
		$options = array(
			''=>array(
				'name' => $this->none_label,
				'id' => '',
				'class'=>'fa',
				'contents'=>'&nbsp;',
				'categories' => array(),
			),
		);
		return $options;
	}

	public static function get_fontawesome_options() {
		if ( empty( static::$fontawesome_options_cache ) ) {
			$dir = plugin_dir_path( __FILE__ );
			$data = json_decode( file_get_contents( $dir . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'fontawesome.json' ), TRUE );

			foreach ( $data as $icon ) {
				static::$fontawesome_options_cache[ $icon['id'] ] = array(
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

	public function add_fontawesome_options() {
		return $this->add_options( static::get_fontawesome_options() );
	}

	public static function get_dashicons_options() {
		if ( empty( static::$dashicons_options_cache ) ) {
			$dir = plugin_dir_path( __FILE__ );
			$data = json_decode( file_get_contents( $dir . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'dashicons.json' ), TRUE );

			foreach ( $data as $icon ) {
				static::$dashicons_options_cache[ $icon['id'] ] = array(
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

	public function add_dashicons_options() {
		return $this->add_options( static::get_dashicons_options() );
	}

	/**
	 * Check if there are callbacks and populate the options
	 */
	protected function load_options() {
		if ( empty( $this->options ) ) {
			return false;
		}

		if ( is_callable( $this->options ) ) {
			$options = call_user_func( $this->options );
			if ( ! is_array( $options ) ) {
				$options = array();
			}
		} else {
			$options = $this->options;
		}

		$this->options = $options;
	}

	/**
	 * Returns an array that holds the field data, suitable for JSON representation.
	 * This data will be available in the Underscore template and the Backbone Model.
	 *
	 * @param bool $load  Should the value be loaded from the database or use the value from the current instance.
	 * @return array
	 */
	public function to_json( $load ) {
		$field_data = parent::to_json( $load );
		$this->load_options();

		$options = $this->options;
		if ( empty( $options ) ) {
			$options = static::get_fontawesome_options();
		}
		$options = $this->get_default_options() + $options;
		$options = apply_filters( 'carbon_icon_options', $options, $this->get_name() );

		foreach ( $options as $key => $value ) {
			if ( !isset( $value['name'] ) ) {
				$value['name'] = $key;
			}
			if ( !isset( $value['id'] ) ) {
				$value['id'] = $key;
			}
			if ( !isset( $value['class'] ) ) {
				$value['class'] = '';
			}
			if ( !isset( $value['contents'] ) ) {
				$value['contents'] = '';
			}
			if ( !isset( $value['categories'] ) ) {
				$value['categories'] = array();
			}
			$options[$key] = $value;
		}

		$field_data = array_merge( $field_data, array(
			'options' => $options,
		) );

		return $field_data;
	}

	/**
	 * The main Underscore template of this field.
	 */
	public function template() {
		?>
		<div class="carbon-icon-container">
			<input type="hidden" name="{{{ name }}}" value="{{{ value }}}" class="carbon-icon-value" />
			<a href="#" class="carbon-icon-preview">
				<i class="{{{ (value && typeof options[value] !== 'undefined') ? options[value].class : 'hidden' }}}"></i>
				<span class="button"><?php echo $this->button_label ?></span>
			</a>

			<div class="carbon-icon-popup">
				<div class="carbon-icon-search dashicons-before dashicons-search">
					<input type="text" value="" placeholder="<?php esc_attr_e( 'Search ...', 'carbon-field-icon' ); ?>" />
				</div>
				<div class="carbon-icon-scroll">
					<ul class="carbon-icon-list">
						<# if (options) { #>
							<# _.each(options, function(item) { #>
								<li class="carbon-icon-icon-container carbon-icon-icon-container-{{{ item.id }}}">
									<a href="#" class="carbon-icon-icon-trigger {{{ value == item.id ? 'active' : '' }}}" data-value="{{{ item.id }}}">
										<i class="{{{ item.class }}}">{{{ item.contents }}}</i>
										<span>{{{ item.name }}}</span>
									</a>
								</li>
							<# }); #>
						<# } #>
						<li class="carbon-icon-no-results"><?php echo $this->no_results_label ?></li>
					</ul>
				</div>
			</div>
		</div>
		<?php
	}
}
