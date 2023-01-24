import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import './InsertMoney.css'
import Money from './Money'
import { useSelector, useDispatch } from "react-redux";
import { addMoney, toWallet } from '../../redux/action';
import AlertFailed from './AlertFailed';

export default function InputMoney({show, handleClose}){
    const [wallet, setWallet] = useState([2000, 5000, 10000, 15000, 20000, 25000, 50000, 100000])
    const [identify, setIdentify] = useState({index:0, money:''})
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()
    const takeChange = useSelector(state => state.flow.wallet)
    const voucher = []
    const handleCloseAlert = () => setShowAlert(false)

    // take change to the wallet
    useEffect(()=>{
        if(takeChange > 0){
            wallet.push(takeChange)
            dispatch(toWallet())
        }
    },[takeChange])


    const insertMoney = () => {
        // reference 
        const listMoney = ['2rb', '5rb', '10rb', '20rb', '50rb']
       
        if(!listMoney.includes(identify.money) || identify == null){
            return setShowAlert(true)
        }
         dispatch(addMoney(wallet[identify.index]))
         handleClose()
         handleCloseAlert()
         setIdentify({index:0, money:''})
    }

    // turn integer into virtual money
    const moneyInputInfo = () => {
       wallet.map((item)=>{
            return voucher.push(`${item}`)
       })
       voucher.map((item, index, array) =>{
            if(item.length == 5) {
               return array[index] = `${item[0]}${item[1]}rb`
            }else if(item.length == 4) {
               return array[index] = `${item[0]}rb`
            }
            else { return array[index] = `${item[0]}${item[1]}${item[2]}rb`}
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
                        <Money index={index} item={item} identify={identify} setIdentify={setIdentify}  />
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
