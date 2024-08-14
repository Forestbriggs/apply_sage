import { useNavigate } from "react-router-dom"

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
                    <button className="delete_button">Delete</button>
                </div>
                <button onClick={handleAddApplication} className="add_button">Add Application</button>
            </div>
        </div>
    )
}