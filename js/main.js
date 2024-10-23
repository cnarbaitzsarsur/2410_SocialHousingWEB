// ----- MAPBOX ----- //
mapboxgl.accessToken = 'pk.eyJ1IjoibGFicGFycXVlcGF0cmljaW9zIiwiYSI6ImNqOWE4OGY3MjEweHEzM3FtZHl0dmV5azEifQ.uIJaP80p-gQXAvPG8tF-3w';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/labparquepatricios/cm0l88ug2008q01qodhxvfwek',
    center: [16.37, 48.20], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 11.9, // starting zoom
    minZoom: 10,
    maxZoom: 16 
});

// LOADING SPINNER 
document.getElementById('loading-spinner').style.display = 'flex';


// ----- SIDEBAR + VIEW TOGGLE----- //

document.addEventListener('DOMContentLoaded', () => {
    //SIDEBAR  + BUTTONS 
    const introSidebar = document.getElementById('intro-sidebar');
    const mapSidebar = document.getElementById('map-sidebar');
    // const formSidebar = document.getElementById('form-sidebar');
    const viewToggle = document.getElementById('viewToggle');
    const districtsView = document.getElementById('districtsView')
    const map = document.getElementById('map')

    const btnToMap = document.getElementById('BtnToMap');
    const btnToInfo = document.getElementById('infoBtn');
    const mapViewBtn = document.getElementById('mapViewBtn');
    const districtsViewBtn = document.getElementById('districtsViewBtn');

    // const btnToCheckEligibility = document.getElementById('btnToCheckEligibility');
    // const closeFormBtn = document.getElementById('closeFormBtn');
    
    
    // Set default visibility
    introSidebar.style.display = 'block';
    map.style.display = 'block'
    mapSidebar.style.display = 'none';
    // formSidebar.style.display = 'none';
    viewToggle.classList.add('hidden');
    districtsView.style.display = 'none';

    // --- BUTTONS INTRO-SIDEBAR --- //

    btnToMap.addEventListener('click', () => {
        introSidebar.style.display = 'none';
        mapSidebar.style.display = 'block';
        viewToggle.classList.remove('hidden');
        mapViewBtn.classList.add('active');
    });

    const moreText = document.getElementById('moreText');
    const btnText = document.getElementById('readMoreBtn');

    readMoreBtn.addEventListener('click', () => {
        if (moreText.style.display === "none" || moreText.style.display === "") {
            moreText.style.display = "inline";
            btnText.innerHTML = "Read Less"; // Change button text
        } else {
            moreText.style.display = "none";
            btnText.innerHTML = "Keep Reading"; // Change button text back
        }
    });

    
    // --- BUTTONS VIEW TOGGLE --- //

    btnToInfo.addEventListener('click',() => {
        mapSidebar.style.display = 'none';
        introSidebar.style.display = 'block';
        viewToggle.classList.add('hidden');
        map.style.display = 'block';
        districtsView.style.display = 'none';
        districtsViewBtn.classList.remove('active');
    });

    mapViewBtn.addEventListener('click', function() {
        map.style.display = 'block';
        districtsView.style.display = 'none';
        districtsViewBtn.classList.remove('active');
        btnToInfo.classList.remove('active');
        mapViewBtn.classList.add('active');
    });

    districtsViewBtn.addEventListener('click', function() {
        map.style.display = 'none';
        districtsView.style.display = 'block';
        mapViewBtn.classList.remove('active');
        btnToInfo.classList.remove('active');
        districtsViewBtn.classList.add('active');
    });

    btnToCheckEligibility.addEventListener('click', () => {
        introSidebar.style.display = 'none';
        mapSidebar.style.display = 'block';
        // formSidebar.style.display = 'block';
    });

    // closeFormBtn.addEventListener('click', () => {
    //     // Hide eligibility form or perform other actions
    //     document.getElementById('form-sidebar').style.display = 'none';
    // });
   
});

// ----- PROXIMITY SECTION ----- //

