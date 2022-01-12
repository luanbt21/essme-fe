export interface Geojson {
  type:       string;
  properties: Properties;
  geometry:   Geometry;
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  description: string;
}
