import ApplicationCard from './ApplicationCard';
import './ApplicationList.css';




export default function ApplicationList() {

    const data = [
        {
            "applied_date": "Tue, 06 Nov 2024 20:12:23 GMT",
            "category": {
                "id": 1,
                "name": "Frontend Engineer"
            },
            "company": {
                "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "id": 1,
                "name": "Apple",
                "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "website": "https://www.apple.com/careers/us/"
            },
            "cover_letter_id": null,
            "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
            "id": 1,
            "resume_id": null,
            "salary_max": "250000.00",
            "salary_min": "135000.00",
            "status": {
                "id": 1,
                "name": "Applied"
            },
            "title": "Senior Software Engineer",
            "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT"
        },
        {
            "applied_date": "Tue, 06 Aug 2024 20:12:23 GMT",
            "category": {
                "id": 2,
                "name": "Backend Engineer"
            },
            "company": {
                "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "id": 2,
                "name": "Google",
                "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "website": "https://www.google.com/about/careers/applications/"
            },
            "cover_letter_id": null,
            "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
            "id": 2,
            "resume_id": null,
            "salary_max": "280000.00",
            "salary_min": "150000.00",
            "status": {
                "id": 2,
                "name": "Interviewed"
            },
            "title": "Staff Software Engineer",
            "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT"
        },
        {
            "applied_date": "Tue, 06 Aug 2024 20:12:23 GMT",
            "category": {
                "id": 3,
                "name": "Full Stack Engineer"
            },
            "company": {
                "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "id": 4,
                "name": "Netflix",
                "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "website": "https://netflix.eightfold.ai/careers"
            },
            "cover_letter_id": null,
            "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
            "id": 3,
            "resume_id": null,
            "salary_max": "260000.00",
            "salary_min": "140000.00",
            "status": {
                "id": 3,
                "name": "Offer Received"
            },
            "title": "Senior Full Stack Engineer",
            "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT"
        },
        {
            "applied_date": "Tue, 06 Aug 2024 20:12:23 GMT",
            "category": {
                "id": 5,
                "name": "DevOps Engineer"
            },
            "company": {
                "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "id": 3,
                "name": "Amazon",
                "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "website": "https://www.amazon.jobs/en/landing_pages/tech-roles"
            },
            "cover_letter_id": null,
            "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
            "id": 4,
            "resume_id": null,
            "salary_max": "240000.00",
            "salary_min": "130000.00",
            "status": {
                "id": 4,
                "name": "Accepted"
            },
            "title": "Senior DevOps Engineer",
            "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT"
        },
        {
            "applied_date": "Tue, 06 Aug 2024 20:12:23 GMT",
            "category": {
                "id": 6,
                "name": "Cloud Engineer"
            },
            "company": {
                "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "id": 2,
                "name": "Google",
                "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "website": "https://www.google.com/about/careers/applications/"
            },
            "cover_letter_id": null,
            "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
            "id": 5,
            "resume_id": null,
            "salary_max": "290000.00",
            "salary_min": "160000.00",
            "status": {
                "id": 5,
                "name": "Rejected"
            },
            "title": "Senior Cloud Engineer",
            "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT"
        },
        {
            "applied_date": "Tue, 06 Aug 2024 20:12:23 GMT",
            "category": {
                "id": 4,
                "name": "Mobile Engineer"
            },
            "company": {
                "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "id": 4,
                "name": "Netflix",
                "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT",
                "website": "https://netflix.eightfold.ai/careers"
            },
            "cover_letter_id": null,
            "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
            "id": 6,
            "resume_id": null,
            "salary_max": "275000.00",
            "salary_min": "150000.00",
            "status": {
                "id": 6,
                "name": "Withdrawn"
            },
            "title": "Senior Mobile Engineer",
            "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT"
        }
    ]

    return (
        <div id='application_list'>
            <div id='application_list__container'>
                <h1>Your Applications</h1>
                <div id='applications__container'>
                    {data.map((application) => {
                        return ApplicationCard(application)
                    })}
                </div>
                <div id='pagination'>
                    {/* TODO update when pagination is added */}
                    <p>Showing {data.length} of {data.length}</p>
                </div>
            </div>
        </div>
    )
}