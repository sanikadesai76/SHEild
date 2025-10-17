import { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../theme';

export function PrimaryButton({ children, onPress }: { children: ReactNode; onPress?: () => void }) {
	return (
		<LinearGradient colors={['#FF7DA7', colors.sos]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: radius.md }}>
			<Pressable onPress={onPress} style={{ paddingVertical: 14, paddingHorizontal: 18, borderRadius: radius.md, alignItems: 'center' }}>
				<Text style={{ color: 'white', fontWeight: '700' }}>{children}</Text>
			</Pressable>
		</LinearGradient>
	);
}
