<?php

namespace Carbon_Field_Icon\Providers;

interface Icon_Provider_Interface {
	/**
	 * Reads the data and prepares the options for usage.
	 *
	 * @access public
	 *
	 * @return array
	 */
	public function parse_options();
}
