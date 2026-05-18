import useHotspotManager from '../../../hooks/useHotspotManager';
import Title from '../../Backend/TtitleDesBack/Title';
import Description from '../../Backend/TtitleDesBack/Description';
import TitleF from '../../frontend/TitleDes/TitleF';
import DescriptionF from '../../frontend/TitleDes/DescriptionF';
import ProductImg from '../ProductImg/ProductImg';

const Simple = ({ attributes, setAttributes, isBackend = true, Hotspot, isPremium, setIsSpotModalOpen }) => {
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
    hotspots=[]
  } = useHotspotManager(attributes, setAttributes);

  const { options } = attributes || {};
  const { isTitle, isDesc } = options || {};

  const backendHotspotProps = isBackend ? { containerSize, handleStop, handleDeleteHotspot } : {}

  return (
    <>
      <div className="simple" ref={containerRef} >

        <div onClick={isBackend ? (e) => addSpot(e, isPremium, setIsSpotModalOpen) : undefined}>
          <ProductImg {...{ imageRef, img }} />
        </div>

        {containerSize.width > 0 && hotspots?.map(hotspot => <Hotspot key={hotspot?.id} {...{ hotspot, activeHotspot, setActiveHotspot, attributes  }} {...backendHotspotProps} />)}

      </div>

      {activeHotspot !== null && selectedHotspot && (
        <div className='simpleInfo'>
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
        </div>

      )
      }

    </>
  );
};

export default Simple;

