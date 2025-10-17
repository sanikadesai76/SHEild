import { ReactNode } from 'react';
import { View } from 'react-native';
import { colors, radius, spacing } from '../theme';

export function Card({ children }: { children: ReactNode }) {
	return (
		<View style={{ backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md, width: '100%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
			{children}
		</View>
	);
}
