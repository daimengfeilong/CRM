import { add }  from '../services/tags'

export default{
    namespace: 'tagsEdit',
    state:{
        propertys:[
            {
                id:'5dw5',
                name:'科比'
            },
            {
                id:'1d32fg31j',
                name:'学历',
                children:[
                    {
                        id:'tyuyt21rdg',
                        name:'大专3',
                    },
                    {
                        id:'56fdgf132',
                        name:'本科2',
                    }
                ]
            },
            {
                id:'ew5r421',
                name:'城市',
                children:[
                    {
                        id:'r645e132v',
                        name:'成都2',
                    },
                    {
                        id:'32cv15rt',
                        name:'上海1',
                    }
                ]
            },
            {
                id:'dfgg4',
                name:'测试1',
                children:[
                    {
                        id:'r645e1f32v',
                        name:'test3',
                    },
                    {
                        id:'32cv1d5rt',
                        name:'test00',
                        children:[
                            {
                                id:'r645et1f32v',
                                name:'test66',
                            },
                            {
                                id:'32cv21d5rt',
                                name:'test80',
                                children:[
                                    {
                                        id:'r645etu1f32v',
                                        name:'test7',
                                    },
                                    {
                                        id:'32cv2p1d5rt',
                                        name:'test30',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        showModel:false
    },
    reducers:{
        save(state, {payload}){
            return {
                ...state,
                ...payload
            }
        },
        showModel(state, {payload}){
            return {
                ...state,
                showModel:payload
            }
        }
    },
    effects: {
        *add({ payload }, { call, put, select }){
            const res = yield call(add,payload)
            
            return res
        },
    }
}