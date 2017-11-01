export const readNotification = notification => {
  return $.ajax({
    method: 'PATCH',
    url: `api/notifications/${notification.id}`
  })
}
