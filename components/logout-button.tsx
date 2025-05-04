'use client';

import { useLogout } from '@privy-io/react-auth';

export function LogoutButton() {
  const { logout } = useLogout({
    onSuccess: () => {
      console.log('User successfully logged out');
      // Redirect to landing page or perform other post-logout actions
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Log out
    </button>
  );
} 