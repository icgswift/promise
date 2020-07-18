class Promise {
    callbacks = []
    constructor(fn) {
        fn(this.resolve.bind(this))                      //1.创建实例时立即执行传入的函数，并将resolve函数作为参数传入(便于该函数里面可以调用resolve函数)
    }

    resolve(value) {                                                                     //4.resolve函数将异步操作返回的结果value传递给回调函数执行
        this.callbacks.forEach(fn => fn(value))                             
    //函数的this取决于其执行环境，实例的原型让实例能找到方法，方法的this取决于是哪个实例 
    //resoolve函数本身没有this：Cannot read property 'callbacks' of undefined
    }

    then(fullfilled) {
        this.callbacks.push(fullfilled)                       //2.注册回调
    }
}

new Promise(resolve => {
    setTimeout(() => {                                                  //3.当异步操作执行完调用resolve函数
        resolve('ok')
    })
}).then(tip => {
    console.log(tip)
})