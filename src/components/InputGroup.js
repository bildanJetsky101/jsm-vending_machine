import { useEffect, useState } from "react"
import FailedAlert from './popUp/PopUpFailed'
import InsertMoneyModal from './popUp/InsertMoney'
import { useSelector, useDispatch } from "react-redux"
import { buyProducts, takeCharge } from "../redux/action"
import TakeChange from "./popUp/TakeChange"
import axios from "axios"
import './InputGroup.css'
import AlertFailed from "./popUp/AlertFailed"
import TakeOrder from "./popUp/TakeOrder"

export default function InputGroup (){
    const [order, setOrder] = useState(true)
    const [product, setProduct] = useState(0)
    const [greeting, setGreeting] = useState({greeting:'', icon:''})
    const [show, setShow] = useState(false)
    const [showInsertMoney, setInsertMoneyShow] = useState(false)
    const [showTakeCharge, setShowTakeCharge] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showOrder, setShowOrder] = useState(false)
    const [qtyProduct, setQtyProduct] = useState([])
    const [charge, setCharge] = useState(false)
    const [formData, setFromData] = useState([])
    const dispatch = useDispatch()
    const transaction = useSelector(state => state.flow)
    const [dataProduct, setDataProduct] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    
    const handleClose = () => setShow(false)
    const handleCloseInsertMoney = () => setInsertMoneyShow(false)
    const handleCloseCharge = () => setShowTakeCharge(false)
    const handleCloseAlert = () => setShowAlert(false)
    const handleCloseOrder = () => setShowOrder(false)
    const handleCloseTakeCharge = () => setCharge(false)

    const api = 'http://localhost:3000/products'

    // get the product
    useEffect(()=>{
        axios.get(api).then((res) => {
            setDataProduct(res?.data ?? [])
        })
    },[isUpdate])
   
    useEffect(()=>{
        if(transaction.charge > 0){
            setCharge(true)
        }
    },[transaction])

    const moneyInputInfo = () => {
        let info = transaction.money.toString()
        if(info.length == 4){ return ( <p style={{fontWeight:"700"}}>{info[0]}rb</p> ) } 
        else if (info.length == 5){ return (<p style={{fontWeight:"700"}}> {info[0]}{info[1]}rb </p> ) }
        return (<img style={{width:'25px', height:'25px'}} src={process.env.PUBLIC_URL+'assets/deposit.png'} alt="" />
        )
    }

    // object for dates
    const dates = {
         date: new Date().getDate(),
         month: new Date().getMonth()+1,
         year: new Date().getFullYear(),
         day: new Date().getDay(),
         hours: new Date().getHours(),
         minutes: new Date().getMinutes(),
         daysNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
         monthsNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        
         getNewDate: function(){
            if(this.date > 3){
                return this.date+'th'
            }
            if(this.date == 1){
                return this.date+'st'
            }
            if(this.date == 2){
                return this.date+'nd'
            }
            if(this.date == 3){
                return this.date+'rd'
            }
         }
    }

    const sayGreeting = () => {
            if (dates.hours >= 19 && dates.hours <= 4){
                setGreeting({
                    greeting:'Good Night',
                    icon:'assets/night.png'
                })
            } else if (dates.hours >= 6 && dates.hours < 14) {
                setGreeting({
                    greeting:'Good Morning',
                    icon:'assets/morning.png'
                })
            } else if (dates.hours >= 15 && dates.hours< 18) {
                setGreeting({
                    greeting:'Good Afternoon',
                    icon:'assets/afternoon.png'
                })
            } else setGreeting({
                greeting:'Good Night',
                icon:'assets/night.png'
            })
    }

    useEffect(() => {
        sayGreeting()
    },[])
    
    // get all stock product
    useEffect(() =>{
        let result = 0
        dataProduct?.map(item => result += item.stock )
        setProduct(result)
    })

    const InsertMoney = () => {
        if(transaction.money < 1){
            setInsertMoneyShow(true)
        }
    }

    // take out the product 
    const takeOut = () => {
        setOrder(false)
        setShowOrder(true)
    }

    // process the order
    const makeTheProcess = () => {
        if(transaction.money < 1){
            return setShow(true)
        }
        const productData = transaction.products
        const totalArray = []

        productData.forEach((e)=>{
            totalArray.push(e.price)
            formData.push({id:e.id, name:e.name, price:e.price, stock:e.stock, img:e.img})
        })

        const change = transaction.money - totalArray.reduce((a,b) => a + b)
        if(change < 1){
            return setShowAlert(true)
        }
        
        setCharge(change)
        productData.forEach((e)=>{
            qtyProduct.push(e)
        })
        dispatch(buyProducts(change))
        setIsUpdate(true)
        updateStock()
        
    }

    // update stock product
    const updateStock = () => {
            let formDataUpdate = {
                id:0,
                name:'',
                stock:0,
                price:0,
                img:''
            }

            let newFormData = formData.sort((a,b) => {
                return a.id - b.id
            })

            for(let i = 0; i < newFormData.length; i++){
                for(let j in dataProduct){
                    if(newFormData[i].id === dataProduct[j].id){
                        formDataUpdate = {
                                id:dataProduct[j].id,
                                name:newFormData[i].name,
                                stock:newFormData[i].stock,
                                price:newFormData[i].price,
                                img:newFormData[i].img   
                            }
                            axios.put(api+'/'+dataProduct[j].id, formDataUpdate)
                               
                    }       
                }
            }
            setIsUpdate(false)
            setFromData([])
    }


    // take the charge out and reset everything back
    const takeOutChange = () => {
        //setChange(false)
        setShowTakeCharge(true)
       // dispatch(takeCharge())
       
    }

    const changeSections = () => {
        if(charge){
            return (
                <div style={styles.changesSectionOn} onClick={takeOutChange}>
                    <div style={styles.changeNotif}></div> 
                    <div style={styles.changesBoxOn}>
                        <img style={{width:'40px', height:'40px'}} src={process.env.PUBLIC_URL+'assets/money.png'} alt="" />
                    </div>
                </div>
            )
        }
        return (
            <div style={styles.changesSection}>
                <div style={styles.changesBox}>
                    <img style={{width:'40px', height:'40px'}} src={process.env.PUBLIC_URL+'assets/money.png'} alt="" />
                </div>
            </div>
        )
    }
    
    
    return (
        <div style={styles.inputGroupParent}>
            <FailedAlert show={show} handleClose={handleClose}/>
            <InsertMoneyModal show={showInsertMoney} handleClose={handleCloseInsertMoney} />
            <TakeChange show={showTakeCharge} handleClose={handleCloseCharge} handleCloseTakeChange={handleCloseTakeCharge}/>
            <AlertFailed show={showAlert} handleClose={handleCloseAlert} text={`There wasn't enough money`}/>
            <TakeOrder show={showOrder} handleClose={handleCloseOrder} product={qtyProduct} setQtyProduct={setQtyProduct}/>
            <div style={styles.header}>
                <div style={styles.products}>
                    <img style={{width:'25px', height:'25px'}} src={process.env.PUBLIC_URL+'assets/stock.png'} alt="" />
                    <p style={{fontSze:"16px"}}>{product}</p>
                </div>
            </div>

            <div style={styles.greetingContainer}>
                <div style={styles.greeting}>
                    <p><span style={{color:'#D191A4'}}>Hi</span>, {greeting.greeting}</p>
                    <div style={styles.greetingAdditional}>
                        <div style={styles.greetingIcon}>
                            <img style={{width:'30px', height:'30px', }} src={process.env.PUBLIC_URL+`${greeting.icon}` } alt="" />
                        </div>
                        <p style={styles.greetingInfo}>{dates.daysNames[dates.day]}, {dates.monthsNames[dates.month-1]} {dates.getNewDate()} {dates.year}</p>
                    </div>
                </div>
                <div style={styles.moneyInfo} className="infoMoney">
                    {moneyInputInfo()}
                </div>
            </div>

            <div style={styles.infoIcon}>
                <div style={{cursor:'pointer'}} onClick={InsertMoney} className="insertMoneyBtn">
                    <div style={styles.insertMoneyBox}>
                        <p>Insert Money</p>
                        <img style={{width:'12px', height:'12px', margin:'-10px 0px 0px 90% '}} src={process.env.PUBLIC_URL+'assets/insert-arrow.png'} alt="" />
                    </div>
                </div>
                {changeSections()}
                <div style={styles.orderButton} onClick={makeTheProcess} className="processBtn">
                    <p style={{ marginTop:'15px'}}>Process the order</p>
                    <img style={{width:'12px', height:'12px', marginTop:'0px' }} src={process.env.PUBLIC_URL+'assets/process-arrow.png'} alt="" />
                </div>
            </div>
           
            <div style={styles.doorContainer} onClick={takeOut} className="takeOutBtn">
                {qtyProduct.length > 0? 
                 <div style={styles.door}>
                     {qtyProduct.length > 0? <div style={styles.doorNotif}>{qtyProduct.length}</div> : null}
                     {qtyProduct.length < 5? qtyProduct.map((item, index) =>
                        <span key={index}>
                            <img style={{width:'24px', height:'24px', marginTop:'0px' }} src={process.env.PUBLIC_URL+'assets/products.png'} alt="" />
                        </span>
                     ):  <img  style={{width:'54px', height:'54px', marginTop:'0px' }} src={process.env.PUBLIC_URL+'assets/stock.png'} alt="" /> 
                     }
                 </div>
                :
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <div style={styles.emptyContainer}>
                        <img style={{width:'75px', height:'75px', marginLeft:'5px'}} src={process.env.PUBLIC_URL+'assets/empty-box.png'} alt="" />
                    </div>
                </div>
                }
               
               
            </div>
        </div>
    )
}

