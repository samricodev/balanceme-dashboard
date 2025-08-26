import { 
  Auth, 
  Dashboard,
  Accounts,
  Categories,
  Profile,
  Transactions
} from './pages';
import PrivateRoute from './components/PrivateRoute';
import ToastProvider from './providers/toastProvider';
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import { ToastContainer } from './components/toast/toastContainer';

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>
          <Route path="/cuentas" element={
            <PrivateRoute>
              <Accounts />
            </PrivateRoute>
          } />
          <Route path="/transacciones" element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          } />
          <Route path="/categorias" element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          } />
          <Route path="/perfil" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App;
