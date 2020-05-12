<template>
  <label
    class="wrapper-input"
    :class="{ 'error-wrapper': error.length, disabled, filled: !!value }"
  >
    <input
      v-bind="$props"
      class="ui-input"
      :readonly="readonly"
      v-on="{
        ...$listeners,
        input: (event) => $emit('input', event.target.value)
      }"
    >
    <div class="label">
      {{ label }}
    </div>
    <slot class="slot-icon" />
    <transition name="fade">
      <p
        v-if="error.length"
        class="text-error"
      >{{ error }}</p>
    </transition>
  </label>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Model, Prop } from 'vue-property-decorator'

@Component
export default class Input extends Vue {
  @Prop({ default: '' }) readonly label!: string
  @Prop({ default: '' }) readonly error!: string
  @Prop({ default: false }) readonly disabled!: boolean
  @Prop({ default: false }) readonly readonly!: boolean
  @Model('input', { required: true }) value!: string
}
</script>

<style scoped>
.wrapper-input {
  display: flex;
  position: relative;
  min-height: 60px;
  border: solid 2px rgba(0, 0, 0, 0);
  transition: 0.3s ease-in-out;
  border-radius: 6px;
}
.label {
  position: absolute;
  left: 20px;
  font-size: 14px;
  line-height: 0.93;
  color: #989898;
  transition: 0.3s ease-in-out;
  top: 50%;
  transform: translateY(-50%);
}
.ui-input {
  height: auto;
  width: 100%;
  border-radius: 5px;
  border: solid 1px #e2e5ef;
  background-color: #fff;
  font-size: 14px;
  line-height: 1;
  color: var(--text-default-color);
  outline: none;
  transition: 0.3s ease-in-out;
  padding: 21px 20px;
}
.filled .ui-input,
.ui-input:focus {
  padding: 27px 20px 15px 20px;
}
.ui-input:focus + .label,
.filled .label {
  top: 10px;
  transform: translateY(0);
}
.text-error {
  position: absolute;
  left: 0;
  bottom: -20px;
  font-size: 12px;
  line-height: 1;
  color: var(--primary-color);
  transition: 0.3s ease-in-out;
}
.error-wrapper {
  border: solid 2.2px var(--primary-color);

  .ui-input {
    border: solid 1px rgba(0, 0, 0, 0);
  }
}
.disabled {
  opacity: 0.6;
}
@media screen and (max-width: 768px) {
  .ui-input {
    font-size: 16px;
  }
  .label {
    font-size: 12px;
  }
}
</style>
