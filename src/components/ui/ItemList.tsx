import * as React from 'react';
import {FC} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {NavLink} from "react-router-dom";
import {routes} from '../../routes'


export const ItemList: FC = () => {
  return (
    <>
      {routes.map((route) => (
        route.showInMenu ? (
          <NavLink to={route.path} key={route.key} style={({isActive}) => {
            return {
              display: "block",
              margin: "1rem 0",
              color: isActive ? "orange" : "",
              textDecoration: 'none'
            };
          }}>
            <ListItemButton>
              <ListItemIcon>
                {<route.icon/>}
              </ListItemIcon>
              <ListItemText primary={route.title}/>
            </ListItemButton>
          </NavLink>
        ) : null
      ))}
    </>
  )
}
