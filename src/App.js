import { useEffect, useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

function App() {
    const [attributeValues, setAttributeValues] = useState(ATTRIBUTE_LIST.map((attribute) => ({ [attribute]: 0 })));

    const [attributeModifierValues, setAttributeModifierValues] = useState(
        ATTRIBUTE_LIST.reduce((acc, currentValue) => ({ ...acc, [currentValue]: 0 }), {})
    );

    const [classStatus, setClassStatus] = useState(
        Object.keys(CLASS_LIST).reduce(
            (acc, currentValue) => ({ ...acc, [currentValue]: CLASS_STATUS_OPTIONS.DISABLED }),
            {}
        )
    );

    const [selectedCharacterClass, setSelectedCharacterClass] = useState(null);

    console.log('attributeModifierValues', attributeModifierValues);

    useEffect(() => {
        const characterClasses = Object.keys(CLASS_LIST);

        let updatedClassStatus = {};

        characterClasses.forEach((characterClass) => {
            // If a user's values for any attribute are too low, the class is disabled
            // Using .find to quit after finding the first failing attribute rather than checking
            // them all unnecessarily
            const firstFailingAttribute = Object.keys(CLASS_LIST[characterClass]).find((attribute) => {
                const minValue = CLASS_LIST[characterClass][attribute];

                return getAttributeValue(attribute, attributeValues) < minValue;
            });

            if (firstFailingAttribute) {
                updatedClassStatus[characterClass] = CLASS_STATUS_OPTIONS.DISABLED;
            } else {
                updatedClassStatus[characterClass] = CLASS_STATUS_OPTIONS.ENABLED;
            }
        });

        setClassStatus(updatedClassStatus);
    }, [attributeValues]);

    function handleUpdateAttributeValue(attribute, offset = 1) {
        const updatedAttributeValues = [...attributeValues];

        const attributeIndex = updatedAttributeValues.findIndex((element) => Object.keys(element).includes(attribute));

        updatedAttributeValues[attributeIndex] = {
            [attribute]: updatedAttributeValues[attributeIndex][attribute] + offset,
        };

        setAttributeValues(updatedAttributeValues);
    }

    function handleCharacterClassClick(characterClass) {
        if (selectedCharacterClass === characterClass) {
            setSelectedCharacterClass(null);
        } else {
            setSelectedCharacterClass(characterClass);
        }
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
                            {attribute}: {getAttributeValue(attribute, attributeValues)}
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
                                <button onClick={() => handleCharacterClassClick(characterClass)}>
                                    {characterClass}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Render the minimum requirements to qualify for a class only if the user has selected a class */}
                {!selectedCharacterClass ? (
                    <></>
                ) : (
                    <div className='App-column'>
                        <MinimumRequirements characterClass={selectedCharacterClass} />
                    </div>
                )}
            </section>
        </div>
    );
}

function MinimumRequirements({ characterClass }) {
    return (
        <>
            <h2>{`Minimum Requirements for ${characterClass}`}</h2>

            <ul>
                {Object.keys(CLASS_LIST[characterClass]).map((attribute) => (
                    <li key={attribute}>
                        {attribute}: {CLASS_LIST[characterClass][attribute]}
                    </li>
                ))}
            </ul>
        </>
    );
}

function getAttributeValue(attribute, attributeList) {
    const attributeIndex = attributeList.findIndex((element) => Object.keys(element).includes(attribute));

    return attributeList[attributeIndex][attribute];
}

const CLASS_STATUS_OPTIONS = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
};

export default App;
