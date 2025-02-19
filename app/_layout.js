import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity } from "react-native";

const wordList = ['APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'WATER'];
const wordToGuess = wordList[Math.floor(Math.random()*wordList.length)];

const App = () => {
    const [guesses, setGuesses] = useState([['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']]);
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [message, setMessage] = useState('');

    const handleLetterInput = (letter) => {
        if (currentLetterIndex < 5 && currentGuessIndex < 5) {
            const newGuesses = [...guesses];
            newGuesses[currentGuessIndex][currentLetterIndex] = letter.toUpperCase();
            setGuesses(newGuesses);
            setCurrentLetterIndex(currentLetterIndex + 1);
        }
    };

    const handleBackspace = () => {
        if (currentLetterIndex > 0) {
            const newGuesses = [...guesses];
            newGuesses[currentGuessIndex][currentLetterIndex - 1] = '';
            setGuesses(newGuesses);
            setCurrentLetterIndex(currentLetterIndex - 1);
        }
    };

    const handleEnter = () => {
        if (currentLetterIndex === 5) {
            const guess = guesses[currentGuessIndex].join('');
            if (wordList.includes(guess)) {
                if (guess === wordToGuess) {
                    setMessage('Вы угадали!');
                } else {
                    setCurrentGuessIndex(currentGuessIndex + 1);
                    setCurrentGuessIndex(0);
                }
            } else {
                setMessage('Слово в словаре не найдено!');
            }
        }
    };

    const renderGuessRow = (index) => {
        return (
            <View key={index} style={styles.guessRow}>{guesses[index].map((letter,letterIndex) => (
                <Text key={letterIndex} style={styles.letter}>{letter}</Text>
            ))}
            </View>
        );
    };

    return (
            <View style={styles.container}>
             <Text style={styles.message}>{message}</Text>          
             {guesses.map((guess, index) => renderGuessRow(index))}          
             <View style={styles.keyboard}>          

               <TextInput          
                 style={styles.input}          
                 value={guesses[currentGuessIndex].join('')}          
                 onChangeText={(text) => {          
                  // обработтка текстра
          handleLetterInput(text);
                 }}

                 keyboardType="default"          
               />
          
               <TouchableOpacity onPress={handleBackspace} style={styles.button}>          
                <Text style={styles.buttonText}>←</Text>          
               </TouchableOpacity>          
               <TouchableOpacity onPress={handleEnter} style={styles.button}>          
                <Text style={styles.buttonText}>Enter</Text>          
               </TouchableOpacity>          
             </View>          
            </View>          
           );          
          };     

          const styles = StyleSheet.create({          
           container: {          
            flex: 1,          
            backgroundColor: '#fff',        
            alignItems: 'center',          
            justifyContent: 'center',          
           },
          
           guessRow: {          
            flexDirection: 'row',          
            marginBottom: 10,          
           },
          
           letter: {          
            fontSize: 24,          
            width: 30,          
            height: 30,          
            textAlign: 'center',          
            borderWidth: 1,          
            borderColor: 'gray',          
            marginRight: 5,          
           },
          
           keyboard: {          
            flexDirection: 'row',          
            marginTop: 20,          
           },
          
           button: {          
            padding: 10,          
            margin: 5,          
            backgroundColor: '#ccc',          
            borderRadius: 5,          
           },
          
           buttonText: {          
            fontSize: 16,          
           },
          
           input: {          
            flex: 1,          
            borderWidth: 1,          
            borderColor: 'gray',          
            padding: 10,          
            marginRight: 5,          
           },
          
           message: {          
            fontSize: 18,
            marginBottom: 20,
            textAlign: 'center',
           },
        }
    );


export default App;