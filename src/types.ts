export namespace Search {
    export interface Props {
        state: boolean,
        query: string,
        results: any,
        isLoading: boolean,
        selected: any,
        details: Record<string, string | number>
    }
    
    export const defaultProps: Props = {
        state: false,
        query: '',
        results: [],
        isLoading: true,
        selected: {},
        details: {}
    }
}

export namespace InfosAndGeoJSON {
    export interface Props {
        type: string,
        autocomplete: boolean,
        limit: number
    }

    export const defaultProps = {
        type: 'locations',
        autocomplete: true,
        limit: 0,
    }

}

export namespace SearchByCoords {
    export interface Props {
        type: string,
        lat: string,
        lon: string,
        max_distance: string,
        limit: number,
        return: string
    }

    export const defaultProps = {
        type: 'locations',
        lat: '',
        lon: '',
        max_distance: '',
        limit: 0,
        return: ''
    }

}