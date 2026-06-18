const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = `${apiOrigin}/api`

export const codespaceApiConfigured = Boolean(codespaceName)

export const normalizeCollection = (payload, collectionName) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.[collectionName])) {
    return payload[collectionName]
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  return []
}

export const fetchCollection = async (collectionName, endpointUrl = `${apiOrigin}/api/${collectionName}/`) => {
  const response = await fetch(endpointUrl)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollection(await response.json(), collectionName)
}