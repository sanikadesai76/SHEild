import { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { Card } from '../src/components/Card';
import { colors, spacing } from '../src/theme';

export default function SettingsScreen() {
	const [discreet, setDiscreet] = useState(false);
	const [vibrate, setVibrate] = useState(true);
	const [language, setLanguage] = useState<'en' | 'hi'>('en');

	return (
		<View style={{ flex: 1, padding: spacing.lg, gap: spacing.md, backgroundColor: colors.background }}>
			<Card>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={{ color: colors.text, fontWeight: '700' }}>Discreet mode</Text>
					<Switch value={discreet} onValueChange={setDiscreet} />
				</View>
				<Text style={{ color: colors.subtleText, marginTop: spacing.xs }}>Hide loud sounds and keep UI subtle.</Text>
			</Card>

			<Card>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={{ color: colors.text, fontWeight: '700' }}>Vibrate on SOS</Text>
					<Switch value={vibrate} onValueChange={setVibrate} />
				</View>
			</Card>

			<Card>
				<Text style={{ color: colors.text, fontWeight: '700', marginBottom: spacing.sm }}>Language</Text>
				<View style={{ flexDirection: 'row', gap: spacing.sm }}>
					<Text onPress={() => setLanguage('en')} style={{ color: language === 'en' ? colors.accent : colors.subtleText }}>English</Text>
					<Text onPress={() => setLanguage('hi')} style={{ color: language === 'hi' ? colors.accent : colors.subtleText }}>हिन्दी</Text>
				</View>
			</Card>
		</View>
	);
}
