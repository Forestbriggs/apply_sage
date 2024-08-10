import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetUserCompanies } from '../../redux/companies';
import LoadingPage from '../LoadingPage';
import './CompanyForm.css';

export default function CompanyForm() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [company, setCompany] = useState('');
    const [newCompany, setNewCompany] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const companies = useSelector(state => state.companies);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(thunkGetUserCompanies()).then(() => {
                setIsLoaded(true);
            })
        }
    }, [isLoaded, dispatch])

    const handleSubmit = () => {
        return;
        /**
         * Check if new company or not
         * 
         * if not new company
         * - verify company select (throw error if not)
         * - redirect to /company/{company_id}/application/create
         * 
         * if new company
         * - verify company name (throw error if not)
         * - send post request to create new company in db
         * - with returned company redirect to /company/{company_id}/application/create
         */
    }

    return (
        <>
            {isLoaded &&
                <div id='company_form__container'>
                    <div id='company_form'>
                        <h1>What Company is This Application For?</h1>
                        <select
                            name="company"
                            id="company_select"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            disabled={newCompany}
                        >
                            <option disabled value="">Select a Company</option>
                            {companies.allIds.map((company_id) => {
                                const company = companies.data[company_id];
                                return (
                                    <option
                                        key={company_id}
                                        value={company_id}>
                                        {company.name}
                                    </option>
                                )
                            })}
                        </select>
                        <div id='not_in_list'>
                            <h2>Not in List?</h2>
                            <input
                                type="checkbox"
                                name="newCompany"
                                id="new_company_checkbox"
                                value={newCompany}
                                onChange={() => setNewCompany(!newCompany)}
                            />
                        </div>
                        <div id='new_company_form'>
                            <div>
                                <label>Company Name:</label>
                                <input
                                    disabled={!newCompany}
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Career Page Link</label>
                                <input
                                    disabled={!newCompany}
                                    type="text"
                                    value={companyWebsite}
                                    onChange={(e) => setCompanyWebsite(e.target.value)}
                                />
                            </div>
                            <button onClick={handleSubmit}>Next</button>
                        </div>
                    </div >
                </div>
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}