/**
 * 父子关系数据转tree
 * @returns tree[]
 */

//属性配置设置,可以改造成传参进来
const attr = {
    id: 'attrId',
    parendId: 'parentAttrId',
    name: 'attrName',
    rootId: '00'
};

function toTreeData(data) {
    let tree = [];
    let resData = data;
    for (let i = 0; i < resData.length; i++) {
        if (resData[i].parentAttrId === attr.rootId) {
            let obj = {
                id: resData[i][attr.id],
                name: resData[i][attr.name],
                children: []
            };
            tree.push(obj);
            resData.splice(i, 1);
            i--;
        }
    }
    var run = function (treeArrs) {
        if (resData.length > 0) {
            for (let i = 0; i < treeArrs.length; i++) {
                for (let j = 0; j < resData.length; j++) {
                    if (treeArrs[i].id === resData[j][attr.parendId]) {
                        let obj = {
                            id: resData[j][attr.id],
                            name: resData[j][attr.name],
                            children: []
                        };
                        treeArrs[i].children.push(obj);
                        resData.splice(j, 1);
                        j--;
                    }
                }
                run(treeArrs[i].children);
            }
        }
    };
    run(tree);
    return tree;
}

export default toTreeData