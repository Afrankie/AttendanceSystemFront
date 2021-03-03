import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const AvatarKey = 'vue_admin_template_avatar'
const RolesKey = 'vue_admin_template_roles'
const FirstKey = 'vue_admin_template_First'


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setAvatar(avatarUrl) {
	return Cookies.set(AvatarKey, avatarUrl)
}

export function getAvatar() {
	return Cookies.get(AvatarKey)
}

export function removeAvatar() {
  return Cookies.remove(AvatarKey)
}

export function setRoles(roles) {
  // console.log(JSON.stringify(roles))
	return Cookies.set(RolesKey, JSON.stringify(roles))
}

export function getRoles() {
	return Cookies.get(RolesKey)
}

export function removeRoles() {
  return Cookies.remove(RolesKey)
}

export function setFirst() {
	return Cookies.set(FirstKey, true)
}

export function getFirst() {
	return Cookies.get(FirstKey)
}

export function removeFirst() {
  return Cookies.remove(FirstKey)
}

export function cleanFirst() {
  return Cookies.set(FirstKey, false)
}