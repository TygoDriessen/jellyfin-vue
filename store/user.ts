import { ActionTree, MutationTree } from 'vuex';

export interface UserState {
  id: string;
  serverUrl: string;
  accessToken: string;
  displayPreferences: { [key: string]: string };
}

export const state = (): UserState => ({
  id: '',
  serverUrl: '',
  accessToken: '',
  displayPreferences: {}
});

interface MutationPayload {
  id: string;
  serverUrl: string;
  accessToken: string;
  displayPreferences: { [key: string]: string };
}

export const mutations: MutationTree<UserState> = {
  SET_USER(
    state: UserState,
    { id, serverUrl, accessToken, displayPreferences }: MutationPayload
  ) {
    state.id = id;
    state.serverUrl = serverUrl;
    state.accessToken = accessToken;
    state.displayPreferences = displayPreferences;
  },
  CLEAR_USER(state: UserState) {
    state.serverUrl = '';
    state.serverUrl = '';
    state.accessToken = '';
    state.displayPreferences = {};
  }
};

export const actions: ActionTree<UserState, UserState> = {
  async set(
    { commit },
    {
      id,
      serverUrl,
      accessToken
    }: { id: string; serverUrl: string; accessToken: string }
  ) {
    const response = await this.$api.displayPreferences.getDisplayPreferences({
      displayPreferencesId: 'usersettings',
      userId: id,
      client: 'vue'
    });

    commit('SET_USER', {
      id,
      serverUrl,
      accessToken,
      displayPreferences: response.data.CustomPrefs
    });
  },
  clear({ commit }) {
    commit('CLEAR_USER');
  }
};
