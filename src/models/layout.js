import request  from '../utils/request'
import {getQueryString}  from '../utils/utils'

export default{
    namespace: 'layout',
    state:{
        collapsed:false
    },
    reducers:{
        toggle(state, action){
            return {collapsed:!state.collapsed}
        }
    }
}