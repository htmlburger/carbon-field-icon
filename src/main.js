/**
 * External dependencies.
 */
import { first, filter, some } from 'lodash';
import cx from 'classnames';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

class IconField extends Component {
	/**
	 * Local state.
	 *
	 * @type {Object}
	 */
	state = {
		isFocused: false,
		searchTerm: '',
		chosenIcon: null,

		iconClass: '',
		availableOptions: [],
	}

	/**
	 * Lifecycle hook.
	 *
	 * @return {void}
	 */
	componentWillMount() {
		document.addEventListener( 'mousedown', this.handleClick, false );
	}

	/**
	 * Lifecycle hook.
	 *
	 * @return {void}
	 */
	componentWillUnmount() {
		document.removeEventListener( 'mousedown', this.handleClick, false );
	}

	/**
	 * Lifecycle hook.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		const { field, value } = this.props;
		const { options } = field;

		const availableOptions = filter( options, ( option ) => {
			const compareTo = [ option.value, option.name ]
				.concat( option.search_terms )
				.map( ( searchTerm ) => searchTerm.toLowerCase() );

			const match = some( compareTo, ( metadata ) => metadata.indexOf( this.state.searchTerm.toLowerCase() ) !== -1 );

			return match;
		} );

		this.onIconChange( value.value );
		this.setState( {
			searchTerm: value ? value.icon : '',
			availableOptions
		} );
	}

	/**
	 * Handles document click.
	 *
	 * @param  {Event} e
	 * @return {void}
	 */
	handleClick = ( e ) => {
		if ( this.popup.contains( e.target ) ) {
			return;
		}

		this.closeList();
	}

	/**
	 * Handles the change of the input.
	 *
	 * @param  {Object} option
	 * @return {void}
	 */
	handleChange = ( { provider, value } ) => {
		const { id, onChange } = this.props;

		onChange( id, {
			value: value,
			provider: provider,
			icon: value,
		} );
	}

	/**
	 * Handles the clear button click.
	 *
	 * @param {Event} e
	 * @return {void}
	 */
	handleButtonClearClick = ( e ) => {
		const { id, onChange } = this.props;

		this.setState( {
			searchTerm: '',
			iconClass: '',
			chosenIcon: null,
		} );

		onChange( id, {
			value: '',
			icon: '',
			provider: '',
		} );
	}

	/**
	 * Handles change of the selected icon.
	 *
	 * @param  {String} value
	 * @return {void}
	 */
	onIconChange = ( value ) => {
		const { options } = this.props.field;

		let valueObject = first( filter( options, ( option ) => option.value === value ) );

		if ( valueObject && valueObject.value === '' ) {
			valueObject = null;
		}

		this.setState( {
			searchTerm: valueObject ? valueObject.value : '',
			iconClass: valueObject ? valueObject.class : '',
			chosenIcon: valueObject
		} );
	}

	/**
	 * Handles list open event.
	 *
	 * @return {void}
	 */
	openList = () => {
		this.setState( {
			isFocused: true
		} );
	}

	/**
	 * Handles list close event.
	 *
	 * @return {void}
	 */
	closeList = () => {
		this.setState( {
			isFocused: false
		} );
	}

	/**
	 * Handles input focus event.
	 *
	 * @param  {Event} e
	 * @return {void}
	 */
	onFocusInput = ( e ) => {
		e.preventDefault();

		this.setState( {
			isFocused: true
		} );

		this.searchInput.focus();
	}

	/**
	 * Handles option select.
	 *
	 * @param  {Object} option
	 * @return {void}
	 */
	onOptionSelect = ( option ) => {
		this.handleChange( option );
		this.onIconChange( option.value );

		this.closeList();
	}

	/**
	 * Handle search term change.
	 *
	 * @param  {event} e
	 * @return {void}
	 */
	onSearchTermChange = ( e ) =>  {
		const { field } = this.props;
		const { options } = field;
		const searchTerm = e.target.value;

		const availableOptions = searchTerm ?
			filter( options, ( option ) => {
				const compareTo = [ option.value, option.name ]
						.concat( option.search_terms )
						.map( ( searchTerm ) => searchTerm.toLowerCase() );
				const match = some( compareTo, ( metadata ) => metadata.indexOf( searchTerm.toLowerCase() ) !== -1 );

				return match;
			} ) :
			options;

		this.setState( {
			searchTerm,
			availableOptions
		} );
	}

	/**
	 * Renders the component.
	 *
	 * @return {Object}
	 */
	render() {
		const {
			name,
			value
		} = this.props;
		const {
			openList,
			onSearchTermChange
		} = this;
		const {
			iconClass,
			isFocused,
			searchTerm,
			availableOptions,
			chosenIcon
		} = this.state;

		let iconPreview;

		if ( chosenIcon && chosenIcon.icon ) {
			iconPreview = <img src={ chosenIcon.icon } />;
		} else {
			iconPreview = <i className={ iconClass } />;
		}

		return (
			<div className="cf-icon-wrapper">
				<input
					type="hidden"
					name={ `${ name }[provider]` }
					value={ value.provider }
					readOnly
				/>

				<input
					type="hidden"
					name={ `${ name }[icon]` }
					value={ value.icon }
					readOnly
				/>

				<div className="cf-icon-preview">
					<div className="cf-icon-preview__canvas">
						{
							chosenIcon
							? iconPreview
							: <span className="cf-icon-preview__canvas-label">{ __( 'No icon selected', 'carbon-field-icon-ui' ) }</span>
						}
					</div>

					<input
						type="text"
						className="cf-icon-preview__label"
						value={ chosenIcon ? chosenIcon.name : '' }
						readOnly
					/>
				</div>

				<div className="cf-icon-switcher" ref={ popup => this.popup = popup }>
					<div className={ cx( {
							'cf-icon-search': true,
							'cf-icon-search--focused': isFocused,
							'dashicons-before': true,
							'dashicons-search': true,
						} ) }
					>
						<input
							type="text"
							onFocus={ openList }
							onChange={ onSearchTermChange }
							value={ searchTerm }
							className="cf-icon-search__input"
							placeholder={ __( 'Search icon ...', 'carbon-field-icon-ui' ) }
							ref={ searchInput => this.searchInput = searchInput }
						/>

						<button type="button" className="cf-icon-search__clear button button-small" onClick={ this.handleButtonClearClick }>
							{ __( 'Clear', 'carbon-field-icon-ui' ) }
						</button>
					</div>

					<div className={ cx( {
							'cf-icon-switcher__options': true,
							'cf-icon-switcher__options--opened': isFocused
						} ) }
						>
						<ul className="cf-icon-switcher__options-list">
							{
								availableOptions.length ?
								availableOptions.map( ( option ) => {
									return (
										<li key={ option.value } className={ `cf-icon-switcher__options-list__item cf-icon-switcher__options-list__item--${ option.value }` }>
											<button
												type="button"
												onClick={ () => { this.onOptionSelect( option ) } }
												className={ cx( {
													'active': option.value === value
												} ) }
											>
												{
													option.icon ?
														<img src={ option.icon } className={ option.class } /> :
														<i className={ option.class } dangerouslySetInnerHTML={ { __html: option.contents } }></i>
												}

												<span>{ option.name }</span>
											</button>
										</li>
									);
								} ) :
								<li key="no-results" className="cf-icon-switcher__options-list__item cf-icon-switcher__options-list__item--no-results">
									{ __( 'No results found', 'carbon-field-icon-ui' ) }
								</li>
							}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default IconField;
