/**
 * The external dependencies.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withProps, setStatic } from 'recompose';
import { filter } from 'lodash';
import cx from 'classnames';

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
				<a onClick={this.focusInput.bind(this)} href="#" className="carbon-icon-preview">
					<i className={valueClass}></i>
					<span className="button">{carbonFieldIconL10n.selectIcon}</span>
				</a>

				<div className="carbon-icon-popup">
					<div className={cx({
							'carbon-icon-search': true,
							'dashicons-before': true,
							'dashicons-search': true,
							'carbon-icon-search-focus': this.state.searchFocused,
						})} >
						<input
							onFocus={this.openList.bind(this)}
							onBlur={this.closeList.bind(this)}
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

	openList(e) {
		this.setState({
			searchFocused: true,
		});
	}

	closeList(e) {
		/*this.setState({
			searchFocused: false,
		});*/
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

		// TODO filter options according to searchQuery
		let options = filter( rawOptions, o => true );

		options = options.map((item, index) => {
			return <li key={item.value} className={'carbon-icon-icon-container carbon-icon-icon-container-' + item.value}>
				<a
					onClick={handleChange.bind(null, item)}
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
		handleChange: ({ field, setFieldValue }) => ({ value }, e) => {
			e.preventDefault();
			setFieldValue(field.id, value);
		},
	}),

	withProps(({ field: { value, options } }) => ({
		valueClass: (value && typeof options[value] !== 'undefined') ? options[value].class : 'hidden',
		searchPlaceholder: (value && typeof options[value] !== 'undefined') ? options[value].name : carbonFieldIconL10n.search,
	}))
);

export default setStatic('type', [
	'icon',
])(enhance(IconField));

