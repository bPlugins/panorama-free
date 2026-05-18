import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import useHotspotManager from '../../../hooks/useHotspotManager';
import ProductImg from '../ProductImg/ProductImg';
import TitleF from '../../frontend/TitleDes/TitleF';
import DescriptionF from '../../frontend/TitleDes/DescriptionF';
import TippyDraggble from '../../Backend/TippyDraggble/TippyDraggble';
import { getSpotIcon } from '../../../utils/functions';

export function TippyHotspots({ attributes, setAttributes, isPremium, setIsSpotModalOpen, isBackend = true }) {
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


  const { options, iconMode, globalIcon } = attributes || {};
  const { isTitle, isDesc } = options || {};

 


  return (
    <div className="tippy" ref={containerRef}>
      <div onClick={isBackend ? (e) => addSpot(e, isPremium, setIsSpotModalOpen) : undefined}>
        <ProductImg {...{ imageRef, img }} />
      </div>

      {containerSize.width > 0 && hotspots?.map(hotspot => (
        isBackend ?
          <TippyDraggble
            key={hotspot.id}
            {...{
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
            }}
          /> :
          <div
            key={hotspot.id}
            className={`hotspot ${activeHotspot === hotspot.id ? 'activeHotspot' : ''}`}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          >
            <Tippy
              content={
                <>
                  {isTitle && <TitleF {...{ selectedHotspot }} />}
                  {isDesc && <DescriptionF {...{ selectedHotspot }} />}
                </>
              }
              theme="hotspot"
              arrow={true}
              interactive={true}
              onShow={() => setActiveHotspot(hotspot.id)}
              onHide={() => setActiveHotspot(null)}
            >

              <span
                className="icon"
                dangerouslySetInnerHTML={{ __html: getSpotIcon(iconMode, globalIcon, hotspot?.icon) }}
              />

            </Tippy>
          </div>
      ))
      }
    </div >
  );
}
