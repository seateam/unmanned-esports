<template>
  <el-collapse v-bind="$attrs">
    <template v-for="(index, name) in $slots" #[name]><slot :name="name" /></template>
  </el-collapse>
</template>
<script setup lang="ts"></script>
