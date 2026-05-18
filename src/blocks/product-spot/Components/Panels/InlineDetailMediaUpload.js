import { PanelRow } from "@wordpress/components";
import { Label } from "../../../../../../bpl-tools/Components";
import { TextControl } from "@wordpress/components";
import { MediaUpload } from "@wordpress/block-editor";
import {__} from "@wordpress/i18n";
import { Button } from "@wordpress/components";

export const InlineDetailMediaUpload = props => {
	const { className, label = '', value = {}, types = ['image'], onChange, placeholder = __('Enter URL'),isMeta=false } = props;

	return <div className={className}>
		{label && <Label className='mb5'>{label}</Label>}

		<PanelRow className={`bPlInlineMediaUpload`}>
			<TextControl value={value?.url} onChange={url => onChange({ id: null, url, alt: '', title: '', caption: '',artist:'' })} placeholder={placeholder} />
			{/* <MediaUploadCheck> */}
				<MediaUpload
					allowedTypes={types}
					onSelect={({ id, url, alt, title, caption,meta }) => onChange({ id, url, alt, title, caption,...(isMeta?{meta}:{}) })}
					render={({ open }) => <Button className='button button-primary' onClick={open} icon={'upload'}></Button>}
				/>
			{/* </MediaUploadCheck> */}
		</PanelRow>
	</div>
}