export const themes = (img = {}) => [
    {
        "label": "Simple",
        "value": "simple",
        "content": `<!-- wp:psb/product-spot {"img":${JSON.stringify(img)}} /-->`
    },
    {
        "label": "Side-Panel",
        "value": "sidepanel",
        "content": `<!-- wp:psb/product-spot {"align":"wide","themeSl":"sidepanel","img":${JSON.stringify(img)}} /-->`
    },
    {
        "label": "Tippy",
        "value": "tippy",
        "content": `<!-- wp:psb/product-spot {"themeSl":"tippy","img":${JSON.stringify(img)}} /-->`
    }
]