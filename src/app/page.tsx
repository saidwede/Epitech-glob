"use client"
import { useState, useEffect, Suspense, lazy } from "react";

const Globe = lazy(() => import('react-globe.gl'));

export default function Home() {
  const markerData = [
    {
      lat: 6.3653600,
      lng: 2.4183300,
      name: "cotonou"
    },
    {
      lat: 48.864716,
      lng: 2.349014,
      name: "paris"
    },
    {
      lat: 34.052235,
      lng: -118.243683,
      name: "los_angeles"
    }
  ];

  const [mapData, setMapData] = useState<any>(null);

  useEffect(() => {
    fetch('/ne_110m_admin_0_countries.geojson')
      .then((res) => res.json())
      .then((data) => {
        setMapData(data);
      });
  }, []);

  return (
    <>
      <img
        src="/epit-techno.png"
        className="w-[500px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        alt=""
      />
      <div className="fixed w-screen h-screen top-0 left-0">
        {mapData != null && typeof window !== "undefined" && (
          <Suspense fallback={<div>Loading globe...</div>}>
            <Globe
              hexPolygonsData={mapData.features}
              showAtmosphere={false}
              hexPolygonUseDots={true}
              showGlobe={false}
              hexPolygonColor={() => '#ffffff'}
              htmlElementsData={markerData}
              backgroundColor="#00000000"
              htmlElement={(element: any) => {
                const el = document.createElement('div');
                el.innerHTML = '<img src="/' + element.name + '.svg">';
                return el;
              }}
            />
          </Suspense>
        )}
      </div>
    </>
  );
}
