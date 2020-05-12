<template>
  <div class="dropdown-container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component
export default class DropdownContainer extends Vue {}
</script>

<style scoped>
.dropdown-container {
  position: relative;
}
</style>
