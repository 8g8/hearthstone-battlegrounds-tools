import { EventEmitter } from 'events'
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { is } from 'electron-util'

import { getAppHTML } from '../utils'

interface Params {
  onInit: (window: BrowserWindow) => void
  onDestroy?: () => void
}

class LogHandlerManager extends EventEmitter {
  option: BrowserWindowConstructorOptions

  window: BrowserWindow | null

  constructor({ onInit, onDestroy }: Params) {
    super()

    this.option = {
      width: 600,
      height: 800,
      show: is.development,
      webPreferences: { nodeIntegration: true, enableRemoteModule: true },
    }
    this.window = null
    this.init(this.option, onInit, onDestroy)
  }

  init(
    options: BrowserWindowConstructorOptions,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onInit: Params['onInit'] = () => {},
    onDestroy?: Params['onDestroy']
  ): void {
    this.window = new BrowserWindow(options)
    this.window.loadURL(getAppHTML('logHandler'))
    onInit(this.window)

    this.window.on('closed', () => {
      this.window = null
      onDestroy?.()
    })
  }

  destroy(): void {
    this.window?.destroy()
  }
}

export default LogHandlerManager
