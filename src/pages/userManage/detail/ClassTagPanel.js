import { Checkbox,Row,Col } from 'antd';
const CheckboxGroup = Checkbox.Group;


const showClassOptions=(data)=>{
    return data.map((item)=>{
        return item.className
    })
}
const getMaxFloor=(treeData)=> {
  let floor = 0
  let max = 0
  function each (data, floor) {
    data.forEach(e => {
      e.floor = floor
      if (floor > max) {
        max = floor
      }
      if (e.children!=undefined&&e.children.length > 0) {
        each(e.children, floor + 1)
      }
    })
  }
  each(treeData,1)
  return max
}
const getData = (data) => {
  return data.map((item) => {
      let temp = {}
      if (item.classId != undefined) {
        temp.id = item.classId
        temp.name = item.className
      }else {
        temp.id = item.tagId
        temp.name = item.tagId
      }
     if (item.tagList) {
       temp.tagList=getData(item.tagList)
     }
      return temp
  }).filter((item, i, self) => item && self.indexOf(item) === i);
}

const ClassTagPanel =({dispatch,userTagList})=>{

  const  datas=getData(userTagList);
  const  maxFloor=getMaxFloor(datas)
  console.log(maxFloor)
  console.log(datas)


  let checksItem=[]
  const onChange=(checkedValues)=> {
    checksItem=checkedValues
    console.log('checked = ', checkedValues);
  }


  const classOptions =  showClassOptions(userTagList)

  return(
    <>
      <div>
        标签类型： <CheckboxGroup options={classOptions} onChange={onChange} />
      </div>


      <Row>
        <Col span={2}>
          <div className="floor">
            标签
          </div>
        </Col>
        <Col span={20}>
          <CheckboxGroup options={classOptions} onChange={onChange} />
        </Col>
      </Row>

    </>
  )

}
export default ClassTagPanel



