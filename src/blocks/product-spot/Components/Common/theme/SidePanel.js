import { useRef, useLayoutEffect } from 'react';
import useHotspotManager from "../../../hooks/useHotspotManager";
import ProductImg from "../ProductImg/ProductImg";
import Title from "../../Backend/TtitleDesBack/Title";
import Description from "../../Backend/TtitleDesBack/Description";
import TitleF from "../../frontend/TitleDes/TitleF";
import DescriptionF from "../../frontend/TitleDes/DescriptionF";

const SidePanel = ({ attributes, setAttributes, isBackend = true, Hotspot, isPremium, setIsSpotModalOpen }) => {
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

  const imageAndHotspotRef = useRef(null);
  const infoBoxRef = useRef(null);

  const { options } = attributes || {};
  const { isTitle, isDesc } = options || {};

  const backendHotspotProps = isBackend ? { containerSize, boundsTarget: ".imageAndHotspot", handleStop, handleDeleteHotspot } : {}
  
  useLayoutEffect(() => {
    if (imageRef.current) {
      const handleLoad = () => {
        if (infoBoxRef.current && imageAndHotspotRef.current) {
          const height = imageAndHotspotRef.current.clientHeight;
          infoBoxRef.current.style.maxHeight = `${height}px`;
        }
      };
  
      if (imageRef.current.complete) {
        handleLoad();
      } else {
        imageRef.current.addEventListener("load", handleLoad);
      }
  
      return () => {
        imageRef.current?.removeEventListener("load", handleLoad);
      };
    }
  }, [img]);

  return (
    <div className="sidePanel" ref={containerRef}>
      <div className="imageAndHotspot" ref={imageAndHotspotRef}>
        <div onClick={isBackend ? (e) => addSpot(e, isPremium, setIsSpotModalOpen) : undefined}>
          <ProductImg {...{ imageRef, img }} />
        </div>

        {containerSize.width > 0 && hotspots?.map(hotspot => <Hotspot key={hotspot?.id} {...{ hotspot, activeHotspot, setActiveHotspot, attributes }} {...backendHotspotProps} />)}

      </div>

      <div className="infoBox" ref={infoBoxRef}>
        <div className="info">
          {
            hotspots?.length > 0 ? <>
              {
                isBackend ? (
                  <>
                    {isTitle && <Title {...{ selectedHotspot, setAttributes, hotspots }} />}
                    {isDesc && <Description {...{ selectedHotspot, setAttributes, hotspots }} />}
                  </>

                ) : (
                  <>
                    {isTitle && <TitleF {...{ selectedHotspot }} />}
                    {isDesc && <DescriptionF {...{ selectedHotspot }} />}
                  </>
                )
              }
            </> : isBackend ? <h4 className="noHotspot">Please add hotspot !</h4> : <h4 className="noHotspot">Spot not  found !</h4>
          }


          <div className="btnGroup">
            {hotspots.map((hotspot) => (
              <button
                type="button"
                key={hotspot.id}
                className={`indexBtn ${activeHotspot === hotspot.id ? "activeIdx" : ""
                  }`}
                onClick={() => setActiveHotspot(hotspot.id)}
              >
                {hotspot.id}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SidePanel;
