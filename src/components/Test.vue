<template>
  <div>
    <h1>Test8</h1>
    <p>{{msg}}</p>
    <ul v-if="posts && posts.length">
      <li v-for="post of posts">
        <p><strong>{{post.title}}</strong></p>
        <p>{{post.text}}</p>
      </li>
    </ul>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../utils/api';

export default {
  name: 'Test',
  data () {
    return {
      msg: 'My test msg',
      posts: [],
      errors: []
    }
  },
  async created () {
    try {
      const response = await api.get(`posts`)
      this.posts = response.data.posts
    } catch (e) {
      this.errors.push(e)
    }
  }
}
</script>

