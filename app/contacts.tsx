import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { Card } from '../src/components/Card';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { colors, spacing } from '../src/theme';

type Contact = { id: string; name: string; phone: string };

const STORAGE_KEY = 'trusted_contacts_v1';

export default function ContactsScreen() {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');

	useEffect(() => {
		AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
			if (raw) setContacts(JSON.parse(raw));
		});
	}, []);

	const save = async (next: Contact[]) => {
		setContacts(next);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	};

	const addContact = async () => {
		if (!name.trim() || !phone.trim()) return;
		const c: Contact = { id: Date.now().toString(), name: name.trim(), phone: phone.trim() };
		await save([c, ...contacts]);
		setName('');
		setPhone('');
	};

	const removeContact = async (id: string) => {
		await save(contacts.filter((c) => c.id !== id));
	};

	return (
		<View style={{ flex: 1, padding: spacing.lg, gap: spacing.md, backgroundColor: colors.background }}>
			<Card>
				<Text style={{ color: colors.text, fontWeight: '700', marginBottom: spacing.sm }}>Add trusted contact</Text>
				<View style={{ flexDirection: 'row', gap: spacing.sm }}>
					<TextInput placeholder="Name" placeholderTextColor={colors.subtleText} value={name} onChangeText={setName} style={{ flex: 1, backgroundColor: '#F8F8F8', color: colors.text, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0' }} />
					<TextInput placeholder="Phone" placeholderTextColor={colors.subtleText} keyboardType="phone-pad" value={phone} onChangeText={setPhone} style={{ flex: 1, backgroundColor: '#F8F8F8', color: colors.text, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0' }} />
				</View>
				<View style={{ height: spacing.sm }} />
				<PrimaryButton onPress={addContact}>Add Contact</PrimaryButton>
			</Card>

			<FlatList
				data={contacts}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ gap: spacing.sm }}
				renderItem={({ item }) => (
					<Card>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
							<View>
								<Text style={{ color: colors.text, fontWeight: '700' }}>{item.name}</Text>
								<Text style={{ color: colors.subtleText }}>{item.phone}</Text>
							</View>
							<Text onPress={() => removeContact(item.id)} style={{ color: colors.accent, fontWeight: '700' }}>Remove</Text>
						</View>
					</Card>
				)}
				ListEmptyComponent={<Text style={{ color: colors.subtleText, textAlign: 'center', marginTop: spacing.md }}>No contacts added yet.</Text>}
			/>
		</View>
	);
}
