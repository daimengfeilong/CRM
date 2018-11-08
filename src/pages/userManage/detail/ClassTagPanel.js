import { Checkbox,Tag,Card } from 'antd';
import TagModal from './TagModal'
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

const ShowTags =({checkedValues,allData,dispatch})=>{

  const showTag=(tagId)=>{
    dispatch({ type: 'userDetail/queryId',payload:tagId})
    .then(data=>{
      if (data.code==='0000'){
        dispatch({ type: 'userDetail/save',payload:{showTagModel:true}});
      }
    })
  }

  return allData.map((item)=>{
      return (
        <Tag color="blue" key={item.tagId} onClick={() => showTag(item.tagId)}>{item.tagName}</Tag>
      )
    })
}




const difference = (a,b) => {
  //找出两个数组之间的差集
  const difference = a.concat(b).filter(v => !a.includes(v) || !b.includes(v))

  return difference[0]
}
const ClassTagPanel =({dispatch,userTagList,allData,checkedValues,showTagModel,tagItem})=>{

  // const  datas=getData(userTagList);
  // const  maxFloor=getMaxFloor(datas)
  // console.log(maxFloor)
  // console.log(datas)
  const showTagPorps={
    dispatch,
    showTagModel,
    tagItem,
    checkedValues,
    allData
  }


  const tagPorps={
    dispatch,
    showTagModel,
    tagItem,
  }

  const onChange=(nowValues)=> {
    let classId=''
    if (nowValues.length !== checkedValues.length) {
      if (nowValues.length>checkedValues.length) {
        const className= difference(nowValues,checkedValues)
          userTagList.map((item)=>{
           if (item.className==className) {
             classId= item.classId
           }
         })
        dispatch({ type: 'userDetail/queryTagsByClassId',payload:classId});
        // dispatch({ type: 'userDetail/saveFilter',payload:{classId,type:'add'}});
      }else {
        const className= difference(nowValues,checkedValues)
        console.log(className)
         userTagList.map((item)=>{
          if (item.className==className) {
            classId= item.classId
          }
        })
        dispatch({ type: 'userDetail/saveFilter',payload:{classId}});
      }
    }
    dispatch({ type: 'userDetail/save',payload:{checkedValues:nowValues}});
  }
  const classOptions =  showClassOptions(userTagList)
  // console.log(showTags(checkedValues,allData))
  return(
    <>
      <TagModal {...tagPorps}/>
      <div>
        标签类型： <CheckboxGroup options={classOptions} onChange={onChange} />
      </div>
      <Card className="manageTop">
        {/*{showTags(checkedValues,allData,dispatch)}*/}
        <ShowTags {...showTagPorps}/>
      </Card>
    </>
  )

}
export default ClassTagPanel



