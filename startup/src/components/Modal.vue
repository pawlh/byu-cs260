<script setup>
import {ref} from 'vue';

defineProps({
  visible: Boolean
})

const modal = ref('modal')

</script>

<template>
  <div id="modal"
       class="modal"
       :class="{hidden: !visible}"
       ref="modal"
       @click="$emit('close-modal')">
    <div class="modal-content" @click.stop>
      <span class="close" @click="$emit('close-modal')">&times;</span>
      <slot>
        No content provided
      </slot>
    </div>
  </div>

</template>

<style lang="less" scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.hidden {
  display: none;
}

.modal-content {
  background-color: var(--color-background-soft);
  margin: 15% auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 80%;
}

.close {
  //color: #aaa;
  //float: right;
  //font-size: 28px;
  //font-weight: bold;
  color: #aaa;
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 45px;
  font-weight: bold;
  line-height: 45px;

  &:hover, &:focus {
    color: darken(#aaa, 10%);
    text-decoration: none;
    cursor: pointer;
  }
}

</style>