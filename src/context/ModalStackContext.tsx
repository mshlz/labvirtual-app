import { Modal } from "antd"
import React, { createContext, useContext, useEffect, useState } from "react"

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

const stackManager = new (class extends EventTarget {
  private items: StackItem[] = []
  constructor() {
    super()
    this.items = []
  }
  add(item: Omit<StackItem, "visible">) {
    this.items.push({ ...item, visible: true })
    this.dispatchEvent(new Event("CHANGE"))
    return this.items.length - 1
  }

  remove(index: number) {
    if (this.items[index]) {
      this.items.splice(index, 1)
      this.dispatchEvent(new Event("CHANGE"))
    }
  }

  close(index: number) {
    if (this.items[index]) {
      this.items[index].visible = false
      this.dispatchEvent(new Event("CHANGE"))
    }
  }

  clear() {
    for (let i = this.items.length - 1; i >= 0; i--) {
      this.close(i)
    }
  }

  values() {
    return [...this.items]
  }
})()

export const ModalStackProvider: React.FC = ({ children }) => {
  const [renderStack, setRenderStack] = useState<StackItem[]>([])

  useEffect(() => {
    const observeChange = () => setRenderStack(stackManager.values())
    stackManager.addEventListener("CHANGE", observeChange)
    return () => stackManager.removeEventListener("CHANGE", observeChange)
  }, [])

  return (
    <ModalStackContext.Provider
      value={{
        openModal: (content, options) => stackManager.add({ content, options }),
        closeModal: (index) => stackManager.close(index),
        closeAll: () => stackManager.clear(),
      }}
    >
      {renderStack.map((item, index) => (
        <Modal
          key={index}
          visible={item.visible}
          title={item.options?.title}
          okText={item.options?.okText}
          onOk={(e) => item.options?.onOk?.(e, index)}
          cancelText={item.options?.cancelText}
          onCancel={() => stackManager.close(index)}
          maskClosable={item.options?.maskClosable}
          afterClose={() => stackManager.remove(index)}
        >
          {item.content}
        </Modal>
      ))}
      {children}
    </ModalStackContext.Provider>
  )
}

export const useModalStack = () => useContext(ModalStackContext)

export const ModalStack = {
  open: (content: React.ReactNode | string, options?: ModalOptions) =>
    stackManager.add({ content, options }),
  close: (index: number) => stackManager.close(index),
  closeAll: () => stackManager.clear(),
}
