import { Modal } from "react-bootstrap"
import React from 'react';
import './TakeOrder.css'

export default function TakeOrder({show, handleClose, product, setQtyProduct}) {

    // taking the all of the order
    const takeOrder = () => {
        handleClose()
        setQtyProduct([])
    }

    return(
            <Modal style={{marginTop:'2rem', }} size='lg' show={show} onHide={handleClose} >
                <div style={styles.containerOrder}>
                    <div style={styles.contentOrder}>
                        <div className={product.length > 0? "img-parent" : "img-parent-empty"}>
                            <img className={product.length > 0? "img": "img-empty"} src={process.env.PUBLIC_URL+'assets/stock.png'} alt="" />
                        </div>
                        <div className='order-product-section'>
                            {product?.map((item, index) =>
                                <span key={index}>
                                    <div className="product-card">
                                        <img style={{width:'80px', height:'80px'}} src={process.env.PUBLIC_URL+'assets/'+item.img} alt="" />
                                    </div>
                                </span>
                            )}
                        </div>
                    </div>
                        <div className="btn-take" onClick={takeOrder}>
                            {product.length > 0?<p>Take your order</p> : <p>Your order will drop here</p>}
                        </div>
                </div>
            </Modal>
    )
}

const styles = {
    containerOrder:{
        backgroundImage:`url(${process.env.PUBLIC_URL+'assets/background-color-bl.png'})`,
        paddingBottom:'5px',
        backgroundColor:'white',
        borderRadius:'6px',
        padingTop:'30px',
        display:'flex',
        paddingTop:'30px',
        flexDirection:'column',
        paddingBottom:'70px',
        justifyContent:'center',
        alignItems:'center',
    },
    contentOrder :{
        width:'80%',
        margin:'auto',
        display:'flex',
        paddingTop:'30px',
        flexDirection:'column',
        paddingBottom:'70px',
        justifyContent:'center',
        borderRadius:'20px',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.20)',
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
    }
}