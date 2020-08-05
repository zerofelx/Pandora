<template>
  <div id="app">
    <pandora-menu :title="ESSID"/>
    <router-view :essid="ESSID" :bssid="BSSID" />
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
      BSSID: ''
    }
  },
  methods: {
    GetInitialData() {
      fetch('/api/config/wireless')
        .then(res => res.json())
        .then(data => {
          this.ESSID = data.ESSID
          this.BSSID = data.BSSID
        })
    }
  },
  created() {
    this.GetInitialData()
  }
}
</script>