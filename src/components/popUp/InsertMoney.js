import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import './InsertMoney.css'
import Money from './Money'
import { useDispatch } from "react-redux";
import { addMoney } from '../../redux/action';
import AlertFailed from './AlertFailed';

export default function InputMoney({show, handleClose}){
    const [wallet, setWallet] = useState([2000, 5000, 10000, 15000, 20000, 25000, 50000, 100000])
    const [identify, setIdentify] = useState({index:0, money:''})
    const [isTrue, setIsTrue] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()
    const voucher = []
    const handleCloseAlert = () => setShowAlert(false)

    const insertMoney = () => {
        // reference 
        const listMoney = ['2rb', '5rb', '10rb', '20rb', '50rb']
        if(identify == null){
            return setShowAlert(true)
        }

        if(!listMoney.includes(identify.money) || identify == null){
            return setShowAlert(true)
        }
         dispatch(addMoney(wallet[identify.index]))
         handleClose()
         handleCloseAlert()
    }

    // turn integer into virtual money
    const moneyInputInfo = () => {
       wallet.map((item)=>{
            voucher.push(`${item}`)
       })
       voucher.map((item, index, array) =>{
            if(item.length == 5) {
                array[index] = `${item[0]}${item[1]}rb`
            }else if(item.length == 4) {
                array[index] = `${item[0]}rb`
            }
            else {array[index] = `${item[0]}${item[1]}${item[2]}rb`}
       })
    }
    moneyInputInfo()

    return(
        <Modal style={{marginTop:'2rem',}} size='lg' show={show} onHide={handleClose} >
            <AlertFailed show={showAlert} handleClose={handleCloseAlert} text={`System doesn't recognize the money`}/>
            <div className='container-insert-money' style={{backgroundImage:`url(${process.env.PUBLIC_URL+'assets/background-color-bl.png'})`}}>
                <div className="wallet-container">
                    <img className='img' src={process.env.PUBLIC_URL+'assets/wallet.png'} alt="" />
                </div>
                <div >
                <div className="money-section" >
                    {voucher.map((item, index) =>
                    <span key={index}>
                        <Money index={index} item={item} identify={identify} setIdentify={setIdentify} isTrue={isTrue} setIsTrue={setIsTrue} />
                    </span>
                    )}
                </div>
                </div>
                <div className="submit" onClick={insertMoney}>
                    <img style={{height:'21px', width:'21px'}} src={process.env.PUBLIC_URL+'assets/insert-arrow.png'} alt="" />
                </div>
            </div>
        </Modal>
    )
}
