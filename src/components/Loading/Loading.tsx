import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

interface LoadingComponentProps {
  fullWidth?: boolean
  fullHeight?: boolean
}
const LoadingComponent = ({
  fullHeight = false,
  fullWidth = false,
}: LoadingComponentProps) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: fullHeight && "100vh",
          width: fullWidth && "100vw",
          position: "relative",
          flexDirection: "column",
        }}
      >
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: "48px" }} />}
          tip={"Carregando..."}
        />
      </div>
    </>
  )
}

interface LoadingWrapperProps extends LoadingComponentProps {
  isLoading: boolean
}
const LoadingWrapper = ({
  children,
  isLoading,
  ...rest
}: React.PropsWithChildren<LoadingWrapperProps>) => {
  return isLoading ? <LoadingComponent {...rest} /> : <>{children}</>
}

export { LoadingComponent, LoadingWrapper }
