// redis-client.js
import cache from "memory-cache";
var cacheClient = new cache.Cache();

export const checkAndDelKey = (CACHE_KEY) => {
  if (cacheClient.get(CACHE_KEY) !== null) {
    cacheClient.del(CACHE_KEY);
    console.log("Dleted cache");
  } else {
    console.log("Not in cahce");
  }
};

export default cacheClient;
