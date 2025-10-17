import { BleManager, State } from 'react-native-ble-plx';
import { Platform } from 'react-native';

export type BleDevice = {
	id: string;
	name?: string;
	rssi?: number;
};

let manager: BleManager | null = null;
function getManager(): BleManager {
    if (!manager) manager = new BleManager();
    return manager;
}

export async function scanForDevices(): Promise<BleDevice[]> {
    if (Platform.OS === 'web') {
        // Web does not support react-native-ble-plx; return empty list gracefully
        return [];
    }

    return new Promise<BleDevice[]>((resolve) => {
        const devices: BleDevice[] = [];
        try {
            getManager().startDeviceScan(null, { allowDuplicates: false }, (error, device) => {
                if (error) {
                    console.error('BLE scan error:', error);
                    return;
                }
                if (device) {
                    devices.push({ id: device.id, name: device.name || undefined, rssi: device.rssi || undefined });
                }
            });
        } catch (e) {
            console.error('BLE start scan failed:', e);
        }

        setTimeout(() => {
            try { getManager().stopDeviceScan(); } catch {}
            resolve(devices);
        }, 5000);
    });
}

export async function connectToDevice(deviceId: string): Promise<boolean> {
    if (Platform.OS === 'web') return false;
    try {
        const device = await getManager().connectToDevice(deviceId, { timeout: 10000 });
        await device.discoverAllServicesAndCharacteristics();
        return true;
    } catch (error) {
        console.error('BLE connection failed:', error);
        return false;
    }
}

export function onBandButtonPress(callback: () => void) {
	// TODO: Subscribe to SOS button characteristic notifications
	// This would listen for button press events from the connected band
}

export async function checkBluetoothState(): Promise<State> {
    if (Platform.OS === 'web') return 'Unsupported' as State;
    return await getManager().state();
}
