<script>

        let mapToken = "<%= process.env.MAP_TOKEN%>";
        mapboxgl.accessToken = mapToken;
        const map = new mapboxgl.Map({
          container: "map", // container ID
          center: [72.8321, 18.9582], // starting position [lng, lat]. Note that lat must be set between -90 and 90
          zoom: 9, // starting zoom
        });
      </script>