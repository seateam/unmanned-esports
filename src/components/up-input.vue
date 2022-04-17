<template>
  <el-input class="up-input" v-bind="$attrs">
    <template v-for="(index, name) in $slots" #[name]><slot :name="name" /></template>
  </el-input>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.up-input {
  .el-input__inner {
    height: 46px;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    font-size: 18px;
    font-family: Helvetica-Light, Helvetica;
    font-weight: 300;
    line-height: 18px;
  }
}
</style>
