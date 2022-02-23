const messengerLayoutModule = {
    state: () => ({
        isChatOpened: false,
    }),

    mutations: {
        change(state, value) {
            state.isChatOpened = value;
        }
    },

    actions: {
        openChat({ commit }) {
            commit('change', true);
        },

        closeChat({ commit }) {
            commit('change'), false;
        }
    },
}

export default messengerLayoutModule;