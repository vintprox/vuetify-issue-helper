<template>
  <v-slide-y-transition mode="out-in">
    <router-view />
  </v-slide-y-transition>
</template>

<script>
  export default { name: 'App' }
</script>
