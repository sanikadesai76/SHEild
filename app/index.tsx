import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Modal, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radius } from '../src/theme';

export default function HomeScreen() {
    const [arming, setArming] = useState(false);
    const [count, setCount] = useState(3);
    const fadeIn = useRef(new Animated.Value(0)).current;
    const pulse = useRef(new Animated.Value(1)).current;
    const modalScale = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true, easing: Easing.out(Easing.cubic) }).start();
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, { toValue: 1.06, duration: 900, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
                Animated.timing(pulse, { toValue: 1.0, duration: 900, useNativeDriver: true, easing: Easing.inOut(Easing.quad) })
            ])
        ).start();
    }, [fadeIn, pulse]);

    const startCountdown = () => {
        if (arming) return;
        setArming(true);
        setCount(3);
        const interval = setInterval(() => {
            setCount((c) => {
                if (c <= 1) {
                    clearInterval(interval);
                    // TODO: trigger SOS event here
                    setArming(false);
                    return 3;
                }
                return c - 1;
            });
        }, 1000);
    };

    return (
        <LinearGradient colors={[colors.background, '#FFF5F8']} style={{ flex: 1, padding: spacing.lg }}>
            <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: fadeIn }}>
                <Image source={require('../assets/Logo.png')} style={{ width: 224, height: 224, marginBottom: spacing.md, borderRadius: radius.lg }} />
                <Text style={{ fontSize: 30, fontWeight: '800', color: colors.text, marginBottom: spacing.lg }}>SHEild</Text>
                <Animated.View style={{ transform: [{ scale: pulse }] }}>
                    <LinearGradient colors={['#FF7DA7', colors.sos]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: radius.xl }}>
                        <Pressable onLongPress={startCountdown} style={{ paddingVertical: 28, paddingHorizontal: 60, borderRadius: radius.xl }}>
                            <Text style={{ color: 'white', fontSize: 22, fontWeight: '800' }}>Hold for SOS</Text>
                        </Pressable>
                    </LinearGradient>
                </Animated.View>
                <Text style={{ color: colors.subtleText, marginTop: spacing.sm }}>Long-press to start a 3s countdown</Text>
            </Animated.View>

            <Modal transparent visible={arming} animationType="fade" onShow={() => {
                modalScale.setValue(0.8);
                Animated.spring(modalScale, { toValue: 1, useNativeDriver: true, friction: 6, tension: 120 }).start();
            }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg }}>
                    <Animated.View style={{ backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', transform: [{ scale: modalScale }], shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 8 }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: spacing.sm }}>Arming SOS…</Text>
                        <Text style={{ fontSize: 56, fontWeight: '900', color: colors.sos }}>{count}</Text>
                        <Pressable onPress={() => setArming(false)} style={{ marginTop: spacing.md, paddingVertical: 10, paddingHorizontal: 16, borderRadius: radius.md, backgroundColor: colors.accent }}>
                            <Text style={{ color: 'white', fontWeight: '700' }}>Cancel</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </Modal>
        </LinearGradient>
    );
}
