<template>
    <div
      v-if="imgUrl"
      class="column-df-3 column-md-4 column-sm-12"
      v-on:click="onItemClick"
      v-on:mouseover="setType('dynamic')"
      v-on:mouseleave="setType('still')"
    >
      <div class="item">
        <img class="image" :src="imgUrl" />
      </div>
    </div>
</template>

<style lang="sass" scoped>
  .item {
    overflow: hidden;
    height: 200px;
  }

  .image {
    width: 100%;
    height: auto;
    min-height: 100%;
  }
</style>

<script>
  export default{
    data(){
      return {
        type: 'fixed_height_still'
      }
    },
    mounted() {
      this.setType('still');
    },
    props: {
      item: {
        type: Object,
        required: true
      },
    },
    computed: {
      imgUrl: function () {
        return this.item.images[this.type].url;
      }
    },
    methods: {
      setType(type) {
        this.type = type === 'still' ? 'fixed_height_still' : 'fixed_width';
      },
      onItemClick() {
        this.$emit('openModal', this.item);
      }
    }
  }
</script>
