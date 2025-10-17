Whoman Safety App (Expo React Native)

Run locally

```bash
npm install
npm run android
```

- Requires Android Studio or a physical Android device with USB debugging.
- Node 20.19.4+ is recommended by RN 0.81; current Node may work with warnings.

Project structure

- Expo Router with file-based navigation under `app/`.
- Core screens: `index` (Home SOS), `pairing`, `contacts`, `tracking`, `settings`.
- Service stubs under `src/services/` for BLE, location, permissions.

Android permissions

Configured in `app.json` → `expo.android.permissions`:

- `ACCESS_COARSE_LOCATION`, `ACCESS_FINE_LOCATION` (BLE + GPS)
- `FOREGROUND_SERVICE` (keep services alive during SOS)
- `BLUETOOTH`, `BLUETOOTH_CONNECT`, `BLUETOOTH_SCAN`

Next steps

- Wire BLE (react-native-ble-plx) and background handling.
- Implement contacts CRUD with local storage.
- Hook SOS countdown to actual alert fan-out (backend/SMS/push).
- DLT registration for SMS templates (India compliance).
