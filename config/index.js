const com = {
    IP: JSON.stringify('xxx')
}
module.exports = {
    dev: {
        env: {
            TYPE: JSON.stringify('dev')
        },
        ...com
    },
    build: {
        env: {
            TYPE: JSON.stringify('prod')
        },
        ...com
    }
}