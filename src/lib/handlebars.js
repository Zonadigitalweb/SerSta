const moment = require("moment")

moment.locale("es")

const helpers ={}


helpers.momentD= (timestamp)=>{ 
  
    let fecha= moment(timestamp).format("dddd LL");
     return fecha
 }
helpers.momentH= (timestamp)=>{ 
  
    let fecha= moment(timestamp).format("YYYY-MM-DD hh:mm");
     return fecha
 }
helpers.moment= (timestamp)=>{ 
  
   let fecha= moment(timestamp).format("yyyy-MM-DD");
    return fecha
}
helpers.momentDay= (timestamp)=>{ 
  
    let fecha= moment(timestamp).format("DD");
     return fecha
 }
helpers.momentMot= (timestamp)=>{ 
  
    let fecha= moment(timestamp).format("MM");
     return fecha
 }
helpers.momentYea= (timestamp)=>{ 
  
    let fecha= moment(timestamp).format("YYYY");
     return fecha
 }
module.exports=helpers