export interface Event {
    _id:        string;
    img:        string;
    web:        string;
    event_name: string;
    location:   string;
    time:       string;
    type:       string;
    desc:       string;
    geojson:    Geojson;
}

export interface Geojson {
    type:     'Feature';
    geometry: Geometry;
}

export interface Geometry {
    type:        'Point';
    coordinates: number[];
}
