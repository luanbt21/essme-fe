export interface Geojson {
  type: 'FeatureCollection'
  features: Feature[]
}

export interface Feature {
  type: 'Feature'
  geometry: Geometry
  properties: Properties
}

export interface Geometry {
  type: 'Point'
  coordinates: [number, number]
}

export interface Properties {
  label: string
  html: string
}
