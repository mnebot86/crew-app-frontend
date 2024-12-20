import { ThemedText } from "@/components/ui/text/ThemedText";
import { ScreenLayout, ThemedView } from "@/components/ui/layout";
import ProtectedRoute from "@/components/ui/layout/ProtectedRoute";
import React from "react";

const Dashboard = () => {
	return (
		<ProtectedRoute>
			<ScreenLayout>
				<ThemedView>
					<ThemedText>Dashboard</ThemedText>
				</ThemedView>
			</ScreenLayout>
		</ProtectedRoute>
	);
};

export default Dashboard;
