import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { addActive } from '../tools/Utils'
import InfosAndGeoJSONDemo from './InfosAndGeoJSONDemo'
import SearchByCoordinatesDemo from './SearchByCoordsDemo'

const Demo = () => {
    const [selection, setSelection] = React.useState<string>('getInformations') // getInformations, getGeoJSON, searchByCoordinates

    return (
        <DemoContainer>
            <h2>Demo</h2>
            {selection === 'getInformations' &&
                <React.Fragment>
                    <h3>Récupérer les informations</h3>
                    <p className='__description'>Cette API permet de récupérer au format JSON les informations de communes, départments, régions - anciennes et nouvelles - de France métropolitaine et Outre-Mer <em>(cf. <Link to="/docs/#datas-structure/">structure des données</Link>)</em>.</p>
                </React.Fragment>
            }
            {selection === 'getGeoJSON' &&
                <React.Fragment>
                    <h3>Récupérer les coordonnées (GeoJSON)</h3>
                    <p className='__description'>Cette API permet de récupérer au format GeoJSON les coordonnées géographiques de communes, départments, régions - anciennes et nouvelles - de France métropolitaine et Outre-Mer <em>(cf. <Link to="/docs/#datas-structure/">structure des données</Link>)</em>.</p>
                </React.Fragment>
            }
            {selection === 'searchByCoordinates' &&
                <React.Fragment>
                    <h3>Recherche par coordonnées géographiques</h3>
                    <p className='__description'>Cette API permet de récupérer les informations au format JSON et/ou les coordonnées géographiques au format GeoJSON de communes, départments, régions - anciennes et nouvelles - de France métropolitaine et Outre-Mer à partir d'un point géographique représenté par une latitude et une longitude.</p>
                </React.Fragment>
            }
            <h3>Requête :</h3>
            <div className='api__main__type'>
                <button
                    className={addActive(selection === 'getInformations')}
                    onClick={() => setSelection('getInformations')}
                >
                    Récupérer les informations
                </button>
                <button
                    className={addActive(selection === 'getGeoJSON')}
                    onClick={() => setSelection('getGeoJSON')}
                >
                    Récupérer les coordonnées (GeoJSON)
                </button>
                <button
                    className={addActive(selection === 'searchByCoordinates')}
                    onClick={() => setSelection('searchByCoordinates')}
                >
                    Recherche par coordonnées géographiques
                </button>
            </div>
            {selection !== 'searchByCoordinates' ? (
                <InfosAndGeoJSONDemo
                    selection={selection}
                />
            ) : (
                <SearchByCoordinatesDemo
                    selection={selection}
                />
            )}
        </DemoContainer>
    )
}

export default Demo

const DemoContainer = styled.div`
    position : relative;
    width    : 100%;

    h2 {
        padding-bottom : 0;
    }

    .__description {
        padding-top : 0;
        text-align  : justify;
    }

    .__root {
        display               : grid;
        grid-template-columns : 3fr 1fr;
        grid-gap              : 10px;

        @media(max-width: 768px) {
            grid-template-columns : 1fr;
            margin-top            : 30px;
        }

        .code__block {
            max-width  : 100%;
            overflow-x : auto;
            margin     : 0;
        }
        button {
            height           : 44px;
            padding          : 0 30px;
            color            : var(--primary);
            background-color : rgba(var(--primary-rgb), 0.12);
            border           : 1px solid rgba(var(--primary-rgb), 0.35);

            &:hover {
                background-color : rgba(var(--primary-rgb), 0.25);
            }
        }
    }

    h3 {
        font-size : 18px;
        margin    : 25px 0 15px;
        
        @media(max-width: 576px) {
            margin-top : 5px;
        }
    }

    .api__main__type {
        display               : grid;
        grid-template-columns : 1fr 1fr 1fr;
        grid-gap              : 10px;
        margin-top            : 20px;
        margin-bottom         : 20px;

        button {
            padding          : 10px;
            background-color : var(--body);
            border-radius    : var(--rounded-sm);
            border           : 1px solid transparent;

            &.active {
                background-color : rgba(var(--primary-rgb), 0.12);
                border           : 1px solid rgba(var(--primary-rgb), 0.35);
                color            : var(--primary);
            }
        }

        @media(max-width: 768px) {
            grid-template-columns : 1fr;
        }
    }

    .__grid {
        display               : grid;
        grid-template-columns : 1fr 1fr 1fr;
        grid-gap              : 10px;

        @media(max-width: 768px) {
            grid-template-columns : 1fr 1fr;
            margin-top            : 30px;
            margin-bottom         : 30px;
        }
        @media(max-width: 576px) {
            grid-template-columns : 1fr;
        }
    }

    .__choices-collection {
        display         : flex;
        flex-direction  : column;
        justify-content : space-between;

        .__choice {
            display     : flex;
            align-items : center;
            font-size   : 18px;
            padding     : 5px 0;

            @media(max-width: 992px) {
                font-size : 16px;
            }

            .__checkbox {
                margin-right : 5px;
            }
        }
    }

    .__autocompletion {
        font-size : 18px;
    }

    .__response {
        display               : grid;
        grid-template-columns : 1fr 1fr;
        margin-top            : 15px;

        @media(max-width: 576px) {
            grid-template-columns : 1fr;
        }

        p {
            padding    : 0;
        }
    }

    .__response-displayer {
        @media(max-width: 576px) {
            margin-top : 30px;
        }
    }

    .__results {
        span ~ span::before{
            content: ", ";
        }
    }

    .disabled {
        opacity : 0.5;
    }
`