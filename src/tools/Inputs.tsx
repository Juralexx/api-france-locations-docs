import React from 'react';
import styled from 'styled-components';
import Icon from './icons/Icon';
import { useClickOutside } from './hooks/useClickOutside';

const inputProps = (props: React.HTMLProps<HTMLInputElement>) => {
    return ({
        type: props.type,
        id: props.id,
        name: props.name,
        placeholder: props.placeholder,
        defaultValue: props.defaultValue,
        value: props.value,
        onChange: props.onChange,
        onInput: props.onInput,
        onClick: props.onClick,
        onBlur: props.onBlur,
        onFocus: props.onFocus,
        onKeyUp: props.onKeyUp,
        onKeyDown: props.onKeyDown,
        onKeyPress: props.onKeyPress,
        readOnly: props.readOnly,
        disabled: props.disabled,
        min: props.min,
        max: props.max
    })
}

export const ClassicInput = (props: any) => {
    const { useRef, className, cross, icon, onClean } = props

    return (
        <InputClassic className={`${className ? 'classic-input ' + className : 'classic-input'}`}>
            <input
                ref={useRef}
                {...inputProps(props)}
            />
            {icon &&
                <div className="start_icon">
                    {icon}
                </div>
            }
            {cross &&
                ((props.value || props.defaultValue) &&
                    (props.value?.length > 0 || props.defaultValue?.length > 0)) && (
                    <div onClick={onClean} className="svg_container">
                        <Icon name="Cross" />
                    </div>
                )}
        </InputClassic>
    )
}

const InputClassic = styled.div`
    position    : relative;
    display     : flex;
    align-items : center;
    width       : 100%;
    z-index     : 10;

    input {
        display       : block;
        height        : 44px;
        width         : 100%;
        padding       : 8px 12px;
        font-size     : 16px;
        color         : var(--input-text);
        background    : var(--input);
        border-radius : var(--rounded-sm);
        border        : 1px solid var(--light-border);
        outline       : none;

        &::placeholder {
            color : var(--placeholder);
        }

        &:focus {
            border : 1px solid rgba(var(--primary-rgb), 0.35);
        }
    }

    .svg_container {
        position      : absolute;
        top           : 50%;
        transform     : translateY(-50%);
        right         : 10px;
        padding       : 5px;
        height        : 26px;
        width         : 26px;
        border-radius : 20px;
        cursor        : pointer;
        z-index       : 700;

        svg {
            height   : 16px;
            width    : 16px;
            color    : var(--placeholder);
        }

        &:hover {
            background : var(--body-light);
        }
    }

    &.is_start_icon {
        input {
            padding : 6px 12px 6px 40px;
        }
    }

    .start_icon {
        height           : 100%;
        position         : absolute;
        bottom           : 0;
        display          : flex;
        align-items      : center;
        padding          : 0 0 0 13px;
        transform        : scale(1);
        transform-origin : 0;

        svg {
            height : 20px;
            width  : 20px;
            color  : var(--placeholder);
        }
    }
`

export const DropdownInput = (props: any) => {
    const { value, className, onClean, cross } = props
    const [open, setOpen] = React.useState(false)
    const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>
    useClickOutside(ref, () => setOpen(false))

    return (
        <InputDropdown ref={ref} className={`${className ? 'dropdown-input ' + className : 'dropdown-input'}`}>
            <input
                {...inputProps(props)}
                onClick={() => setOpen(!open)}
            />
            {cross &&
                value &&
                value.length > 0 ? (
                <Icon name="Cross" className="cross" onClick={onClean} />
            ) : (
                <Icon name="CaretDown" />
            )}
            {open &&
                <div className="dropdown-input-choices custom-scrollbar" onClick={() => setOpen(false)}>
                    {props.children}
                </div>
            }
        </InputDropdown>
    )
}

const InputDropdown = styled.div`
    position      : relative;
    height        : 44px;
    background    : var(--input);
    border        : 1px solid var(--primary);
    border-radius : var(--rounded-sm);
    z-index       : 1;
    cursor        : pointer;

    input {
        padding            : 10px;
        color              : var(--input-text);
        background         : transparent;
        border-radius      : var(--rounded-sm);
        outline            : none;
        cursor             : pointer;
        width              : 85%;
        height             : 100%;
        text-overflow      : ellipsis;
        overflow           : hidden;
        display            : -webkit-box;
        -webkit-line-clamp : 1;
        -webkit-box-orient : vertical;
        caret-color        : transparent;
        border             : none;

        &::placeholder {
            color : var(--placeholder);
        }
    }

    svg {
        position : absolute;
        height   : 16px;
        width    : 16px;
        bottom   : 12px;
        right    : 10px;
        color    : var(--text-secondary);
        z-index  : 100;
    }

    > div, 
    > a {
        position      : absolute;
        left          : 0;
        width         : 100%;
        max-height    : 300px;
        overflow-y    : auto;
        margin-top    : 5px;
        background    : var(--input);
        box-shadow    : var(--shadow-xl);
        border-radius : var(--rounded-sm);

        div {
            padding : 8px 12px;
            cursor  : pointer;
            color   : var(--text-secondary);

            &:hover {
                background-color : var(--light);
            }
        }
    }
`