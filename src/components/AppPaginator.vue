<template>
   <vue-paginator :meta="meta" 
                  @pagination:switched="handlePaginationSwitched" 
                  :pages-per-section="pagesPerSection">
       
        <ul  v-if="showPaginator" 
            slot-scope="{showPaginator, pages, switcher, section}" 
            class="pagination flex list-reset">
            <li v-if="meta.current_page !==1"
                class="page-item m-1 mr-4"
                :class="{disabled: meta.current_page == 1}"
                @click.prevent="switcher.prev">
                <a class="pb-1 text-3xl text-teal-dark border-teal-dark no-underline page-link border w-8 h-8 flex inline-block rounded-full justify-center items-center"
                   href="#">
                    &#x2039;
                </a>
            </li>

            <li class="page-item m-1"
                v-if="section.showPrev && meta.current_page !== 1">
                <a class="text-xs no-underline page-link p-2 w-8 h-8 flex inline-block justify-center items-center"
                   :class=" meta.last_page === 1 ? 'border text-white bg-teal-dark rounded-full' : 'text-teal-dark' "
                   href="#"
                   @click.prevent="switcher.toPage(1)">
                    1
                </a>
            </li>

            <li class="page-item m-1"
                v-if="section.showPrev"
                @click.prevent="section.prev">
                <a class="text-sm text-teal-darker no-underline page-link p-2 w-8 h-8 flex inline-block rounded-full justify-center items-center"
                   href="#">
                    ...
                </a>
            </li>

            <li class="page-item m-1"
                v-for="(page, index) in pages"
                :key="index">
                <a class="text-xs no-underline page-link p-2 w-8 h-8 flex inline-block justify-center items-center"
                   :class=" page === meta.current_page ? 'border text-white bg-teal-dark rounded-full' : 'text-teal-dark' "
                   href="#"
                   @click.prevent="switcher.toPage(page)">
                    {{ page }}
                </a>
            </li>

            <li class="page-item m-1"
                v-if="section.showNext"
                @click.prevent="section.next">
                <a class="text-teal-darkest text-sm no-underline page-link p-2 w-8 h-8 flex inline-block rounded-full justify-center items-center"
                   href="#">
                    ...
                </a>
            </li>

            <li class="page-item m-1"
                v-if="section.showNext && meta.current_page !== meta.last_page">
                <a class="text-xs no-underline page-link p-2 w-8 h-8 flex inline-block justify-center items-center"
                   :class=" meta.last_page === meta.current_page ? 'border text-white bg-teal-darker rounded-full' : 'text-teal-dark' "
                   href="#"
                   @click.prevent="switcher.toPage(meta.last_page)">
                    {{ meta.last_page}}
                </a>
            </li>

            <li v-if="meta.current_page !==meta.last_page"
                class="page-item m-1 ml-4"
                :class="{disabled: meta.current_page === meta.last_page}"
                @click.prevent="switcher.next">
                <a class="text-teal-dark border-teal-dark  pb-1 text-3xl no-underline page-link border w-8 h-8 flex inline-block rounded-full justify-center items-center"
                   href="#">&#x203A; </a>
            </li>
        </ul>
    </vue-paginator>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true
    },
    pagesPerSection: {
      type: Number,
      default: 10
    }
  },
  methods: {
    handlePaginationSwitched(page) {
      this.$emit("pagination:switched", page);
    }
  }
};
</script>
