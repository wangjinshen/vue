<template>
  <div class="show">
    <ul v-for="(item,index) in data" :key="index">
      <li @click="showhd(index,$event)" :class="[item.children?'color':'']">{{item.name}}</li>
      <Accordion v-if="item.children" :data="item.children"></Accordion>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Accordion',
  props: ['data'],
  methods: {
    showhd (id, e) {
      const dom = e.target.nextElementSibling
      if (dom.className === 'show') {
        dom.className = 'head'
      } else {
        dom.className = 'show'
      }
    }
  }

}
</script>

<style scoped>
  .ul {
    overflow: hidden;
  }

  .head {
    display: none;
  }

  .show {
    display: block;
  }
  .color{
    color: brown;
  }
</style>
