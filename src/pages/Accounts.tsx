import { Navbar } from "../components/navbar/Navbar";

const Accounts = () => {
  return (
    <>
      <Navbar />
      <div className="text-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Mis Cuentas</h1>
        <p className="text-gray-600">Aquí puedes gestionar tus cuentas bancarias.</p>
      </div>
    </>
  )
}

export default Accounts;