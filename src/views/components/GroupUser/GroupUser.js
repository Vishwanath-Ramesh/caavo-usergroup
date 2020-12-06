import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@material-ui/core'
import { Check as CheckIcon } from '@material-ui/icons'

import './GroupUser.css'

const GroupUser = ({ userData, dispatch }) => {
  const [userSelected, setUserSelected] = React.useState(false)

  function onUserSelectHandler() {
    setUserSelected((currentState) => {
      dispatch({
        type: 'UPDATE_GROUPUSERS',
        selectedUser: userData,
        isSelected: !currentState,
      })

      return !currentState
    })
  }

  return (
    <div className="create-usergroup__user">
      <img
        role="presentation"
        className="create-usergroup__usericon"
        src={userData.Image}
        alt={userData.name}
        onClick={() => onUserSelectHandler()}
        onKeyDown={() => onUserSelectHandler()}
      />
      {userSelected && (
        <IconButton className="create-usergroup__check">
          <CheckIcon />
        </IconButton>
      )}
      <div className="create-usergroup__username">{userData.name}</div>
    </div>
  )
}

GroupUser.propTypes = {
  userData: PropTypes.shape({
    Image: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default GroupUser
