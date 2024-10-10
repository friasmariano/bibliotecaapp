import { useRef, FC, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  texto: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, texto }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Show or close the modal depending on the isOpen state
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]); // This effect runs whenever isOpen changes

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      style={{
        backgroundColor: 'whitesmoke',
        margin: 'auto',
        padding: '1rem',
        borderRadius: '10px',
      }}
    >
      <div className="modal-header">Resumen Libro</div>
      <div className="modal-body">
        <p style={ { color: 'brown'} }>{texto}</p>
      </div>
      <div className="modal-footer">
        <button className="close-btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
