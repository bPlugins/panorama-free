import { createRoot } from "react-dom/client";
import BPLSettings from "./../../custom-codestar-fr/src/BPLSettings";
import "./../../custom-codestar-fr/src/bpl-settings.scss";

document.addEventListener("DOMContentLoaded", () => {
  const bPlSettingsEl = document.getElementById("bpl_meta_fields");
  const options = JSON.parse(bPlSettingsEl.dataset.options);
  const nonce = bPlSettingsEl.dataset.nonce;

  createRoot(bPlSettingsEl).render(
    <BPLSettings options={options} nonce={nonce} />
  );
});
