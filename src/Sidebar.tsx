import React from 'react';
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from './tools/icons/Icon';
import { addActive } from './tools/Utils';

const Sidebar = () => {
    const location = useLocation()
    const md = window.matchMedia('(max-width: 992px)').matches

    React.useEffect(() => {
        Array.from(document.querySelectorAll('#sidebar a'))
            .forEach((el: any) => {
                if (location.hash === el.dataset.link || location.hash === el.dataset.anchor || location.pathname === el.dataset.link) {
                    el.classList.add('active')
                } else {
                    if (el.classList.contains('active'))
                        el.classList.remove('active')
                }
            })
    }, [location])

    const [toggled, setToggled] = React.useState<boolean>(md ? false : true)

    React.useEffect(() => { return md ? setToggled(false) : () => { } }, [location, md]);

    return (
        <SidebarContainer
            id='sidebar'
            className={addActive(toggled)}
            onClick={() => !toggled ? setToggled(true) : () => { }}
        >
            <h3>API</h3>
            <div className='toggle__icon' onClick={() => setToggled(!toggled)}>
                <Icon name="DoubleArrowLeft" />
            </div>
            <Link
                to="/demo"
                data-link='/demo'
            >
                Demo
            </Link>

            <h3>Guide</h3>
            <Link
                to="/docs/#entry-points"
                data-link='/docs'
                data-anchor="#entry-points"
            >
                Points d'entrées
            </Link>
            <Link
                to="/docs/#get-infos"
                data-link='#get-infos'
            >
                Récupérer les informations
            </Link>
            <Link
                to="/docs/#get-coords"
                data-link='#get-coords'
            >
                Récupérer les coordonnées
            </Link>
            <Link
                to="/docs/#search-by-coords"
                data-link='#search-by-coords'
            >
                Recherche par coordonnées
            </Link>
            <Link
                to="/docs/#tech-docs"
                data-link='#tech-docs'
            >
                Documentation technique
            </Link>
            <Link
                to="/docs/#datas-structure"
                data-link='#datas-structure'
            >
                Structure des données
            </Link>
            <Link
                className='__sublink'
                to="/docs/#communes"
                data-link='#communes'
            >
                Communes
            </Link>
            <Link
                className='__sublink'
                to="/docs/#communes-geojson"
                data-link='#communes-geojson'
            >
                Communes GeoJSON
            </Link>
            <Link
                className='__sublink'
                to="/docs/#departments"
                data-link='#departments'
            >
                Départements
            </Link>
            <Link
                className='__sublink'
                to="/docs/#departments-geojson"
                data-link='#departments-geojson'
            >
                Départements GeoJSON
            </Link>
            <Link
                className='__sublink'
                to="/docs/#regions"
                data-link='#regions'
            >
                Régions
            </Link>
            <Link
                className='__sublink'
                to="/docs/#regions-geojson"
                data-link='#regions-geojson'
            >
                Régions GeoJSON
            </Link>
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    position         : relative;
    height           : calc(100vh - 90px);
    width            : 54px;
    max-width        : 54px;
    flex-shrink      : 0;
    padding          : 15px;
    background-color : var(--body-light);
    border-right     : 1px solid var(--light-border);
    overflow         : hidden;
    cursor           : pointer;
    transition       : .2s ease;

    .toggle__icon {
        position  : absolute;
        bottom    : 50%;
        right     : 10px;
        height    : 30px;
        width     : 30px;
        padding   : 3px;
        z-index   : 2;

        svg {
            transform : rotate(-180deg);
        }

        &:hover {
            color : var(--primary);
        }
    }

    h3,
    a,
    div:not(.toggle__icon),
    p {
        opacity     : 0;
        visibility  : hidden;
        transition  : .2s ease;
        white-space : nowrap;
    }

    &:hover {
        background-color : var(--body);
    }

    &.active {
        width      : 30%;
        max-width  : 350px;
        overflow-y : auto;

        &:hover {
            background-color : var(--body-light);
        }

        .toggle__icon {
            right     : 20px;
            top       : 20px;
            
            svg {
                transform : rotate(0);
            }
        }

        h3,
        a,
        div:not(.toggle__icon),
        p {
            opacity     : 1;
            visibility  : visible;
            transition  : .5s ease;
        }
    }
    
    @media(max-width: 992px) {
        height : calc(100vh - 60px);
    }

    @media(max-width: 768px) {
        width         : 100%;
        max-width     : 100%;
        height        : 46px;
        max-height    : 46px;
        border-right  : none;
        border-bottom : 1px solid var(--light-border);
        box-shadow    : var(--shadow-smooth);

        &.active {
            height      : 80%;
            max-height  : 80%;
            width       : 100%;
            max-width   : 100%;
            padding-top : 40px;

            .toggle__icon {
                position         : fixed;
                right            : 0;
                left             : 0;
                top              : 60px;
                display          : flex;
                justify-content  : center;
                padding          : 10px 0;
                height           : 44px;
                width            : 100%;
                background-color : var(--body-light);
                transform        : none;

                svg {
                    transform : rotate(90deg);
                }
            }
        }

        .toggle__icon {
            top       : 50%;
            right     : 50%;
            transform : translate(50%, -50%);

            svg {
                transform : rotate(-90deg);
            }
        }
    } 

    h3 {
        padding : 10px 0 3px;
    }

    a {
        display       : block;
        padding       : 7px 10px;
        font-size     : 1.1em;
        border-radius : var(--rounded-md);
        margin        : 5px 0;

        &:hover,
        &.active {
            background-color : var(--body);
        }

        &.active {
            color : var(--primary);
        }

        &.__sublink {
            font-size   : 1em;
            margin-left : 10px;
        }
    }
`