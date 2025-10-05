(function() {
    'use strict';
    
    const CONFIG = {
        center: [-6.90767, 106.92025],
        zoom: 15,
        minZoom: 10,
        maxZoom: 18,
        tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    };
    
    function showLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('show');
    }

    function hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.remove('show');
    }
    
    function initMap() {
        showLoading();
        
        const map = L.map('map', {
            center: CONFIG.center,
            zoom: CONFIG.zoom,
            minZoom: CONFIG.minZoom,
            maxZoom: CONFIG.maxZoom,
            zoomControl: false
        });
        
        L.control.zoom({
            position: 'topright'
        }).addTo(map);
        
        const baseLayer = L.tileLayer(CONFIG.tileUrl, {
            attribution: CONFIG.attribution,
            errorTileUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0cHgiIGZpbGw9IiM5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
        }).addTo(map);
        
        // Layer groups
        const layers = {
            sdn: L.layerGroup().addTo(map),
            batasKecamatan: L.layerGroup().addTo(map)
        };
        
        loadGeoJSONData(map, layers);
        
        const baseMaps = {
            'OpenStreetMap': baseLayer
        };
        
        const overlayMaps = {
            'Lokasi SDN': layers.sdn,
            'Batas Kecamatan': layers.batasKecamatan
        };
        
        L.control.layers(baseMaps, overlayMaps, {
            position: 'topleft',
            collapsed: false
        }).addTo(map);
        
        L.control.scale({
            position: 'bottomleft',
            metric: true,
            imperial: false
        }).addTo(map);
        
        hideLoading();
        return map;
    }
    
    function loadGeoJSONData(map, layers) {
        fetch('map.geojson')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                processGeoJSONData(data, layers);
            })
            .catch(error => {
                console.error('Error loading GeoJSON:', error);
                showError('Gagal memuat data peta. Silakan refresh halaman.');
            });
    }
    
    function processGeoJSONData(data, layers) {
        L.geoJSON(data, {
            style: getFeatureStyle,
            onEachFeature: function(feature, layer) {
                bindFeaturePopup(feature, layer, layers);
            }
        });
    }
    
    function getFeatureStyle(feature) {
        const styles = {
            BatasKecamatan: {
                color: '#ff7800',
                weight: 4,
                opacity: 0.8,
                fillOpacity: 0.1
            },
            SDN: {
                color: '#0066cc',
                weight: 3,
                opacity: 0.9,
                fillOpacity: 0.2
            }
        };
        
        if (feature.properties.BatasKecamatan) {
            return styles.BatasKecamatan;
        } else if (feature.properties.SDN) {
            return styles.SDN;
        }
        
        return {
            color: '#666',
            weight: 2,
            opacity: 0.7
        };
    }
    
    function bindFeaturePopup(feature, layer, layers) {
        const props = feature.properties;
        let popupContent = '';
        
        if (props.BatasKecamatan) {
            popupContent = `<strong>Batas Kecamatan:</strong><br>${props.BatasKecamatan}`;
            layers.batasKecamatan.addLayer(layer);
        } else if (props.SDN) {
            popupContent = `<strong>Sekolah Dasar:</strong><br>${props.SDN}`;
            layers.sdn.addLayer(layer);
        }
        
        if (popupContent) {
            layer.bindPopup(popupContent, {
                maxWidth: 300,
                className: 'custom-popup'
            });
        }
    }
    
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<strong>Error:</strong> ${message}`;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 300px;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        try {
            initMap();
        } catch (error) {
            console.error('Map initialization failed:', error);
            showError('Gagal menginisialisasi peta.');
        }
    });
    
})();