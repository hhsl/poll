<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ User }}</h2>
  </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import gql from 'graphql-tag';

    @Component({
        apollo: {
            User: gql`query {User(where: {name: {_eq: "finni"}}) {
                name
            }}`
        }
    })
    export default class HelloWorld extends Vue {
        @Prop() private msg!: string;

        User: any = {};

        public async created() {
            const response = await this.$apollo.query({
                query: gql`
                    query {
                        User {
                            id
                            online_ping
                            last_seen
                            created_at
                            name
                        }
                    }`
            });
            console.log(response.data);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
