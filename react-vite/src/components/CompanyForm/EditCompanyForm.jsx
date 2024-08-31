import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkEditCompany, thunkGetCompanyById } from "../../redux/companies";
import LoadingPage from "../LoadingPage";

export default function EditCompanyForm() {
    const { companyId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!sessionUser) {
            return navigate('/unauthorized');
        }
        if (!isLoaded) {
            dispatch(thunkGetCompanyById(companyId)).then((company) => {
                if (company.user.id !== sessionUser.id) {
                    return navigate('/unauthorized');
                }
                setCompanyName(company.name);
                if (company.website) setCompanyWebsite(company.website);
                setIsLoaded(true)
            })
        }
    })

    const handleClick = (e) => {
        e.preventDefault();
        setErrors({});
        const newErrors = {};
        if (companyName.length === 0) newErrors.name = 'Company name is required';

        if (Object.values(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        const payload = { name: companyName };
        if (companyWebsite.length) payload.website = companyWebsite;

        return dispatch(thunkEditCompany(companyId, payload)).then(() => {
            return navigate('/companies');
        }).catch((e) => setErrors(e))
    }

    return (
        <>
            {isLoaded &&
                <div id="company_form__container">
                    <h1 id="edit_company_title" className="text-3xl font-bold">Edit Company</h1>
                    <form id="new_company_form" className="company_edit_form">
                        <label>Company Name: {<span className='required'>*</span>}
                            <span className='errors'>  {errors.name}</span>
                        </label>
                        <input
                            required
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <label>Career Page Link <span className='errors'>{errors.website}</span></label>
                        <input
                            type="text"
                            value={companyWebsite}
                            onChange={(e) => setCompanyWebsite(e.target.value)}
                        />
                        <button onClick={handleClick}>Submit</button>
                    </form>
                </div>
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}