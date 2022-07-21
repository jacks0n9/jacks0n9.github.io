var actionObjConstructor={
    timestamp:0,
    id:"",
    data:{}
}
function actionObj(timestamp,id,data){
    actionObjNew=Object.create(actionObjConstructor)
    actionObjNew.timestamp=timestamp
    actionObjNew.id=id
    actionObjNew.data=data
    return actionObjNew
}
function generateSaveString(earnHistory){
    var saveString=""
    for (const action of earnHistory){
        console.log(action)
        dataStr=""
        if (action.data!={}){
            for(const [key,val] of Object.entries(action.data)){
                dataStr+=key+"="+val+","
            }
            dataStr[-1]=""
        }
        saveString+=action.timestamp+";"+action.id
    }
}
// Format:
// <time stamp in seconds since unix epoch>;<action>;key=val;
var earnHistory=[]
var mod_obj={
    init:function(){
		Game.registerHook("click",()=>{
            earnHistory.push(actionObj(Math.floor(new Date().getTime()/1000),"click",{}))
            console.log(earnHistory)
        })
	},
	save:function(){
	    //use this to store persistent data associated with your mod
		return generateSaveString(earnHistory);
	},
	load:function(str){
		//do stuff with the string data you saved previously
	}
}
Game.registerMod("ccac",mod_obj)
