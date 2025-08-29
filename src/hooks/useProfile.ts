import { useState, useEffect } from 'react'
import { API_URL } from '../config/config';
import { Profile } from '../types/profile.type';

export const useProfile = () => {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = `${API_URL}/auth/profile`;

  const fetchProfile = async (id: string) => {
    setLoading(true);
    try {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { profileData, loading, error };
};
