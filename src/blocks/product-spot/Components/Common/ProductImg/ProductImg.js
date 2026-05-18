
const ProductImg = ({ imageRef, img = {} }) => {
    return (
        <img ref={imageRef}
            src={img?.url}
            alt={img?.alt || 'product-image'}
            className="image"
        />
    )
}

export default ProductImg;

