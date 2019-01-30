export function GET(request, result, requestUrl, headers, functionToInvoke) {
  request.get(requestUrl, { headers })
    .then((shopResponse) => {
      if(functionToInvoke)
        functionToInvoke(JSON.parse(shopResponse));
      result && result.send(shopResponse);
    })
    .catch((error) => {
      result.status(error.statusCode).send(error);
    });
}

export function POST(request, result, requestUrl, json, headers, functionToInvoke) {
  request.post(requestUrl, { json, headers })
    .then((shopResponse) => {
      if(functionToInvoke)
        functionToInvoke(shopResponse);
      result && result.send(shopResponse);
    })
    .catch((error) => {
      result.status(error.statusCode).send(error);
    });
}

export function PUT(request, result, requestUrl, json, headers, functionToInvoke) {
  request.put(requestUrl, { json, headers })
    .then((shopResponse) => {
      if(functionToInvoke)
        functionToInvoke(shopResponse);
      result && result.send(shopResponse);
    })
    .catch((error) => {
      result.status(error.statusCode).send(error);
    });
}

export function DELETE(request, result, requestUrl, headers) {
  request.delete(requestUrl, { headers })
    .then((shopResponse) => {
      result && result.send(shopResponse);
    })
    .catch((error) => {
      result.status(error.statusCode).send(error);
    });
}