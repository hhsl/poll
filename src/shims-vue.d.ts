declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import { DollarApollo } from 'vue-apollo/types/vue-apollo';
// import { VueApolloComponentOption } from 'vue-apollo/types/options';

// declare module 'vue/types' {

//     export interface IParams {
//         [index: string]: any
//     }
//     export interface RedirectHandle {
//         (status: number, path: string, query?: string): void
//         (path: string, query?: string): void
//     }

//     export interface VueApollo {

//     }
// }

// declare module 'vue/types/vue' {

//     interface Vue {
//         $router: VueRouter
//         $apollo: DollarApollo<any>
//         apollo: object
//     }
// }

// declare module 'vue/types/options' {
//     interface ComponentOptions<V extends Vue> {
//         apollo?: VueApolloComponentOption<V>;
//     }
// }
