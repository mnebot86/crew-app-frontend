import { ThemedButton } from '@/components/ui/buttons'
import { ProtectedRoute, ScreenLayout } from '@/components/ui/layout'
import { useLogout } from '@/hooks/mutations/auth'
import React from 'react'

const settings = () => {
	const logOut = useLogout();

	const handleLogOut = async () => {
        await logOut();
        console.log('Logged out successfully');
	};
	
  return (
	  <ProtectedRoute>
		  <ScreenLayout>
			  <ThemedButton title="logout" onPress={handleLogOut}/>
		  </ScreenLayout>
	</ProtectedRoute>
  )
}

export default settings