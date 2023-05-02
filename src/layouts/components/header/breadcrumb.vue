<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()

const data = ref([
  {
    title: '',
    path: '',
  },
])
function generateBreadcrumb() {
  data.value = []
  route.matched.forEach((i) => {
    const { meta, children } = i
    if (meta && meta.title) {
      const item = {
        title: meta.title,
        path: children ? undefined : i.path,
      }
      data.value.push(item)
    }
  })
}
generateBreadcrumb()
watch(() => route.path, (path) => {
  if (!path.startsWith('/redirect'))
    generateBreadcrumb()
})
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="({ title, path }, index) in data"
      :key="index" :href="path"
    >
      {{ title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style scoped>

</style>
