<template>
  <GmapMap
    ref="gMap"
    :center="center"
    :zoom="zoom"
    map-type-id="terrain"
    style="height: 300px"
    v-bind="$attrs"
    @click="createMarker"
  >
    <GmapMarker
      v-for="(m, index) in markers"
      :key="index"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center = m.position"
      @drag="createMarker"
    />
  </GmapMap>
</template>

<script>
export default {
  name: 'GoogleMaps',
  inheritAttrs: false,
  props: {
    currentMarkers: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      markers: [],
      places: [],
      currentPlace: null,

      zoom: 5,
      center: {
        lat: 23.885942,
        lng: 45.079162,
      },
    }
  },
  mounted() {
    this.markers = [{ position: { lat: 23.885942, lng: 45.079162 } }]
  },
  methods: {
    createMarker(e) {
      const position = {
        lat: parseFloat(e.latLng.lat()),
        lng: parseFloat(e.latLng.lng()),
      }
      this.markers = [
        {
          position,
        },
      ]
      this.center = position
      this.$emit('markerUpdated', {
        lat: parseFloat(e.latLng.lat()),
        lng: parseFloat(e.latLng.lng()),
      })
    },
  },
  watch: {
    value: {
      handler(value) {
        if (value && value.lat && value.lng) {
          const position = {
            lat: parseFloat(value.lat),
            lng: parseFloat(value.lng),
          }
          this.markers = [
            {
              position,
            },
          ]
          this.center = position
          this.markers = [
            {
              position,
            },
          ]
        }
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>


