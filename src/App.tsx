import AuthSystem from './pages/AuthSystem';
import ToastProvider from './providers/toastProvider';
import { ToastContainer } from './components/toast/toastContainer';

const App = () => {
  return (
    <ToastProvider>
      <AuthSystem />
      <ToastContainer />
    </ToastProvider>
  )
}

export default App;