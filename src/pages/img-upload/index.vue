<script setup>
import { CloudUpload } from '@vicons/carbon'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

const imageList = ref([
  {
    id: 1,
    name: '图片1',
    url: 'https://img.yzcdn.cn/vant/cat.jpeg',
  },
])

function handleBeforeUpload({ file }) {
  if (!file.file?.type.startsWith('image/')) {
    message.error('只能上传图片')
    return false
  }
  return true
}

async function handleUpload({ file, onFinish }) {
  if (!file || !file.type)
    message.error('请选择文件')

  // 模拟上传
  message.loading('上传中...')
  setTimeout(() => {
    message.success('上传成功')
    imageList.value.push({
      id: imageList.value.length + 1,
      name: file.name,
      url: URL.createObjectURL(file.file),
    })
    onFinish()
  }, 500)
}
</script>

<template>
  <n-upload
    class="m-4 w-auto" accept="image/*" directory-dnd :max="10" :custom-request="handleUpload"
    :show-file-list="false" @before-upload="handleBeforeUpload"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="32" :depth="3">
          <CloudUpload />
        </n-icon>
      </div>
      <n-text depth="3" style="font-size: 16px">
        点击或者拖动文件到该区域来上传
      </n-text>
    </n-upload-dragger>
  </n-upload>
  <!-- 图片列表 -->
  <n-card size="small" hoverable class="card m-4 w-auto">
    <n-image-group>
      <n-space>
        <div v-for="(image, index) in imageList" :key="index">
          <n-image
            :src="image.url" :alt="image.name" :height="130"
            object-fit="cover" :preview-src="image.url" lazy
            :intersection-observer-options="{ root: '#image-scroll-container' }"
          />
        </div>
      </n-space>
    </n-image-group>
  </n-card>
</template>

<style scoped></style>
