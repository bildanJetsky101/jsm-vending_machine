import Card from './Card'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../redux/action'
import axios from 'axios'
import AlertFailed from './popUp/AlertFailed'

export default function ProductList () {
    const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    const [dataProduct, setDataProduct] = useState([])
    const [showAlertMoney, setShowAlertMoney] = useState(false)
    const handleCloseAlertMoney = () => setShowAlertMoney(false)
    const [connection, setConnection] = useState({stats:true, err:''})
    const updated = useSelector(state => state.flow)
    const api = 'http://localhost:3000/products'

    useEffect(()=>{
        dispatch(addProduct(product))
       
    },[product])
    

    // fething new data every updated
    useEffect(()=>{
        axios.get(api).then((res) => {
            setDataProduct(res?.data ?? [])
        }).catch(err => {
            console.error('something wrong.... \n'+err)
            setConnection({stats:false, err:err.code})
          })
    },[updated])
    
    return(
        <div style={styles.container}>
        <AlertFailed show={showAlertMoney} handleClose={handleCloseAlertMoney} text={`The money may not enough`}/>
            {connection?.stats?
                dataProduct?.map((item, index) =>
                <span key={index} >
                    <Card item={item} product={product} setProduct={setProduct} setShowAlertMoney={setShowAlertMoney} handleCloseMoney={handleCloseAlertMoney} /> 
                </span>)  :   
                <div style={styles.connnectionFiled}>
                    <img style={{width:'45px', height:'45px', marginBottom:'10px',}}src={process.env.PUBLIC_URL+'assets/warning2.png'} alt="" />
                    <h3>Failed load data from json server:</h3>
                    <h4 style={{color:'salmon'}}>{connection?.err}</h4>
                 </div>   
            }
        </div>
    )
}

const styles = {
    container:{
        width:"75%",
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:'auto',
        marginLeft:'12px',
        justifyContent:'flex-start'
    },
    connnectionFiled: {
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)', 
        margin:'auto', 
        marginTop:'27%', 
        padding:'29px',
        width:'75%', 
        backgroundColor:'rgb(255,255,255,0.34)', 
        borderRadius:'20px', 
        textAlign:'center'
    }
}