document.addEventListener('DOMContentLoaded', function() {
    const proximityTitle = document.getElementById('proximityTitle');
    const historyTitle = document.getElementById('historyTitle');
    const propertiesSection = document.querySelector('.properties');
    const historySection = document.querySelector('.propertiesHistory'); // Historical analysis content

    // Initial collapse setup
    propertiesSection.style.display = 'none';
    historySection.style.display = 'block';

    // Toggle proximity analysis
    proximityTitle.addEventListener('click', function() {
        if (propertiesSection.style.display === 'none' || propertiesSection.style.display === '') {
            propertiesSection.style.display = 'block';
            historySection.style.display = 'none'; 
        } else {
            propertiesSection.style.display = 'none'; 
            historySection.style.display = 'block';
        }
    });

    // Toggle historical analysis
    historyTitle.addEventListener('click', function() {
        if (historySection.style.display === 'none' || historySection.style.display === '') {
            historySection.style.display = 'block';
            propertiesSection.style.display = 'none'; 
        } else {
            historySection.style.display = 'none'; 
            propertiesSection.style.display = 'block';
        }
    });

});





// ----- QUESTION BUTTONS ----- //

document.querySelector('.question-button').addEventListener('click', function() {
    Swal.fire({
        title: 'The buffer zones around the green spaces are related to their sizes',
        html: `
            <button id="customCloseButton" style="position: absolute; top: 10px; right: 10px; background: transparent; border: none; font-size: 20px; cursor: pointer; color: white;">&times;</button>
            <ul>
                <li><strong> Big green spaces</strong> are large spaces whose areas range from 10 hectares, and are designed to serve populations within <strong> 800 meters</strong>.</li>
                <br>
                <li><strong>Medium green spaces</strong> are spaces whose areas range from 0.4 to 10 hectares, and are designed to serve populations within<strong> 400 meters</strong>.</li>
                <br>
                <li><strong>Small green spaces</strong> are spaces whose average areas range around 0.04 hectares, and are designed to serve populations within <strong>200 meters</strong>.</li>
            </ul>
        `,
        showConfirmButton: false,
        background: '#CF2026',
        customClass: {
            title: 'swal2-title-custom',
            htmlContainer: 'swal2-text-custom'
        }
    });
    document.getElementById('customCloseButton').addEventListener('click', function() {
        Swal.close();
    });
});

