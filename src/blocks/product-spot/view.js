import { createRoot } from 'react-dom/client';
import './style.scss';
import Style from './Components/Common/Style';
import Theme from './Components/Common/theme';
import Hotspot from './Components/frontend/Hotspot/Hotspot';

document.addEventListener('DOMContentLoaded', () => {
	const productSpotEls = document.querySelectorAll('.wp-block-psb-product-spot');

	productSpotEls.forEach(productSpotEl => {
		const attributes = JSON.parse(productSpotEl.dataset.attributes);

		createRoot(productSpotEl).render(<>
			<Style attributes={attributes} id={productSpotEl.id} />

			<div className="productSpotWrapper">
				{attributes?.img?.url && <div className="productSpot">
					<Theme {...{ attributes, isBackend: false, Hotspot }} />
				</div>}
			</div>

		</>);

		productSpotEl?.removeAttribute('data-attributes');
	});


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
				container.innerHTML = '';
				container.append(productSpotOnWooEl);
			} else {
				if (isOnTop) container.prepend(productSpotOnWooEl);
				if (isOnBottom) container.append(productSpotOnWooEl);
			}
		});

	}
});