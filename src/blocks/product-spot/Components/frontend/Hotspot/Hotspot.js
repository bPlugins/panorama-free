import { getSpotIcon } from "../../../utils/functions";

const Hotspot = ({ activeHotspot, hotspot, setActiveHotspot, attributes }) => {
    const {iconMode, globalIcon } = attributes || {};
    return (
        <div
            className={`hotspot ${activeHotspot === hotspot.id ? 'activeHotspot' : ''}`}
            onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
        >
             <span
                className="icon"
                dangerouslySetInnerHTML={{ __html: getSpotIcon(iconMode, globalIcon, hotspot?.icon) }}
              />
        </div>
    )
}

export default Hotspot;