import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

function App() {
    const [num, setNum] = useState(0);
    const [attributeValues, setAttributeValues] = useState(ATTRIBUTE_LIST.map((attribute) => ({ [attribute]: 0 })));

    function handleIncrementAttribute(attribute) {
        console.log('incrementing attribute: ', attribute);
        const updatedAttributeValues = [...attributeValues];

        const attributeIndex = updatedAttributeValues.findIndex((element) => Object.keys(element).includes(attribute));

        // don't need?
        const attributeToUpdate = updatedAttributeValues[attributeIndex];

        console.log('attributeToUpdate', attributeToUpdate);

        updatedAttributeValues[attributeIndex] = {
            [attribute]: updatedAttributeValues[attributeIndex][attribute] + 1,
        };

        setAttributeValues(updatedAttributeValues);
    }

    // TODO: combine with increment function
    function handleDecrementAttribute(attribute) {
        console.log('incrementing attribute: ', attribute);
        const updatedAttributeValues = [...attributeValues];

        const attributeIndex = updatedAttributeValues.findIndex((element) => Object.keys(element).includes(attribute));

        // don't need?
        const attributeToUpdate = updatedAttributeValues[attributeIndex];

        console.log('attributeToUpdate', attributeToUpdate);

        updatedAttributeValues[attributeIndex] = {
            [attribute]: updatedAttributeValues[attributeIndex][attribute] - 1,
        };

        setAttributeValues(updatedAttributeValues);
    }

    function getAttributeValue(attribute) {
        const attributeIndex = attributeValues.findIndex((element) => Object.keys(element).includes(attribute));

        console.log('attribute value: ', attributeValues[attributeIndex][attribute]);
        return attributeValues[attributeIndex][attribute];
    }

    console.log('attributeValues', attributeValues);

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>React Coding Exercise - Daisy Barrette</h1>
            </header>
            <section className='App-section'>
                <div>
                    Value:
                    {num}
                    <button>+</button>
                    <button>-</button>
                </div>
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
