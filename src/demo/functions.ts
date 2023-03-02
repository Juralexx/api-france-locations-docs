export const getPlaceholder = (selection: string, requestParams: any) => {
    if (selection === 'getInformations') {
        if (!requestParams.autocomplete) {
            switch (requestParams.type) {
                case 'locations':
                    return 'Rechercher les informations d\'une commune'
                case 'departments':
                    return 'Rechercher les informations d\'un département'
                case 'regions':
                    return 'Rechercher les informations d\'une région'
                case 'new-regions':
                    return 'Rechercher les informations d\'une nouvelle région'
            }
        } else {
            switch (requestParams.type) {
                case 'locations':
                    return 'Rechercher les informations de communes'
                case 'departments':
                    return 'Rechercher les informations de départements'
                case 'regions':
                    return 'Rechercher les informations de régions'
                case 'new-regions':
                    return 'Rechercher les informations de nouvelles régions'
            }
        }
    }
    if (selection === 'getGeoJSON') {
        if (!requestParams.autocomplete) {
            switch (requestParams.type) {
                case 'locations':
                    return 'Rechercher les coordonnées GeoJSON d\'une commune'
                case 'departments':
                    return 'Rechercher les coordonnées GeoJSON d\'un département'
                case 'regions':
                    return 'Rechercher les coordonnées GeoJSON d\'une région'
                case 'new-regions':
                    return 'Rechercher les coordonnées GeoJSON d\'une nouvelle région'
            }
        } else {
            switch (requestParams.type) {
                case 'locations':
                    return 'Rechercher les coordonnées GeoJSON de communes'
                case 'departments':
                    return 'Rechercher les coordonnées GeoJSON de départements'
                case 'regions':
                    return 'Rechercher les coordonnées GeoJSON de régions'
                case 'new-regions':
                    return 'Rechercher les coordonnées GeoJSON de nouvelles régions'
            }
        }
    }
    if (selection === 'searchByCoordinates') {
        if (requestParams.return === '') {
            switch (requestParams.type) {
                case 'locations':
                    return 'Rechercher les informations et coordonnées GeoJSON de communes'
                case 'departments':
                    return 'Rechercher les informations et coordonnées GeoJSON de départements'
                case 'regions':
                    return 'Rechercher les informations et coordonnées GeoJSON de régions'
                case 'new-regions':
                    return 'Rechercher les informations et coordonnées GeoJSON de nouvelles régions'
            }
        }
        if (requestParams.return === 'location') {
            switch (requestParams.type) {
                case 'locations':
                    return 'Rechercher les informations de communes'
                case 'departments':
                    return 'Rechercher les informations de départements'
                case 'regions':
                    return 'Rechercher les informations de régions'
                case 'new-regions':
                    return 'Rechercher les informations de nouvelles régions'
            }
        }
        if (requestParams.return === 'geojson') {
            switch (requestParams.type) {
                case 'locations':
                    return 'Rechercher les coordonnées GeoJSON de communes'
                case 'departments':
                    return 'Rechercher les coordonnées GeoJSON de départements'
                case 'regions':
                    return 'Rechercher les coordonnées GeoJSON de régions'
                case 'new-regions':
                    return 'Rechercher les coordonnées GeoJSON de nouvelles régions'
            }
        }
    }
}