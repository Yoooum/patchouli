const format = number => String(number).padStart(2, '0')

function formatDatetime(datetime) {
  const year = datetime.getFullYear()
  const month = format(datetime.getMonth() + 1)
  const day = format(datetime.getDate())
  const hour = format(datetime.getHours())
  const minute = format(datetime.getMinutes())
  const second = format(datetime.getSeconds())
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

function currentTime() {
  const now = new Date()
  return formatDatetime(now)
}

function currentTimestamp() {
  return Date.now()
}

function datetimeToTimestamp(datetimeStr) {
  const datetime = new Date(datetimeStr)
  return datetime.getTime()
}

function timestampToDatetime(timestamp) {
  const datetime = new Date(timestamp)
  return formatDatetime(datetime)
}

export { currentTime, currentTimestamp, datetimeToTimestamp, timestampToDatetime }
