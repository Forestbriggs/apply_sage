import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { useModal } from '../../context/Modal';
import './DeleteModal.css';
import { thunkDeleteApplicationById } from '../../redux/applications';
import { thunkDeleteCompanyById } from '../../redux/companies';
import { toast } from 'react-toastify';

type DeleteModalProps = {
    typeId: number;
    type: string;
    navigateOnDelete?: () => void;
    setIsLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
    setPendingDelete?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteModal({ typeId, navigateOnDelete, type, setIsLoaded, setPendingDelete }: DeleteModalProps) {
    const { closeModal } = useModal();
    const dispatch = useAppDispatch();

    const confirmDelete = async () => {
        switch (type) {
            case 'application':
                try {
                    sessionStorage.removeItem('app-page');
                    if (setPendingDelete) setPendingDelete(true);
                    if (setIsLoaded) setIsLoaded(false);
                    await dispatch(thunkDeleteApplicationById(typeId));
                    if (navigateOnDelete) navigateOnDelete();
                    closeModal();
                } catch (e) {
                    toast.error('There was an error deleting the application');
                }
                break
            case 'company':
                try {
                    await dispatch(thunkDeleteCompanyById(typeId));
                    closeModal();
                } catch (e) {
                    toast.error('There was an error deleting the company');
                }
                break
            default:
                closeModal();
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