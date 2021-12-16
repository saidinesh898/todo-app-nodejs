const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject('Negative numbers are not allowed')
            }
            resolve(a + b)
        }, 500)
    })
}

const doWork = async() => {
    const sum = await add(1, 2)
    const sum2 = await add(sum, 2)
    const sum3 = await add(sum2, 2)
    const sum4 = await add(sum3, 2)
    return sum
}

doWork().then(result => {
    console.log(result)
}).catch((e) => {
    console.log('e', e)
})