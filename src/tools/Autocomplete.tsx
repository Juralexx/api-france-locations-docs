import React from 'react'
import styled from 'styled-components'
import { useClickOutside } from './hooks/useClickOutside'

const Autocomplete = (props: any) => {
    const autocompleteRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const [open, setOpen] = React.useState(props.open)
    useClickOutside(autocompleteRef, () => setOpen(false))

    return (
        open && (
            <AutoCompleteContainer ref={autocompleteRef}>
                {props.children}
            </AutoCompleteContainer>
        )
    )
}

export default Autocomplete

const AutoCompleteContainer = styled.div`
    position         : absolute;
    margin-top       : 5px;
    max-height       : 300px;
    width            : 100%;
    padding          : 5px 0;
    background-color : var(--body);
    border-radius    : var(--rounded-sm);
    box-shadow       : var(--shadow-two);
    overflow         : auto;
    z-index          : 750;

    > div:not(.circle-loader) {
        position  : relative;
        padding   : 10px 16px;
        cursor    : pointer;
        font-size : 13px;
    
        &:hover {
            background : var(--body-light);
            span {
                &:first-child {
                    color : var(--primary);
                }
            }
        }

        span {
            &:first-child {
                font-size    : 14px;
                font-weight  : 500;
                margin-right : 2px;
            }
        }
    }

    .no-result {
        display         : flex;
        align-items     : center;
        justify-content : center;
        padding         : 15px 35px;
        color           : var(--text);

        svg {
            width        : 26px;
            height       : 26px;
            margin-right : 20px;
        }
    }
    .circle-loader {
        padding : 20px 0;
    }
`