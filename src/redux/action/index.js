export function addMoney(inputMoney){
    return{
        type: 'ADD_MONEY',
        payload:{money: inputMoney}
    }
}

export function addProduct(products){
    return{
        type: 'SELECT_PRODUCT',
        payload:{products: products}
    }
}

export function buyProducts(chage){
    return{
        type: 'BUY_PRODUCT',
        payload:{charge: chage}
    }
}

export function takeChange(){
    return{
        type: 'TAKE_CHANGE',
    }
}