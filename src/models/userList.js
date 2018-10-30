export default {
  namespace: 'userList',
  state: {
    count: 0,
    things:[]
  },
  reducers: {
    'add' (state) {
      return {
        ...state,
        count: state.count + 1,
      }
    },
    'minus' (state) {
      return {
        ...state,
        count: state.count - 1,
      }
    },
    'addThings'(state,{payLoad}){
      let { things } = state
      if(!things){
        things = []
      }
      console.log(payLoad)

      return{
        ...state,
        things:[...things,payLoad]
      }
    },
    'delete'(state,{payload: id}){
      return{
        ...state,
        things:state.things.filter(item => item.id !== id)
      }
    }
  },
}

