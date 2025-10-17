import { useState } from 'react';
import { Image, Pressable, Text, View, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthScreen({ onAuthenticated }: { onAuthenticated?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const finishAuth = async () => {
    setLoading(false);
    if (onAuthenticated) onAuthenticated();
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (isSignup && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    await AsyncStorage.setItem('auth_token', `mock-email-token-${email}`);
    await finishAuth();
  };

  const handleSocialAuth = async (provider: string) => {
    setLoading(true);
    await AsyncStorage.setItem('auth_token', `mock-${provider}-token`);
    await finishAuth();
  };

  return (
    <LinearGradient colors={['#de7ec1', '#c85a9f', '#b8478a']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
      <View style={{ alignItems: 'center', marginBottom: 60 }}>
        {/* Logo */}
        <Image source={require('../assets/Logo.png')} style={{ width: 200, height: 200, marginBottom: 24, borderRadius: 100 }} />
        <Text style={{ color: 'white', fontSize: 36, fontWeight: '800', marginBottom: 8 }}>SHEild</Text>
        <Text style={{ color: 'white', fontSize: 18, opacity: 0.9 }}>Your Safety Companion</Text>
      </View>

      {/* Login/Signup Toggle */}
      <View style={{ flexDirection: 'row', marginBottom: 30, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25, padding: 4 }}>
        <Pressable
          onPress={() => setIsSignup(false)}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 20,
            backgroundColor: !isSignup ? 'white' : 'transparent',
            flex: 1
          }}
        >
          <Text style={{ 
            color: !isSignup ? '#FF7DA7' : 'white', 
            fontSize: 16, 
            fontWeight: '600', 
            textAlign: 'center' 
          }}>
            Login
          </Text>
        </Pressable>
        
        <Pressable
          onPress={() => setIsSignup(true)}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 20,
            backgroundColor: isSignup ? 'white' : 'transparent',
            flex: 1
          }}
        >
          <Text style={{ 
            color: isSignup ? '#FF7DA7' : 'white', 
            fontSize: 16, 
            fontWeight: '600', 
            textAlign: 'center' 
          }}>
            Sign Up
          </Text>
        </Pressable>
      </View>

      {/* Email/Password Form */}
      <View style={{ width: '100%', gap: 16, marginBottom: 20 }}>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 12, padding: 16 }}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              fontSize: 16,
              color: '#333',
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: 'white',
              borderRadius: 8,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#E0E0E0'
            }}
          />
          
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              fontSize: 16,
              color: '#333',
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: 'white',
              borderRadius: 8,
              marginBottom: isSignup ? 12 : 0,
              borderWidth: 1,
              borderColor: '#E0E0E0'
            }}
          />
          
          {isSignup && (
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={{
                fontSize: 16,
                color: '#333',
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor: 'white',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E0E0E0'
              }}
            />
          )}
        </View>

        <Pressable
          onPress={handleEmailAuth}
          disabled={loading}
          style={{
            backgroundColor: 'white',
            paddingVertical: 16,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            opacity: loading ? 0.7 : 1
          }}
        >
          <Text style={{ color: '#FF7DA7', fontSize: 16, fontWeight: '700' }}>
            {loading ? 'Please wait...' : (isSignup ? 'Sign Up' : 'Login')}
          </Text>
        </Pressable>
      </View>

      {/* Divider */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, width: '100%' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
        <Text style={{ color: 'white', marginHorizontal: 16, fontSize: 14, opacity: 0.8 }}>OR</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
      </View>

      {/* Social Login */}
      <View style={{ width: '100%', gap: 12 }}>
        <Pressable
          onPress={() => handleSocialAuth('facebook')}
          disabled={loading}
          style={{
            backgroundColor: 'white',
            paddingVertical: 14,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            opacity: loading ? 0.7 : 1
          }}
        >
          <Ionicons name="logo-facebook" size={20} color="#1877F2" />
          <Text style={{ color: '#333', fontSize: 15, fontWeight: '600', marginLeft: 10 }}>Continue with Facebook</Text>
        </Pressable>

        <Pressable
          onPress={() => handleSocialAuth('google')}
          disabled={loading}
          style={{
            backgroundColor: 'white',
            paddingVertical: 14,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            opacity: loading ? 0.7 : 1
          }}
        >
          <Ionicons name="logo-google" size={20} color="#DB4437" />
          <Text style={{ color: '#333', fontSize: 15, fontWeight: '600', marginLeft: 10 }}>Continue with Google</Text>
        </Pressable>
      </View>

      <Text style={{ color: 'white', textAlign: 'center', marginTop: 40, fontSize: 14, opacity: 0.8 }}>
        {isSignup 
          ? 'Create your account to get started with SHEild' 
          : 'Welcome back! Sign in to continue'
        }
      </Text>
      
      <Text style={{ color: 'white', textAlign: 'center', marginTop: 20, fontSize: 12, opacity: 0.7 }}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </Text>
    </LinearGradient>
  );
}
