import { useState } from 'react'
import './InsertMoney.css'
import './Money.css'

export default function Money({item, index, identify, setIdentify, isTrue, setIsTrue}){
    const [name, setName] = useState(null)

    const handleMouseEnter = (e) => {
        setName(e._targetInst.memoizedProps.accessKey)
     };
    
    // handle virtual money select
    const changeOnClick = (index) => {
        if(isTrue && name == identify.money){
            setIsTrue(false)
            setIdentify(null)
        } else {
            setIdentify({index:index, money:name})
            setIsTrue(true)
        }
    }

    const styles = () => {
        if(name == identify?.money && isTrue) {
            return {
                padding:'10px 0px 10px 0px',
                marginRight:'7px',
                marginTop:'7px',
                height:'90px',
                width:'150px',
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-evenly',
                alignItems:'center',
                borderRadius:'20px',
                cursor:'pointer',
                transform:'scale(1.15)',
                backgroundColor:'rgba(255,255,255,0.70)',
                boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
            }
        }
        return {
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

        return (
            <div onMouseEnter={(item) => handleMouseEnter(item)} 
            style={styles()} accessKey={item}  onClick={() => changeOnClick(index)}>
               <div >
                    <span style={{marginRight:'auto'}}>Rp.</span>
                    <h5 >{item}</h5>
               </div>
               <div className="footer">
                    <p style={{textAlign:'right', margin:'10px'}}>Virtual Money</p>
               </div>
            </div>
        )
    
}
