/* eslint-disable no-console */
import React from 'react'
import {
  IconButton,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core'
import { Close as CloseIcon, Person as PersonIcon } from '@material-ui/icons'
import _ from 'lodash'

import getAPIData from '../../../models/api/api'
import GroupUser from '../GroupUser/GroupUser'
import './CreateUserGroup.css'

function sortUserLists(users, sortBy = 'ASC') {
  if (!users.length) return []

  return sortBy === 'ASC'
    ? _.orderBy(users, ['name'])
    : _.orderBy(users, ['name'], ['desc'])
}

function usergroupReducer(state, action) {
  switch (action.type) {
    case 'SET_GROUPNAME':
      return { ...state, groupName: action.groupName }
    case 'SET_GROUPDESC':
      return { ...state, groupDesc: action.groupDesc }
    case 'CLEAR_INPUTS':
      return { ...state, groupName: '', groupDesc: '' }
    case 'SET_USERS':
      return { ...state, userLists: sortUserLists(action.userLists) }
    case 'SORT_CHANGE':
      return {
        ...state,
        sortBy: action.sortBy,
        userLists: sortUserLists(state.userLists, action.sortBy),
      }
    case 'UPDATE_GROUPUSERS':
      return {
        ...state,
        groupUsers: action.isSelected
          ? state.groupUsers.concat(action.selectedUser)
          : state.groupUsers.filter(
              (user) => user.id !== action.selectedUser.id
            ),
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const CreateUserGroup = () => {
  const initialState = {
    groupName: '',
    groupDesc: '',
    userLists: null,
    sortBy: 'ASC',
    groupUsers: [],
  }
  const [state, dispatch] = React.useReducer(usergroupReducer, initialState)

  function onUpdateHandler() {
    const { groupName, groupDesc, groupUsers } = state
    const groupData = {
      groupName,
      groupDesc,
      groupUsers,
    }
    console.log(groupData)
  }

  function onRemoveHandler() {
    dispatch({ type: 'CLEAR_INPUTS' })
  }

  React.useEffect(() => {
    async function fetchData() {
      await getAPIData('get', '/he-public-data/users49b8675.json')
        .then((response) => {
          dispatch({ type: 'SET_USERS', userLists: response.data })
        })
        .catch((err) => console.log(err.message))
    }

    fetchData()
  }, [])

  const { groupName, groupDesc, sortBy, userLists } = state

  return (
    <div className="create-usergroup">
      <div className="create-usergroup__header">
        <div className="create-usergroup__title">Create Group</div>
        <IconButton className="create-usergroup__close">
          <CloseIcon />
        </IconButton>
      </div>
      <div className="create-usergroup__groupinfo">
        <PersonIcon className="create-usergroup__groupavatar" />
        <div className="create-usergroup__groupdetails">
          <div className="create-usergroup__groupname">
            <div className="create-usergroup__groupname_label">Name</div>
            <TextField
              color="white"
              className="create-usergroup__groupname_input"
              label="group name"
              variant="outlined"
              value={groupName}
              onChange={({ target }) =>
                dispatch({ type: 'SET_GROUPNAME', groupName: target.value })
              }
            />
          </div>
          <div className="create-usergroup__groupdesc">
            <div className="create-usergroup__groupdesc_label">Description</div>
            <TextField
              className="create-usergroup__groupdesc_input"
              label="group description"
              variant="outlined"
              value={groupDesc}
              onChange={({ target }) =>
                dispatch({ type: 'SET_GROUPDESC', groupDesc: target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="create-usergroup__usersort">
        <div className="create-usergroup__usersort_label">Sort by</div>
        <RadioGroup
          row
          aria-label="gender"
          name="gender1"
          value={sortBy}
          onChange={({ target }) =>
            dispatch({ type: 'SORT_CHANGE', sortBy: target.value })
          }
        >
          <FormControlLabel
            value="ASC"
            control={<Radio disableRipple />}
            label="Ascending"
          />
          <FormControlLabel
            value="DESC"
            control={<Radio disableRipple />}
            label="Descending"
          />
        </RadioGroup>
      </div>
      <div className="create-usergroup__userscontainer">
        {userLists &&
          userLists.map((user) => {
            return (
              <GroupUser key={user.id} userData={user} dispatch={dispatch} />
            )
          })}
      </div>
      <div className="create-usergroup__usersactions">
        <Button
          variant="contained"
          color="secondary"
          className="create-usergroup__groupupdate"
          disableRipple
          disableElevation
          onClick={onUpdateHandler}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="create-usergroup__groupremove"
          disableRipple
          disableElevation
          onClick={onRemoveHandler}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export default CreateUserGroup
