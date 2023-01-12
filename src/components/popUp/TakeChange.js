import { Modal } from "react-bootstrap"
import React, { useState } from 'react';
import './TakeChange.css'
import { useSelector, useDispatch } from "react-redux";
import { takeChange } from "../../redux/action";

export default function TakeChange({show, handleClose, handleCloseTakeChange}) {
    const checkCharge = useSelector(state => state.flow)
    const dispatch = useDispatch()
    let infoCharge = checkCharge.charge

    // convert from integer to virtual money
    const handleCharge = () => {
       let chargeMoney = 0
       chargeMoney += infoCharge
       const result = [`${chargeMoney}`]
        
       result.map((item, index, array) =>{
            if(item.length == 5) {
                array[index] = `${item[0]}${item[1]}rb`
            }else if(item.length == 4) {
                array[index] = `${item[0]}rb`
            }
            else {array[index] = `${item[0]}${item[1]}${item[2]}rb`}
       })
       return result.join()
    }

    // take the charge
    const handleTakeCharge = () => {
        dispatch(takeChange())
        handleCloseTakeChange()
        handleClose()
    }

    return(
            <Modal style={{marginTop:'2rem',}} size='m' show={show} onHide={handleClose} >
                <div style={{ height:'100%', borderRadius:'6px', }}>
                <div className='container-charge'>
                    {infoCharge > 0?
                    <>
                    <h6 style={{marginTop:'30px'}}>Here is your change, thanks for ordering!</h6>
                    <div className="money-charge">
                        <div>
                            <span style={{marginRight:'auto'}}>Rp.</span>
                            <h5>{handleCharge()}</h5>
                        </div>
                        <div className="charge-footer">
                            <p style={{textAlign:'right', margin:'10px'}}>Virtual Money</p>
                        </div>
                    </div>
                    <div className="btn-take-charge" onClick={handleTakeCharge}>
                        <p>Take</p>
                    </div></>: 
                    null
                    }
                    </div>
                </div>
            </Modal>
    )
}

const styles = {
    moneyCharge: {
            padding:'10px 0px 10px 0px',
            marginRight:'7px',
            marginTop:'7px',
            width:'150px',
            height:'90px',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems:'center',
            borderRadius:'20px',
            cursor:'pointer',
            backgroundColor:"rgba(255,255,255,0.40)",
            boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
    }
}