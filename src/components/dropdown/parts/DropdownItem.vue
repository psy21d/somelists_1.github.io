<template>
  <div
    class="dropdown-item"
    v-on="$listeners"
  >
    <p><slot /></p>
    <transition name="fade">
      <Icon
        v-if="contain"
        type="done"
        color="#e81948"
        size="14px"
        class="done"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Prop, Vue } from 'vue-property-decorator'
import Icon from '@/common/components/icon/Icon.vue'

@Component({
  components: { Icon }
})
export default class Dropdown extends Vue {
  @Prop({ default: false }) readonly contain!: boolean
}
</script>

<style scoped>
.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #edf2fb;
  padding: 15px 20px;
  font-size: 14px;
  line-height: 1.14;
  background-color: #fff;
  z-index: 2;

  &:last-of-type {
    border-bottom: 1px solid transparent;
  }

  &:hover {
    background-color: #f4f8ff;
  }
}
.done {
  margin-left: auto;
}
</style>
