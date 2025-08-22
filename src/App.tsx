import Auth from './pages/Auth';
import ToastProvider from './providers/toastProvider';
import { ToastContainer } from './components/toast/toastContainer';

const App = () => {
  return (
    <ToastProvider>
      <Auth />
      <ToastContainer />
    </ToastProvider>
  )
}

export default App;