import { Modal, } from "react-bootstrap";
import React from 'react';
import './PopUpFailed.css'

export default function FailedAlert ({show, handleClose}) {
    return(
        <Modal size="sm" show={show} onHide={handleClose} className="modal" >
            <div className="modal-content" >
                <div className="img-container">
                    <img style={{width:'30px', height:'30px', margin:'auto'}} src={process.env.PUBLIC_URL+'assets/warning.png'}/>
                </div>
                <p className="title">Oops!</p>
                <p className="text" >No money detected.</p>
            </div>
        </Modal> 
    )
}
