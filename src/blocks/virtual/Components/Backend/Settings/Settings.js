import { AlignmentToolbar, BlockControls, InspectorControls } from "@wordpress/block-editor";
import { TabPanel } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { tabController, updateData } from "../../../../../../../bpl-tools/utils/functions";
import { generalStyleTabs } from "../../../utils/options";
import General from "./General/General";
import Style from "./Style/Style";
import { AdvertiseCard } from "../../../../../../../bpl-tools/ProControls";

const Settings = ({ attributes, setAttributes, device, setCurrentScene, siteLocation }) => {
	const { scenes = [], layout } = attributes;
	const { alignSl } = layout;

	const props = { attributes, setAttributes, device, setCurrentScene, siteLocation };

	return (
		<>
			<InspectorControls>
				{scenes?.length > 0 && (
					<TabPanel
						className="bPlTabPanel wp-block-panorama-virtual-tour"
						activeClass="activeTab"
						tabs={generalStyleTabs}
						onSelect={tabController}
					>
						{(tab) => (
							<>
								{"general" === tab.name && <General {...props} />}

								{"style" === tab.name && <Style {...props} />}
							</>
						)}
					</TabPanel>
				)}

				<AdvertiseCard planLink={siteLocation || 'https://bplugins.com/products/panorama/pricing'} />
			</InspectorControls>

			{scenes?.length > 0 && (
				<BlockControls>
					<AlignmentToolbar
						value={alignSl[device]}
						onChange={(val) =>
							setAttributes({
								layout: updateData(layout, val, "alignSl", device),
							})
						}
						describedBy={__("Panorama Tour Viewer Alignment")}
						alignmentControls={[
							{
								title: __("Panorama in left", "panorama"),
								align: "start",
								icon: "align-left",
							},
							{
								title: __("Panorama in center", "panorama"),
								align: "center",
								icon: "align-center",
							},
							{
								title: __("Panorama in right", "panorama"),
								align: "end",
								icon: "align-right",
							},
						]}
					/>
				</BlockControls>
			)}
		</>
	);
};

export default Settings;
