import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";

const Map = ({
  center = [18.5314, 73.8446],
  zoomControl = true,
  location = true,
  height = "500px",
  width = "100%",
  zoom = 15,
  hybrid = true,
  search = true,
  markers = [],
  onResize,
  onZoom,
  onMove,
  onClick,
  onDblclick,
  onMousedown,
  onMouseup,
  onMouseover,
  onMouseout,
  onKeypress,
  onMapLoad,
  nearbyOptions
}) => {
  const mapNode = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    initializeMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEqual(markers, markersRef.current)) {
      removeMarkers();
      renderMarkers();
    }
  }, [markers]);

  const initializeMap = () => {
    const timer = setInterval(() => {
      let tried = 0;
      if (window.MapmyIndia && window.MapmyIndia.Map) {
        clearInterval(timer);
        map.current = new window.MapmyIndia.Map(mapNode.current, {
          center,
          zoomControl,
          location,
          zoom,
          hybrid,
          search
        });
  
        renderMarkers();
  
        onResize && map.current.addEventListener("resize", onResize);
        onZoom && map.current.addEventListener("zoom", onZoom);
        onClick && map.current.addEventListener("click", onClick);
        onDblclick && map.current.addEventListener("dblclick", onDblclick);
        onKeypress && map.current.addEventListener("keypress", onKeypress);
        onMousedown && map.current.addEventListener("mousedown", onMousedown);
        onMouseout && map.current.addEventListener("resize", onMouseout);
        onMouseover && map.current.addEventListener("mouseover", onMouseover);
        onMove && map.current.addEventListener("move", onMove);
        onMouseup && map.current.addEventListener("mouseup", onMouseup);
  
        // Nearby functionality
        if (nearbyOptions) {
          const options = {
            divId: 'nearby_search',
            map: map.current,
            ...nearbyOptions
          };
          window.mappls.nearby(options);
        }
  
        onMapLoad && onMapLoad(map.current);
      } else {
        tried++;
        tried === 1500 && clearInterval(timer);
      }
    }, 100);
  };
  

  const removeMarkers = () => {
    markersRef.current.map(mk => map.current.removeLayer(mk));
    markersRef.current = [];
  };

  const renderMarkers = () => {
    markers.map(m => {
      if (m.position && Array.isArray(m.position)) {
        const { position, draggable, title, icon, onClick, onDragend } = m;
        let mk = new window.L.Marker(position, { draggable, title });

        title && mk.bindPopup(title);

        onDragend && mk.on("dragend", onDragend);
        onClick && mk.on("click", onClick);
        map.current.addLayer(mk);

        markersRef.current.push(mk);
        map.current.setView(mk.getLatLng());
      }
    });
  };

  return (
    <div
      ref={mapNode}
      id="map"
      className="map"
      style={{ width, height }}
    ></div>
  );
};

Map.propTypes = {
  center: PropTypes.array,
  zoomControl: PropTypes.bool,
  location: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  zoom: PropTypes.number,
  hybrid: PropTypes.bool,
  search: PropTypes.bool,
  onResize: PropTypes.func,
  onZoom: PropTypes.func,
  onMove: PropTypes.func,
  onClick: PropTypes.func,
  onDblclick: PropTypes.func,
  onMousedown: PropTypes.func,
  onMouseup: PropTypes.func,
  onMouseover: PropTypes.func,
  onMouseout: PropTypes.func,
  onKeypress: PropTypes.func,
  onMapLoad: PropTypes.func,
  markers: PropTypes.array,
  nearbyOptions: PropTypes.shape({
    keywords: PropTypes.string,
    refLocation: PropTypes.arrayOf(PropTypes.number),
    fitbounds: PropTypes.bool,
    geolocation: PropTypes.bool,
    click_callback: PropTypes.func
  })
};

export default Map;