// ----- MAP LAYERS ----- //
map.on('load', () => {
    document.getElementById('loading-spinner').style.display = 'none';

    // Add sources
    map.addSource('big-gs', { type: 'geojson', data: 'json/big-gs.geojson'
    });
    map.addSource('medium-gs', { type: 'geojson',data: 'json/medium-gs.geojson'
    });
    map.addSource('small-gs', { type: 'geojson', data: 'json/small-gs.geojson'
    });
    map.addSource('social-housing', { type: 'geojson', data: 'json/social-housing.geojson'
    });
    map.addSource('block-baujahr', { type: 'geojson', data: 'json/block-baujahr.geojson'
    });
    map.addSource('bus-stops', { type: 'geojson', data: 'json/bus-stops.geojson'
    });
    map.addSource('ubahn-stops', { type: 'geojson', data: 'json/ubahn-stops.geojson'
    });


    map.addLayer({
        'id': 'social-housing',
        'type': 'fill',
        'source': 'social-housing',
        'paint': {
            'fill-color': '#CF2026'
        }
    }); 
    
    map.addLayer({
        id: 'social-housing-buffer',
        type: 'circle',
        source: 'social-housing', 
        paint: {
            'circle-radius': 2, 
            'circle-opacity': 0  
        },
        filter: ['==', '$type', 'Polygon'] 
    });

    map.moveLayer('social-housing');
    
    // Popup setup Social Housing
    let popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false
    });

    // Add hover event listener
    map.on('mouseenter', 'social-housing-buffer', (e) => {
        const properties = e.features[0].properties;
        const hofname = properties.HOFNAME || "N/A";
        const address = properties.ADRESSE || "N/A";
        const year = properties.BAUJAHR || "N/A";
        const units = properties.WOHNUNGSANZAHL || "N/A";   

        const popupContent = `
            <div>
                <h3 style="text-transform: uppercase;">${hofname}</h3>
               <div style="font-size: 130%;"> 
                    <p>Constructed in ${year}</p>
                    <p><strong>No. of units:</strong> ${units}</p>
                    <p><strong>Address:</strong> ${address}</p>
                </div>
            </div>
        `;

        // Set popup content and position
        popup.setLngLat(e.lngLat)
            .setHTML(popupContent)
            .addTo(map);

        map.getCanvas().style.cursor = 'pointer'; // Change the cursor style on hover
    });


    // Reset the cursor and remove popup when the mouse leaves
    map.on('mouseleave', 'social-housing-buffer', () => {
        popup.remove();
        map.getCanvas().style.cursor = '';
    });


    // Add click event listener to social housing layer
    map.on('click', 'social-housing-buffer', (e) => {
        const properties = e.features[0].properties;
        const hofname = properties.HOFNAME || "N/A";
        const address = properties.ADRESSE || "N/A";
        const year = properties.BAUJAHR || "N/A";
        const units = properties.WOHNUNGSANZAHL || "N/A";   
        const pdfLink = properties.PDFLINK || "#"; 

        const popupContent = `
            <div>
                <h3 style="text-transform: uppercase;">${hofname}</h3>
                <div style="font-size: 130%;"> 
                    <p>Constructed in ${year}</p>
                    <p><strong>No. of units:</strong> ${units}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    <p><a href="${pdfLink}" target="_blank">View More Details (PDF)</a></p>
                </div>
            </div>
        `;

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(popupContent)
            .addTo(map);
    });

    map.on('mouseenter', 'social-housing-buffer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
});


// ----- SLIDER YEARS ----- //

const yearSlider = document.getElementById('yearSlider');
const selectedYearDisplay = document.getElementById('selectedYear');
const unitsConstructedText = document.getElementById('unitsConstructedText');
const constructedYear = document.getElementById('constructedYear');
const constructedUnits = document.getElementById('constructedUnits');

yearSlider.addEventListener('input', () => {
    const selectedYear = parseInt(yearSlider.value, 10);
    selectedYearDisplay.textContent = selectedYear;

    // Call the function to update visible buildings
    updateVisibleBuildings(selectedYear);
});

function updateVisibleBuildings(selectedYear) {
    // Fetch social housing data
    fetch('json/social-housing.geojson') 
        .then(response => response.json())
        .then(data => {

            // Filter buildings built on or before the selected year for the map display
            const filteredBuildings = data.features.filter(feature => {
                const baujahr = parseInt(feature.properties.BAUJAHR, 10); // Ensure BAUJAHR is a number
                return baujahr <= selectedYear;
            });

            // Update map layer with filtered data
            if (map.getSource('social-housing')) {
                map.getSource('social-housing').setData({
                    type: 'FeatureCollection',
                    features: filteredBuildings
                });
            }

            // Calculate total units for the selected year
            const totalUnits = filteredBuildings.reduce((sum, feature) => {
                const baujahr = parseInt(feature.properties.BAUJAHR, 10); // Ensure BAUJAHR is a number
                const wohnungsanzahl = parseInt(feature.properties.WOHNUNGSANZAHL, 10) || 0; // Ensure WOHNUNGSANZAHL is a number
                const unitsToAdd = baujahr === selectedYear ? wohnungsanzahl : 0;
                return sum + unitsToAdd;
            }, 0);

            // Update the constructed units text with the total number of units
            constructedYear.textContent = selectedYear;
            constructedUnits.textContent = totalUnits;
        })
        .catch(err => console.error('Error loading social housing data:', err));
}

// Initialize with the default value
updateVisibleBuildings(parseInt(yearSlider.value, 10));

// ----- BUFFERS ----- //

