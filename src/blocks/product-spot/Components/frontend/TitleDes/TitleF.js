import { sanitizeHTML } from '../../../../../utils/sanitize';
const TitleF = ({ selectedHotspot }) => {
  const {title} = selectedHotspot || {};
  
  return (
      <h3 dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }} className="title" />
  )
}

export default TitleF;