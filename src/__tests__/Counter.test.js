import {createLocalVue, shallowMount} from "@vue/test-utils";
import Counter from "@/Counter";
import Vuex from "vuex";

describe("Counter.vue", () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    let wrapper

    let state
    let actions
    let store

    beforeEach(() => {
        state = {
            count: 0,
        }
        actions = {
            increment: (context, payload) => state.count += 1,
            decrement: (context, payload) => state.count += -1
        }
        store = new Vuex.Store({state, actions})
        wrapper = shallowMount(Counter, {store, localVue})
    })

    test("should component exists ", () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.find("does-not-exists").exists()).toBeFalsy()
    })

    test("should decrease button exists", () => {
        const buttons = wrapper.findAll("button")
        expect(buttons.wrappers.some(button => button.text() === "Decrease")).toBeTruthy()
    })

    test("should increase button exists", () => {
        const buttons = wrapper.findAll("button")
        expect(buttons.wrappers.some(button => button.text() === "Increase")).toBeTruthy()
    })

    test('triggers a decrease button', async function () {
        const decreaseButton = wrapper.findAll("button").wrappers.find(button => button.text() === "Decrease")
        await decreaseButton.trigger("click")
        expect(store.state.count).toEqual(-1)
    });

    test('triggers a increase button', async function () {
        const increaseButton = wrapper.findAll("button").wrappers.find(button => button.text() === "Increase")
        await increaseButton.trigger("click")
        expect(store.state.count).toEqual(1)
    });

    test('triggers buttons', async function () {
        const decreaseButton = wrapper.findAll("button").wrappers.find(button => button.text() === "Decrease")
        const increaseButton = wrapper.findAll("button").wrappers.find(button => button.text() === "Increase")
        await increaseButton.trigger("click")
        await increaseButton.trigger("click")
        await decreaseButton.trigger("click")
        expect(store.state.count).toEqual(1)
    });
})