function initializeSliders() {
    document.getElementById('big-green-coverage').value = 0;
    document.getElementById('medium-green-coverage').value = 0;
    document.getElementById('small-green-coverage').value = 0;
    document.getElementById('bus-buffer').value = 0;
    document.getElementById('ubahn-buffer').value = 0;
}

// Call the initialization function when the page loads
document.addEventListener('DOMContentLoaded', initializeSliders);


 // Slider event listeners
 document.getElementById('big-green-coverage').addEventListener('input', updateBigGreenSpaceBufferZone);
 document.getElementById('medium-green-coverage').addEventListener('input', updateMediumGreenSpaceBufferZone);
 document.getElementById('small-green-coverage').addEventListener('input', updateSmallGreenSpaceBufferZone);
 document.getElementById('bus-buffer').addEventListener('input', updateBusBufferZone);
document.getElementById('ubahn-buffer').addEventListener('input', updateUbahnBufferZone);

 // Update buffer distance display
 document.getElementById('big-green-coverage').addEventListener('input', (event) => {
     document.getElementById('big-buffer-distance').textContent = `${event.target.value}m`;
 });
 document.getElementById('medium-green-coverage').addEventListener('input', (event) => {
     document.getElementById('medium-buffer-distance').textContent = `${event.target.value}m`;
 });
 document.getElementById('small-green-coverage').addEventListener('input', (event) => {
     document.getElementById('small-buffer-distance').textContent = `${event.target.value}m`;
 });
 document.getElementById('bus-buffer').addEventListener('input', (event) => {
    document.getElementById('bus-buffer-distance').textContent = `${event.target.value}m`;
});
document.getElementById('ubahn-buffer').addEventListener('input', (event) => {
    document.getElementById('ubahn-buffer-distance').textContent = `${event.target.value}m`;
});


function updateBigGreenSpaceBufferZone() {
    const bigBufferDistance = parseInt(document.getElementById('big-green-coverage').value, 10);

    fetch('json/big-gs.geojson').then(response => response.json()).then(bigData => {
        let bigBufferFeatures = bigData.features.map(feature =>
            turf.buffer(feature, bigBufferDistance, { units: 'meters' })
        );
        const bigFeatureCollection = {
            type: 'FeatureCollection',
            features: bigBufferFeatures
        };
        const bigDissolved = turf.dissolve(bigFeatureCollection);

        if (bigBufferDistance > 0) {
            if (!map.getSource('buffer-zone-big')) {
                map.addSource('buffer-zone-big', {
                    type: 'geojson',
                    data: bigDissolved
                });

                map.addLayer({
                    'id': 'buffer-zone-big',
                    'type': 'fill',
                    'source': 'buffer-zone-big',
                    'paint': {
                        'fill-color': '#CF2026',
                        'fill-opacity': 0.3
                    }
                });
            } else {
                map.getSource('buffer-zone-big').setData(bigDissolved);
                map.setLayoutProperty('buffer-zone-big', 'visibility', 'visible');
            }
        } else {
            map.setLayoutProperty('buffer-zone-big', 'visibility', 'none');
            if (map.getLayer('buffer-zone-big')) {
                map.removeLayer('buffer-zone-big');
            }
            if (map.getSource('buffer-zone-big')) {
                map.removeSource('buffer-zone-big');
            }
        }
    }).catch(err => console.error('Error loading big green spaces data:', err));
}

