/**
 * The external dependencies.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withProps, setStatic } from 'recompose';
import { first, filter, some } from 'lodash';
import cx from 'classnames';
import onClickOutside from 'react-onclickoutside';

/**
 * The internal dependencies.
 */
import Field from 'fields/components/field';
import withStore from 'fields/decorators/with-store';
import withSetup from 'fields/decorators/with-setup';

class IconField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchFocused: false,
			searchQuery: '',
		};
	}

	render() {
		const {
			name,
			field,
			valueClass,
			valueContents,
			searchPlaceholder,
			handleChange,
		} = this.props;

		return <Field field={field}>
			<div className="carbon-icon-container">
				<input
					type="hidden"
					name={name}
					id={field.id}
					value={field.value}
					className="carbon-icon-value"
					/>
				<span className="carbon-icon-preview">
					<a onClick={this.focusInput.bind(this)} href="#">
						<i className={valueClass} dangerouslySetInnerHTML={{__html: valueContents}}></i>
						<span className="button">{carbonFieldIconL10n.selectIcon}</span>
					</a>
					<input
						type="text"
						className="carbon-icon-icon-name"
						value={field.value}
						readOnly />
				</span>

				<div className="carbon-icon-popup">
					<div className={cx({
							'carbon-icon-search': true,
							'dashicons-before': true,
							'dashicons-search': true,
							'carbon-icon-search-focus': this.state.searchFocused,
						})} >
						<input
							onFocus={this.openList.bind(this)}
							onChange={this.updateSearchQuery.bind(this)}
							type="text"
							value={this.state.searchQuery}
							placeholder={searchPlaceholder}
							ref={searchInput => this.searchInput = searchInput}
							/>
					</div>
					<div className="carbon-icon-scroll">
						<ul className="carbon-icon-list">
							{this.filterOptions(field.options, field.value)}
						</ul>
					</div>
				</div>
			</div>
		</Field>;
	}

	focusInput(e) {
		e.preventDefault();
		this.searchInput.focus();
	}

	selectOption(option, e) {
		e.preventDefault();
		this.props.handleChange(option);
		this.closeList();
	}

	openList() {
		this.setState({
			searchFocused: true,
		});
	}

	closeList() {
		this.setState({
			searchFocused: false,
		});
	}

	updateSearchQuery(e) {
		this.setState({
			searchQuery: e.target.value,
		});
	}

	filterOptions(rawOptions, value) {
		const {
			handleChange,
		} = this.props;

		let options = filter( rawOptions, option => {
			const compareTo = [option.value, option.name].concat(option.search_terms);
			const match = some( compareTo, metadata => metadata.indexOf( this.state.searchQuery ) !== -1 );
			return match;
		} );

		options = options.map((item, index) => {
			return <li key={item.value} className={'carbon-icon-icon-container carbon-icon-icon-container-' + item.value}>
				<a
					onClick={this.selectOption.bind(this, item)}
					href="#"
					className={cx({
						'active': item.value === value,
					})} >
					<i className={ item.class } dangerouslySetInnerHTML={{__html: item.contents}}
						></i>
					<span>{ item.name }</span>
				</a>
			</li>;
		});

		if (options.length === 0) {
			options.push(<li key="no-results" className="carbon-icon-no-results">{carbonFieldIconL10n.noResults}</li>);
		}

		return options;
	}

	handleClickOutside() {
		this.closeList();
	}
}

/**
 * Validate the props.
 *
 * @type {Object}
 */
IconField.propTypes = {
	name: PropTypes.string,
	field: PropTypes.shape({
		id: PropTypes.string,
		value: PropTypes.string,
		options: PropTypes.array,
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.string,
			name: PropTypes.string,
			class: PropTypes.string,
			contents: PropTypes.string,
			categories: PropTypes.arrayOf(PropTypes.string),
		})),
	}),
	handleChange: PropTypes.func,
};

/**
 * The enhancer.
 *
 * @type {Function}
 */
export const enhance = compose(
	/**
	 * Connect to the Redux store.
	 */
	withStore(),

	/**
	 * Attach the setup hooks.
	 */
	withSetup(),

	/**
	 * The handlers passed to the component.
	 */
	withHandlers({
		handleChange: ({ field, setFieldValue }) => ({ value }) => setFieldValue(field.id, value),
	}),

	withProps(({ field: { value, options } }) => {
		let valueObject = first( filter( options, option => option.value === value ) );
		if ( valueObject && valueObject.value === '' ) {
			valueObject = null;
		}
		return {
			valueClass: valueObject ? valueObject.class : 'hidden',
			valueContents: valueObject ? valueObject.contents : '',
			searchPlaceholder: valueObject ? valueObject.name : carbonFieldIconL10n.search,
		};
	}),

	onClickOutside
);

export default setStatic('type', [
	'icon',
])(enhance(IconField));

