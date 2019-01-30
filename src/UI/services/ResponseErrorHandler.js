export const prepareResponseErrorMessage = (responseError) => {
  const { response } = responseError;
  const { data } = response || {};
  const { message, errors } = data || {};

  const messages = [];

  if(message && typeof message === 'string')
    messages.push(message);

  (errors || []).forEach(item => messages.push(item.message));

  return messages.length ? messages.join('\n') : null;
};