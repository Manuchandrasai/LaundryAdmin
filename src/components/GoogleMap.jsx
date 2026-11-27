import { useEffect, useRef } from 'react';

const loadGoogleMapsScript = (apiKey) =>
  new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }
    const existing = document.querySelector('script[data-google-maps]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google.maps));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-google-maps', 'true');
    script.onload = () => resolve(window.google.maps);
    script.onerror = reject;
    document.head.appendChild(script);
  });

const GoogleMap = ({ apiKey, center = { lat: 12.9716, lng: 77.5946 }, zoom = 12 }) => {
  const mapRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const key = apiKey || window.GOOGLE_MAPS_API_KEY || import.meta?.env?.VITE_GOOGLE_MAPS_API_KEY;
    if (!key) {
      if (overlayRef.current) {
        overlayRef.current.textContent =
          'Google Maps API key missing. Set VITE_GOOGLE_MAPS_API_KEY in .env or window.GOOGLE_MAPS_API_KEY at runtime.';
      }
      return;
    }
    let mapInstance;
    loadGoogleMapsScript(key)
      .then((maps) => {
        if (!mapRef.current) return;
        mapInstance = new maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        // eslint-disable-next-line no-new
        new maps.Marker({ position: center, map: mapInstance });
        if (overlayRef.current) {
          overlayRef.current.style.display = 'none';
        }
      })
      .catch((err) => {
        if (overlayRef.current) {
          overlayRef.current.textContent = 'Failed to load Google Maps. Check your API key and network.';
        }
      });

    return () => {
      mapInstance = null;
    };
  }, [apiKey, center, zoom]);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[360px] max-md:h-[240px] rounded-xl border-2 border-dashed border-indigo-500/30 bg-indigo-50" />
      <div
        ref={overlayRef}
        className="absolute inset-0 grid place-items-center text-center text-slate-500 font-semibold px-4 max-md:text-sm"
      />
    </div>
  );
};

export default GoogleMap;
