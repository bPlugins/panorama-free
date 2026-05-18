
import ProductImg from "../ProductImg/ProductImg";
import useHotspotManager from "../../../hooks/useHotspotManager";
import TitleF from "../../frontend/TitleDes/TitleF";
import DescriptionF from "../../frontend/TitleDes/DescriptionF";
import HoverCardDraggble from "../../Backend/HoverCardDraggble/HoverCardDraggble";

const HoverCard = ({ attributes, setAttributes, isBackend = true, isPremium, setIsSpotModalOpen }) => {
  const {
    containerRef,
    imageRef,
    containerSize,
    activeHotspot,
    setActiveHotspot,
    selectedHotspot,
    addSpot,
    handleStop,
    handleDeleteHotspot,
    img,
    hotspots = []
  } = useHotspotManager(attributes, setAttributes);

  const { options, globalIcon } = attributes || {};
  const { isTitle, isDesc } = options || {};


  const renderFrontendHotspot = (hotspot) => (
    <div
      key={hotspot.id}
      className={`hotspot ${activeHotspot === hotspot.id ? 'activeHotspot' : ''}`}
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`
      }}
      onMouseEnter={() => setActiveHotspot(hotspot.id)}
      onMouseLeave={() => setActiveHotspot(null)}
    >
      <span className="icon" dangerouslySetInnerHTML={{ __html: globalIcon }} />

      {activeHotspot === hotspot.id && <>

        {
          (
            <div className={`info ${hotspot.x > 70 ? 'leftShift' : ''}`}>
             {isTitle && <TitleF {...{ selectedHotspot }} /> } 
             {isDesc && <DescriptionF {...{ selectedHotspot }} /> }
            </div>
          )
        }
      </>
      }
    </div>
  );


  return (
    <div className="hoverCard" ref={containerRef}>
      <div onClick={isBackend ? (e) => addSpot(e, isPremium, setIsSpotModalOpen) : undefined}>
        <ProductImg {...{ imageRef, img }} />
      </div>

      {containerSize.width > 0 &&
        hotspots?.map((hotspot) =>
          isBackend
            ? <HoverCardDraggble key={hotspot.id} {...{ hotspot, containerSize, handleStop, activeHotspot, setActiveHotspot, handleDeleteHotspot, selectedHotspot, attributes, setAttributes, hotspots,  isTitle, isDesc }} />
            : renderFrontendHotspot(hotspot)
        )}

    </div>
  );
};

export default HoverCard;
