export const chainCall = ()=>{    
    const block = '■■■■■■■■■■■■■■■■■■■■■■■■';
    Promise.resolve(true).then(res=>{
        console.log('开始',block);
        return fn1();
    }).then(res=>{
        console.log('fn1',res)
        return fn2();
    }).then(res=>{
        console.log('fn2',res)
        return fn3();
    }).then(res=>{
        console.log('fn3',res)
        return fn4();
    }).then(res=>{
        console.log('fn4',res)
        return console.log('结束',block);
    })
}