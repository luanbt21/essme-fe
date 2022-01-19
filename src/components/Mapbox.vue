<template>
  <div class="relative mb-4" :class="class">
    <div id="map" class="w-full h-full rounded-xl"></div>
    <pre id="coordinate-info"></pre>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import { onMounted, watch } from 'vue'
import { Feature } from '~/models/Geojson'

interface Props {
  data: ComputedRef<Feature[]>
  class?: string
  center?: [number, number]
  zoom?: number
  iconLink?: string
  iconZoom?: number
}

const props = withDefaults(defineProps<Props>(), {
  class: 'w-full h-[500px]',
  center: () => [106, 16],
  zoom: 4,
  iconLink: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
  iconZoom: 0.05
})

mapboxgl.accessToken = 'pk.eyJ1IjoiYnRsMDAxIiwiYSI6ImNrdGJuNGRqMzF4OWgydnI1c3c3Y25nZ3UifQ.kOzRfmTBUEHwX2-447KoaQ'
let map: mapboxgl.Map

watch(
  () => props.center,
  center => {
    map.flyTo({
      center,
      zoom: 5,
      essential: true
    })
  }
)

onMounted(() => {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: props.center,
    zoom: props.zoom
  })
  map.on('load', () => {
    map.loadImage(props.iconLink, (err, image) => {
      map.addSource('earthquakes', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: props.data
        },
        cluster: true,
        clusterMaxZoom: 14
      })

      map.setLayoutProperty('country-label', 'text-field', ['get', `name_vi`])

      if (err) {
        map.addLayer({
          id: 'poi-labels',
          type: 'circle',
          source: 'earthquakes',
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        })
      } else {
        map.addImage('icon', image as ImageBitmap)
        map.addLayer({
          id: 'poi-labels',
          type: 'symbol',
          source: 'earthquakes',
          layout: {
            'text-field': ['get', 'label'],
            'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
            'text-radial-offset': 0.5,
            'text-justify': 'auto',
            'text-size': 12,
            'icon-image': 'icon',
            'icon-size': props.iconZoom
          }
        })
      }

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
          'circle-radius': ['step', ['get', 'point_count'], 15, 100, 20, 750, 25]
        }
      })

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      })

      map.on('click', 'clusters', e => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        })
        const clusterId = features[0]?.properties?.cluster_id
        map.getSource('earthquakes').getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          })
        })
      })

      map.on('click', 'poi-labels', e => {
        const coordinates = e.features[0].geometry.coordinates.slice()

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup().setLngLat(coordinates).setHTML(JSON.stringify(e.features[0].properties.html)).addTo(map)
      })

      map.on('mouseenter', 'poi-labels', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'poi-labels', () => {
        map.getCanvas().style.cursor = ''
      })

      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = ''
      })

      map.on('mousemove', e => {
        const coordinate = e.lngLat.wrap()
        const elem = document.getElementById('coordinate-info')
        elem.innerHTML = `lng:${coordinate.lng} lat:${coordinate.lat}`
        elem.style.display = 'block'
      })
    })
  })
})
</script>

<style>
#coordinate-info {
  display: none;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  white-space: pre-wrap;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
  color: #222;
  background: #fff;
  z-index: 2;
}
</style>