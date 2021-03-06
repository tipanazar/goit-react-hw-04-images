import { useEffect, memo } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
    //eslint-disable-next-line
  }, []);

  const close = ev => {
    if (ev.code === 'Escape') {
      return closeModal();
    }
    if (ev.target === ev.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div onClick={close} className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={close} className={styles.closeModalBtn}>
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default memo(Modal);

Modal.propTypes = {
  сloseModal: PropTypes.func,
};