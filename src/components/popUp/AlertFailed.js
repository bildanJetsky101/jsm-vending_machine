import React from 'react';
import { Alert } from 'react-bootstrap';
import './AlertFailed.css'

export default function AlertFailed({show, handleClose, text}) {

    return (
      <Alert style={styles.alert} show={show} onClose={handleClose} dismissible>
        <Alert.Heading>Oopss..!</Alert.Heading>
        <p className='content-alert'>
         {text}
        </p>
      </Alert>
    );
}

const styles = {
    alert: {
        color:'white', 
        backgroundColor:'#D191A4',
        borderStyle:'none',
        borderRadius:'20px',
        height:'90px',
        padding:'20px 25px 20px 25px',
        textAlign:'center',
        position:'absolute',
        boxShadow:'0px 8px 18px 0px rgba(77,77,77,0.27)',
    }
}
