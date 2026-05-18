import { produce } from 'immer';
import { defaultHotspotIcon } from './icons';

export const sanitizePerUnitValue = (value) => {
  if (typeof value === 'string') {
    if (value.endsWith('%')) {
      const num = parseFloat(value);
      if (num > 100) {
        return '100%';
      }
    }
  }
  return value;
}

export const getNextId = (hotspots) => {
  const ids = hotspots.map((h) => h.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
};

export const updateHotspotField = (hotspots, setAttributes, hotspotId, field, value) => {
  const updatedHotspots = hotspots?.map(h =>
      h?.id === hotspotId ? { ...h, [field]: value } : h
  );
  setAttributes({ hotspots: updatedHotspots });
  
};

export const toolTipPresets = [
  {
    label: "Simple",
    value: "simple",
    img: "https://i.ibb.co.com/Ndb58JkY/simple.png",
    height: "auto",
    width: "160px",
    isPro:false
  },
  {
    label: "Sidepanel",
    value: "sidepanel",
    img: "https://i.ibb.co.com/BVvNNQMW/sidepanel.png",
    height: "auto",
    width: "160px",
    isPro:false
  },
  {
    label: "Tippy",
    value: "tippy",
    img: "https://i.ibb.co.com/8Ld4Fktb/tippy.png",
    height: "auto",
    width: "160px",
    isPro:false
  }
];

export const themeSwitch = (theme = 'simple', attributes) => produce(attributes, (draft) => {
	draft['themeSl'] = theme;

	switch (theme) {
		case 'simple':
			draft['align'] = "";
			draft['styles']['info']['bg'] = "#F6F6F6";
			draft['styles']['info']['radius'] = "8px";
			draft['styles']['info']['padding'] = "15px";
			draft['styles']['title']['color'] = "#111827";
			draft['styles']['desc']['color'] = "#374151";
			break;
		case 'sidepanel':
      draft['align'] = "wide";
      draft['styles']['info']['bg'] = "#F1F1F1";
			draft['styles']['info']['radius'] = "8px";
			draft['styles']['info']['padding'] = "15px";
			draft['styles']['title']['color'] = "#111827";
			draft['styles']['desc']['color'] = "#374151";
			break;
		case 'tippy':
      draft['align'] = "";
      draft['styles']['info']['bg'] = "#F1F1F1";
			draft['styles']['info']['radius'] = "8px";
			draft['styles']['info']['padding'] = "0px";
			draft['styles']['title']['color'] = "#111827";
			draft['styles']['desc']['color'] = "#374151";
			break;
	}
});

export const getSpotIcon = (iconMode, globalIcon, singleIcon) => {
  const globalIconVal =  globalIcon || defaultHotspotIcon;
  const singleIconVal = singleIcon || globalIconVal;  

  return 'single'=== iconMode ? singleIconVal : globalIconVal
}