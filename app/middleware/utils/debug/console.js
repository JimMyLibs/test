
let log = {};

log.obj = (obj={},name='———————————————— name ————————————————',open=0)=>{
    name = `————————————————【 ${name} 】————————————————`
    if(open){
        console.group(name);
        console.table(obj)
        console.groupEnd(name);
    }else{
        console.groupCollapsed(name);
        console.table(obj)
        console.groupEnd(name);        
    }
}

export default log