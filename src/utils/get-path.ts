import { getBaseUrl } from './get-base-url'

export function getPath(pathname: string = '') {
  return `${getBaseUrl()}${pathname}`
}
