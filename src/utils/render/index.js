import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

const renderIcon = (icon, size) => () => h(NIcon, { size }, { default: () => h(icon) })
const renderLink = (label, path) => () => h(RouterLink, { to: path }, { default: () => label })

export { renderIcon, renderLink }
