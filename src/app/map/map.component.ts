import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { locationPoints } from './map-location-points';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  map!: Map;
  vectorSource!: VectorSource;
  vectorLayer!: VectorLayer;

  constructor() {}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    const initialLonLat = [78.9629, 20.5937];
    const initialMapPosition = fromLonLat(initialLonLat);
    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ],
      view: new View({
        center: initialMapPosition,
        zoom: 5,
      }),
    });
    locationPoints.forEach((coordinate) => {});
    this.addMarker();
    this.map.on('click', (evt) => {
      const lonLat = toLonLat(evt.coordinate);
      locationPoints.push({
        latitude: lonLat[1],
        longitude: lonLat[0],
      });
      this.addMarker();
    });
  }

  addMarker() {
    this.vectorSource.clear();
    locationPoints.forEach((point: { latitude: number; longitude: number }) => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([point.longitude, point.latitude])),
      });
      marker.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            src: 'map-icons/location-icon.png',
            scale: 0.1,
          }),
        })
      );
      this.vectorSource.addFeature(marker);
    });
  }

  addMarkerOnMapClick() {}
}
