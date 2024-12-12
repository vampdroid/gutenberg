/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import type { Field } from '../../types';
import type { SetSelection } from '../../private-types';

interface DataViewsSelectionCheckboxProps< Item > {
	selection: string[];
	onChangeSelection: SetSelection;
	item: Item;
	getItemId: ( item: Item ) => string;
	titleField?: Field< Item >;
	disabled: boolean;
}

export default function DataViewsSelectionCheckbox< Item >( {
	selection,
	onChangeSelection,
	item,
	getItemId,
	titleField,
	disabled,
}: DataViewsSelectionCheckboxProps< Item > ) {
	const id = getItemId( item );
	const checked = ! disabled && selection.includes( id );
	let selectionLabel;
	if ( titleField?.getValue && item ) {
		// eslint-disable-next-line @wordpress/valid-sprintf
		selectionLabel = sprintf(
			checked
				? /* translators: %s: item title. */ __( 'Deselect item: %s' )
				: /* translators: %s: item title. */ __( 'Select item: %s' ),
			titleField.getValue( { item } )
		);
	} else {
		selectionLabel = checked
			? __( 'Select a new item' )
			: __( 'Deselect item' );
	}
	return (
		<CheckboxControl
			className="dataviews-selection-checkbox"
			__nextHasNoMarginBottom
			aria-label={ selectionLabel }
			aria-disabled={ disabled }
			checked={ checked }
			onChange={ () => {
				if ( disabled ) {
					return;
				}

				onChangeSelection(
					selection.includes( id )
						? selection.filter( ( itemId ) => id !== itemId )
						: [ ...selection, id ]
				);
			} }
		/>
	);
}
