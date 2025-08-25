import { useState, useEffect } from 'react'
import { Profile } from '../types/profileTypes';

export const useProfile = () => {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = 'http://localhost:8080/api/auth/profile';

  const fetchProfile = async (id: string) => {
    setLoading(true);
    try {
      //pasar el token en la petición
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      setError('Error fetching profile');
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchProfile(userId);
    } else {
      setLoading(false);
    }
  }, []);

  return { profileData, loading, error };
};
