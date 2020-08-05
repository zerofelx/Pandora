<template>
  <div id="app">
    <pandora-menu :title="ESSID"/>
    <router-view :essid="ESSID" :bssid="BSSID" :Model="Model"/>
  </div>
</template>

<script>
import PandoraMenu from './components/Menu.vue';

export default {
  name: 'App',
  components: {
    PandoraMenu
  },
  data() {
    return {
      ESSID: '',
      BSSID: '',
      Model: ''
    }
  },
  methods: {
    GetInitialData() {
      fetch('/api/config/wireless')
        .then(res => res.json())
        .then(data => {
          this.ESSID = data.ESSID
          this.BSSID = data.BSSID
          this.Model = data.Model
        })
    }
  },
  created() {
    this.GetInitialData()
  }
}
</script>