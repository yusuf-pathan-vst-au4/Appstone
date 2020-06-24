/* eslint-disable */

import React, { Fragment } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { connect } from 'react-redux';

import './App.css';

class App extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
  };

  async componentDidMount() {
    const response = await axios.get('https://reqres.in/api/users?page=2');
    const users = response.data.data;
    console.log(users);
    this.props.dispatch({
      type: 'addusers',
      payload: users,
    });
  }

  Changes = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  Delete = (id) => {
    this.props.dispatch({
      type: 'deleteuser',
      payload: id,
    });
  };

  Edit = (id) => {
    this.props.dispatch({
      type: 'edituser',
      payload: {
        id: id,
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        email: this.state.email,
      },
    });
  };

  render() {
    return (
      <Fragment>
        {this.props.users &&
          this.props.users.map((user) => {
            return (
              <List className='usersList'>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={user.first_name} src={user.avatar} />
                  </ListItemAvatar>

                  <ListItemText
                    primary={user.first_name}
                    secondary={user.last_name}></ListItemText>

                  <ListItemText>
                    <TextField
                      placeholder='First Name'
                      name='firstname'
                      onChange={(event) => {
                        this.Changes(event);
                      }}
                    />
                  </ListItemText>
                  <ListItemText>
                    <TextField
                      placeholder='Second Name'
                      name='lastname'
                      onChange={(event) => {
                        this.Changes(event);
                      }}
                    />
                  </ListItemText>

                  <ListItemText secondary={user.email} />
                  <ListItemText>
                    <TextField
                      placeholder='Email'
                      name='email'
                      onChange={(event) => {
                        this.Changes(event);
                      }}
                    />
                  </ListItemText>

                  <IconButton>
                    <DeleteIcon onClick={() => this.Delete(user.id)} />
                  </IconButton>
                  <IconButton>
                    <EditIcon onClick={() => this.Edit(user.id)} />
                  </IconButton>
                </ListItem>
              </List>
            );
          })}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(App);
