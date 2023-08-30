import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';

export default function WelcomeScreen({ navigation }) {
    return(
        <View style = {styles.container}>
            <Text style={styles.text}  onPress={() => navigation.navigate('Sign In?')}>Welcome To LookLog</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        
    },
});