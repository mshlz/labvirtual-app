import { Modal } from "antd"
import React, { createContext, useContext, useState } from "react"

interface ModalOptions {
  title?: string
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  onOk?: (e: React.MouseEvent<HTMLElement>, modalIndex: number) => void
  maskClosable?: boolean
}

interface ModalStackContext {
  openModal: (content: React.ReactNode, options?: ModalOptions) => number
  closeModal: (index: number) => void
  closeAll: () => void
}

interface StackItem {
  content: React.ReactNode
  options?: ModalOptions
  visible: boolean
}

const ModalStackContext = createContext({} as ModalStackContext)

const _STACK: StackItem[] = []
export const ModalStackProvider: React.FC = ({ children }) => {
  const [renderStack, setRenderStack] = useState<StackItem[]>([])

  const removeFromStack = (index: number) => {
    renderStack.splice(index, 1)
    setRenderStack([...renderStack])
  }

  const openModal = (content: React.ReactNode, options?: ModalOptions) => {
    _STACK.push({ content, options, visible: true })
    setRenderStack([..._STACK])
    return _STACK.length - 1
  }

  const closeModal = (index: number) => {
    if (_STACK[index]) {
      _STACK[index].visible = false
      setRenderStack([..._STACK])
      _STACK.splice(index, 1)
    }
  }

  const closeAll = () => {
    _STACK.splice(0, _STACK.length)
    setRenderStack(_STACK)
  }

  return (
    <ModalStackContext.Provider value={{ openModal, closeModal, closeAll }}>
      {renderStack.map((item, index) => (
        <Modal
          key={index}
          visible={item.visible}
          title={item.options?.title}
          okText={item.options?.okText}
          onOk={(e) => item.options?.onOk?.(e, index)}
          cancelText={item.options?.cancelText}
          onCancel={() => closeModal(index)}
          maskClosable={item.options?.maskClosable}
          afterClose={() => removeFromStack(index)}
        >
          {item.content}
        </Modal>
      ))}
      {children}
    </ModalStackContext.Provider>
  )
}

export const useModalStack = () => useContext(ModalStackContext)
