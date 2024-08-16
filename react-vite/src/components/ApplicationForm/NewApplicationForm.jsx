import { isFuture, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { formatSalary, cleanSalaryFormat } from '../../utils/formatSalary';
import { thunkCreateApplication } from '../../redux/applications';
import ApplicationForm from "./ApplicationForm";

export default function NewApplicationForm() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { companyId } = useParams();
    const [title, setTitle] = useState('');
    const [jobCategory, setJobCategory] = useState('');
    const [salaryMin, setSalaryMin] = useState('');
    const [salaryMax, setSalaryMax] = useState('');
    const [appliedDate, setAppliedDate] = useState('');
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const response = await fetch('/api/categories')
        const data = await response.json();
        setCategories(data);
    }

    const verifyCompanyOwnership = useCallback(async () => {
        const response = await fetch(`/api/companies/${companyId}`);
        const company = await response.json();
        if (company.errors) {
            return navigate('/error-page')
        }
        if (company.user.id !== sessionUser?.id) {
            return navigate('/')
        }
    }, [companyId, sessionUser, navigate])

    useEffect(() => {
        if (!sessionUser) {
            return navigate('/');
        }
        if (!Number.isInteger(Number(companyId))) {
            return navigate('error-page')
        }
        verifyCompanyOwnership();
        fetchCategories();
    }, [navigate, sessionUser, verifyCompanyOwnership, companyId])

    const handleMinSalaryChange = (e) => {
        const formattedVal = formatSalary(e);
        if (formattedVal === '0') {
            setSalaryMin('');
            return;
        }
        setSalaryMin('$' + formattedVal);
    }

    const handleMaxSalaryChange = (e) => {
        const formattedVal = formatSalary(e);
        if (formattedVal === '0') {
            setSalaryMax('');
            return;
        }
        setSalaryMax('$' + formattedVal);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const [y, m, d] = appliedDate.split('-');
        const applied_date = new Date(y, parseInt(m, 10) - 1, d);
        setErrors({});
        const newErrors = {};
        if (title.length <= 0) newErrors.title = 'Title is required';
        if (title.length > 100) newErrors.title = 'Title must be 100 characters or less';
        if (!jobCategory) newErrors.job_category = 'Job category is required'
        if (salaryMin.length !== 0 && Number(salaryMin) <= 0) newErrors.salary_min = 'Minimum salary must be greater than 0';
        if (salaryMax.length !== 0 && Number(salaryMax) <= 0) newErrors.salary_max = 'Maximum salary must be greater than 0';
        if (isFuture(applied_date)) newErrors.applied_date = 'Applied date can not be in the future'


        if (Object.values(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        const payload = { title, company: companyId };
        if (jobCategory !== 'other') payload.job_category = jobCategory
        if (salaryMin) payload.salary_min = Number(cleanSalaryFormat(salaryMin));
        if (salaryMax) payload.salary_max = Number(cleanSalaryFormat(salaryMax));
        if (appliedDate) payload.applied_date = format(applied_date, 'M/d/yyyy');

        return dispatch(thunkCreateApplication(payload)).then((data) => {
            return navigate(`/applications/${data}`)
        }).catch((e) => setErrors(e))
    }

    return (
        <div id="app_form__container">
            <h1>Add a New Job Application</h1>
            <form>
                <ApplicationForm
                    title={title}
                    setTitle={setTitle}
                    jobCategory={jobCategory}
                    setJobCategory={setJobCategory}
                    salaryMax={salaryMax}
                    salaryMin={salaryMin}
                    appliedDate={appliedDate}
                    setAppliedDate={setAppliedDate}
                    categories={categories}
                    errors={errors}
                    handleMinSalaryChange={handleMinSalaryChange}
                    handleMaxSalaryChange={handleMaxSalaryChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}