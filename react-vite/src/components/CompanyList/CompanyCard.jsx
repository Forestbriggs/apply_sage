export default function CompanyCard({ company }) {
    return (
        <div className="company_card">
            <h2>{company.name}</h2>
            {company.website && <a target='_blank' rel='noopener noreferrer' href={company.website}>{company.name}&apos;s Career Page</a>}
            <div className="button_group">
                <div>
                    <button className='edit_button'>Edit</button>
                    <button className="delete_button">Delete</button>
                </div>
                <button className="add_button">Add Application</button>
            </div>
        </div>
    )
}