/**
 * External dependencies.
 */
import { Component } from '@wordpress/element';
import { first, filter, some } from 'lodash';
import cx from 'classnames';
import onClickOutside from 'react-onclickoutside';
import { __ } from '@wordpress/i18n';

class IconField extends Component {
	/**
	 * Local state.
	 *
	 * @type {Object}
	 */
	state = {
		searchFocused: false,
		searchQuery: '',
		valueClass: 'hidden',
		valueContents: '',
		searchPlaceholder: ''
	}

	/**
	 * Lifecycle hook.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		const { value } = this.props;

		this.onIconChange( value );
		this.setState( {
			searchQuery: value
		} );
	}

	onIconChange = ( value ) => {
		const { options } = this.props.field;

		let valueObject = first( filter( options, ( option ) => option.value === value ) );

		if ( valueObject && valueObject.value === '' ) {
			valueObject = null;
		}

		this.setState( {
			valueClass: valueObject ? valueObject.class : 'hidden',
			valueContents: valueObject ? valueObject.contents : '',
			searchPlaceholder: valueObject ? valueObject.name : __( 'Search ...', 'carbon-field-icon' )
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
			searchFocused: true
		} );
	}

	closeList = () => {
		this.setState( {
			searchFocused: false
		} );
	}

	focusInput( e ) {
		e.preventDefault();

		this.searchInput.focus();
	}

	selectOption = ( option ) => {
		this.handleChange( option );
		this.onIconChange( option.value );
		this.closeList();
	}

	updateSearchQuery = ( e ) =>  {
		this.setState( {
			searchQuery: e.target.value
		} );
	}

	filterOptions( rawOptions, value ) {
		const { selectOption } = this;

		let options = filter( rawOptions, ( option ) => {
			const compareTo = [ option.value, option.name ].concat( option.search_terms );
			const match = some( compareTo, ( metadata ) => metadata.indexOf( this.state.searchQuery ) !== -1 );

			return match;
		} );

		options = options.map( ( item, index ) => {
			return (
				<li key={ item.value } className={ `carbon-icon-icon-container carbon-icon-icon-container-${ item.value }` }>
					<button
						type="button"
						onClick={ () => { selectOption( item ) } }
						className={ cx( {
							'active': item.value === value
						} ) }
					>
						<i className={ item.class } dangerouslySetInnerHTML={ { __html: item.contents } }></i>

						<span>{ item.name }</span>
					</button>
				</li>
			);
		});

		if ( options.length === 0 ) {
			options.push(<li key="no-results" className="carbon-icon-no-results">{ __( 'No results found', 'carbon-fields-icon' ) }</li>);
		}

		return options;
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
			valueContents,
			searchPlaceholder,
			value
		} = this.props;
		const { id } = field;
		const {
			openList,
			updateSearchQuery
		} = this;
		const {
			valueClass,
			searchQuery
		} = this.state;

		return (
			<div className="carbon-icon-container">
				<input
					type="hidden"
					name={ name }
					id={ id }
					value={ value }
					className="carbon-icon-value"
				/>

				<span className="carbon-icon-preview">
					<a onClick={ this.focusInput.bind( this ) } href="#">
						<i className={ valueClass } dangerouslySetInnerHTML={ { __html: valueContents } }></i>

						<span className="button">{ __( 'Select Icon', 'carbon-fields-icon' ) }</span>
					</a>

					<input
						type="text"
						className="carbon-icon-icon-name"
						value={ value }
						readOnly
					/>
				</span>

				<div className="carbon-icon-popup">
					<div className={ cx( {
							'carbon-icon-search': true,
							'dashicons-before': true,
							'dashicons-search': true,
							'carbon-icon-search-focus': this.state.searchFocused
						} ) }
					>
						<input
							type="text"
							onFocus={ openList }
							onChange={ updateSearchQuery }
							value={ searchQuery }
							placeholder={ searchPlaceholder }
							ref={ searchInput => this.searchInput = searchInput }
						/>
					</div>

					<div className="carbon-icon-scroll">
						<ul className="carbon-icon-list">
							{ this.filterOptions( field.options, value ) }
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default IconField;
