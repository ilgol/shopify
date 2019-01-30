export function getUrl(url = '', status = '', fields = '', limit = '', page = '', sort = '', filters = [], customFilter = '') {
  let filtersString = '';

  if(sort[0] === '-') {
    const sortArr = sort.split(',');

    if(sortArr[1])
      sort = `${sortArr[0] },-${sortArr[1]}`;

    else
      sort = sortArr[0];
  }

  if(filters.length !== 0)
    for(let i = 0; i < filters.length; i++)
      filtersString += `${filters[i].field}=${encodeURIComponent(filters[i].value)}${i === filters.length - 1 ? '' : '&'}`;

  return (
    `${url}?Status=${status}&` +
    `Fields=${fields}&` +
    `Limit=${limit}&` +
    `Page=${page}&` +
    `Sort=${sort}&` +
    `${filtersString}&` +
    `${customFilter}`
  );
}