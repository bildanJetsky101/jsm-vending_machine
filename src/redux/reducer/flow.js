const initialState ={
    money:0,
    products:[],
    stockDecreast:false,
    charge:0,
}

const flowReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_MONEY':
            return{
                ...state,
                money: action.payload.money
            }
        case 'SELECT_PRODUCT':
            return{
                ...state,
                products: action.payload.products
            }
        case 'BUY_PRODUCT':
            return{
                money:0,
                products:[],
                stockDecreast:true,
                charge: state.charge += action.payload.charge
            }
        case 'TAKE_CHARGE':
            return{
                money:0,
                products:[],
                stockDecreast:false,
                charge: state.charge -= state.charge
            }
        default:
            return state;
    }
}

export default flowReducer;   