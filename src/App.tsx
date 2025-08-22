import { 
  Auth, 
  Dashboard,
  Accounts,
  Categories,
  Profile,
  Transactions
} from './pages';
import ToastProvider from './providers/toastProvider';
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import { ToastContainer } from './components/toast/toastContainer';

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cuentas" element={<Accounts />} />
          <Route path="/transacciones" element={<Transactions />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App;