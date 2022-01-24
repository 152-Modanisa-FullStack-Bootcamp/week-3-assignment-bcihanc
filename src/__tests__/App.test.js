import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/App";
import Vue from "vue";

describe("App.vue", () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    let wrapper

    let state
    let getters
    let store

    beforeEach(() => {
        state = {
            count: 0
        }
        getters = {
            getCount: state => state.count
        }
        store = new Vuex.Store({state, getters})
        wrapper = shallowMount(App, {store, localVue})
    })

    test('should h1 exists', function () {
        expect(wrapper.find("h1").exists()).toBeTruthy()
    });

    test('should h1 text equal "Daily Corona Cases in Turkey"', function () {
        expect(wrapper.find("h1").text()).toEqual("Daily Corona Cases in Turkey")
    });

    test('should class based on getCount', async function () {
        store.state.count = 0
        expect(wrapper.find(".notificationArea").classes()).toContain("safe")
        store.state.count = 5
        await Vue.nextTick()
        expect(wrapper.find(".notificationArea").classes()).toContain("normal")
        store.state.count = 10
        await Vue.nextTick()
        expect(wrapper.find(".notificationArea").classes()).toContain("danger")
    });

    test('should text message based on getCount', async function () {
        store.state.count = 0
        expect(wrapper.text()).toContain("So safe. Case count is 0k")
        store.state.count = 5
        await Vue.nextTick()
        expect(wrapper.text()).toContain("Life is normal. Case count is 5k")
        store.state.count = 10
        await Vue.nextTick()
        expect(wrapper.text()).toContain("Danger!!! Case count is 10k")
    });
})
