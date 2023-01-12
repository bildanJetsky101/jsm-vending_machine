import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import AlertFailed from "./popUp/AlertFailed"

export default function Card({item, product, setProduct}){
    const[select, setSelect] = useState({
        counter:0,
        status:false,
    })
    const [showAlert, setShowAlert] = useState(false)
    const [emptyStock, setEmptyStock] = useState(false)
    const handleCloseAlert = () => setShowAlert(false)
    const money = useSelector(state => state.flow.money)

    useEffect(()=>{
       if(money < 1){
            setProduct([])
            setSelect({
                counter: 0,
                status:false
            }) 
    }
    },[money])

    const onClickProduct = (item) => {
        if(item.stock <= 0){
            return setEmptyStock(true)
        }
        if(money < 1){
            return null
        }
        if(!select.status) {
            setProduct([...product, 
                {
                    id:item.id,
                    price:item.price, 
                    name:item.name,
                    stock:item.stock-1,
                    img:item.img
                }])
            if(select.counter === 0 ) { 
                setSelect({
                    counter:1,
                    status:true,
                }) 
            }
            else return null
        } else {
            let id = item.id
            setSelect({counter:0, status:false})
            let setProductNew = product
            for(let i in product){
                if(setProductNew[i].id == id){
                    setProductNew.splice(i,1)
                }
            }
            setProduct(setProductNew)
        }
    }

    const styles = {
        cardParent:{
            width:'174px',
            height:'275px',
            borderRadius:"20px",
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            cursor: !emptyStock? 'pointer' : '',
            boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
            backgroundColor: select.status? '#D191A4' : 'rgba(255,255,255,0.40)',
            marginRight:"11px",
            color: select.status? 'rgba(2,2,2,0.80)': '',
            marginTop:"11px",
            transform: select.status? 'scale(1.03)' : '',
            border:'none'
        },
        infoCard:{
            fontSize:'14px',
            boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
            backgroundColor: select.status? 'rgba(224,224,224,0.77)' : 'rgba(247,247,247,0.26)', 
            paddingTop:'18px',
            width:'70%',
            height:'65px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:'20px', 
            lineHeight:'3px', 
            marginTop:'6px', 
        },
        imgProduct :{
            marginTop:select.status? '65px' : '20px',
            width:'130px',
            height:'130px'
        },
        stockInfo:{
            height:'35px',
            width:'70px',
            marginTop:'10px',
            marginLeft:'auto',
            backgroundColor: select.status? 'white' : 'rgba(57,57,57,0.10)',
            textAlign:'center',
            borderRadius:'5px',
            display:'flex',
            boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
            justifyContent:"space-around",
            paddingTop:'7px'
        }
    }

    const infoStockFunction = () => {
        return (
            <>
                 { !select.status? 
                <div style={styles.stockInfo}>
                    <img style={{width:'20px', height:'20px'}} src={process.env.PUBLIC_URL+'assets/products.png'} alt="" />
                    <p style={{fontSize:'13px'}}>{item.stock}</p>
                </div>
                : null }
            </>
        )
    }

    return (
        <div style={styles.cardParent}  onClick={() => onClickProduct(item)} >
            <AlertFailed show={showAlert} handleClose={handleCloseAlert} text={`You need to insert the money first to select the product.`}/>
              {emptyStock ?  <div style={styles.stockInfo}>
                  <p style={{fontSize:'13px'}}>Empty</p>
              </div> : infoStockFunction()
              
              }
            <img style={styles.imgProduct} src={process.env.PUBLIC_URL+'assets/'+item.img} alt="" />
            <div style={styles.infoCard}>
                <p style={{fontWeight:'300'}}>{item.name}</p>
                <p style={{fontWeight:'500'}}>Rp. {item.price}</p>
            </div>
        </div>
    )
}

