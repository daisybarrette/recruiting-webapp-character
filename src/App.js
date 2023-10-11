import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

function App() {
    const [attributeValues, setAttributeValues] = useState(ATTRIBUTE_LIST.map((attribute) => ({ [attribute]: 0 })));

    function handleIncrementAttribute(attribute) {
        const updatedAttributeValues = [...attributeValues];

        const attributeIndex = updatedAttributeValues.findIndex((element) => Object.keys(element).includes(attribute));

        updatedAttributeValues[attributeIndex] = {
            [attribute]: updatedAttributeValues[attributeIndex][attribute] + 1,
        };

        setAttributeValues(updatedAttributeValues);
    }

    // TODO: combine with increment function
    function handleDecrementAttribute(attribute) {
        const updatedAttributeValues = [...attributeValues];

        const attributeIndex = updatedAttributeValues.findIndex((element) => Object.keys(element).includes(attribute));

        updatedAttributeValues[attributeIndex] = {
            [attribute]: updatedAttributeValues[attributeIndex][attribute] - 1,
        };

        setAttributeValues(updatedAttributeValues);
    }

    function getAttributeValue(attribute) {
        const attributeIndex = attributeValues.findIndex((element) => Object.keys(element).includes(attribute));

        return attributeValues[attributeIndex][attribute];
    }

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>React Coding Exercise - Daisy Barrette</h1>
            </header>
            <section className='App-section'>
                <div className='App-column'>
                    <h2>Attributes</h2>
                    {ATTRIBUTE_LIST.map((attribute) => (
                        <div key={attribute}>
                            {attribute}: {getAttributeValue(attribute)}
                            <button onClick={() => handleIncrementAttribute(attribute)}>+</button>
                            <button onClick={() => handleDecrementAttribute(attribute)}>-</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
