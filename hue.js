const axios = require('axios')

let baseURL = "http://192.168.188.116/api/kYibW7kfMgNcVO8aOVU6-WhgDvk1JR7bWnwuagdb/"
let state = {
    groups:{
        Zimmer:{
            id:1,
            state: undefined
        }
    },
    scenes:{
        Zocken:{
            id:"J15Eq3ZI8o0xmDT",
            state: undefined
        },
        Fire:{
            id:"nnCxQ8vzAESYx6l",
            state: undefined
        },
        Dark:{
            id:"NAXkpPMysqTaIfk",
            state: undefined
        },
        LightColorDreamm:{
            id:"2hcllLNsL5HbqQI",
            state: undefined
        },
        ChillPC:{
            id:"NAXkpPMysqTaIfk",
            state: undefined
        },
        Konzentrieren:{
            id:"19cZQjWbSJIAIvJ",
            state: undefined
        },
        Hell:{
            id:"v9mpGWVPm1x3GJ8",
            state: undefined
        },    
    }
}

function activateScene(scene){
    let url = "http://192.168.188.116/api/kYibW7kfMgNcVO8aOVU6-WhgDvk1JR7bWnwuagdb/groups/1/action"
    let body ="{\"scene\": \""+scene.id+"\"}";
    axios.put(url,body)
}

function getRoomState(scene){
    axios.get("http://192.168.188.116/api/kYibW7kfMgNcVO8aOVU6-WhgDvk1JR7bWnwuagdb/groups/1/").then((res)=> {
        if(state.groups.Zimmer.state.on!== res.data.action.on){

        }    

        state.groups.Zimmer.state=res.data.action;

    })
}
function restoreState(scene){
    axios.put("http://192.168.188.116/api/kYibW7kfMgNcVO8aOVU6-WhgDvk1JR7bWnwuagdb/groups/1/action",state.groups.Zimmer.state)
}

//activateScene(state.scenes.Hell)

//setInterval(getRoomState,500)

function getPowerStatus(){
    axios.get("http://192.168.188.116/api/kYibW7kfMgNcVO8aOVU6-WhgDvk1JR7bWnwuagdb/groups/1/").then((res)=> state.groups.Zimmer.state=res.data.action)
}



exports.turnSub = (powerState) => {  
    console.log("HUE SW: "+ powerState)
    let SWURL =  "http://192.168.188.116/api/kYibW7kfMgNcVO8aOVU6-WhgDvk1JR7bWnwuagdb/lights/30/state"
    axios.put(SWURL, {"on":powerState})
}

exports.turnFan = (powerState) => {  
    console.log("HUE SW: "+ powerState)
    let SWURL =  "http://192.168.188.116/api/kYibW7kfMgNcVO8aOVU6-WhgDvk1JR7bWnwuagdb/lights/30/state"
    axios.put(SWURL, {"on":powerState})
}

exports.toogleFan = function(){
    axios.get('http://192.168.188.116/api/kYibW7kfMgNcVO8aOVU6-WhgDvk1JR7bWnwuagdb/lights/30/')
    .then(r => 
        axios.put("http://192.168.188.116/api/kYibW7kfMgNcVO8aOVU6-WhgDvk1JR7bWnwuagdb/lights/30/state", {"on": !r.data.state.on})
        )





  //  console.log("HUE SW: "+ powerState)
}


exports.turnLightsOn = (scene) => {  
    console.log("HUE Lights on, bright: " + scene)
    let SWURL =  "http://192.168.188.116/api/kYibW7kfMgNcVO8aOVU6-WhgDvk1JR7bWnwuagdb/groups/1/action"
    axios.put(SWURL, {"scene":state.scenes[scene].id})
}