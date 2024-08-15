// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    Button,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

export default function App() {
    const [recipient, setRecipient] = useState('');
    const [occasion, setOccasion] = useState('');
    const [style, setStyle] = useState('');
    const [greeting, setGreeting] = useState('');
    const [loading, setLoading] = useState(false);

    const generateGreeting = async () => {
        setLoading(true);
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide a personalized greeting." },
                    { role: "user", content: `Create a ${style} greeting for ${recipient} on the occasion of ${occasion}.` }
                ],
                model: "gpt-4o"
            });
            const resultString = response.data.response;
            setGreeting(resultString);
        } catch (error) {
            console.error("Error generating greeting:", error);
            setGreeting("Failed to generate greeting. Please try again.");
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.title}>Personalized Greeting Generator</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Recipient"
                    value={recipient}
                    onChangeText={setRecipient}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Occasion"
                    value={occasion}
                    onChangeText={setOccasion}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Style (e.g., funny, formal)"
                    value={style}
                    onChangeText={setStyle}
                />
                <Button
                    title="Generate Greeting"
                    onPress={generateGreeting}
                    disabled={loading}
                />

                {loading ? (
                    <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
                ) : (
                    <Text style={styles.greeting}>{greeting}</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        padding: 20,
        backgroundColor: '#F5FCFF',
    },
    scroll: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
    loading: {
        marginTop: 20,
    },
    greeting: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },
});