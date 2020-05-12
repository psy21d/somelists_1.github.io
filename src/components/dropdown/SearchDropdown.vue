<template>
  <DropdownContainer v-click-outside="close">
    <BaseInput
      :label="label"
      :value="currentSelected"
      :class="{ shadowed: isOpen }"
      readonly
      @focus="isOpen = true"
    >
      <div
        class="arrow"
        :class="{ open: isOpen }"
      />
    </BaseInput>
    <DropdownItems
      v-if="isOpen"
      v-slot:default="{ maxHeight }"
      class="items"
      :max-height="280"
    >
      <div class="search">
        <input
          class="search-input"
          :value="searchValue"
          :placeholder="searchPlaceholder"
          @input="onInput($event.target.value)"
        >
      </div>
      <div
        v-if="isLoading"
        class="container"
      >
        <Loader without-background />
      </div>
      <div
        v-else-if="searchError"
        class="container error"
      >
        {{ searchError }}
      </div>
      <div
        v-else-if="items.length === 0"
        class="container"
      >
        Совпадений по запросу "{{ searchValue }}" не найдено
      </div>
      <Scrollbar
        v-else
        :max-height="maxHeight - 50"
        red
      >
        <slot
          :onSelect="onSelect"
          :items="items"
        />
      </Scrollbar>
    </DropdownItems>
  </DropdownContainer>
</template>

<script lang="ts">
import Icon from '@/common/components/icon/Icon.vue'
import Loader from '@/common/components/loader/Loader.vue'
import Scrollbar from '@/common/components/scrollbar/Scrollbar.vue'
import { clickOutside } from '@/common/directives/clickOutside'
import { debounce } from '@/lib/debounce'
import Component from 'vue-class-component'
import { Model, Prop, Vue } from 'vue-property-decorator'
import Input from '../input/Input.vue'
import DropdownContainer from './parts/DropdownContainer.vue'
import DropdownItem from './parts/DropdownItem.vue'
import DropdownItems from './parts/DropdownItems.vue'

type Value = string | number | null
type Item = { label: string; value: Value }

@Component({
  components: {
    Icon,
    Scrollbar,
    Loader,
    DropdownItem,
    DropdownItems,
    BaseInput: Input,
    DropdownContainer
  },
  directives: {
    clickOutside
  }
})
export default class SearchDropdown extends Vue {
  @Prop({ required: true }) label!: string
  @Prop({ default: '' }) searchPlaceholder!: string
  @Prop({ default: '' }) error!: string
  @Prop({ required: true }) onSearch!: (value: string) => Promise<Item[]>
  @Model('change', { required: true, type: [String, Number] }) value!: Value

  isOpen: boolean = false
  isLoading: boolean = true
  searchValue: string = ''
  searchError: string = ''
  items: Item[] = []

  mounted() {
    this.search('')
  }

  get currentSelected() {
    const item = this.items.find((item) => item.value === this.value)
    if (!item) {
      return ''
    }
    return item.label
  }

  close() {
    this.isOpen = false
  }

  onSelect(value: Value) {
    this.$emit('change', value)
    this.close()
  }

  onInput(value: string) {
    this.$emit('change', '')
    this.searchValue = value
    this.debouncedSearch(value)
  }

  private debouncedSearch = debounce(this.search, 300)

  private async search(value: string) {
    this.isLoading = true
    this.searchError = ''
    try {
      this.items = await this.onSearch(value)
    } catch (error) {
      this.searchError = error
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.shadowed /*deep*/ input {
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px transparent;
}

.items {
  width: calc(100% - 4px);
  left: 2px;
}

.search {
  width: 100%;
  padding: 10px 10px 0;
}

.search-input {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: solid 1px #e4e7f0;
  background-color: #f7f7fa;
  padding: 14px 10px;

  &::placeholder {
    color: #afafaf;
  }
}

.container {
  position: relative;
  height: 234px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  color: var(--primary-color);
}

.arrow {
  position: absolute;
  right: 20px;
  top: 50%;
  width: 11px;
  height: 11px;
  transform: translate(0, -50%) rotate(-135deg);
  border-left: 2px solid var(--primary-color);
  border-top: 2px solid var(--primary-color);
  transition: transform 300ms;

  &.open {
    transform: rotate(45deg);
  }
}
</style>
