import request  from '../utils/request'

export default{
    namespace:'login',
    state:{

    },
    reducers:{

    },
    effects:{
        *login({payload}, { call, put, select }){
            const res = yield request({
                url:'/api/login',
                method:'POST',
                data:payload
            })

            return res
        }
    }
}