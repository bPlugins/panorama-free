import { MediaPlaceholder } from "../../../../../../bpl-tools/Components";
import { __ } from "@wordpress/i18n";

const UploadImage = ({ currentScene, scenes, setAttributes, selectBlock, clientId }) => {
  
  return (
    <div className="tourViewerPlaceholder" onMouseEnter={()=>selectBlock(clientId)}>
        <MediaPlaceholder
            placeholder={__("Paste or type a 360° panorama image URL", "panorama")}
            onChange={({ url }) => {
                const updatedScenes = scenes.map(scene => {
                    if (scene.tour_id === currentScene.tour_id) {
                        return { ...scene, panorama: url };
                    }
                    return scene;
                });
                setAttributes({ scenes: updatedScenes });
            }}
        />
    </div>
  )
}

export default UploadImage;