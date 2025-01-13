import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/tile';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  map!: Map;

  ngOnInit(): void {
    const initialLonLat = [78.9629, 20.5937];
    const initialWebMercator = fromLonLat(initialLonLat);
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: initialWebMercator,
        zoom: 4,
      }),
    });
  }
}