function updateMediumGreenSpaceBufferZone() {
    const mediumBufferDistance = parseInt(document.getElementById('medium-green-coverage').value, 10);

    fetch('json/medium-gs.geojson').then(response => response.json()).then(mediumData => {
        let mediumBufferFeatures = mediumData.features.map(feature =>
            turf.buffer(feature, Math.min(mediumBufferDistance, 400), { units: 'meters' })
        );
        const mediumFeatureCollection = {
            type: 'FeatureCollection',
            features: mediumBufferFeatures
        };
        const mediumDissolved = turf.dissolve(mediumFeatureCollection);

        if (mediumBufferDistance > 0) {
            if (!map.getSource('buffer-zone-medium')) {
                map.addSource('buffer-zone-medium', {
                    type: 'geojson',
                    data: mediumDissolved
                });

                map.addLayer({
                    'id': 'buffer-zone-medium',
                    'type': 'fill',
                    'source': 'buffer-zone-medium',
                    'paint': {
                        'fill-color': '#CF2026',
                        'fill-opacity': 0.3
                    }
                });
            } else {
                map.getSource('buffer-zone-medium').setData(mediumDissolved);
                map.setLayoutProperty('buffer-zone-medium', 'visibility', 'visible');
            }
        } else {
            map.setLayoutProperty('buffer-zone-medium', 'visibility', 'none');
            if (map.getLayer('buffer-zone-medium')) {
                map.removeLayer('buffer-zone-medium');
            }
            if (map.getSource('buffer-zone-medium')) {
                map.removeSource('buffer-zone-medium');
            }
        }
    }).catch(err => console.error('Error loading medium green spaces data:', err));
}

function updateSmallGreenSpaceBufferZone() {
    const smallBufferDistance = parseInt(document.getElementById('small-green-coverage').value, 10);

    fetch('json/small-gs.geojson').then(response => response.json()).then(smallData => {
        let smallBufferFeatures = smallData.features.map(feature =>
            turf.buffer(feature, Math.min(smallBufferDistance, 200), { units: 'meters' })
        );
        const smallFeatureCollection = {
            type: 'FeatureCollection',
            features: smallBufferFeatures
        };
        const smallDissolved = turf.dissolve(smallFeatureCollection);

        if (smallBufferDistance > 0) {
            if (!map.getSource('buffer-zone-small')) {
                map.addSource('buffer-zone-small', {
                    type: 'geojson',
                    data: smallDissolved
                });

                map.addLayer({
                    'id': 'buffer-zone-small',
                    'type': 'fill',
                    'source': 'buffer-zone-small',
                    'paint': {
                        'fill-color': '#CF2026',
                        'fill-opacity': 0.3
                    }
                });
            } else {
                map.getSource('buffer-zone-small').setData(smallDissolved);
                map.setLayoutProperty('buffer-zone-small', 'visibility', 'visible');
            }
        } else {
            map.setLayoutProperty('buffer-zone-small', 'visibility', 'none');
            if (map.getLayer('buffer-zone-small')) {
                map.removeLayer('buffer-zone-small');
            }
            if (map.getSource('buffer-zone-small')) {
                map.removeSource('buffer-zone-small');
            }
        }
    }).catch(err => console.error('Error loading small green spaces data:', err));
}

function updateBusBufferZone() {
    const busBufferDistance = parseInt(document.getElementById('bus-buffer').value, 10);

    fetch('json/bus-stops.geojson').then(response => response.json()).then(busData => {
        if (busBufferDistance === 0) {
            // If the buffer distance is 0, set the layer's visibility to 'none' and remove the layer and source if they exist
            map.setLayoutProperty('buffer-zone-bus', 'visibility', 'none');
            if (map.getLayer('buffer-zone-bus')) {
                map.removeLayer('buffer-zone-bus');
            }
            if (map.getSource('buffer-zone-bus')) {
                map.removeSource('buffer-zone-bus');
            }
            return;
        }

        let busBufferFeatures = busData.features
            .filter(feature => feature && feature.geometry && feature.geometry.type)
            .map(feature => turf.buffer(feature, busBufferDistance, { units: 'meters' }));
        const busFeatureCollection = {
            type: 'FeatureCollection',
            features: busBufferFeatures
        };

        // Check if there are any features to dissolve
        if (busBufferFeatures.length > 0) {
            const busDissolved = turf.dissolve(busFeatureCollection);

            if (!map.getSource('buffer-zone-bus')) {
                map.addSource('buffer-zone-bus', {
                    type: 'geojson',
                    data: busDissolved
                });

                map.loadImage(
                    'img/bus-horlines.png',
                    (err, image) => {
                        if (err) throw err;
                        map.addImage('bus-hatch-pattern', image);
                        map.addLayer({
                            'id': 'buffer-zone-bus',
                            'type': 'fill',
                            'source': 'buffer-zone-bus',
                            'paint': {
                                'fill-pattern': 'bus-hatch-pattern',
                            }
                        });
                    }
                );
            } else {
                map.getSource('buffer-zone-bus').setData(busDissolved);
                map.setLayoutProperty('buffer-zone-bus', 'visibility', 'visible');
            }
        } else {
            console.warn('No valid bus features to dissolve');
            map.setLayoutProperty('buffer-zone-bus', 'visibility', 'none');
            if (map.getLayer('buffer-zone-bus')) {
                map.removeLayer('buffer-zone-bus');
            }
            if (map.getSource('buffer-zone-bus')) {
                map.removeSource('buffer-zone-bus');
            }
        }
    }).catch(err => console.error('Error loading bus data:', err));
}

