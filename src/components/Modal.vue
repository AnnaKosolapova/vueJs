<template>
  <transition name="modal" id="modal-template">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container">
          <img class="image" :src="imgSrc.url" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
  .modal-mask {
    background-color: rgba(0, 0, 0, .5);
    display: table;
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    transition: opacity .3s ease;
    width: 100%;
    z-index: 9998;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    background-color: white;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    margin: 0px auto;
    padding: 20px 30px;
    text-align: center;
    transition: all .3s ease;
    width: 300px;
  }
</style>

<script>
  export default{
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      imgSrc: function () {
        return this.item.images.fixed_width
      }
    }
  }
</script>

