import { Plugin } from '@remixproject/engine'
import { LibraryProfile, MethodApi, StatusEvents } from '@remixproject/plugin-utils'
import { AppModal } from '@remix-ui/app'
import { AlertModal } from 'libs/remix-ui/app/src/lib/remix-app/interface'
import { dispatchModalInterface } from 'libs/remix-ui/app/src/lib/remix-app/context/context'

interface IModalApi {
  events: StatusEvents,
  methods: {
    modal: (args: AppModal) => void
    alert: (args: AlertModal) => void
    toast: (message: string) => void
  }
}

const profile:LibraryProfile<IModalApi> = {
  name: 'modal',
  displayName: 'Modal',
  description: 'Modal',
  methods: ['modal', 'alert', 'toast']
}

export class ModalPlugin extends Plugin implements MethodApi<IModalApi> {
  dispatcher: dispatchModalInterface
  constructor () {
    super(profile)
  }

  setDispatcher (dispatcher: dispatchModalInterface) {
    this.dispatcher = dispatcher
  }

  async modal (args: AppModal) {
    this.dispatcher.modal(args)
  }

  async alert (args: AlertModal) {
    this.dispatcher.alert(args)
  }

  async toast (message: string) {
    this.dispatcher.toast(message)
  }
}