function updateUbahnBufferZone() {
    const ubahnBufferDistance = parseInt(document.getElementById('ubahn-buffer').value, 10);

    fetch('json/ubahn-stops.geojson').then(response => response.json()).then(ubahnData => {
        if (ubahnBufferDistance === 0) {
            // If the buffer distance is 0, set the layer's visibility to 'none' and remove the layer and source if they exist
            map.setLayoutProperty('buffer-zone-ubahn', 'visibility', 'none');
            if (map.getLayer('buffer-zone-ubahn')) {
                map.removeLayer('buffer-zone-ubahn');
            }
            if (map.getSource('buffer-zone-ubahn')) {
                map.removeSource('buffer-zone-ubahn');
            }
            return;
        }

        let ubahnBufferFeatures = ubahnData.features
            .filter(feature => feature && feature.geometry && feature.geometry.type)
            .map(feature => turf.buffer(feature, Math.min(ubahnBufferDistance, 800), { units: 'meters' }));
        const ubahnFeatureCollection = {
            type: 'FeatureCollection',
            features: ubahnBufferFeatures
        };

        // Check if there are any features to dissolve
        if (ubahnBufferFeatures.length > 0) {
            const ubahnDissolved = turf.dissolve(ubahnFeatureCollection);

            if (!map.getSource('buffer-zone-ubahn')) {
                map.addSource('buffer-zone-ubahn', {
                    type: 'geojson',
                    data: ubahnDissolved
                });

                map.loadImage(
                    'img/ubahn-vertlines.png',
                    (err, image) => {
                        if (err) throw err;
                        map.addImage('ubahn-hatch-pattern', image);
                        map.addLayer({
                            'id': 'buffer-zone-ubahn',
                            'type': 'fill',
                            'source': 'buffer-zone-ubahn',
                            'paint': {
                                'fill-pattern': 'ubahn-hatch-pattern',
                                'fill-pattern-scale': `{auto|fixed}` // Defaults to 'auto'?

                            }
                        });
                    }
                );
            } else {
                map.getSource('buffer-zone-ubahn').setData(ubahnDissolved);
                map.setLayoutProperty('buffer-zone-ubahn', 'visibility', 'visible');
            }
        } else {
            console.warn('No valid U-Bahn features to dissolve');
            map.setLayoutProperty('buffer-zone-ubahn', 'visibility', 'none');
            if (map.getLayer('buffer-zone-ubahn')) {
                map.removeLayer('buffer-zone-ubahn');
            }
            if (map.getSource('buffer-zone-ubahn')) {
                map.removeSource('buffer-zone-ubahn');
            }
        }
    }).catch(err => console.error('Error loading U-Bahn data:', err));
}



// --- FORM --- //

// Retrieve and populate form data from local storage

// function retrieveFormData() {
//     const storedData = localStorage.getItem('formData');
//     if (storedData) {
//         const formData = JSON.parse(storedData);
//         document.getElementById('citizenship').value = formData.citizenship || '';
//         document.getElementById('age').value = formData.age || '';
//         document.getElementById('registration').value = formData.registration || '';
//         document.getElementById('income').value = formData.income || '';
//         document.getElementById('familySize').value = formData.familySize || '';
//     }
// }

