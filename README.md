---
title: vue组件递归实现左侧菜单导航树
date: 2019-02-14 11:55:18
tags: [vue,递归]
---
# vue组件递归实现左侧菜单导航树

## 这里使用的是 vue-cli 的webpack打包工具

## 首先准备好我们符合递归条件的数据

./build/mack/data.json

```json
[
  {
    "id": 1,
    "name": "第一层",
    "children": [
      {
        "name": "第二层"
      },
      {
        "name": "第二层"
      },
      {
        "name": "第二层"
      }
    ]
  },
  {
    "id": 1,
    "name": "第一层",
    "children": [
      {
        "name": "第二层"
      },
      {
        "name": "第二层",
        "children": [
          {
            "name": "第三层"
          },
          {
            "name": "第三层"
          },
          {
            "name": "第三层"
          }
        ]
      },
      {
        "name": "第二层",
        "children": [
          {
            "name": "第三层"
          },
          {
            "name": "第三层"
          },
          {
            "name": "第三层",
            "children": [
              {
                "name": "第四层"
              },
              {
                "name": "第四层"
              },
              {
                "name": "第四层",
                "children": [
                  {
                    "name": "第五层"
                  },
                  {
                    "name": "第五层"
                  },
                  {
                    "name": "第五层"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

```

## 创建接口

./webpack.dev.conf.js

```js
devServer: {
    ...
    before: require('./mock/index')
  },
```

./mock/index

```js
const data = require('./data')
module.exports = function (app) {
  app.get('/data', (require, result) => {
    result.send(data)
  })
}

```
简单封装 fetch工具
./src/api.js
```js

export async function request (url) {
  return fetch(url).then(res => {
    return res.json()
  }).then(data => data)
}

```

封装组建

./src/components/accordion.vue


```js
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

```


调用组建

./src/components/HelloWorld.vue


```js
<template>
  <div id="app">
    <Accordion :data="this.data"></Accordion>
  </div>
</template>

<script>

import {request} from '../api/index'
import Accordion from './accordion'
export default {
  components: {Accordion},
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    request('/data').then(res => {
      this.data = res
    })
  }
}
</script>

<style>

</style>

```

## 项目地址：
https://github.com/wangjinshen/vue.git
