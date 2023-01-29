import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const LargePhotoModal = ({ largeImg, onClose }) => {
  const onCloseModal = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', onCloseModal);

    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  }, [onCloseModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modal>
        <img src={largeImg} alt="" />
      </Modal>
    </Overlay>,
    modalRoot
  );
};

export default LargePhotoModal;
