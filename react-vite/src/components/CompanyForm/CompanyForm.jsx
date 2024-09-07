import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCreateCompany, thunkGetCompanyById, thunkGetUserCompanies } from '../../redux/companies';
import { toast } from 'react-toastify';
import LoadingPage from '../LoadingPage';
import './CompanyForm.css';

export default function CompanyForm() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [company, setCompany] = useState('');
    const [newCompany, setNewCompany] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const [errors, setErrors] = useState({});
    const companies = useSelector(state => state.companies);

    useEffect(() => {
        if (!sessionUser) {
            return navigate('/unauthorized');
        }
        if (!isLoaded) {
            dispatch(thunkGetUserCompanies()).then((data) => {
                if (Object.values(data)[0].length === 0) {
                    setNewCompany(true);
                }
                setIsLoaded(true);
            })
        }
    }, [isLoaded, dispatch, sessionUser, navigate])

    const handleNewCompanySubmit = async () => {
        setErrors({})
        const newErrors = {};
        if (companyName.length === 0) newErrors.name = 'Company name is required';

        if (Object.values(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        const payload = { name: companyName };
        if (companyWebsite.length) payload.website = companyWebsite;

        return toast.promise(dispatch(thunkCreateCompany(payload)).then((data) => {
            return navigate(`/companies/${data}/applications/create`)
        }),
            {
                pending: 'Posting...',
                success: 'Company successfully created',
                error: 'Error creating Company',

            }).catch((e) => setErrors(e))
    }

    const handleExistingCompanySubmit = () => {
        setErrors({});
        const newErrors = {};
        if (!company) newErrors.company = 'Company is required';

        if (Object.values(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        dispatch(thunkGetCompanyById(company)).then(() => {
            return navigate(`/companies/${company}/applications/create`)
        }).catch((e) => setErrors(e))
    }

    const handleToggle = () => {
        setNewCompany(!newCompany);
    }

    return (
        <>
            {isLoaded &&
                <div id='company_form__container'>
                    <div id='company_form'>
                        <h1 className='text-3xl font-bold py-4'>What Company is This Application For?</h1>
                        {companies.allIds.length > 0 &&
                            <div className='flex gap-1 items-center'>
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
                                <span> </span>
                                {!newCompany && <span className='required'>*</span>}
                                <span className='errors ml-1'> {!newCompany && errors.company}</span>
                            </div>
                        }
                        <div id='not_in_list'>
                            <h2 className='text-2xl font-bold py-4'>{companies.allIds.length > 0 ? 'Not in List ?' : 'Add a new company'}</h2>
                            {companies.allIds.length > 0 &&
                                <input
                                    type="checkbox"
                                    name="newCompany"
                                    id="new_company_checkbox"
                                    value={newCompany}
                                    onChange={handleToggle}
                                />
                            }
                        </div>
                        <div id='new_company_form'>
                            <div>
                                <label>Company Name: {newCompany && <span className='required'>*</span>}
                                    <span className='errors'>  {newCompany && errors.name}</span>
                                </label>
                                <input
                                    required
                                    disabled={!newCompany}
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Career Page Link <span className='errors'>{newCompany && errors.website}</span></label>
                                <input
                                    disabled={!newCompany}
                                    type="text"
                                    value={companyWebsite}
                                    onChange={(e) => setCompanyWebsite(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={newCompany ? handleNewCompanySubmit :
                                    handleExistingCompanySubmit}
                            >
                                Next
                            </button>
                        </div>
                    </div >
                </div >
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}