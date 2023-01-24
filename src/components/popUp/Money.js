import { useState } from 'react'
import './InsertMoney.css'
import './Money.css'

export default function Money({item, index, identify, setIdentify}){
    const [name, setName] = useState(null)

    const handleMouseEnter = (e) => {
        setName(e._targetInst.memoizedProps.accessKey)
     };
    
    const handleMouseLeave = () => {
    }
    // handle virtual money select
    const changeOnClick = (index) => {
        if(name === identify?.money && index === identify?.index){
            setIdentify({index:0, money:''})
        } else {
            setIdentify({index:index, money:name})
        }
    }

    const styles = (index) => {
        if(name === identify?.money && index === identify?.index) {
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
                transform:'scale(1.10)',
                backgroundColor:'rgba(255,255,255,0.75)',
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
            <div onMouseEnter={(item) => handleMouseEnter(item)} className="money" 
            style={styles(index)} accessKey={item}  onClick={() => changeOnClick(index)}>
               <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start',}}>
                    <span style={{}}>Rp.</span>
                    <h5 >{item}</h5>
               </div>
               <div className="footer">
                    <p style={{textAlign:'right', margin:'10px'}}>Virtual Money</p>
               </div>
            </div>
        )
    
}
