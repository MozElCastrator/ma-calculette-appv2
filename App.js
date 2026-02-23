import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function App() {
    const [currentInput, setCurrentInput] = useState('0');
    const [previousInput, setPreviousInput] = useState('');
    const [operator, setOperator] = useState(null);

    const appendNumber = (number) => {
        if (currentInput === '0') {
            setCurrentInput(number);
        } else {
            setCurrentInput(currentInput + number);
        }
    };

    const appendOperator = (op) => {
        if (operator !== null && currentInput !== '0') {
            calculate();
        }
        setPreviousInput(currentInput);
        setCurrentInput('0');
        setOperator(op);
    };

    const calculate = () => {
        if (operator === null || previousInput === '') return;

        let result = 0;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (operator === '+') {
            result = prev + current;
        } else if (operator === '-') {
            result = prev - current;
        }

        setCurrentInput(result.toString());
        setOperator(null);
        setPreviousInput('');
    };

    const clearDisplay = () => {
        setCurrentInput('0');
        setPreviousInput('');
        setOperator(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.calculator}>
                <View style={styles.displayContainer}>
                    <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
                        {currentInput}
                    </Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.button, styles.buttonClear]} onPress={clearDisplay}>
                            <Text style={styles.buttonText}>C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonOperator]} onPress={() => appendOperator('+')}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonOperator]} onPress={() => appendOperator('-')}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => appendNumber('7')}>
                            <Text style={styles.buttonText}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => appendNumber('8')}>
                            <Text style={styles.buttonText}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => appendNumber('9')}>
                            <Text style={styles.buttonText}>9</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => appendNumber('4')}>
                            <Text style={styles.buttonText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => appendNumber('5')}>
                            <Text style={styles.buttonText}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => appendNumber('6')}>
                            <Text style={styles.buttonText}>6</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => appendNumber('1')}>
                            <Text style={styles.buttonText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => appendNumber('2')}>
                            <Text style={styles.buttonText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => appendNumber('3')}>
                            <Text style={styles.buttonText}>3</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.button, styles.buttonZero]} onPress={() => appendNumber('0')}>
                            <Text style={styles.buttonText}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonEqual]} onPress={calculate}>
                            <Text style={styles.buttonText}>=</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e2f', // Fond sombre
        justifyContent: 'center',
        alignItems: 'center',
    },
    calculator: {
        width: windowWidth * 0.9,
        maxWidth: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    displayContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        minHeight: 100,
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    displayText: {
        color: '#ffffff',
        fontSize: 48,
        fontWeight: '600',
        textAlign: 'right',
    },
    buttonsContainer: {
        gap: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 12,
    },
    button: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    buttonZero: {
        flex: 2,
        aspectRatio: 2.1,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '600',
    },
    buttonOperator: {
        backgroundColor: '#ff9500', // Orange style iOS
        borderColor: '#ff9500',
    },
    buttonClear: {
        backgroundColor: '#ff3b30', // Rouge
        borderColor: '#ff3b30',
    },
    buttonEqual: {
        flex: 2,
        aspectRatio: 2.1,
        backgroundColor: '#34c759', // Vert
        borderColor: '#34c759',
    },
});
