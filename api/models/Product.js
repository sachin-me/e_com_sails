module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        des: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        images: {
            type: 'json', columnType: 'array'
        },
        category: {
            type: 'string'
        }
    }
}