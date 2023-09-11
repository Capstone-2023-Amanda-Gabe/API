import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
const Typewriter = ({ text, delay, infinite }) => {

    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let timeout;
        if (currentIndex < text.length) {
            timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

        } else if (infinite) { // ADD THIS CHECK
            setCurrentIndex(0);
            setCurrentText('');
        }

        return () => clearTimeout(timeout);
    }, [currentIndex, delay, text]);
    // Typing logic goes here

    return <Text style={{ color: '#f8146b', fontSize: 40, fontWeight: 'bold', marginTop: 200 }}>{currentText}</Text>;

};

export default Typewriter;

// import { useState, useEffect } from 'react';

// const Typewriter = ({ text, delay, infinite }) => {
//   const [currentText, setCurrentText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     let timeout;

//     if (currentIndex <= text.length) {
//       timeout = setTimeout(() => {
//         setCurrentText(prevText => prevText + text[currentIndex]);
//         setCurrentIndex(prevIndex => prevIndex + 1);
//       }, delay);

//     } else if (infinite) { // ADD THIS CHECK
//       setCurrentIndex(0);
//       setCurrentText('');
//     }

//     return () => clearTimeout(timeout);
//   }, [currentIndex, delay, infinite, text]);

//   return <span>{currentText}</span>;
// };

// export default Typewriter;