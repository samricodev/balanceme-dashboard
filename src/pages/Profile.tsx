import { Navbar } from "../components/navbar/Navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="text-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Mi Perfil</h1>
        <p className="text-gray-600">Aquí puedes gestionar tu información personal.</p>
      </div>
    </>
  )
}

export default Profile;
