import { query,add,queryId,del }  from '../services/tags'

export default{
    namespace: 'tagsEdit',
    state:{
        tags:[],
        data:{},
        showModal:false
    },
    reducers:{
        save(state, {payload}){
            return {
                ...state,
                ...payload
            }
        },
        showModal(state, {payload}){
            return {
                ...state,
                showModel:payload
            }
        }
    },
    effects: {

    }
}