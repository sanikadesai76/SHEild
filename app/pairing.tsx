import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, View } from 'react-native';
import { Card } from '../src/components/Card';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { colors, spacing } from '../src/theme';
import { scanForDevices, connectToDevice, checkBluetoothState, BleDevice } from '../src/services/ble';

export default function PairingScreen() {
	const [scanning, setScanning] = useState(false);
	const [devices, setDevices] = useState<BleDevice[]>([]);
	const [connectedId, setConnectedId] = useState<string | null>(null);
	const [bluetoothState, setBluetoothState] = useState<string>('Unknown');

	const realScan = async () => {
		setScanning(true);
		setDevices([]);
		
		try {
			const state = await checkBluetoothState();
			setBluetoothState(state);
			
			if (state !== 'PoweredOn') {
				Alert.alert('Bluetooth Required', 'Please enable Bluetooth to scan for devices.');
				setScanning(false);
				return;
			}
			
			const foundDevices = await scanForDevices();
			setDevices(foundDevices);
		} catch (error) {
			Alert.alert('Scan Error', 'Failed to scan for devices. Please check Bluetooth permissions.');
		}
		
		setScanning(false);
	};

	useEffect(() => {
		realScan();
	}, []);

	const connect = async (id: string) => {
		try {
			const success = await connectToDevice(id);
			if (success) {
				setConnectedId(id);
				Alert.alert('Connected', 'Successfully connected to the band!');
			} else {
				Alert.alert('Connection Failed', 'Could not connect to the device.');
			}
		} catch (error) {
			Alert.alert('Connection Error', 'Failed to connect to the device.');
		}
	};

	return (
		<View style={{ flex: 1, padding: spacing.lg, gap: spacing.md, backgroundColor: colors.background }}>
			<Card>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={{ color: colors.text, fontWeight: '700' }}>Nearby devices</Text>
					{scanning ? <ActivityIndicator color={colors.accent} /> : <PrimaryButton onPress={realScan}>Scan</PrimaryButton>}
				</View>
				<Text style={{ color: colors.subtleText, marginTop: spacing.xs }}>Bluetooth: {bluetoothState}</Text>
			</Card>
			<FlatList
				data={devices}
				keyExtractor={(d) => d.id}
				contentContainerStyle={{ gap: spacing.sm }}
				renderItem={({ item }) => (
					<Card>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
							<View>
								<Text style={{ color: colors.text, fontWeight: '700' }}>{item.name || 'Unknown Device'}</Text>
								<Text style={{ color: colors.subtleText }}>ID: {item.id}</Text>
								{item.rssi && <Text style={{ color: colors.subtleText }}>Signal: {item.rssi} dBm</Text>}
							</View>
							<Text onPress={() => connect(item.id)} style={{ color: connectedId === item.id ? colors.safe : colors.accent, fontWeight: '700' }}>{connectedId === item.id ? 'Connected' : 'Connect'}</Text>
						</View>
					</Card>
				)}
				ListEmptyComponent={
					<View style={{ alignItems: 'center', padding: spacing.lg }}>
						<Text style={{ color: colors.subtleText }}>No devices found yet.</Text>
					</View>
				}
			/>
		</View>
	);
}
