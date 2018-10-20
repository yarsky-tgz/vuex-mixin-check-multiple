const CHECK = `CHECK`;
const UNCHECK = `UNCHECK`;
const CHECK_ALL = `CHECK_ALL`;
const UNCHECK_ALL = `UNCHECK_ALL`;
const isChecked = `isChecked`;
const isCheckedAny = `isCheckedAny`;
const isCheckedAll = `isCheckedAll`;
const toggle = `toggle`;
const toggleAll = `toggleAll`;
export default ({ getItems = state => state.items, getTarget = state => state.checked }) => {
  return {
    mutations: {
      [ CHECK ](state, item) {
        getTarget(state).push(item);
      },
      [ UNCHECK ](state, item) {
        const target = getTarget(state);
        const index = target.indexOf(item);
        if (index !== -1) target.splice(index, 1);
      },
      [ CHECK_ALL ](state) {
        const target = getTarget(state);
        target.splice(0, target.length, ...getItems(state));
      },
      [ UNCHECK_ALL ](state) {
        const target = getTarget(state);
        target.splice(0, target.length);
      }
    },
    getters: {
      [ isChecked ]: state => item => getTarget(state).indexOf(item) !== -1,
      [ isCheckedAny ]: state => getTarget(state).length > 0,
      [ isCheckedAll ]: state => getTarget(state).length === getItems(state).length
    },
    actions: {
      [ toggle ]({ commit, getters }, item) {
        if (getters[ isChecked ](item)) commit(UNCHECK, item);
        else commit(CHECK, item)
      },
      [ toggleAll ]({ commit, getters }) {
        if (getters[ isCheckedAll ] || getters[ isCheckedAny ]) commit(UNCHECK_ALL);
        else commit(CHECK_ALL);
      }
    }
  }
};
