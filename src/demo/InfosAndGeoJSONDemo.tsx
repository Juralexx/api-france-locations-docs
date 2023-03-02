import React from 'react'
import axios, { AxiosResponse } from 'axios';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import '../styles/prism.css'
import { InfosAndGeoJSON, Search } from '../types'
import { ClassicInput } from '../tools/Inputs'
import Switch from '../tools/Switch'
import Autocomplete from '../tools/Autocomplete';
import CircleLoader from '../tools/CircleLoader'
import Code from '../tools/Code';
import { getPlaceholder } from './functions'
import { addClass, highlightSearchResults } from '../tools/Utils'
import Icon from '../tools/icons/Icon';

interface Props {
    selection: string
}

const InfosAndGeoJSONDemo = ({ selection }: Props) => {
    const root: string = `${process.env.REACT_APP_API_LOCATIONS_URL}search/`
    const [url, setUrl] = React.useState<string>(`${root}locations/`)
    const [search, setSearch] = React.useState<Search.Props>(Search.defaultProps)
    const [request, setRequest] = React.useState<InfosAndGeoJSON.Props>(InfosAndGeoJSON.defaultProps)

    const getUrl = (query: string) => {
        if (selection === 'getInformations') {
            if (!request.autocomplete) {
                return `${root}${request.type}/${query || ':query'}`
            } else {
                if (request.limit > 0)
                    return `${root}${request.type}/find/${query || ':query'}?limit=${request.limit}`
                else
                    return `${root}${request.type}/find/${query || ':query'}`
            }
        } else {
            if (!request.autocomplete) {
                return `${root}${request.type}/geolocation/${query || ':query'}`
            } else {
                if (request.limit > 0)
                    return `${root}${request.type}/geolocation/find/${query || ':query'}?limit=${request.limit}`
                else
                    return `${root}${request.type}/geolocation/find/${query || ':query'}`
            }
        }
    }

    /**
     * 
     */

    React.useEffect(() => {
        setUrl(getUrl(search.query))
    }, [selection, request, search])

    /**
     * 
     */

    const fetchAPI = async (query: string) => {
        setSearch(prev => ({ ...prev, query: query }))

        if (query.length >= 2) {
            if (!search.state) {
                setSearch(prev => ({ ...prev, state: true }))
            }
            if (!search.isLoading) {
                setSearch(prev => ({ ...prev, isLoading: true }))
            }

            const path: string = getUrl(query)

            return await axios
                .get(path)
                .then((res: AxiosResponse) => {
                    setSearch(data => ({ ...data, results: Array.from(res.data), isLoading: false }))
                })
                .then(() => {
                    const timer = setTimeout(() => highlightSearchResults(query, '.__autocomplete-item span'), 100)
                    return () => clearTimeout(timer)
                })
                .catch((err: any) => console.error(err))
        } else {
            setSearch(prev => ({ ...prev, state: false, results: [], isLoading: false }))
        }
    }

    const highlightJSON = (element: any) => {
        return Prism.highlight(element, Prism.languages.json, 'webmanifest');
    }

    /**
     * 
     */

    return (
        <React.Fragment>
            <Code>{url}</Code>
            <ClassicInput
                className="is_start_icon"
                type='text'
                placeholder={getPlaceholder(selection, request)}
                icon={<Icon name="Search" />}
                value={search.query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => fetchAPI(e.target.value)}
                cross
                onClean={() => setSearch(prev => ({ ...prev, query: '', state: false }))}
            />
            {search.state &&
                <Autocomplete open={search.state}>
                    {search.results.length > 0 && (
                        search.results.map((element: any, key: number) => {
                            return (
                                <React.Fragment key={key}>
                                    {selection === 'getInformations' &&
                                        <React.Fragment>
                                            {request.type === 'locations' &&
                                                <div className='__autocomplete-item' onClick={() => setSearch(prev => ({ ...prev, state: false, results: [], selected: element }))}>
                                                    <span>{`${element?.fields?.com_nom}`}</span> - <em>{`${element?.fields?.dep_nom} (${element?.fields?.dep_code})`}</em>
                                                </div>
                                            }
                                            {request.type === 'departments' &&
                                                <div className='__autocomplete-item' onClick={() => setSearch(prev => ({ ...prev, state: false, results: [], selected: element }))}>
                                                    <span>{`${element?.nom_departement} - ${element?.code_departement}`}</span>
                                                </div>
                                            }
                                            {(request.type === 'regions' || request.type === 'new-regions') &&
                                                <div className='__autocomplete-item' onClick={() => setSearch(prev => ({ ...prev, state: false, results: [], selected: element }))}>
                                                    <span>{`${element?.nom_region}`}</span>
                                                </div>
                                            }
                                        </React.Fragment>
                                    }
                                    {selection === 'getGeoJSON' &&
                                        <div className='__autocomplete-item' onClick={() => setSearch(prev => ({ ...prev, state: false, results: [], selected: element }))}>
                                            <span>{`${element?.properties?.nom}`}</span>
                                        </div>
                                    }
                                </React.Fragment>
                            )
                        })
                    )
                    }
                    {search.isLoading &&
                        search.results.length === 0 && (
                            <CircleLoader />
                        )
                    }
                    {search.state &&
                        search.results.length === 0 &&
                        !search.isLoading && (
                            <div className="no-result">
                                Aucun résultat ne correspond à votre recherche...
                            </div>
                        )
                    }
                </Autocomplete>
            }
            <div className='__grid'>
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
                <div className='__autocompletion'>
                    <h3>Autocomplétion :</h3>
                    <Switch
                        checked={request.autocomplete}
                        onChange={() => setRequest(prev => ({ ...prev, autocomplete: !request.autocomplete }))}
                        disabled={false}
                    />
                    {request.autocomplete ? 'Activée' : 'Désactivée'}
                </div>
                <div className={`__choices-collection ${addClass(!request.autocomplete, 'disabled')}`}>
                    <div className='__filter'>
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
            </div>
            {search.selected &&
                <React.Fragment>
                    <h3>Réponse :</h3>
                    <pre>
                        <code
                            className="highlight language-json"
                            dangerouslySetInnerHTML={{ __html: highlightJSON(JSON.stringify(search.selected, null, 4)) }}
                        />
                    </pre>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default InfosAndGeoJSONDemo