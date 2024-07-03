import React, { useState } from 'react';
import styled from 'styled-components';

const LabelSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;
    border-radius: 17px; /* Rounded shape */
`;

const Input = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ccc;
    border-radius: 17px; /* Rounded shape */
    transition: background-color 0.3s ease;

    &:before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 8px;
        bottom: 4px;
        background: white;
        border-radius: 50%; /* Rounded circle */
        transition: transform 0.3s ease;
    }
`;

const StyledInput = styled(Input)`
    &:checked + ${Slider} {
        background: var(--primary_color); /* Blue background when checked */
    }

    &:checked + ${Slider}:before {
        transform: translateX(26px); /* Move the slider circle to the right */
    }
`;

const ToggleSwitch = ({ isChecked, onChange }) => {
    const [checked, setChecked] = useState(isChecked);

    const handleToggle = () => {
        const newValue = !checked;
        setChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <LabelSwitch>
            <StyledInput type='checkbox' checked={checked} onChange={handleToggle} />
            <Slider />
        </LabelSwitch>
    );
};

export default ToggleSwitch;
