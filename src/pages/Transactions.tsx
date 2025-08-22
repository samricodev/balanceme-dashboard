import { Navbar } from "../components/navbar/Navbar";

const Transactions = () => {
  return (
    <>
      <Navbar />
      <div className="text-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Mis Transacciones</h1>
        <p className="text-gray-600">Aquí puedes gestionar tus transacciones.</p>
      </div>
    </>
  )
}

export default Transactions;
