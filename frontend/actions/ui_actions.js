export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_DROPDOWN = 'OPEN_DROPDOWN';
export const CLOSE_DROPDOWN = 'CLOSE_DROPDOWN';

export const openModal = (modalType) => ({
  type: OPEN_MODAL,
  modalType
});

export const closeModal = (modalType) => ({
  type: CLOSE_MODAL,
  modalType
});
