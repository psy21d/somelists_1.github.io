<template>
  <div
    class="dropdown-items"
    :style="{ 'max-height': `${maxHeight}px` }"
  >
    <slot :maxHeight="maxHeight" />
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator'

@Component
export default class DropdownItems extends Vue {
  @Prop({ default: 234 }) readonly maxHeight!: number
  @Prop({ default: false }) readonly top!: boolean
}
</script>

<style scoped>
.dropdown-items {
  position: absolute;
  width: 100%;
  top: calc(100% + 10px);
  left: 0;
  z-index: 2;

  background: #ffffff;
  border-radius: 5px;
  box-shadow: var(--dropdown-shadow);
}
</style>
