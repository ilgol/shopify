export const parseAddress = (location) => ({
  zip: location.zip,
  country: location.address.match(/\w{2}$/)[0],
  province: location.state_id,
  city: location.city,
  street: location.address.split(',')[0],
});