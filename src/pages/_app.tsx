import AppContext, { AppProvider, useApp } from '../context/AppContext'
import '../plugins/validation/yup-translation'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function LabvisApp({ Component, pageProps }) {
  return <AppProvider>
    <Component {...pageProps} />
    <ToastContainer />
  </AppProvider >
}

export default LabvisApp
