import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteApplicationModal.css';

export default function DeleteApplicationModal({ applicationId, navigateOnDelete }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const confirmDelete = () => {
        console.log('deleting')
    }

    return (
        <>
            <div>
                <div id='delete_modal__container'>
                    <h1>Confirm Delete</h1>
                    <h3>Are you sure you want to delete this application?</h3>
                    <div>
                        <button onClick={closeModal} className='cancel_button'>Cancel</button>
                        <button onClick={confirmDelete} className='delete_button'>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}