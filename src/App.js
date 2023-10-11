import { useEffect, useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

function App() {
    const [attributeValues, setAttributeValues] = useState(ATTRIBUTE_LIST.map((attribute) => ({ [attribute]: 0 })));
    // TODO: create definition for status options?
    const [classStatus, setClassStatus] = useState(
        Object.keys(CLASS_LIST).reduce((acc, currentValue) => ({ ...acc, [currentValue]: 'disabled' }), {})
    );

    function handleUpdateAttributeValue(attribute, offset = 1) {
        const updatedAttributeValues = [...attributeValues];

        const attributeIndex = updatedAttributeValues.findIndex((element) => Object.keys(element).includes(attribute));

        updatedAttributeValues[attributeIndex] = {
            [attribute]: updatedAttributeValues[attributeIndex][attribute] + offset,
        };

        setAttributeValues(updatedAttributeValues);
    }

    function getAttributeValue(attribute) {
        const attributeIndex = attributeValues.findIndex((element) => Object.keys(element).includes(attribute));

        return attributeValues[attributeIndex][attribute];
    }

    useEffect(() => {
        // TODO: Wrap getAttributeValue in useCallback so it's not a dependency, or rework so it takes
        // attributes as a parameter
        function getAttributeValueLOCAL(attribute) {
            const attributeIndex = attributeValues.findIndex((element) => Object.keys(element).includes(attribute));

            return attributeValues[attributeIndex][attribute];
        }

        const characterClasses = Object.keys(CLASS_LIST);

        let updatedClassStatus = {};

        characterClasses.forEach((characterClass) => {
            // If a user's values for any attribute are too low, the class is disabled
            // Using .find to quit after finding the first failing attribute rather than checking
            // them all unnecessarily
            const firstFailingAttribute = Object.keys(CLASS_LIST[characterClass]).find((attribute) => {
                const minValue = CLASS_LIST[characterClass][attribute];

                return getAttributeValueLOCAL(attribute) < minValue;
            });

            if (firstFailingAttribute) {
                updatedClassStatus[characterClass] = 'disabled';
            } else {
                updatedClassStatus[characterClass] = 'enabled';
            }
        });

        setClassStatus(updatedClassStatus);
    }, [attributeValues]);

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
                            <button onClick={() => handleUpdateAttributeValue(attribute)}>+</button>
                            <button onClick={() => handleUpdateAttributeValue(attribute, -1)}>-</button>
                        </div>
                    ))}
                </div>
                <div className='App-column'>
                    <h2>Classes</h2>
                    {Object.keys(CLASS_LIST).map((characterClass) => {
                        const charClassName = `characterClass ${classStatus[characterClass]}`;
                        return (
                            <div
                                key={characterClass}
                                className={charClassName}
                            >
                                {characterClass}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default App;
