class Promise {
    callbacks = []       //数组，可以多次添加回调
    constructor(fn) {
        fn(this.resolve.bind(this))
    }

    resolve(value) {
        setTimeout(() => {                            //在回调函数注册后执行回调函数
            this.callbacks.forEach(fn => fn(value))
        })
    }

    then(fullfilled) {
        this.callbacks.push(fullfilled)
        return this                              //实现简单链式调用，重复注册回调函数
    }
}

const p = new Promise(resolve => {
    resolve('ok')
})

p.then(tip => {
    console.log(tip)
}).then(value => {
    console.log(value)
})

setTimeout(() => {                    //在resolve函数setTimeout之后的回调无法再添加到队列
    p.then((data) => {
        console.log(data)
    })
})