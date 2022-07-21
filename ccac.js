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
function getTimeInSeconds(){
    return Math.floor(new Date().getTime()/1000)
}
// Format:
// <time stamp in seconds since unix epoch>;<action>;key=val;
var prevObjects={}
var earnHistory=[]
var mod_obj={
    init:function(){
		Game.registerHook("click",()=>{
            earnHistory.push(actionObj(getTimeInSeconds(),"click",{}))
            console.log(earnHistory)
        })
        Game.registerHook("check",()=>{
            var objects=Object.create(Game.ObjectsByID)
            if(prevObjects!={}){
                for(const [index,obj] of objects.entries()){
                    var prevObjAmount=prev_objects[index].amount
                    if(obj.amount>prevObjAmount){
                        earnHistory.push(actionObj(getTimeInSeconds(),"buyObject",{amount:obj.amount-prevObjAmount,building_id:obj.single}))
                        console.log("Bought building: "+obj.single)
                    }else if(obj.amount<prevObjAmount){
                        earnHistory.push(actionObj(getTimeInSeconds(),"sellObject",{amount:prevObjAmount-obj.amoun,building_id:obj.single}))
                        console.log("Sold building: "+obj.single)
                    }
                }
            }
            prev_objects=objects
        })
	},
	save:function(){
	    //use this to store persistent data associated with your mod
		return generateSaveString(earnHistory);
	},
	load:function(save){
		console.log(save)
	}
}
Game.registerMod("ccac",mod_obj)
