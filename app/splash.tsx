import { useEffect, useRef } from 'react';
import { View, Image, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const logoFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(logoFadeAnim, {
        toValue: 1,
        duration: 1200,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Start continuous animations after initial load
    setTimeout(() => {
      // Blink animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 1000);

    // Auto-finish after 2.5 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, blinkAnim, pulseAnim, logoFadeAnim, onFinish]);

  return (
    <LinearGradient colors={['#de7ec1', '#c85a9f', '#b8478a']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View 
        style={{ 
          alignItems: 'center',
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
      >
        {/* Logo Icon with Modern Animations */}
        <Animated.View style={{ 
          width: 120, 
          height: 120, 
          marginBottom: 30,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: Animated.multiply(logoFadeAnim, blinkAnim),
          transform: [
            { scale: pulseAnim }
          ]
        }}>
          <Animated.View style={{
            transform: [{ scale: scaleAnim }]
          }}>
            <Image 
              source={require('../assets/Logo.png')} 
              style={{ 
                width: 200, 
                height: 200,
                borderRadius: 100
              }} 
              resizeMode="contain"
            />
          </Animated.View>
        </Animated.View>

        {/* SHEild Text */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ 
            fontSize: 42, 
            fontWeight: '800',
            textAlign: 'center'
          }}>
            <Text style={{ 
              color: 'white',
              textShadowColor: 'rgba(0,0,0,0.3)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4
            }}>
              SHEild
            </Text>
          </Text>
          
          <Text style={{ 
            color: 'white', 
            fontSize: 16, 
            marginTop: 8,
            fontWeight: '500',
            opacity: 0.9,
            textShadowColor: 'rgba(0,0,0,0.3)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2
          }}>
            Your Safety Companion
          </Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}
