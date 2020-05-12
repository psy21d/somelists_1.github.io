<template>
  <DropdownContainer v-click-outside="close">
    <BaseInput
      :label="label"
      :error="error"
      :value="inputValue"
      :class="{ shadowed: isOpen }"
      @focus="isOpen = true"
      @input="onInput"
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
    >
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
        {{ $t('search-server-error') }}
      </div>
      <div
        v-else-if="items.length === 0"
        class="container"
      >
        {{ $t('search-error', { input: inputValue }) }}
      </div>
      <Scrollbar
        v-else
        :max-height="maxHeight"
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

type Value = string | number
type Item = { label: string; value: Value }

@Component({
  components: {
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
export default class InputDropdown extends Vue {
  @Prop({ required: true }) label!: string
  @Prop({ default: '' }) error!: string
  @Prop({ default: false }) multiple!: boolean
  @Prop({ required: true }) onSearch!: (value: string) => Promise<Item[]>
  @Model('change', { required: false, type: [String, Number] }) value!: Value | undefined

  isOpen: boolean = false
  isLoading: boolean = true
  searchValue: string = ''
  searchError: string = ''
  items: Item[] = []

  mounted() {
    this.search('')
  }

  close() {
    this.isOpen = false
  }

  get inputValue() {
    if (!this.value) {
      return this.searchValue
    }
    const item = this.items.find((item) => item.value === this.value)
    if (!item) {
      return ''
    }
    return item.label
  }

  onSelect(value: Value) {
    this.$emit('change', value)
    if (!this.multiple) this.close()
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
      this.searchError = 'search-error'
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
.shadowed /deep/ input {
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px transparent;
}

.items {
  width: calc(100% - 4px);
  left: 2px;
}

.container {
  position: relative;
  height: 234px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  padding: 20px;
  text-align: center;
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

<i18n>
{
  "ru": {
    "search-server-error": "Возникла ошибка во время загрузки списка, попробуйте еще раз позже",
    "search-error": "Совпадений по запросу {input} не найдено"
  }
}
</i18n>
