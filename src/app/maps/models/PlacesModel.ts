export class PlacesObjectModel{
    candidates:PlacesModel[];
}

export class Location{
    lat: number;
    lng: number;
}

export class PlacesModel {
    formatted_address: string;
    geometry: Location;
    name: string;
 }