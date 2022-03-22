export interface Event {
    geojson:    Geojson;
    _id:        string;
    img:        string;
    web:        string;
    name_event: string;
    location:   string;
    time:       string;
    tags_en:    string[];
    tags_vn:    string[];
    type_en:    string[];
    type_vn:    string[];
    desc:       string;
}

export interface Geojson {
    type:     string;
    geometry: Geometry;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}
