import React from 'react'
import { Link } from 'react-router-dom';
import Code from '../tools/Code';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import '../styles/prism.css'
import communes from '../data/communes.json'
import communesGeojson from '../data/communes-geojson.json'
import departments from '../data/departments.json'
import departmentsGeojson from '../data/departments-geojson.json'
import regions from '../data/regions.json'
import regionsGeojson from '../data/regions-geojson.json'

const Doc = () => {

    const highlightJSON = (element: any) => {
        return Prism.highlight(element, Prism.languages.json, 'webmanifest');
    }

    return (
        <React.Fragment>
            <h2 id="entry-points">Point d'entrée</h2>
            <p>Point d'entrée de l'API</p>
            <Code>
                <b>/search/</b>
            </Code>

            <p>Définissez le <code>type</code> de recherche :</p>
            <ul>
                <li>Communes : <code>locations</code></li>
                <li>Départements : <code>departments</code></li>
                <li>Régions : <code>regions</code></li>
                <li>Nouvelles régions : <code>new-regions</code></li>
            </ul>
            <p>Le type de recherche est nécessaire pour l'ensemble des APIs (récupérer les informations, récupérer les coordonnées géographiques et faire une recherche par coordonnées géographiques.).</p>
            <p>Pour les types <code>departments</code>, <code>regions</code> et <code>new-regions</code>, une requête à la racine de l'url retourne l'ensemble des éléments.</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/<b><em>:type</em></b>
            </Code>

            <h2 id="get-infos">Récupérer les informations</h2>

            <p>Cette API permet de récupérer au format JSON les informations de communes, départments, régions - anciennes et nouvelles - de France métropolitaine et Outre-Mer <em>(cf. <Link to="/docs/#datas-structure/">structure des données</Link>)</em>.</p>
            <p>Le paramètre <code>query</code> défini une recherche de plein texte, cette requete retourne le premier élément correspondant trouvé :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/<b><em>:query</em></b>
            </Code>

            <p>Le paramètre <code>find</code> défini une recherche retournant un tableau (autocomplétion) comprenant tous les éléments correspondants trouvés :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/<b><em>find</em></b>/:query
            </Code>

            <p>Avec <code>limit</code> on peut contrôler le nombre maximum d’éléments retournés, le nombre maximum d'éléments retournés est de 100 :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/find/:query<b><em>?limit=10</em></b>
            </Code>

            <p>Avec <code>sort</code> on peut trier les éléments retournés <em>(cf. <Link to="/docs/#datas-structure/">structure des données</Link>)</em> :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/find/:query<b><em>?sort=fields.com_nom</em></b>
            </Code>

            <h2 id="get-coords">Récupérer les coordonnées géographiques</h2>

            <p>Cette API permet de récupérer au format GeoJSON les coordonnées géographiques de communes, départments, régions - anciennes et nouvelles - de France métropolitaine et Outre-Mer <em>(cf. <Link to="/docs/#datas-structure/">structure des données</Link>)</em>.</p>
            <p>Le retour est un GeoJSON <em>FeatureCollection</em>.</p>
            <p>Le paramètre <code>geolocation</code> correspond à la racine d'une recherche de coordonnées géographiques :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/<b><em>geolocation</em></b>
            </Code>

            <p>Le paramètre <code>query</code> défini une recherche de plein texte, cette requete retourne le premier élément correspondant trouvé :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/geolocation/<b><em>:query</em></b>
            </Code>

            <p>Le paramètre <code>find</code> défini une recherche retournant un tableau (autocomplétion) comprenant tous les éléments correspondants trouvés :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/geolocation/<b><em>find</em></b>/:query
            </Code>

            <p>Avec <code>limit</code> on peut contrôler le nombre maximum d’éléments retournés, le nombre maximum d'éléments retournés est de 100 :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/geolocation/find/:query<b><em>?limit=7</em></b>
            </Code>

            <p>Avec <code>sort</code> on peut trier les éléments retournés <em>(cf. <Link to="/docs/#datas-structure/">structure des données</Link>)</em> :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/geolocation/find/:query<b><em>?sort=properties.nom</em></b>
            </Code>

            <h2 id="search-by-coords">Recherche par coordonnées géographiques</h2>

            <p>Cette API permet de récupérer les informations au format JSON et/ou les coordonnées géographiques au format GeoJSON de communes, départments, régions - anciennes et nouvelles - de France métropolitaine et Outre-Mer à partir d'un point géographique représenté par une latitude et une longitude.</p>
            <p>Pour effectuer une recherche par coordonnées géographiques, les paramètres suivants sont obligatoires :</p>
            <ul>
                <li>Latitude : <code>lat</code></li>
                <li>Longitude : <code>lon</code></li>
            </ul>
            <p>Les paramètres <code>lat</code> et <code>lon</code> doivent être au format degrés décimaux (DD). Ex: 41.40338, 2.17403.</p>
            <p>Par default le paramètre <code>max_distance</code> étant à 0, cette requête retournera l'élément correspondant aux coordonnées <code>lat</code> et <code>lon</code> :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/geolocation<b><em>?lat=46.535569558508044&lon=5.376471889399545</em></b>
            </Code>

            <p>Pour retourner un tableau d'éléments correspondant à un périmètre de recherche, ajouter le paramètre <code>max_distance</code>. Sa valeur est exprimée en mètres (ex : 5000 = 5km) :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/geolocation?lat=46.5355644&lon=5.3764545<b><em>&max_distance=5000</em></b>
            </Code>

            <p>Avec <code>limit</code> et <code>sort</code> on peut contrôler et trier le nombre d’éléments retournés, le nombre maximum d'éléments retournés est de 100 :</p>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/geolocation?lat=46.5344&lon=5.3545<b><em>&limit=5&sort=fields.com_nom</em></b>
            </Code>

            <p>Le paramètre <code>return</code> défini le type d'élément retourné, par default sa valeur est <code>both</code>, la requête retourne les informations et les coordonnées des éléments au format GeoJSON.</p>
            <p>Les valeurs suivantes de <code>return</code> retournent : </p>
            <ul>
                <li><code>both</code> (default) : informations + coordonées GeoJSON</li>
                <li><code>geojson</code> : coordonées GeoJSON uniquement</li>
                <li><code>informations</code> : informations uniquement</li>
            </ul>
            <Code>
                {process.env.REACT_APP_API_LOCATIONS_URL}search/locations/geolocation?lat=46.5344&lon=5.3545<b><em>&return=geojson</em></b>
            </Code>

            <h2 id="tech-docs">Documentation technique</h2>

            <h3>Récupération des informations</h3>
            <div className='__tech-docs-head'>
                <div className='__method'>GET</div>
                <p>Point&nbsp;d'entrée&nbsp;: </p>
                <pre><code>/search</code></pre>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>:type</td>
                        <td>Type d'élément(s) recherché(s)</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>:query</td>
                        <td>Chaine de caractères recherchée</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>/find/</td>
                        <td>Paramètre de recherche retournant un tableau (autocomplétion)</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>limit</td>
                        <td>Contrôle le nombre d’éléments retournés</td>
                        <td>number</td>
                    </tr>
                    <tr>
                        <td>sort</td>
                        <td>Tri les résultats par la valeur spécifiée</td>
                        <td>string</td>
                    </tr>
                </tbody>
            </table>

            <h3>Récupération des coordonnées géographiques</h3>
            <div className='__tech-docs-head'>
                <div className='__method'>GET</div>
                <p>Point&nbsp;d'entrée&nbsp;: </p>
                <pre><code>/search/:type/geolocation</code></pre>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>:type</td>
                        <td>Type d'élément(s) recherché(s)</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>:query</td>
                        <td>Chaine de caractères recherchée</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>/find/</td>
                        <td>Paramètre de recherche retournant un tableau (autocomplétion)</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>limit</td>
                        <td>Contrôle le nombre d’éléments retournés</td>
                        <td>number</td>
                    </tr>
                    <tr>
                        <td>sort</td>
                        <td>Tri les résultats par la valeur spécifiée</td>
                        <td>string</td>
                    </tr>
                </tbody>
            </table>

            <h3>Recherche par coordonnées géographiques</h3>
            <div className='__tech-docs-head'>
                <div className='__method'>GET</div>
                <p>Point&nbsp;d'entrée&nbsp;: </p>
                <pre><code>/search/:type/geolocation</code></pre>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>:type</td>
                        <td>Type d'élément(s) recherché(s)</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>lat</td>
                        <td>Latitude (en degrés décimals)</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>lon</td>
                        <td>Longitude (en degrés décimals)</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>max_distance</td>
                        <td>Périmètre de recherche exprimé en mètres</td>
                        <td>number</td>
                    </tr>
                    <tr>
                        <td>limit</td>
                        <td>Contrôle le nombre d’éléments retournés</td>
                        <td>number</td>
                    </tr>
                    <tr>
                        <td>sort</td>
                        <td>Tri les résultats par la valeur spécifiée</td>
                        <td>string</td>
                    </tr>
                    <tr>
                        <td>return</td>
                        <td>Type d'élément retourné</td>
                        <td>string</td>
                    </tr>
                </tbody>
            </table>

            <h2 id="datas-structure">Structure des données</h2>

            <p id="communes">Communes :</p>
            <pre>
                <code
                    className="highlight language-json"
                    dangerouslySetInnerHTML={{ __html: highlightJSON(JSON.stringify(communes, null, 4)) }}
                />
            </pre>

            <p id="communes-geojson">Communes GeoJSON :</p>
            <pre>
                <code
                    className="highlight language-json"
                    dangerouslySetInnerHTML={{ __html: highlightJSON(JSON.stringify(communesGeojson, null, 4)) }}
                />
            </pre>

            <p id="departments">Départements :</p>
            <pre>
                <code
                    className="highlight language-json"
                    dangerouslySetInnerHTML={{ __html: highlightJSON(JSON.stringify(departments, null, 4)) }}
                />
            </pre>

            <p id="departments-geojson">Départements GeoJSON :</p>
            <pre>
                <code
                    className="highlight language-json"
                    dangerouslySetInnerHTML={{ __html: highlightJSON(JSON.stringify(departmentsGeojson, null, 4)) }}
                />
            </pre>

            <p id="regions">Régions :</p>
            <pre>
                <code
                    className="highlight language-json"
                    dangerouslySetInnerHTML={{ __html: highlightJSON(JSON.stringify(regions, null, 4)) }}
                />
            </pre>

            <p id="regions-geojson">Régions GeoJSON :</p>
            <pre>
                <code
                    className="highlight language-json"
                    dangerouslySetInnerHTML={{ __html: highlightJSON(JSON.stringify(regionsGeojson, null, 4)) }}
                />
            </pre>
        </React.Fragment>
    )
}

export default Doc