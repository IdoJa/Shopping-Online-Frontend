import { CityModel } from "../../models/info-models/city.model";

// Cities State:
export class CitiesState {
    public cities: CityModel[] = [];

    public constructor() {
        const cities = JSON.parse(sessionStorage.getItem("cities"));
        if (cities) {
            this.cities = cities;
        }
    }
}

// Cities Action Type:
export enum CitiesActionType {
    CitiesDownloaded = "CitiesDownloaded"
}

// Cities Action:
export interface CitiesAction {
    type: CitiesActionType;
    payload?: any;
}

export function citiesDownloadedAction(cities: CityModel[]): CitiesAction {
    return { type: CitiesActionType.CitiesDownloaded, payload: cities };
}

// Cities Reducer
export function citiesReducer(
    currentState: CitiesState = new CitiesState(),
    action: CitiesAction): CitiesState {
    
    const newState = { ...currentState };

    switch (action.type) {
        case CitiesActionType.CitiesDownloaded:
            newState.cities = action.payload;
            sessionStorage.setItem("cities", JSON.stringify(newState.cities));
            break;
    }
    
    return newState;
}