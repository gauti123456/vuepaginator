<template>
  <div id="app" class="container mx-auto flex flex-col items-center">
    <div v-if="users.length>0" class="p-2">  
      <div  v-for="(user, index) in users" :key="index" class="max-w-md w-full lg:flex py-2">
        <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
             :style="`background-image: url('${user.cover})`" 
             title="Woman holding a mug">
        </div>
        
        <div class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="mb-8">
            <div class="text-black font-bold text-xl mb-2">{{ user.intro}}</div>
            <p class="text-grey-darker text-base"> {{ user.bio}}</p>
          </div>
        <div class="flex items-center">
          <img class="w-10 h-10 rounded-full mr-4" :src="user.profile">
          <div class="text-sm">
            <p class="text-black leading-none"></p>
            <p class="text-grey-dark">{{ user.name }}</p>
          </div>
        </div>
      </div>
    </div>    
  </div>
    
    <div>
      <app-paginator :meta="meta" 
                     :pages-per-section="pagesPerSection"
                     @pagination:switched="page => getUsers(page)">
                           
    </app-paginator>
      <div class="text-center py-4 text-sm text-grey-darker">
        {{ (meta.current_page-1)*2+1}} - {{ meta.current_page*2}} of {{ meta.total}}+ users
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from "./api/user";

import AppPaginator from "./components/AppPaginator";

export default {
  name: "App",
  components: {
    AppPaginator
  },
  data() {
    return {
      meta: {},
      pagesPerSection: 3,
      users: []
    };
  },

  methods: {
    getUsers(page = 1) {
      UserApi.getUsers(`${window.URL}?page=${page}`).then(res => {
        this.users = res.data;
        this.meta = res.meta;
      });
    }
  },
  mounted() {
    this.getUsers(1);
  }
};
</script>

<style>
#app {
  margin-top: 60px;
  margin-bottom: 40px;
}
</style>