const styles = {
    inputGroupParent: {
        width:"31%",
        height:'88vh',
        borderRadius:'20px',
        marginBottom:'40px',
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
        display:'flex',
        backgroundColor:'rgba(255,255,255,0.30)',
        backgroundSize: "cover",
        flexDirection:'column'
    },
    products:{
        borderRadius:'15px',
        marginTop:'30px',
        backgroundColor:'#EED2CD',
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
        display:'flex',
        height:'45px',
        alignItems:'flex-start',
        paddingTop:'10px',
        width:"112px",
        justifyContent:'space-around'
    },
    infoIcon: {
        display:'flex',
        flexDirection:'row',
        width:'73%',
        flexWrap:'wrap',
        margin:'auto',
        justifyContent:'space-between',
    },
    orderButton:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        cursor:'pointer',
        backgroundColor:'#D191A4',
        padding:'5px 28px 5px 28px',
        color:'rgba(247,247,247)',
        fontSize:'16px',
        fontWeight:'500',
        marginTop:'10px',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:'20px',
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
    },

    insertMoneyBox:{
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
        padding:'20px',
        height:'fit-content',
        display:'flex',
        color:'white',
        fontWeight:'500',
        width:'110px',
        flexDirection:'column',
        justifyContent:'center',
        borderRadius:'20px',
        backgroundColor:'#C0BBED'
    },
    changesBox: {
        display:'flex',
        padding:'25px',
        height:'fit-content',
        justifyContent:'center',
        alignItems:'center',
        width:'100px',
        borderRadius:'20px',
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
    },
    changesBoxOn: {
        display:'flex',
        padding:'25px',
        height:'fit-content',
        width:'100px',
        borderRadius:'20px',
        justifyContent:'center',
        alignItems:'center',
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
        backgroundColor:'rgba(255,255,255,0.57)',
        cursor:"pointer"
    },
    changesInfo: {
        fontSize:'14px'
    },
    box: {
        border:'2px solid #49BD72',
        borderRadius:'5px',
        width:'88%',
        height:'85%',
        margin:'auto',
        padding:'5px'
    },
    greetingContainer: {
        display:'flex', 
        flexDirection:'row', 
        marginTop:'30px',
        marginBottom:'-22px',
        height:'fit-content',
    },
    greeting:{
        marginLeft:'17%',
        fontSize:'23px',
        width:'53%',
        display:'flex',
        flexDirection:'column',
        justifyContent:"flex-start",
        fontWeight:'400',
        lineHeight:'32px',
        marginTop:'-10px'
    },
    greetingInfo: {
        marginLeft:'5px', 
        marginTop:'20px', 
        lineHeight:'18px', 
        fontSize:'13px',
        width:'30vh',
    },
    greetingIcon:{
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)', 
        width:'55px', 
        padding:'7px', 
        height:'fit-content', 
        borderRadius:'15px', 
        backgroundColor:'white', 
        display:'flex', 
        justifyContent:'center',
    },
    greetingAdditional: {
        display:'flex',
        alignItems:'center',  
        marginTop:'-20px'
    },
    moneyInfo: {
        borderRadius:'15px',
        width:'27%',
        height:'54px',
        display:'flex',
        justifyContent:'Center',
        paddingTop:'15px',
        marginLeft:'auto',
        cursor:'pointer',
        marginTop:'0px',
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
    },
    changesSection:{
        paddingLeft:'10px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:'50%'
    },
    changesSectionOn:{
        paddingLeft:'10px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        cursor:'pointer',
        width:'50%'
    },
    doorContainer:{
        width:"73%",
        height:"130px",
        margin:'-15px auto auto auto',
        display:'flex',
        backgroundColor:'rgb(245,245,245,0.34)',
        justifyContent:'center',
        alignItems:'center',
        padding:'5px',
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
        borderRadius:'20px',
        cursor:'pointer',
    },
    emptyContainer: {
        width:'80%', 
        borderRadius:'20px', 
        height:'80%',
        padding:'10px 30px 10px 30px',
        backgroundColor:'rgba(57,57,57,0.10)',  
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)', 
        marginLeft:'10%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    door: {
        width:"73%",
        height:"50%",
        padding:'1px 1px 1px 1px',
        borderRadius:'5px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    doorUpper: {
        borderBottom:'3px solid rgba(77,77,77,1.27)',
        height:'20%',
    },
  
    doorNotif:  {
        width:'22px',
        height:'22px',
        borderRadius:'50%',
        marginLeft:'23vh',
        marginTop:'-19vh',
        textAlign:'center',
        fontSize:'12px',
        paddingTop:'2px',
        color:'white',
        backgroundColor:'tomato',
        position:'absolute'
    },
    changeNotif:  {
        width:'18px',
        height:'18px',
        borderRadius:'50%',
        marginLeft:'11vh',
        marginTop:'-14vh',
        backgroundColor:'tomato',
        position:'absolute'
    }
}