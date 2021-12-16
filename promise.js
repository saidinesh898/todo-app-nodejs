const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// add(1, 2).then((result) => {
//     console.log(result)

//     add(result, 5).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })
// }).catch((e) => {
//     console.log(e)
// })

add(1, 2).then((result) => {
    console.log(result)
    return add(result, 5)
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})