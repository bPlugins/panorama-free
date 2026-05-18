import { useState } from "react";
import { Modal, Button, Icon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import './clipboard.scss';

const ClipBoard = ({ shortcode, embedCode, title }) => {
  const [copiedType, setCopiedType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopy = (text, type) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      setCopiedType(type);
      setTimeout(() => setCopiedType(""), 2000);
    } catch (err) {
      console.error("Fallback: Unable to copy", err);
    }
    document.body.removeChild(textarea);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(err => {
        console.error("Modern API: Unable to copy", err);
      });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="clipBoard" onClick={(e) => e.stopPropagation()}>
      <div className="clipBtnWrapper">
        <p className="clipBoard_title">{__("Copy shortcode or click Embed to share on other sites:", "panorama")}</p>

        <div className="clipActionGroup">
          <button
            type="button"
            className="shortcode_copy_btn"
            onClick={() => handleCopy(shortcode, "shortcode")}
            title={__("Click to copy shortcode", "panorama")}
          >
            <code className="shortcode_text">{shortcode}</code>
            <span className="copy_status_overlay">
              {copiedType === "shortcode" ? __("Copied!", "panorama") : <Icon icon="copy" />}
            </span>
          </button>

          <button
            type="button"
            className="bppiv-embed-trigger-btn"
            onClick={openModal}
          >
            <Icon icon="share" /> {__("Embed", "panorama")}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          title={__(`Embed ${title}`, "panorama")}
          onRequestClose={closeModal}
          className="bppiv-embed-modal-react"
        >
          <div className="bppiv-modal-content-react">
            <div className="textarea-wrapper">
              <textarea
                className="bppiv-iframe-code-react"
                value={embedCode}
                readOnly
              />
            </div>

            <div className="embed-notes-container">
              <p className="bppiv-embed-note">
                <span className="note-label">{__("Note:", "panorama")}</span> {__("If the panorama appears misaligned on your page, wrap the iframe inside a ", "panorama")}
                <code className="highlight-tag">&lt;div&gt;</code> {__(" container. This usually fixes alignment issues in some editors.", "panorama")}
              </p>

              <p className="bppiv-embed-note">
                <span className="note-label">{__("Note:", "panorama")}</span> {__("If you copy the embed code and the panorama does not display correctly, please go to your WordPress admin dashboard ", "panorama")}
                <span className="menu-path">
                  {__("Settings", "panorama")} <Icon icon="arrow-right-alt" /> {__("Permalinks", "panorama")}
                </span>
                {__(" and click ", "panorama")} <span className="action-highlight">{__("Save Changes", "panorama")}</span>.
                {__(" This refreshes the URLs and ensures the embed works properly.", "panorama")}
              </p>
            </div>

            <Button
              isPrimary
              className="bppiv-copy-embed-btn-react"
              onClick={() => handleCopy(embedCode, "modal_embed")}
            >
              {copiedType === "modal_embed" ? __("Copied!", "panorama") : __("Copy Embed Code", "panorama")}
            </Button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ClipBoard;
