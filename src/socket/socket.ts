import { Store } from 'redux'
import * as io from 'socket.io-client'
import { generateSignatureHeaders } from '~/helper/api'
import { Session } from '~/model'

interface Options {
  store: Store
}

export default class Socket {
  public options: Options
  public socket: SocketIOClient.Socket
  public store: Store
  public loginSession: Session

  constructor(options: Options) {
    this.socket = io('http://127.0.0.1:7001', {
      transports: ['websocket'],
      autoConnect: false
      // query: signHeaders,
    })
    this.options = options
    this.store = options.store

    this.initListeners()
  }

  public initListeners() {
    this.socket.on('connect', () => {
      // tslint:disable-next-line:no-console
      console.info('connect')

      const { loginSession } = this

      if (!loginSession) throw new Error('socket on connect, loginSession is empty!')

      const sign = generateSignatureHeaders({ sessionId: loginSession.id, accessToken: loginSession.accessToken })

      this.socket.emit('login', sign, (result: any) => {
        // tslint:disable-next-line:no-console
        console.info('login', result)
      })
    })

    this.socket.on('scan', (data: any) => {
      // tslint:disable-next-line:no-console
      console.info('scan', data)
    })

    this.socket.on('disconnect', () => {
      // tslint:disable-next-line:no-console
      console.info('disconnect')
    })
  }

  public connect(loginSession: Session) {
    this.loginSession = loginSession

    this.socket.connect()

    return this.socket
  }

  public disconnect() {
    if (!this.socket) return

    this.socket.disconnect()
  }
}

// export default (options: { store: Store; loginSession: Session }) => {
//   const socket = new Socket({
//     store: options.store
//   })

//   socket.connect(options.loginSession)

//   return socket
// }
