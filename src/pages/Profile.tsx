import { Navbar } from "../components/navbar/Navbar";
import { useProfile } from "../hooks/useProfile";

const Profile = () => {
  const { profileData, loading, error } = useProfile();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {profileData && (
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold mb-4 mt-2 text-center">Información Personal</h2>
            <label htmlFor="name">Nombre</label>
            <input className="text-gray-600" name="name" value={profileData.name} readOnly />
            <label htmlFor="email">Correo Electrónico</label>
            <input className="text-gray-600" name="email" value={profileData.email} readOnly />
            <label htmlFor="password">Contraseña</label>
            <input className="text-gray-600" name="password" value={profileData.password} readOnly />
          </div>
        )}
      </div>
    </>
  )
};

export default Profile;
