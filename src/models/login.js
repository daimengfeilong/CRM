import {login}  from '../services/login'

export default{
    namespace:'login',
    state:{

    },
    reducers:{

    },
    effects:{
        *login({payload}, { call, put, select }){
            const res = yield call(login,payload)

            return res
        }
    }
}