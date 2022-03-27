const Redis = require('redis')
const client = Redis.createClient()

//client.connect()

async function getCache(key, data) {
    const exists = await client.exists(key)
    if (exists === 0) {
        //await client.set(key, '')
        await client.set(key, JSON.stringify(data))
    }
     
    // Retrieve data in cache (i.e. data already stored)
    let dataInCache = await client.get(key)
    dataInCache = JSON.parse(dataInCache)

    /* 
    Check to see if there are new data 
    (i.e. data that aren't in cache) since last check 
    */
    const findNewData = data.filter(newAlert => !dataInCache.some(cachedAlert => newAlert.properties.id === cachedAlert.properties.id))

    // Replace data in the cache
    await client.set(key, JSON.stringify(data))

    // Return cache misses to the caller
    return findNewData
}

module.exports = { getCache }