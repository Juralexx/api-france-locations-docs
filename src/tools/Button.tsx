import React from "react";
import styled from "styled-components";
import CircleLoader from "./CircleLoader";

const buttonProps = (props: React.HTMLProps<HTMLButtonElement>) => {
    return ({
        type: props.type,
        style: props.style,
        onClick: props.onClick,
        onKeyDown: props.onKeyDown,
        disabled: props.disabled,
    })
}

export const Button = (props: any) => {
    const { children, className } = props
    return (
        <Btn className={`${className ? "btn_first " + className : "btn_first"}`}
            {...buttonProps(props)}
        >
            {children}
        </Btn>
    )
}

export const OutlinedButton = (props: any) => {
    const { children, className } = props
    return (
        <Btn className={`${className ? "outlined_btn " + className : "outlined_btn"}`}
            {...buttonProps(props)}
        >
            {children}
        </Btn>
    )
}

export const TextButton = (props: any) => {
    const { children, className } = props
    return (
        <Btn className={`${className ? "text_btn " + className : "text_btn"}`}
            {...buttonProps(props)}
        >
            {children}
        </Btn>
    )
}

export const StringButton = (props: any) => {
    const { children, className } = props
    return (
        <Btn className={`${className ? "string_btn " + className : "string_btn"}`}
            {...buttonProps(props)}
        >
            {children}
        </Btn>
    )
}

export const LoadingButton = (props: any) => {
    const { children, onClick, className, loadingText, isLoading } = props

    return (
        <Btn className={`${className ? "btn btn_first " + className : "btn btn_first"}`}
            {...buttonProps(props)}
            onClick={onClick}
        >
            {isLoading &&
                <>
                    <CircleLoader />
                    {loadingText ? loadingText : 'Chargement...'}
                </>
            }
            {!isLoading && children}
        </Btn>
    )
}

const Btn = styled.button<any>`
    position        : relative;
    height          : 36px;
    min-width       : 120px;
    display         : flex;
    align-items     : center;
    justify-content : center;
    padding         : 0 20px;
    font-size       : 14px;
    text-align      : center;
    text-decoration : none;
    text-transform  : none;
    border          : none;
    outline         : none;
    cursor          : pointer;
    white-space     : nowrap;
    overflow        : hidden;
    transform       : scale(1);

    &:disabled {
        opacity : 0.5;

        &:hover {
            background : var(--primary);
        }
    }

    &:active {
        transform  : scale(0.95);
    }

    &.delete {
        background-color:  rgba(var(--red-rgb), 0.9);
        &:hover {
            background-color: var(--red);
        }
    }

    &.validate {
        background-color:  rgba(var(--green-rgb), 0.9);
        &:hover {
            background-color: var(--green);
        }
    }

    &.btn_icon_start {
        svg {
            height       : 18px;
            width        : 18px;
            margin-right : 8px;
        }
    }
    &.btn_icon_end {
        svg {
            height      : 18px;
            width       : 18px;
            margin-left : 8px;
        }
    }

    a {
        display         : flex;
        align-items     : center;
        justify-content : center;
        left            : 0;
        top             : 0;
        width           : 100%;
        height          : 100%;
        color           : white;
    }

    &.btn_first {
        color         : white;
        background    : var(--primary);
        border-radius : var(--rounded-sm);
        box-shadow    : var(--shadow-tiny);

        svg {
            height : 18px;
            width  : 18px;
            color  : white;
        }

        &:hover {
            background : var(--primary-dark);
        }

        .circle-loader {
            margin : 0 5px 0 0;
            width  : 40px;
            .path {
                stroke       : var(--primary);
                stroke-width : 6px;
            }
        }
    }

    &.outlined_btn {
        border        : 1px solid var(--primary);
        color         : var(--primary);
        border-radius : var(--rounded-sm);

        &:hover {
            background : rgba(var(--primary-rgb), 0.10);
        }
    }

    &.text_btn {
        color         : var(--primary);
        border-radius : var(--rounded-sm);
        box-shadow    : none;
        background    : rgba(var(--primary-rgb), 0.15);

        &:hover {
            background : rgba(var(--primary-rgb), 0.22);
        }
        a {
            color      : var(--primary);
            background : none;
            padding    : 0;
            height     : unset;
        }
        svg {
            color : var(--primary);
        }
    }

    &.string_btn {
        color      : var(--primary);
        box-shadow : none;
        padding    : 0;
        height     : auto;
        min-width  : unset;

        &:active {
            transform  : none;
            box-shadow : none;
        }
        &:hover,
        &:active {
            &:before {
                content    : '';
                position   : absolute;
                left       : 0;
                bottom     : 0;
                width      : 100%;
                height     : 1px;
                background : var(--primary);
            }
        }
        a {
            color      : var(--primary);
            background : none;
            padding    : 0;
            height     : unset;
        }
    }
`