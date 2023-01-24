const initialState ={
    money:0,
    products:[],
    wallet: 0,
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
                wallet:0,
                charge: state.charge += action.payload.charge
            }
        case 'TAKE_CHANGE':
            return{
                money:0,
                products:[],
                wallet: state.charge,
                charge: 0,
            }
            case 'TO_WALLET':
                return{
                    money:0,
                    products:[],
                    wallet: 0,
                    charge: 0,
                }
        default:
            return state;
    }
}

export default flowReducer;   