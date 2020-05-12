<template>
  <div
    class="no-select"
    v-on="$listeners"
  >
    <svg
      viewBox="0 0 64 64"
      :width="size"
      :height="size"
    >
      <use
        :xlink:href="spritepath"
        :fill="color"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Sprite from '@/assets/icons/sprite.svg'

@Component
export default class Icon extends Vue {
  sprite: any = Sprite
  @Prop({ default: '#cccccc' }) readonly color?: string
  @Prop({ default: '24px' }) readonly size?: string
  @Prop({ default: '0 0 64 64' }) readonly viewBox?: string
  @Prop() readonly type!: string
  get spritepath() {
    return `${Sprite}#${this.type}`
  }
}
</script>

<style scoped>
.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
