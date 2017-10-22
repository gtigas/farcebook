# Component Hierarchy

## General
* `App`
  * `NavBar`
    * `MainPage`

---

## Sign In/Sign Up
* `SessionFormContainer`
  * `SessionForm`
* `SignUpContainer`
  * `SignUpForm`

---
## Post Form (reusable)
* `PostFormContainer`
  * `PostForm`

---

## Feed/Index
* `PostIndexContainer` (friends) (reusable)
  * `PostIndex` (friends)
    * `PostShow` (friends)
* `SidebarContainer`
  * `SideBarList`
    * `SideBarListItem`
* `PostForm`

---

## Profile
* `HeaderContainer`
  * `Header`
    * `ProfilePicture`
    * `CoverPhoto`
    * `ProfileNavBar`
* `PostIndexContainer` (self)
  * `PostIndex` (self)
    * `PostShow` (self)
* `PostForm`
* `AboutListContainer`
  * `AboutListItem`
* `FriendsContainer`
  * `FriendsList`
    * `FriendsListItem`

---

## Post Show
* `PostContainer`
  * `PostShow`
  * `CommentsContainer`
    * `Comments`
    * `CommentsForm`

---

## Notification Index
* `NotificationsContainer`
  * `NotificationListItem`
