<template>
  <h2>
    {{ title }}
  </h2>
  <img src="<%= asset_path('static/rails/rails_welcome.png') %>" width="100" />
</template>

<script lang="ts">
export default {
  data (): { title: string } {
    return {
      title: 'Vue'
    }
  }
}
</script>
