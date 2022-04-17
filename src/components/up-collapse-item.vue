<template>
  <el-collapse-item v-bind="$attrs">
    <template v-for="(index, name) in $slots" #[name]><slot :name="name" /></template>
  </el-collapse-item>
</template>
<script setup lang="ts"></script>
