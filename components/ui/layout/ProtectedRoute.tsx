import { RootState } from '@/store';
import { Redirect } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';

type Props = {
	children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	if (!isAuthenticated) {
        return <Redirect href="/register" />;
	}
	
	return <>{children}</>
}

export default ProtectedRoute;
