<!--Принимает 100% ширины и высоты родителя-->
<template>
  <div
    class="scrollbar"
    :class="classes"
  >
    <!-- <div
      ref="simpleBar"
      class="simple-bar"
      :style="{ 'max-height': maxHeight ? `${maxHeight}px` : 'none' }"
    > -->
    <SimpleBar
      class="simple-bar"
      :style="{ 'max-height': maxHeight ? `${maxHeight}px` : 'none' }"
    >
      <slot />
    </SimpleBar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
// eslint-disable-next-line no-undef
//const SimpleBar = require('simplebar/dist/simplebar.min')
import SimpleBar from 'simplebar-vue';

import 'simplebar/dist/simplebar.min.css';

@Component({
  components: {
    SimpleBar
  }
})
export default class Scrollbar extends Vue {
  @Prop({ default: null, type: Number }) readonly maxHeight!: number | null
  @Prop({ default: false }) readonly hideHorizontal!: boolean
  @Prop({ default: true }) readonly autoHide!: boolean
  @Prop({ default: false }) readonly hideVertical!: boolean
  @Prop({ default: false }) readonly red!: boolean

  bar: any = null

  //mounted() {
  //  this.bar = new SimpleBar(this.$refs.simpleBar as HTMLDivElement)
  //}

  get classes() {
    return {
      'hide-horizontal': this.hideHorizontal,
      'hide-vertical': this.hideVertical,
      red: this.red
    }
  }
}
</script>

<style scoped>
.scrollbar {
  width: 100%;
  height: 100%;
  max-width: inherit;
  max-height: inherit;
  position: relative;
}
.simple-bar {
  height: 100%;
  z-index: 1;
}

.scrollbar >>> .simplebar-track {
  opacity: 0;
}
.scrollbar:hover >>> .simplebar-track {
  opacity: 1;
}

.sticky-horizontal >>> .simplebar-track.simplebar-horizontal {
  position: sticky;
  bottom: 10px;
}

.hide-horizontal >>> {
  .simplebar-track.simplebar-horizontal,
  .simplebar-track.simplebar-horizontal .simplebar-scrollbar {
    display: none;
  }
}

.hide-vertical >>> {
  .simplebar-track.simplebar-vertical,
  .simplebar-track.simplebar-vertical .simplebar-scrollbar {
    display: none;
  }
}

.scrollbar >>> .simplebar-track.simplebar-horizontal {
  width: 100%;
  height: 10px;
  left: 0;
  border-radius: 5px;
  background-color: transparent;
}
.scrollbar >>> .simplebar-track.simplebar-horizontal .simplebar-scrollbar {
  height: 5px;
  border-radius: 5px;
  background-color: #e4e8f8;
  cursor: pointer;
}

.scrollbar.red >>> .simplebar-track.simplebar-horizontal .simplebar-scrollbar {
  background-color: var(--primary-color);
}

.scrollbar >>> .simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
  bottom: 0;
  top: 0;
}

.scrollbar >>> .simplebar-visible:before {
  background-color: #e4e8f8;
}

.scrollbar.red >>> .simplebar-visible:before {
  background-color: var(--primary-color);
}

.scrollbar >>> .simplebar-track.simplebar-vertical {
  right: 0;
  width: 10px;
  height: 100%;
  border-radius: 5px;
  background-color: transparent;
}
.scrollbar >>> .simplebar-track.simplebar-vertical .simplebar-scrollbar {
  width: 5px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #e4e8f8;
}

.scrollbar.red >>> .simplebar-track.simplebar-vertical .simplebar-scrollbar {
  background-color: var(--primary-color);
}

.scrollbar >>> .simplebar-content {
  padding-right: 15px;
}
</style>

