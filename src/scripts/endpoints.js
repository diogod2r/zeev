import rateLimit from '../handlers/rateLimit.js';
import newInstance from '../routes/newInstance.js';

export default [
    { method: 'POST', url: '/instance', preHandler: rateLimit, handler: newInstance },
];