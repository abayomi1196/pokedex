export function getIdFromUrl(url: string): number {
  const urlParts = url.split("/")
  return parseInt(urlParts[urlParts.length - 2])
}

export function isOG(url: string) {
  const id = getIdFromUrl(url)

  return id < 150
}
