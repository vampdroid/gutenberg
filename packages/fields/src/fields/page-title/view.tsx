/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import type { Settings } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import type { CommonPost } from '../../types';
import { BaseTitleView } from '../title/view';

export default function PageTitleView( { item }: { item: CommonPost } ) {
	const { frontPageId, postsPageId } = useSelect( ( select ) => {
		const { getEntityRecord } = select( coreStore );
		const siteSettings = getEntityRecord(
			'root',
			'site'
		) as Partial< Settings >;
		return {
			frontPageId: siteSettings?.page_on_front,
			postsPageId: siteSettings?.page_for_posts,
		};
	}, [] );
	return (
		<BaseTitleView item={ item } className="fields-field__page-title">
			{ [ frontPageId, postsPageId ].includes( item.id as number ) && (
				<span className="fields-field__page-title__badge">
					{ item.id === frontPageId
						? __( 'Homepage' )
						: __( 'Posts Page' ) }
				</span>
			) }
		</BaseTitleView>
	);
}
