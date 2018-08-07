import Mock from 'mock';

const List = []
const count = 100

const array = [
    { type: '资产', category: ['流动资产', '非流动资产'] },
    { type: '负债', category: ['流动负债', '非流动负债'] },
    { type: '共同', category: ['共同'] },
    { type: '权益', category: ['所有者权益'] },
    { type: '成本', category: ['成本'] },
    { type: '损益', category: ['营业收入', '其他收益', '期间费用', '其他损失', '营业成本及税金', '以前年度损益调整', '所得税'] }
]

for (let i = 0;i< count;i++){
    List.push(Mock.mock({
        id: '@increment',
        subjectCode: '@string("number", 4, 8)',
        subjectName: '@cword(3, 5)',
        subjectType: array[i % 6].type,
        categoryList: array[i % 6].category,
        subjectCategory: array[i % 6].category[0],
        parentSubject: '',
        'balanceDirection|1': ['借', '贷'][i % 2],
        subjectStatus: '@boolean',
        'auxiliaryAccounting|1': ['客户', '供应商', '职员', '部门', '项目', '存货', '现金流'][i % 7],
        quantitativeAccounting: true,
        measurementUnit: '@cword(1)',
        foreignCurrencyAccounting: true,
        'foreignCurrency|1': ['RMB', 'USD'][i % 2]
    }))
}

export default{
    getArray:()=>{
        return {
            code:20000,
            data:array
        }
    },
    getList:config=>{
        const {type,page =1,limit = 20} = param2Obj(config.url);
        const mockList = List.filter(item =>type && item.subjectType === type)
        const pageList = mockList.filter((item,index)=>index<limit*page &&index>= limit*(page-1));

        return {
            code:20000,
            data:{
                total:mockList.length.subjectType,
                items:pageList
            } 
        }
    },
    addData:config=>{
        const data = JSON.parse(config.body)
        List.unshift(data)
        return {
            code:20000
        }
    },
    editData:config=>{
        const data = JSON.parse(config.body)
        const index = List.findIndex((item)=>{
            return item.id === this.form.id
        })
        List.splice(index,1,data)
        return {
            code :20000
        }
    }
}