<template>
  <div :class="cardClassName" class="Card Card--borderless Card--elevated">
    <div class="Card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./card.component.ts"></script>
