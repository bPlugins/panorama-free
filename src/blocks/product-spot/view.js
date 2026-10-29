import { createRoot } from 'react-dom/client';
import { trackRoot, unmountDetachedRoots } from '../../utils/viewerRoots';
import './style.scss';
import Style from './Components/Common/Style';
import Theme from './Components/Common/theme';
import Hotspot from './Components/frontend/Hotspot/Hotspot';

// Also mounts on "bppiv:mount" (fired by the Elementor integration); already-mounted viewers are skipped.
const mountViewers = () => {
	unmountDetachedRoots();

	const productSpotEls = document.querySelectorAll('.wp-block-psb-product-spot[data-attributes]');

	productSpotEls.forEach(productSpotEl => {
		const attributes = JSON.parse(productSpotEl.dataset.attributes);

		trackRoot(productSpotEl, createRoot(productSpotEl)).render(<>
			<Style attributes={attributes} id={productSpotEl.id} />

			<div className="productSpotWrapper">
				{attributes?.img?.url && <div className="productSpot">
					<Theme {...{ attributes, isBackend: false, Hotspot }} />
				</div>}
			</div>

		</>);

		productSpotEl?.removeAttribute('data-attributes');
	});
};

document.addEventListener('bppiv:mount', mountViewers);

document.addEventListener('DOMContentLoaded', () => {
	mountViewers();

	// WooCommerce Product Page
	const productSpotOnWooEl = document.querySelector('.psb-product-spot-on-woo');

	if (productSpotOnWooEl) {
		const isOnTop = productSpotOnWooEl.classList.contains('psb-top-image');
		const isOnBottom = productSpotOnWooEl.classList.contains('psb-bottom-image');
		const isReplaced = productSpotOnWooEl.classList.contains('psb-replace-image');

		const innerSpotEl = productSpotOnWooEl.querySelector('.wp-block-psb-product-spot');

		if (innerSpotEl?.classList.contains('alignwide')) {
			innerSpotEl.classList.remove('alignwide');
		}

		const containers = [
			document.querySelector('.woocommerce-product-gallery'),
			document.querySelector('.product-gallery')
		];


		containers.forEach(container => {
			if (!container) return;

			if (isReplaced) {
				const panoramaEl = container.querySelector('#bppiv_product_panorama');
				container.innerHTML = '';
				if (panoramaEl) {
					container.append(panoramaEl);
				}
				container.append(productSpotOnWooEl);
			} else {
				if (isOnTop) container.prepend(productSpotOnWooEl);
				if (isOnBottom) container.append(productSpotOnWooEl);
			}
		});

	}
});