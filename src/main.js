/**
 * External dependencies.
 */
import { first, filter, some } from 'lodash';
import cx from 'classnames';
import { withEffects, toProps } from 'refract-callbag';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';

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

		valueClass: 'hidden',
		availableOptions: []
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
			const compareTo = [ option.value, option.name ].concat( option.search_terms );
			const match = some( compareTo, ( metadata ) => metadata.indexOf( this.state.searchTerm ) !== -1 );

			return match;
		} );

		this.onIconChange( value );
		this.setState( {
			searchTerm: value,
			availableOptions
		} );
	}

	handleClick = ( e ) => {
		if ( this.popup.contains( e.target ) ) {
			return;
		}

		this.handleClickOutside();
	}

	onIconChange = ( value ) => {
		const { options } = this.props.field;

		let valueObject = first( filter( options, ( option ) => option.value === value ) );

		if ( valueObject && valueObject.value === '' ) {
			valueObject = null;
		}

		this.setState( {
			searchTerm: valueObject ? valueObject.value : '',
			valueClass: valueObject ? valueObject.class : 'hidden',
			chosenIcon: valueObject
		} );
	}

	/**
	 * Handles the change of the input.
	 *
	 * @param  {Object} option
	 * @return {void}
	 */
	handleChange = ( { value } ) => {
		const { id, onChange } = this.props;

		onChange( id, value );
	}

	openList = () => {
		this.setState( {
			isFocused: true
		} );
	}

	closeList = () => {
		this.setState( {
			isFocused: false
		} );
	}

	focusInput = ( e ) => {
		e.preventDefault();

		this.setState( {
			isFocused: true
		} );

		this.searchInput.focus();
	}

	selectOption = ( option ) => {
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

		console.log( (Date.now() % 1000) / 1000 );

		const availableOptions = searchTerm ?
			filter( options, ( option ) => {
				const compareTo = [ option.value, option.name ].concat( option.search_terms );
				const match = some( compareTo, ( metadata ) => metadata.indexOf( searchTerm ) !== -1 );

				return match;
			} ) :
			options;

		this.setState( {
			searchTerm,
			availableOptions
		} );
	}

	handleClickOutside() {
		this.closeList();
	}

	/**
	 * Renders the component.
	 *
	 * @return {Object}
	 */
	render() {
		const {
			name,
			field,
			value
		} = this.props;
		const { id } = field;
		const {
			openList,
			onSearchTermChange
		} = this;
		const {
			valueClass,
			isFocused,
			searchTerm,
			availableOptions,
			chosenIcon
		} = this.state;

		return (
			<div className="cf-icon-wrapper">
				<input
					type="hidden"
					name={ name }
					id={ id }
					value={ value }
				/>

				<div className="cf-icon-preview">
					<button onClick={ this.focusInput } className="cf-icon-preview__trigger">
						<i className={ valueClass }></i>

						<span className="cf-icon-preview__trigger-label">{ __( 'Select Icon', 'carbon-field-icon' ) }</span>
					</button>

					<input
						type="text"
						className="cf-icon-preview__label"
						value={ chosenIcon ? chosenIcon.name : '' }
						readOnly
					/>
				</div>

				<div className="cf-icon-switcher" ref={ popup => this.popup = popup }>
					<div className={ cx( {
							'carbon-icon-search': true,
							'dashicons-before': true,
							'dashicons-search': true,
							'carbon-icon-search-focus': isFocused
						} ) }
					>
						<input
							type="text"
							onFocus={ openList }
							onChange={ onSearchTermChange }
							value={ searchTerm }
							placeholder={ __( 'Search icon ...', 'carbon-field-icon' ) }
							ref={ searchInput => this.searchInput = searchInput }
						/>
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
												onClick={ () => { this.selectOption( option ) } }
												className={ cx( {
													'active': option.value === value
												} ) }
											>
												<i className={ option.class } dangerouslySetInnerHTML={ { __html: option.contents } }></i>

												<span>{ option.name }</span>
											</button>
										</li>
									);
								} ) :
								<li key="no-results" className="cf-icon-switcher__options-list__item cf-icon-switcher__options-list__item--no-results">
									{ __( 'No results found', 'carbon-field-icon' ) }
								</li>
							}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

/**
 * The function that controls the stream of side-effects.
 *
 * @param  {Object} component
 * @return {Object}
 */
function aperture( component ) {

}

/**
 * The function that causes the side effects.
 *
 * @param  {Object} props
 * @return {Function}
 */
function handler( props ) {
	return function( effect ) {
		switch ( effect.type ) {

		}
	};
}

const applyWithEffects = withEffects( aperture, { handler } );

export default compose(
	applyWithEffects
)( IconField );
