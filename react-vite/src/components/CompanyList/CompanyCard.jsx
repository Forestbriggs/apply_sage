import { useNavigate } from "react-router-dom"
import OpenModalButton from '../OpenModalButton';
import DeleteModal from "../DeleteModal/DeleteModal";

export default function CompanyCard({ company }) {
    const navigate = useNavigate();

    const handleAddApplication = () => {
        return navigate(`/companies/${company.id}/applications/create`);
    }

    const handleEdit = () => {
        return navigate(`${company.id}/edit`);
    }

    return (
        <div className="company_card">
            <h2>{company.name}</h2>
            {company.website && <a target='_blank' rel='noopener noreferrer' href={company.website}>{company.name}&apos;s Career Page</a>}
            <div className="button_group">
                <div>
                    <button onClick={handleEdit} className='edit_button'>Edit</button>
                    <OpenModalButton
                        buttonText={'Delete'}
                        className={'delete_button'}
                        modalComponent={
                            <DeleteModal
                                typeId={company.id}
                                type={'company'}
                            />
                        }
                    />
                </div>
                <button
                    onClick={handleAddApplication}
                    className="add_button"
                >
                    Add Application
                </button>
            </div>
        </div>
    )
}