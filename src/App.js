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

        const attributeToUpdate = updatedAttributeValues[attributeIndex];

        console.log('attributeToUpdate', attributeToUpdate);

        updatedAttributeValues[attribute] = updatedAttributeValues[attribute] + 1;

        setAttributeValues(updatedAttributeValues);
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
                            {attribute}: {num}
                            <button onClick={() => handleIncrementAttribute(attribute)}>+</button>
                            <button>-</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
