const instance = (flow, simulation, result, form, message, file) => {
  if (message && file) {
  return {
      "flowId": flow,
      "isSimulation": simulation,
      "result": result,
      "formFields": newForm(form),
      "messages": newMessage(message),
      "files": newFile(file)
  };
 }
 if (message) {
  return {
    "flowId": flow,
    "isSimulation": simulation,
    "result": result,
    "formFields": newForm(form),
    "messages": newMessage(message),
  };
}
if (file) {
  return {
    "flowId": flow,
    "isSimulation": simulation,
    "result": result,
    "formFields": newForm(form),
    "files": newFile(file)
  };
}
return {
  "flowId": flow,
  "isSimulation": simulation,
  "result": result,
  "formFields": newForm(form)
};
};

const newForm = (form) => {
  return form.map(f => ({
    "name": f.name,
    "value": f.value
  }));
};

const newMessage = (message) => {
  return message.map(m => ({
    "messageBody": m.body,
    "requesterCanSee": m.requester
  }));
};


const newFile = (file) => {
  return file.map(f => ({
    "filename": f.name,
    "resume": f.resume,
    "requesterCanSee": f.requester,
    "docType": f.type,
    "base64Content": f.content
  }));
};


export { instance }