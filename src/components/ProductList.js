import Card from './Card'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../redux/action'
import axios from 'axios'

export default function ProductList () {
    const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    const [dataProduct, setDataProduct] = useState([])
    const updated = useSelector(state => state.flow)
    const api = 'http://localhost:3000/products'

    useEffect(()=>{
        dispatch(addProduct(product))
    },[product])

    // fething new data every updated
    useEffect(()=>{
        axios.get(api).then((res) => {
            setDataProduct(res?.data ?? [])
        })
    },[updated])
    
    return(
        <div style={styles.container}>
            {dataProduct?.map((item, index) =>
                <span key={index} >
                    <Card item={item} product={product} setProduct={setProduct}/> 
                </span>
            )}
        </div>
    )
}

const styles = {
    container:{
        width:"65%",
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:'auto',
        marginLeft:'12px',
        justifyContent:'flex-start'
    }
}