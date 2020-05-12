<template>
  <div
    v-if="!withoutBackground"
    class="background"
  >
    <div class="ripple">
      <div />
      <div />
    </div>
  </div>
  <div
    v-else
    class="ripple"
  >
    <div />
    <div />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Loader extends Vue {
  @Prop({ default: false }) withoutBackground!: boolean
}
</script>

<style scoped>
.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
}

.ripple {
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  & > div {
    position: absolute;
    border: 4px solid var(--primary-color);
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
