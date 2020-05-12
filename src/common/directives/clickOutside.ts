import { Vue } from 'vue/types/vue'

export const clickOutside: Vue.DirectiveOptions = {
  bind(el, binding) {
    document.addEventListener('click', (event: MouseEvent & any) => {
      const path = event.path || (event.composedPath && event.composedPath())
      for (const pathEl of path) {
        if (pathEl === el) return
      }
      binding.value()
    })
  },
  unbind(el, binding) {
    document.removeEventListener('click', binding.value)
  }
}
