import { useQuery } from '@tanstack/react-query';
import { useGameAPI } from '../api/useGameAPI';

export const useUserQueries = () => {
  const { getAllUsers } = useGameAPI();

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  return {
    users,
    isLoading,
    error,
    refetch,
  };
};
