export const createSampleRestaurant = (imageUrl, geopoint, name) =>{
    return{
        "place_id": Date.now() + Math.floor(Math.random() * 100),
        "icon": "https://mapicons.mapsmarker.com/wp-content/uploads/mapicons/shape-default/color-ae8bc7/shapecolor-no/shadow-0/border-no/symbolstyle-color/symbolshadowstyle-white/gradient-no/restaurant.png",
        "name": name,
        "vicinity": geopoint.formatted_address,
        "geometry": {
            "location":{
                "lat": function(){
                    return geopoint.geometry.location.lat;
                },
                "lng": function(){
                    return geopoint.geometry.location.lng;
                }
            }
        },
        "rating": null,
        "photo":[{
            "getUrl": function () {
                return imageUrl;
            }
        }]
    }
};

//https://mapicons.mapsmarker.com/markers/restaurants-bars/restaurants/restaurant/?custom_color=
//https://mapicons.mapsmarker.com/wp-content/uploads/mapicons/shape-default/color-ae8bc7/shapecolor-no/shadow-0/border-no/symbolstyle-color/symbolshadowstyle-white/gradient-no/restaurant.png