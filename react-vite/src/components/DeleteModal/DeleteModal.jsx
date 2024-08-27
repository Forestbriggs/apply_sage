import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteModal.css';
import { thunkDeleteApplicationById } from '../../redux/applications';
import { thunkDeleteCompanyById } from '../../redux/companies';

export default function DeleteModal({ typeId, navigateOnDelete, type }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const confirmDelete = () => {
        switch (type) {
            case 'application':
                dispatch(thunkDeleteApplicationById(typeId)).then(() => {
                    navigateOnDelete();
                    return closeModal();
                })
                break
            case 'company':
                dispatch(thunkDeleteCompanyById(typeId)).then(() => {
                    closeModal();
                    return;
                })
                break
            default:
                return closeModal();
        }
    }

    return (
        <>
            <div>
                <div id='delete_modal__container'>
                    <h1 className='text-3xl font-bold'>Confirm Delete</h1>
                    <h3 className='text-xl font-bold'>Are you sure you want to delete this {type === 'company' ? 'company' : 'application'}?</h3>
                    <div>
                        <button onClick={closeModal} className='cancel_button'>Cancel</button>
                        <button onClick={confirmDelete} className='delete_button'>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}