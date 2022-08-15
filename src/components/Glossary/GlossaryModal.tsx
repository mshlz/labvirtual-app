import { Typography } from "antd"
import { useEffect, useState } from "react"
import { ModalStack } from "../../context/ModalStackContext"
import { GlossaryService } from "../../services/GlossaryService"
import { parseHtml } from "../../utils/parseHtml"
import { LoadingComponent } from "../Loading/Loading"

interface GlossaryModalProps {
  entryId: string
}
export const GlossaryModal = (props: GlossaryModalProps) => {
  const [modalData, setModalData] = useState(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    setFetching(true)
    GlossaryService.get(props.entryId)
      .then((result) => {
        setModalData(result)
      })
      .finally(() => setFetching(false))
  }, [props.entryId])

  if (fetching) {
    return <LoadingComponent />
  }

  return (
    <>
      <Typography.Title level={3}>{modalData.name}</Typography.Title>
      {parseHtml(modalData.description)}
    </>
  )
}

export const openGlossaryModal = (entryId: string) =>
  ModalStack.open(<GlossaryModal entryId={entryId} />)
