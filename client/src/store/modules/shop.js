import {
  get as getShops,
  add as addShop,
  update as updateShop,
  remove as removeShop
} from '@/api/shops';

const state = {
  shops: []
};

const mutations = {
  ADD_SHOPS: (state, shops) => (state.shops = shops)
};

const actions = {
  async get({ commit }, payload) {
    const { data } = await getShops(payload);
    commit('ADD_SHOPS', data.shops);
  },
  async add(_, payload) {
    await addShop(payload);
  },
  async update(_, payload) {
    await updateShop(payload);
  },
  async remove(_, payload) {
    await removeShop(payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
