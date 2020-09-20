import { getAgents, addAgent, updateAgent, deleteAgent } from '@/api/agents';

const state = {
  agents: []
};

const mutations = {
  ADD_AGENTS: (state, agents) => {
    state.agents = agents;
  }
};

const actions = {
  getAgents({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getAgents(payload)
        .then(response => {
          const { data } = response;
          commit('ADD_AGENTS', data.agents);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  add(_, payload) {
    return new Promise((resolve, reject) => {
      addAgent(payload)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  update(_, payload) {
    return new Promise((resolve, reject) => {
      updateAgent(payload)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delete(_, payload) {
    return new Promise((resolve, reject) => {
      deleteAgent(payload)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
