/* eslint-disable no-undef */
export const createRoomInvite = (roomID) => {
  const inviteUrl =
    window.location.href.substring(0, window.location.href.lastIndexOf('/')) +
    '/invite';
  return `${inviteUrl}?roomID=${roomID}`;
};
