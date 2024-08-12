import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import ApplicationForm from "./ApplicationForm";

export default function NewApplicationForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [jobCategory, setJobCategory] = useState('');
    const [salaryMin, setSalaryMin] = useState('');
    const [salaryMax, setSalaryMax] = useState('');
    const [appliedDate, setAppliedDate] = useState('');
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchCategories = async () => {
        const response = await fetch('/api/categories')
        const data = await response.json();
        setCategories(data);
    }

    useEffect(() => {
        fetchCategories();
    }, [])

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
                    setSalaryMax={setSalaryMax}
                    salaryMin={salaryMin}
                    setSalaryMin={setSalaryMin}
                    appliedDate={appliedDate}
                    setAppliedDate={setAppliedDate}
                    categories={categories}
                    errors={errors}
                />
            </form>
        </div>
    )
}