// // Store form data in local storage when form is submitted
// function storeFormData() {
//     const formData = {
//         citizenship: document.getElementById('citizenship').value,
//         age: document.getElementById('age').value,
//         registration: document.getElementById('registration').value,
//         income: document.getElementById('income').value,
//         familySize: document.getElementById('familySize').value,
//     };
//     localStorage.setItem('formData', JSON.stringify(formData));
// }

// // Eligibility form submission
// const eligibilityForm = document.getElementById('eligibilityForm');
// eligibilityForm.addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Retrieve form values
//     const citizenship = document.getElementById('citizenship').value;
//     const age = parseInt(document.getElementById('age').value);
//     const registration = parseInt(document.getElementById('registration').value);
//     const income = parseFloat(document.getElementById('income').value);

//     // Eligibility check
//     let eligible = true;
//     document.getElementById('citizenshipMsg').textContent = '';
//     document.getElementById('ageMsg').textContent = '';
//     document.getElementById('registrationMsg').textContent = '';
//     document.getElementById('incomeMsg').textContent = '';

//     if (citizenship !== 'yes') {
//         document.getElementById('citizenshipMsg').textContent = 'You must have Austrian citizenship or equivalent.';
//         eligible = false;
//     }
//     if (age < 18) {
//         document.getElementById('ageMsg').textContent = 'You must be at least 18 years old.';
//         eligible = false;
//     }
//     if (registration < 3) {
//         document.getElementById('registrationMsg').textContent = 'You must have been registered in Vienna for at least 3 years.';
//         eligible = false;
//     }
//     if (income > 30000) {
//         document.getElementById('incomeMsg').textContent = 'Your income must be below €30,000 per year.';
//         eligible = false;
//     }

//     // Display family size input if eligible
//     if (eligible) {
//         document.getElementById('eligibilityMessage').textContent = 'You are eligible!';
//         document.getElementById('familySizeGroup').style.display = 'block';

//         // Add event listener for family size submission
//         document.getElementById('familySize').addEventListener('input', function() {
//             const familySize = parseInt(this.value);

//             if (familySize && familySize > 0) {
//                 checkHousingOption(familySize);
//             }
//         });

//     } else {
//         document.getElementById('eligibilityMessage').textContent = 'You are not eligible for social housing.';
//     }

//      // Store form data after submission
//      storeFormData();

// });

// // Close the form when the close button is clicked
// const closeFormBtn = document.getElementById('closeFormBtn');
// closeFormBtn.addEventListener('click', function() {
//     localStorage.removeItem('formData'); // Clear the stored data when closing the form
// });


// // Function to check suitable housing option
// function checkHousingOption(familySize) {
//     const housingOptions = [
//         { name: 'Small Apartment', size: 50, rooms: 2, neighborhood: 'Leopoldstadt' },
//         { name: 'Medium Apartment', size: 80, rooms: 3, neighborhood: 'Margareten' },
//         { name: 'Large Apartment', size: 120, rooms: 4, neighborhood: 'Wieden' },
//     ];

//     const requiredSize = familySize * 20; // Example: 20 m² per person

//     let suitableHousing = null;
//     for (const house of housingOptions) {
//         if (house.size >= requiredSize) {
//             suitableHousing = house;
//             break;
//         }
//     }

//     // Display housing option or a message if no suitable option is found
//     const suitableHouseMessage = document.getElementById('suitableHouseMessage')
//     if (suitableHousing) {
//         suitableHouseMessage.textContent = `You may be eligible for the ${suitableHousing.name} in ${suitableHousing.neighborhood}. It has ${suitableHousing.rooms} rooms and is ${suitableHousing.size} m² in size.`;
//     } else {
//         suitableHouseMessage.textContent = 'Unfortunately, we do not have a suitable apartment based on your requirements.';
//     }
// }