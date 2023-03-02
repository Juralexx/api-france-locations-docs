import React from 'react'
import axios, { AxiosResponse } from 'axios';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import '../styles/prism.css'
import { Search, SearchByCoords } from '../types'
import { ClassicInput } from '../tools/Inputs'
import { LoadingButton } from '../tools/Button';
import Switch from '../tools/Switch'
import Code from '../tools/Code'
import { ErrorCard } from '../tools/ErrorCard';
import { doesStringIncludes, isDecimalDegreeLatitude, isDecimalDegreeLongitude } from '../tools/Utils';

interface Props {
    selection: string
}

const SearchByCoordinatesDemo = ({ selection }: Props) => {
    const root: string = `${process.env.REACT_APP_API_LOCATIONS_URL}search/`
    const [url, setUrl] = React.useState<string>(`${root}locations/geolocation/`)
    const [search, setSearch] = React.useState<Search.Props>(Search.defaultProps)
    const [request, setRequest] = React.useState<SearchByCoords.Props>(SearchByCoords.defaultProps)
    const [error, setError] = React.useState<string | null>(null)

    const getUrl = () => {
        let params: Record<string, string | number> = { ...request }
        let path: string = `${root}${request.type}/geolocation`

        const keys: string[] = Object.keys(params).map(key => { return key })

        Object.entries(params)
            .slice(1)
            .forEach(([key, value]: [string, string | number]) => {
                if (value) {
                    if (doesStringIncludes(path, keys)) {
                        path = `${path}&${key}=${value}`
                    } else {
                        path = `${path}?${key}=${value}`
                    }
                }
            })
        return path
    }

    /**
     * 
     */

    React.useEffect(() => {
        setUrl(getUrl())
    }, [selection, request, search])

    /**
     * 
     */

    const [isLoading, setLoading] = React.useState<boolean>(false)

    const fetchAPI = async () => {
        if (!search.state)
            setSearch(prev => ({ ...prev, state: true }))

        const path: string = getUrl()

        if (request.lat && request.lon) {
            if (!isDecimalDegreeLatitude(request.lat)) {
                return setError('Le paramètre `lat` n\'est pas valide.')
            }
            if (!isDecimalDegreeLongitude(request.lon)) {
                return setError('Le paramètre `lon` n\'est pas valide.')
            }
            setLoading(true)
            return await axios
                .get(path)
                .then((res: AxiosResponse) => {
                    if (typeof res.data === 'object')
                        setSearch(data => ({ ...data, results: Array.prototype.concat(res.data), details: { ...request } }))
                    else if (Array.isArray(res.data))
                        setSearch(data => ({ ...data, results: res.data, details: { ...request } }))

                    setLoading(false)
                    if (error) {
                        setError(null)
                    }
                })
                .catch((err: any) => console.error(err))
        } else {
            setError('Les paramètres lat et lon sont obligatoire pour effectuer une recherche géographique.')
        }
    }

    const highlightJSON = (element: string) => {
        return Prism.highlight(element, Prism.languages.json, 'webmanifest');
    }

    return (
        <React.Fragment>
            <div className='__root'>
                <Code>{url}</Code>
                <LoadingButton
                    isLoading={isLoading}
                    onClick={() => fetchAPI()}
                >
                    Lancer la recherche
                </LoadingButton>
            </div>
            <ErrorCard
                text={error}
                display={error}
                clean={() => setError(null)}
            />
            <div className='__grid'>
                <div>
                    <h3>Latitude :</h3>
                    <ClassicInput
                        type='text'
                        placeholder='Latitude'
                        value={request.lat}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequest(prev => ({ ...prev, lat: e.target.value }))}
                    />
                </div>
                <div>
                    <h3>Longitude :</h3>
                    <ClassicInput
                        type='text'
                        placeholder='Longitude'
                        value={request.lon}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequest(prev => ({ ...prev, lon: e.target.value }))}
                    />
                </div>
                <div>
                    <h3>Périmètre (en mètres) :</h3>
                    <ClassicInput
                        type='text'
                        placeholder='Distance maximum'
                        value={request.max_distance}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequest(prev => ({ ...prev, max_distance: e.target.value }))}
                    />
                </div>
            </div><div className='__grid'>
                <div>
                    <h3>Type :</h3>
                    <div className='__choices-collection'>
                        <div className='__choice'>
                            <Switch
                                checked={request.type === 'locations'}
                                onChange={() => setRequest(prev => ({ ...prev, type: 'locations' }))}
                                disabled={false}
                            />
                            Communes
                        </div>
                        <div className='__choice'>
                            <Switch
                                checked={request.type === 'departments'}
                                onChange={() => setRequest(prev => ({ ...prev, type: 'departments' }))}
                                disabled={false}
                            />
                            Départements
                        </div>
                        <div className='__choice'>
                            <Switch
                                checked={request.type === 'regions'}
                                onChange={() => setRequest(prev => ({ ...prev, type: 'regions' }))}
                                disabled={false}
                            />
                            Régions
                        </div>
                        <div className='__choice'>
                            <Switch
                                checked={request.type === 'new-regions'}
                                onChange={() => setRequest(prev => ({ ...prev, type: 'new-regions' }))}
                                disabled={false}
                            />
                            Nouvelles régions
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Retour :</h3>
                    <div className='__choices-collection'>
                        <div className='__choice'>
                            <Switch
                                checked={request.return === ''}
                                onChange={() => setRequest(prev => ({ ...prev, return: '' }))}
                                disabled={false}
                            />
                            Informations + GeoJSON
                        </div>
                        <div className='__choice'>
                            <Switch
                                checked={request.return === 'informations'}
                                onChange={() => setRequest(prev => ({ ...prev, return: 'informations' }))}
                                disabled={false}
                            />
                            Informations
                        </div>
                        <div className='__choice'>
                            <Switch
                                checked={request.return === 'geojson'}
                                onChange={() => setRequest(prev => ({ ...prev, return: 'geojson' }))}
                                disabled={false}
                            />
                            GeoJSON
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Limite :</h3>
                    <ClassicInput
                        type='number'
                        placeholder='Nombre maximum de réponses'
                        min={0}
                        max={selection !== 'getGeoJSON' ? 15 : 10}
                        value={request.limit > 0 ? request.limit : ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequest(prev => ({ ...prev, limit: Number(e.target.value) }))}
                    />
                </div>
            </div>
            {search.results &&
                <React.Fragment>
                    {Object.keys(search.details).length > 0 &&
                        <React.Fragment>
                            <h3>Détails :</h3>
                            <div className='__response'>
                                <p><b>Type : </b>{search.details.type}</p>
                                <p><b>Latitude : </b>{search.details.lat}</p>
                                <p><b>Longitude : </b>{search.details.lon}</p>
                                <p><b>Périmètre : </b>{search.details.max_distance || 'Aucun'}</p>
                                <p><b>Retour : </b>
                                    {
                                        <React.Fragment>
                                            {search.details.return === '' &&
                                                'Informations + GeoJSON'
                                            }
                                            {search.details.return === 'geojson' &&
                                                'GeoJSON'
                                            }
                                            {search.details.return === 'informations' &&
                                                'Informations'
                                            }
                                        </React.Fragment>
                                    }
                                </p>
                                <p><b>Limite : </b>{search.details.limit === 0 ? 15 : search.details.limit}</p>
                            </div>
                        </React.Fragment>
                    }
                    <div className='__response-displayer'>
                        <h3>Réponse :</h3>
                        {search.results.length > 0 &&
                            <p className='__results'><b>Lieux : </b>
                                {search.results.map((result: Record<any, any>, i: number) => {
                                    return (
                                        search.details.return !== 'informations' ? (
                                            <span key={i}>
                                                {result.properties.nom}
                                            </span>
                                        ) : (
                                            <React.Fragment key={i}>
                                                {request.type === 'locations' &&
                                                    <span>{result.fields.com_nom}</span>
                                                }
                                                {request.type === 'departments' &&
                                                    <span>{result.nom_departement}</span>
                                                }
                                                {request.type === 'regions' &&
                                                    <span>{result.nom_region}</span>
                                                }
                                                {request.type === 'new-regions' &&
                                                    <span>{result.nom_region}</span>
                                                }
                                            </React.Fragment>
                                        )
                                    )
                                })}
                            </p>
                        }
                        <pre>
                            <code
                                className="highlight language-json"
                                dangerouslySetInnerHTML={{ __html: highlightJSON(JSON.stringify(search.results, null, 4)) }}
                            />
                        </pre>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default SearchByCoordinatesDemo