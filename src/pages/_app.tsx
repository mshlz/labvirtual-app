import { ConfigProvider } from "antd"
import Head from "next/head"
import "moment/locale/pt-br"
import ptBR from "antd/lib/locale/pt_BR"
import { ToastContainer } from "react-toastify"
import "suneditor/dist/css/suneditor.min.css"
import "react-toastify/dist/ReactToastify.css"
import "../../styles/antd.css"
import { Loading } from "../components/Loading/Loading2"
import { AppProvider } from "../context/AppContext"
import "../plugins/validation/yup-translation"
import { ModalStackProvider } from "../context/ModalStackContext"

function LabvisApp({ Component, pageProps }) {
  return (
    <ConfigProvider locale={ptBR}>
      <AppProvider>
        <ModalStackProvider>
          <Head>
            <title>Laboratório Virtual</title>
          </Head>
          <Loading />
          <Component {...pageProps} />
          <ToastContainer />
        </ModalStackProvider>
      </AppProvider>
    </ConfigProvider>
  )
}

export default LabvisApp
