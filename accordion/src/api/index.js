
export async function request (url) {
  return fetch(url).then(res => {
    return res.json()
  }).then(data => data)
}
