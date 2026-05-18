import Draggable from 'react-draggable';
import Tippy from '@tippyjs/react';
import Title from '../../Backend/TtitleDesBack/Title';
import Description from '../../Backend/TtitleDesBack/Description';
import { getSpotIcon } from '../../../utils/functions';

const TippyDraggble = ({
    hotspot,
    containerSize,
    activeHotspot,
    setActiveHotspot,
    selectedHotspot,
    setAttributes,
    hotspots,
    handleStop,
    handleDeleteHotspot,
    isTitle, isDesc, iconMode, globalIcon
}) => {
    const position = {
        x: (hotspot.x / 100) * containerSize.width - 12,
        y: (hotspot.y / 100) * containerSize.height - 12
    };

    return (
        <Draggable
            key={hotspot.id}
            position={position}
            bounds=".image"
            onStop={(e, data) => handleStop(e, data, hotspot.id)}
        >
            <div className={`hotspot ${activeHotspot === hotspot.id ? 'activeHotspot' : ''}`}>
                <Tippy
                    content={
                        <>
                            {isTitle && <Title {...{ selectedHotspot, setAttributes, hotspots }} />}
                            {isDesc && <Description {...{ selectedHotspot, setAttributes, hotspots }} />}
                        </>
                    }
                    placement="top"
                    theme="hotspot"
                    arrow
                    interactive
                    onShow={() => setActiveHotspot(hotspot.id)}
                    onHide={() => setActiveHotspot(null)}
                >
                    <div>
                        <span
                            className="icon"                  
                            dangerouslySetInnerHTML={{ __html: getSpotIcon(iconMode, globalIcon, hotspot?.icon) }}
                        />
                        <span
                            className="deleteIcon"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteHotspot(hotspot.id);
                            }}
                        >
                            x
                        </span>
                    </div>
                </Tippy>
            </div>
        </Draggable>
    );
}

export default TippyDraggble;
