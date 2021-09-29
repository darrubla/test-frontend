import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import Icon from '@material-ui/core/Icon'
import { logout } from '../../services/firebase'
import IsLogged from "../../utils/IsLogged"

import './Layout.scss'

const url = [
  '/home',
  '/favorites'
]

export default function Layout({children}) {
  const history = useHistory()
  const [value, setValue] = useState(url.indexOf(history.location.pathname))

  useEffect(() => {
    if ([0,1].includes(value)) {
      history.push(url[value])
    } else if (parseInt(value) === 2){
      logout()
    }
  }, [value]);

  return (
    <section className="layout">
      {children}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction label="Home" icon={<Icon>home</Icon>} />
        <BottomNavigationAction label="Favorites" icon={<Icon>favorite</Icon>} />
        <BottomNavigationAction label="Logout" icon={<Icon>logout</Icon>} />
      </BottomNavigation>
    </section>
  )
}
