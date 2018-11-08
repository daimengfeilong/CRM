import { Modal } from 'antd'
import { timestampToDate } from '../../../utils/utils'



const TagModal=({dispatch,description,showTagModel,tagItem})=>{




  const handleCancel=()=>{
    dispatch({ type: 'userDetail/save',payload:{showTagModel:false}});
  }

  const submit=()=>{
    dispatch({ type: 'userDetail/save',payload:{showTagModel:false}});
  }

  return(
    <Modal
      title="标签解释"
      width="400px"
      okText="确定"
      afterClose={handleCancel}
      onCancel={handleCancel}
      visible={showTagModel}
      onOk={submit}>
        <div className="user_portrait_content">
          <div>
            修改时间： {(tagItem.updtDate!==undefined)?timestampToDate(tagItem.updtDate):'无'}
          </div>

          <div>
            标签所属：{(tagItem.classification!=='(null)'&&tagItem.classification!==null&&tagItem.classification!==undefined)?tagItem.classification.className:'无' }
          </div>

          {/*<div>*/}
            {/*标签规则：*/}
          {/*</div>*/}

          <div>
            标签解释：{tagItem.description}
          </div>
        </div>
    </Modal>
  )
}

export default TagModal
