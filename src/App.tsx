import { Auth, Dashboard} from './pages';
import ToastProvider from './providers/toastProvider';
import { ToastContainer } from './components/toast/toastContainer';
import { Routes, Route, BrowserRouter} from 'react-router-dom'

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App;