import { Modal } from "@wordpress/components";

const CustomModal = ({title, des, setFn = () => {}, link}) => {
    return (
        <Modal title={title} onRequestClose={() => setFn(false)}>
            <p className="hotspotDes"> {des} </p>
            <a className='hotspot-modal-button' href={link} target='_blank' rel='noreferrer' onClick={() => setFn(false)}>Upgrade Now</a>
        </Modal>
    )
}

export default CustomModal;