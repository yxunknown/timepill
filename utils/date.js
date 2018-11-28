const getTomorrow = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() + 1;
  return year + '-' + month + '-' + day
}

module.exports = {
  getTomorrow: getTomorrow,
}