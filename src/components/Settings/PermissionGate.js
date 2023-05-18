import React from 'react'
import { PERMISSION } from '../../constants'

const hasPermission = ({ permissions, scopes }) => {
  const scopesMap = {}
  scopes.forEach(scope => {
    scopesMap[scope] = true
  })
  return permissions.some(permission => scopesMap[permission])
}

export default function PermissionsGate({ children, scopes = [] }) {
  var permissions = JSON.parse(localStorage.getItem('permissions'))

  const permissionGranted = hasPermission({ permissions, scopes })

  if (!permissionGranted) return <></>

  return <>{children}</>
}
