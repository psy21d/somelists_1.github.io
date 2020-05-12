<template>
  <div class="hello">
    <div class="hello__input-dropdown-box">
          <InputDropdown
            v-slot:default="{ onSelect, items }"
            class="input"
            label="Фрукты"
            :value="selected_first"
            :on-search="onSearchFirst"
            @change="setFirst($event)"
          >
            <DropdownItem
              v-for="item in items"
              :key="item.value"
              @click="onSelect(item.value)"
            >
              {{ item.label }}
            </DropdownItem>
          </InputDropdown>
    </div>
    <div class="hello__search-dropdown-box">
          <SearchDropdown
            v-slot:default="{ onSelect, items }"
            class="input"
            label="Животные"
            :value="selected_last"
            :on-search="onSearchLast"
            @change="setLast($event)"
          >
            <DropdownItem
              v-for="item in items"
              :key="item.value"
              @click="onSelect(item.value)"
            >
              {{ item.label }}
            </DropdownItem>
          </SearchDropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputDropdown from '@/components/dropdown/InputDropdown.vue'
import SearchDropdown from '@/components/dropdown/SearchDropdown.vue'
import DropdownItem from '@/components/dropdown/parts/DropdownItem.vue'
import { list_up, list_down } from '@/mocks/lists'

@Component({
  components: {
    InputDropdown,
    SearchDropdown,
    DropdownItem
  }
})
export default class HloMicrosoftWord extends Vue {

  selected_first = null
  selected_last  = null
  
  setFirst(value: any) {
    this.selected_first = value
  }
  
  setLast(value: any) {
    this.selected_last = value
  }
  
  onSearchFirst(value: string) {
    let items = list_up

    // здесь можно сделать асинхронный запрос к серверу 
    // и установить значение items

    if (!value) return items

    return items.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    )
  }

  onSearchLast(value: string) {
    let items = list_down

    if (!value) return items

    return items.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    )
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  vertical-align: middle;
  align-items: center;

  &__input-dropdown-box {
    max-width: 600px;
    min-width: 600px;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  &__search-dropdown-box {
    max-width: 600px;
    min-width: 600px;
    padding-top: 40px;
    padding-bottom: 40px;
  }
}
</style>

<i18n>
{
  "ru": {
    "first_placeholder": "Фрукты",
    "second_placeholder": "Животные",
  }
}
</i18n>
