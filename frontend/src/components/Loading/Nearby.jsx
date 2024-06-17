import React, { useEffect } from "react";
import MapmyIndia from "mapmyindia-react";

const NearBy = () => {
  useEffect(() => {
    const map = new MapmyIndia.Map('map', { center: [28.09, 78.3], zoom: 5, search: false });

    const options = {
      divId: 'nearby_search',
      map: map,
      keywords: 'Hospital',
      refLocation: [28.632735, 77.219696],
      fitbounds: true,
      click_callback: function (d) { alert(d); }
    };

    const nr = new MapmyIndia.nearby(options);

    // Cleanup function
    return () => {
      // Remove the nearby plugin when the component unmounts
      nr.remove();
    };
  }, []);

  return (
    <div>
      <div id="nearby_search" style={{ margin: "5px", width: "99%", height: "250px", overflowY: "auto", borderRadius: "10px" }}></div>
      <div id="map" style={{ width: "99%", height: "300px", margin: "0", padding: "0" }}></div>
    </div>
  );
};

export default NearBy;
