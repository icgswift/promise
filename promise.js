class Promise {
    status = 'pending'
    data= null
    callbacks = []
    constructor(fn) {
        fn(this.resolve.bind(this))
    }

    resolve(value) {
        this.status = 'resolved'
        this.data = value
        this.callbacks.forEach(fn => fn(value))
    }

    /* 
        添加状态，并用data保存resolve的value值
    */

    then(fulfilled) {
        if (this.status === 'pending') {
            this.callbacks.push(fullfilled)
        } else {
            fulfilled(this.data)
        }
        return this
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

setTimeout(() => {
    p.then((data) => {
        console.log(data)
    })
})