import { sanitizeHTML } from '../../../../../utils/sanitize';
const DescriptionF = ({ selectedHotspot }) => {
  const {description} = selectedHotspot || {};
  
  return (
      <p dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }} className="desc" />
  )
}

export default DescriptionF;