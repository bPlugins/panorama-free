import React, { useState } from "react";
import { Button, Popover } from "@wordpress/components";
import "./BlockPreview.scss";


const BlockPreview = ({ options, value, onChange, isPremium }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleButtonClick = (blockValue, idx) => {
        onChange(blockValue);
        setActiveIndex(idx);
        handleBlockReplace(blockValue);
    };

    const handleMouseInteraction = (idx, isEnter) => {
        setActiveIndex(isEnter ? idx : null);
    };

    const handleBlockReplace = (blockContent) => {
        onChange(blockContent);
    };

    return (
        <div className="bPlBlockPreviewWrapper">
            {options?.map((theme, idx) => (
                <div key={idx}>
                    <div>
                        <Button
                            className={`bPl-previewBtn ${value === theme.value ? "bPl-activeBtn" : "" }`}
                            onClick={() => handleButtonClick(theme.value, idx, theme.content)}
                            onMouseEnter={() => handleMouseInteraction(idx, true)}
                            onMouseLeave={() => handleMouseInteraction(idx, false)}
                        >
                            <span className="bplOpacity75">{theme.label}</span>
                            {theme?.isPro && !isPremium && (
                                <span className={`labelPro ${value === theme.value ? "labelProActive" : ""}`}> Pro </span>
                            )}
                        </Button>
                    </div>
                    {activeIndex === idx && (
                        <Popover
                            style={{ cursor: "pointer" }}
                            onClick={() => handleButtonClick(theme.value, idx, theme.content)}
                        >
                            <div
                                onMouseEnter={() => handleMouseInteraction(idx, true)}
                                onMouseLeave={() => handleMouseInteraction(idx, false)}
                                style={{ height: theme.height, width: theme.width }}
                            >
                                <img
                                    src={theme.img}
                                    style={{
                                        minHeight: "100%",
                                        width: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                        </Popover>
                    )}
                </div>
            ))}
        </div>
    );
};
export default BlockPreview;
