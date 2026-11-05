import { __ } from "@wordpress/i18n";
import './editor.scss';

// Small "NEW" tag shown next to a recently added setting or panel title.
const NewBadge = () => <span className="bppivNewBadge">{__("NEW", "panorama")}</span>;

export default NewBadge;
