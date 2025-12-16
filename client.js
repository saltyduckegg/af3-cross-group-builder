const addGroupBtnEl=document.getElementById("add-group-btn")
const removeGroupBtnEl=document.getElementById("remove-group-btn")
const groupNumEl=document.getElementById("group-num")
const mainContainerEl=document.getElementById("main-container")

let groupList=[]


groupList.push(new GroupBoxConstructor(1, 0))
refreshGroupWindow()

console.log(groupList[0])

function GroupBoxConstructor(index, conpareGroupNum) {
    this.index = index
    this.conpareGroupNum = conpareGroupNum
    this.conpareGroupList=[]
    this.uniqId="Group-"+String(index)
    this.uniqIdAdd=this.uniqId+"-Add"
    this.uniqIdRemove=this.uniqId+"-Remove"
    this.addConpareGroup = function(){
        this.conpareGroupList.push(new ConpareGroupBoxConstructor(this.conpareGroupList.length))
    }
    this.removeConpareGroup = function(){
        this.conpareGroupList.pop()
    }
    this.htmlStr = function() {
        console.log('GroupBoxConstructorBuilder'+`${this.conpareGroupList}`);
        return makeGroupHTMLstr(this.index,this.conpareGroupNum,this.conpareGroupList,this.uniqIdAdd,this.uniqIdRemove)
    }
    this.Add=function() {
        console.log('clickAdd++');
        this.addConpareGroup()
        this.conpareGroupNum++  
        refreshGroupWindow()
              
    }
    this.Remove=function(){
        console.log('clickRemove--');
        this.removeConpareGroup()
        this.conpareGroupNum-- 
        refreshGroupWindow()   
           
    }
    this.btnListener=function(){
        const btnAdd=document.getElementById(this.uniqIdAdd)
        const btnRemove=document.getElementById(this.uniqIdRemove)  
        console.log(this.uniqIdAdd)
        console.log(btnAdd)     
        btnAdd.addEventListener("click",this.Add.bind(this))
        btnRemove.addEventListener("click",this.Remove.bind(this)) 
    }
    this.Add()


  


    
}


function ConpareGroupBoxConstructor(index, name="testProtin",classes="protin",seq="GWW") {
    this.index = index
    this.name = name
    this.classes=classes
    this.seq=seq
    this.htmlStr = function() {
        console.log('ConpareGroupBoxConstructorBuilder');
        return makeCompareGroupHTMLstr(this.index, this.name,this.classes,this.seq)
    }
}


let startGroupNum=1

addGroupBtnEl.addEventListener("click",function(){
  console.log('clickAdd');
  changeNumber(1)
  groupList.push(new GroupBoxConstructor(startGroupNum, 0))
  refreshGroupWindow()
})

removeGroupBtnEl.addEventListener("click",function(){
  console.log('clickremove');
  changeNumber(-1)
  groupList.pop()
  refreshGroupWindow()
})

groupNumEl.innerText=startGroupNum

function changeNumber(addNum){
  startGroupNum+=addNum
  groupNumEl.innerText=startGroupNum
  
}

function refreshGroupWindow(){
//   mainContainerEl.innerHTML+= instance1.htmlStr()
    console.log(groupList)
  let tmphtmlStr=''
  for (let i=0;i<groupList.length;i++){
    tmphtmlStr+=groupList[i].htmlStr()
  }
  mainContainerEl.innerHTML=tmphtmlStr
  for (let i=0;i<groupList.length;i++){
    groupList[i].btnListener()
  }
  
}


function makeCompareGroupHTMLstr(index, name,classes,seq){
    const str=` <div class="group-container-single">
                            <label>seq:</label><span>${index}</span>
                            <div>
                                <label>名称：</label>
                                <input placeholder="${name}">
                            </div>
                            <div>
                                <label>类型：</label>
                                <input placeholder="${classes}">
                            </div>
                            <div>
                                <label>序列：</label>
                                <input placeholder="${seq}"> 
                            </div>                           
                        </div>
                        `
    return str
}

function makeGroupHTMLstr(groupNum,conpareGroupNum,conpareGroupList,uniqIdAdd,uniqIdRemove){
    let conpareGroupStr=''
    for (let i=0;i<conpareGroupList.length;i++){
        conpareGroupStr+=conpareGroupList[i].htmlStr()
    }
    const str=`
              <div class="group-container">
                    <div >
                        <h2>组${groupNum}</h2>
                        <div class="group-detail-container">
                            <div>
                                <label>比较组数:</label>
                            </div>
                            <div>
                                <p >${conpareGroupNum}</p>
                            </div>
                            <div>
                                <button id="${uniqIdAdd}" >+</button>
                            </div>
                            <div>
                                <button id="${uniqIdRemove}" >-</button>
                            </div>
                        </div>
                    </div>
                    <div class="group-container-down">
                    ${conpareGroupStr}
                    </div>                
                </div>`
  return str

}



