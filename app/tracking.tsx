import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { Card } from '../src/components/Card';
import { colors, spacing } from '../src/theme';

export default function TrackingScreen() {
	const [seconds, setSeconds] = useState(0);
	const dot = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const t = setInterval(() => setSeconds((s) => s + 1), 1000);
		Animated.loop(Animated.timing(dot, { toValue: 1, duration: 1200, easing: Easing.linear, useNativeDriver: true })).start();
		return () => {
			clearInterval(t);
			dot.stopAnimation();
		};
	}, [dot]);

	const opacity = dot.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.2, 1, 0.2] });

	return (
		<View style={{ flex: 1, padding: spacing.lg, gap: spacing.md, backgroundColor: colors.background }}>
			<Card>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Text style={{ color: colors.text, fontWeight: '700' }}>Live tracking</Text>
					<Animated.View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.safe, opacity }} />
				</View>
				<Text style={{ color: colors.subtleText, marginTop: spacing.xs }}>Duration: {seconds}s</Text>
			</Card>

			<Card>
				<Text style={{ color: colors.subtleText }}>Map placeholder (integrate Map component later).</Text>
				<View style={{ height: 180, backgroundColor: '#F0F0F0', marginTop: spacing.sm, borderRadius: 12, borderWidth: 1, borderColor: '#E0E0E0' }} />
			</Card>
		</View>
	);
}
