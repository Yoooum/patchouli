<script setup>
import { ref } from 'vue'

// 声明组件的事件，用于父组件调用
const emits = defineEmits(['search'])
const form = ref({
  item: '',
})

function searchTableData() {
  emits('search', form.value.item)
}

function resetSearch() {
  form.value.item = ''
  searchTableData()
}
</script>

<template>
  <n-space justify="space-between" class="mb-4">
    <n-space />
    <n-space>
      <n-input v-model:value="form.item" placeholder="角色名称" />
      <n-button @click="searchTableData">
        查询
      </n-button>
      <n-button @click="resetSearch">
        重置
      </n-button>
    </n-space>
  </n-space>
</template>

<style scoped>

</style>
