import zeev from "../scripts/zeev.js";
import terrasa from "../scripts/terrasa.js";
import environment from "../scripts/env.js";
import { instance } from "../scripts/instance.js"
const { zvToken, trToken } = environment;

export default async function newInstance(request, reply) {
  try {
    const { flow, simulation, result, form, message, file, phone, notify } = request.body;
    if (!checkFlow(flow)) {
      return reply.status(400).send({ "error": "invalid flow" });
    }

    if (checkSimulation(simulation) === 'x') {
      return reply.status(400).send({ "error": "invalid simulation" });
    }

    if (phone? !checkPhone(phone): false) {
      return reply.status(400).send({ "error": "invalid phone!" });
    }

    if (notify? !checkNotify(notify): false) {
      return reply.status(400).send({ "error": "invalid notify!" });
    }

    const generateInstance = instance(flow, simulation, result, form, message, file);
    const sendFlow = await zeev(generateInstance, zvToken);
    
    if (!sendFlow) {
      return reply.status(500).send({ "error": "flow error" });
    }

    const sendNotify = await terrasa(phone, notify, trToken );
    if (!sendNotify) {
      return reply.status(206).send({ "zeev": sendFlow, "terrasa": "notify error" });
    }

    return reply.status(200).send({ "zeev": sendFlow, "terrasa": "notify send" });

  } catch (error) {
    console.error(error);
    return reply.status(500).send({ "error": "internal server error" });
  }
}

const checkFlow = (x) => {
  if (typeof(x) !== 'string') {
    return false;
  }
  const o = /^[a-zA-Z0-9]+$/;
  return o.test(x);
};

const checkPhone = (x) => {
  if (typeof(x) !== 'string') {
    return false;
  }
  const o = /^(?:\d{10,13})(?:@c\.us)?$/;
  return o.test(x);
};

const checkNotify = (x) => {
  if (typeof(x) !== 'string') {
    return false;
  }
  return true;
};

const checkSimulation = (x) => {
  if (x === 'true' || x === true) {
    return true;
  }
  if (x === 'false' || x === false) {
    return false;
  }
  return 'x';
};