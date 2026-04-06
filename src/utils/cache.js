
const TTL = 5 * 60 * 1000 // timpul cat de valide sunt datele

const cache = {}

export function setCache(key, data){
    cache[key] = {
        data,
        timestamp: Date.now()
    }
}

export function getCache(key){
    const entry = cache[key]

    if(!entry) return null

    const isExpired = Date.now() - entry.timestamp > TTL

    if(isExpired){
        delete cache[key]
        return null
    }

    return entry.data
}