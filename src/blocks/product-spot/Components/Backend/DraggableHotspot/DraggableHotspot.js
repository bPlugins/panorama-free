import Draggable from "react-draggable";
import { getSpotIcon } from "../../../utils/functions";

const DraggableHotspot = ({ attributes, hotspot, containerSize, boundsTarget = ".image", handleStop, activeHotspot, setActiveHotspot, handleDeleteHotspot }) => {
    const { iconMode, globalIcon } = attributes;

    return (
        <Draggable
            position={{
                x: (hotspot.x / 100) * containerSize.width - 12,
                y: (hotspot.y / 100) * containerSize.height - 12
            }}
            bounds={boundsTarget}
            onStop={(e, data) => handleStop(e, data, hotspot.id)}
        >
            <div
                className={`hotspot ${activeHotspot === hotspot.id ? 'activeHotspot' : ''}`}
                onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
            >

                <span
                    className="icon"
                    dangerouslySetInnerHTML={{ __html: getSpotIcon(iconMode, globalIcon, hotspot?.icon) }}
                />

                <p className="deleteIcon"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteHotspot(hotspot.id);
                    }}
                >
                    x
                </p>

            </div>

        </Draggable>
    )
}

export default DraggableHotspot;