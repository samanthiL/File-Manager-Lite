export const initState = {
    data : [],
    loading : false
}

export const reducer = (state,action) =>{
    if(action.type=="ADD_DATA"){
       return{
           ...state,
           data:action.payload
       }
    }
    if(action.type=="SET_LOADING"){
        return{
            ...state,
            load:action.payload
        }
    }
    return state
}