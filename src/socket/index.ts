import * as io from 'socket.io-client'

import { socketUrl } from '~/config'
import { generateSignatureHeaders } from '~/helper/api'
import { Session } from '~/model'
import store from '~/store'

import * as actions from './store/actions'

let session: Session

const socket = io(socketUrl, {
  transports: ['websocket'],
  autoConnect: false
  // query: signHeaders,
})

socket.on('connect', () => {
  try {
    store.dispatch(actions.connect())
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error)
  }

  try {
    if (!session) throw new Error('socket on connect, session is empty!')

    const sign = generateSignatureHeaders({ sessionId: session.id, accessToken: session.accessToken })

    socket.emit('login', sign, (data: any) => {
      // tslint:disable-next-line:no-console
      console.info('login', data)

      if (!data.success || data.error) {
        throw new Error(`socket on login: ${data.error}`)
      }
      store.dispatch(actions.login())
    })
  } catch (error) {
    socket.disconnect()
    // tslint:disable-next-line:no-console
    console.error(error)
  }
})

socket.on('disconnect', () => {
  try {
    store.dispatch(actions.disconnect())
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error)
  }
})

// const eventNames = ['connect', 'disconnect']

// eventNames.forEach(event => {
//   socket.on(event, (data: any) => {
//     store.dispatch(
//       message({
//         event,
//         data
//       })
//     )
//   })
// })

export const login = (sessionArg: Session) => {
  session = sessionArg

  socket.connect()
}

export default socket
