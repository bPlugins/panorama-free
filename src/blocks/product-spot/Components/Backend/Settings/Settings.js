import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';
import { tabController } from '../../../../../../../bpl-tools/utils/functions';
import { generalStyleTabs } from '../../../utils/options';
import General from './General/General';
import Style from './Style/Style';
import { themeSwitch, toolTipPresets } from '../../../utils/functions';
import BlockPreview from './panel/BlockPreview';
import { AdvertiseCard } from "../../../../../../../bpl-tools/ProControls";
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

const Settings = (settingprops) => {
	const { attributes, setAttributes, siteUrl } = settingprops;
	const { alignment, themeSl } = attributes;

	const pricingURL = `${siteUrl}/wp-admin/edit.php?post_type=bppiv-image-viewer&page=bppiv-support#/pricing`;
	const siteLocation = `${siteUrl}/wp-admin/edit.php?post_type=bppiv-image-viewer&page=bppiv-support#/pricing`;

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>
				{
					tab => <>
						{'general' === tab.name && <General {...settingprops} {...{ siteLocation }} />}

						{'style' === tab.name && <Style {...settingprops} />}
					</>
				}
			</TabPanel>

			<AdvertiseCard planLink={pricingURL || 'https://bplugins.com/products/panorama/pricing'} />
		</InspectorControls>

		<BlockControls>
			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Product Spot Alignment')} alignmentControls={[
				{ title: __('left', 'product-spot'), align: 'left', icon: 'align-left' },
				{ title: __('center', 'product-spot'), align: 'center', icon: 'align-center' },
				{ title: __('right', 'product-spot'), align: 'right', icon: 'align-right' }
			]} />

			<BlockPreview
				options={toolTipPresets}
				isPremium={true}
				value={themeSl}
				onChange={(val) => setAttributes(themeSwitch(val, attributes))}
			/>
		</BlockControls>
	</>;
};
export default compose(
	withSelect((select) => {
		return {
			siteUrl: select('core').getSite()?.url,
		};
	})
)(Settings);