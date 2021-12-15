<template>
<q-layout view="lHh Lpr lFf">
    <q-header>
        <q-toolbar>
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        </q-toolbar>

        <div class="q-px-lg q-pt-xl q-mb-md">
            <div class="text-h3">TO-DO</div>
            <div class="text-subtitle">{{ state.todayDate }}</div>
        </div>

        <q-img src="~assets/geo.png" :id="state.darkmode ? 'q-image' : ''" class="header-image absolute-top" />

    </q-header>

    <q-drawer :id="state.darkmode ? 'q-item' : ''" v-model="state.leftDrawerOpen" show-if-above :width="250" :breakpoint="600">
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px;">
            <q-list padding>
                <q-item :class="state.darkmode ? 'text-negative' : ''" clickable v-ripple exact to="/">
                    <q-item-section avatar>
                        <q-icon name="list" />
                    </q-item-section>

                    <q-item-section>
                        Task list
                    </q-item-section>
                </q-item>

                <!-- <q-item clickable v-ripple exact to="/help">
                    <q-item-section avatar>
                        <q-icon name="help" />
                    </q-item-section>

                    <q-item-section>
                        Help
                    </q-item-section>
                </q-item> -->
            </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="~assets/fondo.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
                <q-avatar size="50px" class="q-mb-sm">
                    <img src="~assets/test.jpeg" class="icon-usuario">
                </q-avatar>
                <div class="text-weight-bold">Armando Berlanga</div>
                <div>@ArmandoBerlanga27</div>
            </div>
        </q-img>
    </q-drawer>

    <q-page-container :id="state.darkmode ? 'contenedor' : ''">
        <keep-alive>
            <router-view :darkmode="state.darkmode" />
        </keep-alive>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab :icon="state.darkmode ? 'light_mode' : 'dark_mode'" :color="state.darkmode ? 'negative' : 'primary'" @click="state.darkmode = !state.darkmode" />
        </q-page-sticky>
    </q-page-container>
</q-layout>
</template>

<script>
import {
    defineComponent,
    reactive
} from 'vue'
import {
    date
} from 'quasar'

export default defineComponent({
    name: 'MainLayout',

    setup() {
        const state = reactive({
            todayDate: date.formatDate(new Date(), 'dddd D MMMM of YYYY'),
            leftDrawerOpen: false,
            darkmode: false
        });

        function toggleLeftDrawer() {
            state.leftDrawerOpen = !state.leftDrawerOpen;
        }

        return {
            state,
            toggleLeftDrawer
        }
    }
})
</script>

<style lang="scss">
@import '../css/themes/darkmode.scss';

.header-image {
    height: 100%;
    z-index: -1;
    opacity: 0.5;
    filter: grayscale(100%);
}

.icon-usuario {
    object-fit: cover;
}
</style>
