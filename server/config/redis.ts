const redis = require('redis');
import {PORT_REDIS} from './ports';

const clientRedis = redis.createClient(PORT_REDIS);

export default clientRedis;
