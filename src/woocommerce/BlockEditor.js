import { useState, useEffect } from 'react';
import { BlockEditorProvider, BlockInspector, BlockTools, WritingFlow, ObserveTyping, BlockList } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';
import { produce } from 'immer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BlockEditor() {
    const [blocks, updateBlocks] = useState(parse('<!-- wp:psb/product-spot /-->'));
    const editorRoot = document.getElementById('psb-block-editor-root');
    const savedBlocks = editorRoot?.dataset?.blocks;
    const spotPosition = editorRoot?.getAttribute("spot-position");
    const { ajaxUrl, nonce, postId } = window?.psb_ajax || {};
    const [loading, setLoading] = useState(false);
    const [selectedSpotPosition, setSelectedSpotPosition] = useState(spotPosition || "none");


    useEffect(() => {
        if (savedBlocks) {
            try {
                const parsed = JSON.parse(savedBlocks);
                const newBlocks = produce(blocks, (draft) => {
                    draft[0].attributes = parsed;
                });

                updateBlocks(newBlocks);

            } catch (err) {
                console.error('Invalid savedBlocks JSON:', err);
            }
        }
    }, []);

    useEffect(() => {
        const form = document.querySelector('#post');
        if (!form || !blocks[0]) return;

        let input = document.getElementById('product_spot_blocks');

        if (!input) {
            input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'product_spot_blocks';
            input.id = 'product_spot_blocks';
            form.appendChild(input);
        }

        input.value = JSON.stringify(blocks[0].attributes);
    }, [blocks]);

    const handleSaveClick = async () => {
        setLoading(true);

        try {
            const response = await fetch(ajaxUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    action: 'psb_save_product_spot',
                    nonce,
                    post_id: postId,
                    blocks: JSON.stringify(blocks[0].attributes),
                    position: selectedSpotPosition || "none",
                }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(result.data.message);
                
                if (result.data.position) {
                    setSelectedSpotPosition(result.data.position);
                }
                
                updateBlocks(produce(blocks, (draft) => {
                    draft[0].attributes = result.data.attributes;
                }));
            } else {
                toast.error(result.data.message || 'Failed to save');
            }
        } catch (err) {
            toast.error('Unexpected error occurred.' + (err?.message ? `: ${err.message}` : ''));
        }

        setLoading(false);
    };

    return (
        <>
            <div className="psb-block-editor-wrapper">
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                />
                <BlockEditorProvider
                    value={blocks}
                    onInput={(blocks) => updateBlocks(blocks)}
                    onChange={(blocks) => updateBlocks(blocks)}
                >
                    <div className="editor-styles-wrapper">
                        <BlockTools>
                            <WritingFlow>
                                <ObserveTyping>
                                    <BlockList />
                                </ObserveTyping>
                            </WritingFlow>
                        </BlockTools>
                    </div>

                    <div className="block-editor-sidebar">
                        <BlockInspector />
                    </div>

                </BlockEditorProvider>
                <p className="saveText" onClick={handleSaveClick} >
                    {loading ? 'Saving...' : 'Save'}
                </p>
            </div>
            <div className="productPosition">
                <p className="title">Product Spot Position</p>
                <div className="options">
                    {["none", "top", "bottom", "replace"].map((pos) => (
                        <label
                            key={pos}
                            className={`option ${selectedSpotPosition === pos ? "active" : ""}`}
                        >
                            <input
                                type="radio"
                                name="position"
                                value={pos}
                                checked={selectedSpotPosition === pos}
                                onChange={(e) => setSelectedSpotPosition(e.target.value)}
                            />
                            <span>{pos.charAt(0).toUpperCase() + pos.slice(1)}</span>
                        </label>
                    ))}
                </div>
            </div>


        </>
    );
}

export default BlockEditor;