export const canPerformAction = (e) => e && (e.keyCode === 13 || e.type === 'click');

export const parseAddress = (location) => ({
  zip: location.zip,
  country: location.address.match(/\w{2}$/),
  province: location.state_id,
  city: location.city,
  street: location.address.split(',')[0],
});

export function pick(obj, keys) {
  return keys.map(k => k in obj ? { [k]: obj[k] } : {})
    .reduce((res, o) => Object.assign(res, o), {});
}