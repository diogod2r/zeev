const userLimit = {};

export default function rateLimit(request, reply, done) {
  const ip = request.ip || request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  const now = Date.now();

  if (!userLimit[ip]) {
    userLimit[ip] = { count: 1, firstRequest: now };
  } else {
    userLimit[ip].count++;
  }

  const timePassed = now - userLimit[ip].firstRequest;
  const maxRequests = 60;
  const timeWindow = 60000;

  if (timePassed < timeWindow && userLimit[ip].count > maxRequests) {
    reply.code(429).send({ error: 'Too Many Requests' });
  } else if (timePassed > timeWindow) {
    userLimit[ip] = { count: 1, firstRequest: now };
    done();
  } else {
    done();
  }
}