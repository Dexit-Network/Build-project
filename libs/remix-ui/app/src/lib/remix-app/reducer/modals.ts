import { modalActionTypes, ModalAction } from '../actions/modals'
import { ModalInitialState } from '../state/modals'
import { AppModal, ModalState } from '../interface'

export const modalReducer = (state: ModalState = ModalInitialState, action: ModalAction) => {
  switch (action.type) {
    case modalActionTypes.setModal: {
      let modalList:AppModal[] = state.modals
      modalList.push(action.payload)
      if (state.modals.length === 1 && state.focusModal.hide === true) { // if it's the first one show it
        const focusModal: AppModal = {
          id: modalList[0].id,
          hide: false,
          title: modalList[0].title,
          message: modalList[0].message,
          okLabel: modalList[0].okLabel,
          okFn: modalList[0].okFn,
          cancelLabel: modalList[0].cancelLabel,
          cancelFn: modalList[0].cancelFn,
          modalType: modalList[0].modalType,
          defaultValue: modalList[0].defaultValue,
          hideFn: modalList[0].hideFn
        }

        modalList = modalList.slice()
        modalList.shift()
        return { ...state, modals: modalList, focusModal: focusModal }
      }
      return { ...state, modals: modalList }
    }
    case modalActionTypes.handleHideModal:
      if (state.focusModal.hideFn) {
        state.focusModal.hideFn()
      }
      state.focusModal = { ...state.focusModal, hide: true, message: null }
      return { ...state }

    case modalActionTypes.setToast:
      state.toasters.push(action.payload)
      if (state.toasters.length > 0) {
        const focus = state.toasters[0]
        state.toasters.shift()
        return { ...state, focusToaster: focus }
      }
      return { ...state }

    case modalActionTypes.handleToaster:
      return { ...state, focusToaster: '' }
  }
}
