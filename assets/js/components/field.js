/**
 * The external dependencies.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, setStatic } from 'recompose';

/**
 * The internal dependencies.
 */
import Field from 'fields/components/field';
import withStore from 'fields/decorators/with-store';
import withSetup from 'fields/decorators/with-setup';

/**
 * Render a number input field.
 *
 * @param  {Object}        props
 * @param  {String}        props.name
 * @param  {Object}        props.field
 * @param  {Function}      props.handleChange
 * @return {React.Element}
 */
export const IconField = ({
	name,
	field,
	handleChange
}) => {
	return <Field field={field}>
		<select
			id={field.id}
			name={name}
			onChange={handleChange}
			disabled={!field.ui.is_visible}
			value={field.value} >

			{
				field.options.map(({ name, id }, index) => {
					return <option key={index} value={id}>
						{name}
					</option>;
				})
			}
		</select>
	</Field>;
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
		handleChange: ({ field, setFieldValue }) => ({ target: value }) => {console.log(value);setFieldValue(field.id, value)},
	})
);

export default setStatic('type', [
	'icon',
])(enhance(IconField));

