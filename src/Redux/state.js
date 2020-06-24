/* eslint-disable */

import { createStore } from 'redux';

let initialState = {
  users: [],
};

function reducer(state = initialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'addusers':
      action.payload.map((user) => {
        stateCopy.users.push(user);
      });

      return stateCopy;

    case 'deleteuser':
      let newarr = [];
      newarr = stateCopy.users.filter((user) => {
        return user.id != action.payload;
      });
      stateCopy.users = newarr;
      console.log(stateCopy.users);
      return stateCopy;

    case 'edituser':
      let userarray = [];
      const { id } = action.payload;
      userarray = stateCopy.users.filter((user) => {
        return user.id != id;
      });
      userarray.push(action.payload);
      stateCopy.users = userarray;
      console.log(action.payload);

      return stateCopy;

    default:
      return stateCopy;
  }
}

const store = createStore(reducer);

export default store;
