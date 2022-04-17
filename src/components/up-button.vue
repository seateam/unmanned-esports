<template>
  <el-tooltip v-if="props.copy" effect="dark" content="Copied" placement="bottom" trigger="click">
    <div class="up-button" :class="props.type" @click="bindCopy"><slot /></div>
  </el-tooltip>
  <div v-else class="up-button" :class="props.type"><slot /></div>
</template>
<script setup lang="ts">
import { $copy } from '@/modules/utils'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  copy: {
    type: String,
    default: '',
  },
})
const bindCopy = () => {
  if (!props.copy) {
    return
  }
  $copy(props.copy)
}
</script>
<style lang="scss">
.up-button {
  user-select: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.up-button.outline {
  border-radius: 8px;
  height: 46px;
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: 0 28px;
}
.up-button.outline:hover {
  color: var(--regular);
  border-color: var(--regular);
}
.up-button.default {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 0 20px;
  font-size: 20px;
  color: var(--white);
  letter-spacing: 1px;
  height: 52px;
}
.up-button.default:hover {
  background: rgba(255, 255, 255, 0.06);
}
.up-button.primary {
  font-size: 28px;
  background: #20bb99;
  border-radius: 12px;
  padding: 0 40px;
  color: var(--white);
  height: 76px;
  font-weight: normal;
  line-height: 28px;
  letter-spacing: 1px;
}
.up-button.primary:hover {
  background: rgba(255, 255, 255, 0.06);
}
</style>
