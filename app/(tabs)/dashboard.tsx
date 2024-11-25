import { ThemedText } from "@/components/ui/text/ThemedText";
import { ThemedView } from "@/components/ui/layout/ThemedView";
import ProtectedRoute from "@/components/ui/layout/ProtectedRoute";
import React from "react";

const Dashboard = () => {
	return (
		<ProtectedRoute>
			<ThemedView>
				<ThemedText>Dashboard</ThemedText>
			</ThemedView>
		</ProtectedRoute>
	);
};

export default Dashboard;
