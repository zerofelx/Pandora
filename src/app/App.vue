<template>
  <div id="app">
    <pandora-menu title="Pandora"/>
    <router-view />
  </div>
</template>

<script>
import PandoraMenu from './components/Menu.vue';

export default {
  name: 'App',
  components: {
    PandoraMenu
  }
}
</script>