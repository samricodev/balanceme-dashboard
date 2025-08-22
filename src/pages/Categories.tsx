import { Navbar } from "../components/navbar/Navbar";
  
const Categories = () => {
  return (
    <>
      <Navbar />
      <div className="text-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Mis Categorías</h1>
        <p className="text-gray-600">Aquí puedes gestionar tus categorías de gastos.</p>
      </div>
    </>
  )
}

export default Categories;
