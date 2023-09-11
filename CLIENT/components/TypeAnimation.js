import React, { useEffect, useRef } from 'react';
import { TypingAnimation } from 'react-native-typing-animation';
import { View, Text, Animated } from 'react-native';

const TypingAnimationComponent = ({ isTyping }) => {

    const typingAnimation = useRef(new Animated.Value(0)).current;

    const textToType = 'Welcome To LookLog, Enjoy'; // Add your desired text here

    useEffect(() => {
        if (isTyping) {
            // Trigger typing animation
            Animated.timing(typingAnimation, {
                toValue: textToType.length,
                duration: 100, // Adjust the duration as needed
                useNativeDriver: false,
            }).start();
        }
    }, [isTyping, textToType]);

    return (
        <View>
            {isTyping && (
                <Animated.Text style={{ opacity: 1, color: 'white' }}>
                    {textToType.substring(0, Math.floor(typingAnimation))}
                </Animated.Text>
            )}
        </View>
    );
};

export default TypingAnimation;

