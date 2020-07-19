class Promise {
    status = 'pending'
    data = null
    callbacks = []
    constructor(fn) {
        fn(this.resolve.bind(this))
    }

    resolve(value) {
        if (this.status === 'pending') {
            this.status = 'resolved'
            this.data = value
            this.callbacks.forEach(fn => fn(value))
        }
    }

    then(onResolve) {
        return new Promise((resolve) => {
            this.handleThen({
                onResolve,
                resolve
            })
        })

    }

    handleThen(fns) {
        if (this.status === 'pending') {
            this.callbacks.push(fns.onResolve)
        }
        if (!fns.onResolve) {                   //如果未传递回调函数，直接返回异步操作结果值
            fns.resolve(this.data)
        }
        const result = fns.onResolve(this.data) //传递了回调函数，用该函数处理异步操作结果值，并返回结果
        fns.resolve(result)
    }

}

const p = new Promise(resolve => {
    resolve('ok')
})

p.then(tip => {
    console.log(tip)
    return (tip + '返回一个promise')
}).then(value => {
    console.log(value)
})