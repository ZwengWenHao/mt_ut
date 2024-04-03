<template>
  <el-collapse-item>
    <template slot="title">
      <div class="collapse_item_title">
        <span class="collapseText">{{ $attrs.collapseText }}</span>
        <span class="textDescription">（点击查看使用教程）</span>
      </div>
    </template>
    <slot />
  </el-collapse-item>
</template>