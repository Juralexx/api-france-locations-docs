import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Demo from './demo/Demo';
import Doc from './docs/Doc';

const App = () => {
    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (location.hash.length > 0) {
            let el = document.getElementById(location.hash.substring(1))
            if (el) {
                el.scrollIntoView()
                el.focus()
            }
        }
        if (window.location.pathname !== '/') {
            if (window.location.pathname.slice(-1) === '/') {
                navigate(window.location.pathname.slice(0, window.location.pathname.length - 1))
            }
        }
        if (location.pathname === '/') {
            navigate('/docs')
        }
    }, [location])

    return (
        <Root>
            <Header />
            <RootContainer>
                <Sidebar />
                <RootInner>
                    <RootInnerContainer>
                        <Routes>
                            <Route path='/demo' element={
                                <Demo />
                            } />
                            <Route path='/docs' element={
                                <Doc />
                            } />
                            <Route path='*' element={
                                <Navigate to="/" replace />
                            } />
                        </Routes>
                    </RootInnerContainer>
                </RootInner>
            </RootContainer>
        </Root>
    );
}

export default App;

const Root = styled.div`
    position : relative;
    height   : 100vh;
    width    : 100vw;
`

const RootContainer = styled.div`
    position : absolute;
    top      : 90px;
    bottom   : 0;
    right    : 0;
    left     : 0;
    width    : 100%;
    height   : calc(100vh - 90px);
    display  : flex;

    @media(max-width: 992px) {
        top    : 60px;
        height : calc(100vh - 60px);
    }
    @media(max-width: 768px) {
        display        : flex;
        flex-direction : column;
    }
`

const RootInner = styled.div`
    background-color : var(--body-light);
    width            : 100%;
    height           : 100%;
    padding          : 0 50px 50px;
    overflow-y       : scroll;

    @media(max-width: 992px) {
        padding : 0 20px 50px;
    }
    @media(max-width: 768px) {
        padding : 0 15px 50px;
    }

    p {
        font-size              : 16px;
        line-height            : 1.5em;
        -webkit-font-smoothing : antialiased;
        padding-top            : 10px;
        padding-bottom         : 10px;
    }

    ul {
        padding-left  : 20px;
        margin-bottom : 10px;
    }

    li {
        font-size              : 16px;
        line-height            : 1.5em;
        -webkit-font-smoothing : antialiased;
        list-style-type        : disc;
    }

    h2 {
        padding   : 40px 0 20px;
        font-size : 32px;
    }

    b {
        color : var(--primary);
    }

    a {
        text-decoration : underline;
    }

    .code__block {
        position      : relative;
        background    : var(--body);
        margin-bottom : 20px;

        code {
            white-space : nowrap;
        }

        .__clipboard {
                position      : absolute;
                top           : 10px;
                right         : 10px;
                width         : 28px;
                height        : 28px;
                padding       : 5px;
                border-radius : var(--rounded-md);
                color         : #d4d4d4;
                background    : var(--body-light);
                cursor        : pointer;
                z-index       : 10;
                visibility    : hidden;
                opacity       : 0;
                transition    : all .2s ease-in-out;

                &.__copied {
                    color : var(--primary);
                }
            }

        &:hover {
            .__clipboard {
                visibility : visible;
                opacity    : 1;
                transition : all .2s ease-in-out;
            }
        }
    }

    pre {
        position      : relative;
        display       : block;
        width         : 100%;
        padding       : 1em;
        background    : var(--body);
        border-radius : var(--rounded-md);
        overflow-x    : auto;

        &::-webkit-scrollbar {
            height : 5px;
        }
        &::-webkit-scrollbar-thumb {
            background : var(--light-border);
        }
        &::-webkit-scrollbar-track {
            background : var(--body);
        }

        code {
            background  : none;
            font-size   : 1em;
        }
    }

    code {
        background     : hsla(0,0%,100%,.1);
        color          : var(--white);
        font-family    : SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size      : 0.9em;
        word-wrap      : break-word;
        vertical-align : middle;
        display        : inline-block;
        padding        : 0 5px;
        border-radius  : var(--rounded-md);
    }

    .__tech-docs-head {
        display     : flex;
        align-items : center;

        p {
            margin-left    : 15px;
            vertical-align : middle;
        }

        pre {
            display     : inline;
            padding     : 5px 7px 7px;
            font-size   : 14px;
            margin-left : 5px;
            width       : auto;
        }

        span {
            padding          : 3px 12px 5px;
            background-color : var(--body-light);
            border-radius    : var(--rounded-md);
            font-size        : 15px;
        }
    }

    .__method {
        padding          : 10px;
        border-radius    : var(--rounded-md);
        background-color : var(--primary);
        font-weight      : 700;
    }

    h3 {
        margin-top : 20px;
    }

    table {
        margin-top      : 10px;
        margin-bottom   : 40px;
        border-collapse : collapse;
        width           : 100%;
    }

    th {
        text-align  : left;
        padding     : 10px;
        font-weight : 600;
    }

    td {
        background-color : var(--body);
        border           : 2px solid var(--body-light);
        text-align       : left;
        padding          : 10px;
    }
`

const RootInnerContainer = styled.div`
    width     : 100%;
    max-width : 992px;
    height    : auto;
    margin    : auto;
`