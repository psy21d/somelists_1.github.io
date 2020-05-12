<template>
  <div id="app">
    <HloMicrosoftWord/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HloMicrosoftWord from '@/components/HloMicrosoftWord.vue';

@Component({
  components: {
    HloMicrosoftWord,
  },
})
export default class App extends Vue {}
</script>

<style>
</style>
