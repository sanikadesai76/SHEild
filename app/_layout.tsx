import { Tabs } from 'expo-router';
import { colors } from '../src/theme';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, Alert, Modal, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

function ProfileButton({ onLoggedOut }: { onLoggedOut: () => void }) {
  const [showProfile, setShowProfile] = useState(false);
  
  const showProfileInfo = () => {
    console.log('Profile button clicked!');
    setShowProfile(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    setShowProfile(false);
    onLoggedOut();
  };

  return (
    <>
      <Pressable onPress={showProfileInfo} style={{ paddingHorizontal: 12 }}>
        <Ionicons name="person-circle" size={24} color={colors.accent} />
      </Pressable>

      {/* Profile Info Modal */}
      <Modal visible={showProfile} transparent animationType="fade">
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setShowProfile(false)}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, minWidth: 250, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 16, textAlign: 'center' }}>Profile</Text>
            
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Image source={require('../assets/Logo.png')} style={{ width: 120, height: 120, marginBottom: 12, borderRadius: 60 }} />
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>SHEild User</Text>
              <Text style={{ color: colors.subtleText, fontSize: 14, marginTop: 4 }}>Safety Companion</Text>
            </View>
            
            <Pressable 
              onPress={handleLogout}
              style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#FFE5E5', marginBottom: 8 }}
            >
              <Text style={{ color: '#D32F2F', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>Logout</Text>
            </Pressable>
            
            <Pressable 
              onPress={() => setShowProfile(false)}
              style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8 }}
            >
              <Text style={{ color: colors.subtleText, fontSize: 16, textAlign: 'center' }}>Close</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (isLoading || showSplash) {
    if (showSplash) {
      const SplashScreen = require('./splash').default;
      return <SplashScreen onFinish={handleSplashFinish} />;
    }
    return null; // Or a loading screen
  }

  if (!isAuthenticated) {
    const AuthScreen = require('./auth').default;
    return <AuthScreen onAuthenticated={checkAuthStatus} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: '#E0E0E0' },
        tabBarActiveTintColor: '#FF7DA7',
        tabBarInactiveTintColor: colors.subtleText
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'SOS',
          tabBarIcon: ({ color, size }) => <Ionicons name="alert-circle" color={color} size={size} />,
          headerRight: () => <ProfileButton onLoggedOut={checkAuthStatus} />
        }}
      />
      <Tabs.Screen
        name="pairing"
        options={{
          title: 'Pair',
          tabBarIcon: ({ color, size }) => <Ionicons name="bluetooth" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          title: 'Tracking',
          tabBarIcon: ({ color, size }) => <Ionicons name="location" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />
        }}
      />
      {/* Hide auth and splash screens from tab navigation */}
      <Tabs.Screen
        name="auth"
        options={{
          href: null, // This hides the tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="splash"
        options={{
          href: null, // This hides the tab from the tab bar
        }}
      />
    </Tabs>
  );
}

