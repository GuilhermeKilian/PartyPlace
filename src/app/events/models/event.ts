export class Event {
    key: string;
    name: string;
    longitude: bigint;
    latitude: bigint;
    address: string;
    details: string;
    
    constructor(key: string, name: string, longitude: bigint, latitude: bigint, address: string, details: string) {
        this.key = key;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.address = address;
        this.details = details;      
    }

 }