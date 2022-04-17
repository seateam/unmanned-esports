<template>
  <el-dialog
    ref="dialog"
    custom-class="up-dialog"
    v-bind="$attrs"
    v-model="show"
    :show-close="false"
  >
    <template v-for="(index, name) in $slots" #[name]><slot :name="name" /></template>
    <template #footer>
      <up-icon name="close" class="up-dialog-close" @click="bindClose"></up-icon>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
const show = ref(false)
const dialog = ref()
const bindClose = () => {
  dialog.value.visible = false
}
</script>
<style lang="scss">
.up-dialog {
  position: relative;
  width: 660px;
  background: #222223;
  border-radius: 28px;
  .up-dialog-close {
    position: absolute;
    top: 40px;
    right: 48px;
    font-size: 28px;
    cursor: pointer;
  }

  .el-dialog__header {
    padding: 40px 48px;
    text-align: left;
    margin-right: 0;
    .el-dialog__title {
      width: 216px;
      height: 28px;
      font-size: 28px;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      color: #ffffff;
      line-height: 28px;
      letter-spacing: 1px;
    }
  }
  .el-dialog__body {
    padding: 0 40px;
  }
  .el-dialog__footer {
    padding: 0;
  }
}
</style>
