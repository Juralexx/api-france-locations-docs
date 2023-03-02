import React from 'react'
import styled from 'styled-components'

const Switch = (props: any) => {
    const { onChange, checked, disabled } = props
    return (
        <SwitchToggle>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            <span className="slider round"></span>
        </SwitchToggle>
    )
}

export default Switch

const SwitchToggle = styled.label`
    position  : relative;
    display   : inline-block;
    width     : 50px;
    height    : 22px;
    margin    : 0 10px 0 0;
    transform : scale(0.8);

    input { 
        opacity : 0;
        width   : 0;
        height  : 0;

        &:checked + .slider {
            background-color : var(--primary);

            &:before {
                transform : translateX(26px);
            }
        }

        &:focus + .slider {
            box-shadow : 0 0 1px #2196F3;
        }

        &:disabled {
            opacity : 0.5;
        }
    }

    .slider {
        position         : absolute;
        cursor           : pointer;
        top              : 0;
        left             : 0;
        right            : 0;
        bottom           : 0;
        background-color : #ccc;
        transition       : .4s;

        &:before {
            position         : absolute;
            content          : "";
            height           : 16px;
            width            : 16px;
            left             : 4px;
            bottom           : 3px;
            background-color : white;
            transition       : .4s;
        }

        &.round {
            border-radius : 34px;
        
            &:before {
                border-radius : 50%;
            }
        }
    }
`