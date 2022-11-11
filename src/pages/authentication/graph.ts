import { stringify } from 'querystring'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hook/useRedux'
import { actions } from '../../Redux'
import { graphConfig } from './loginconfig'

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(accessToken: any) {
  const navigate = useNavigate()
  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`
  headers.append('Authorization', bearer)
  console.log(accessToken)
  const options = {
    method: 'GET',
    headers: headers,
  }

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => {
      response.json(), console.log('response', response)
    })
    .catch((error) => console.log(error))
}
