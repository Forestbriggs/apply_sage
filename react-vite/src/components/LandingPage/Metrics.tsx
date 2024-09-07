import axios from "axios"
import { JSX, useEffect, useState } from "react";
import MyChart from "./MyChart";
import { toast } from "react-toastify";

interface analyticsData {
    apps_per_company: Record<number, number>;
    apps_by_status: Record<number, number>;
    avg_salary_min: number;
    avg_salary_max: number;
}

export default function Metrics(): JSX.Element {
    const [analyticsData, setAnalyticsData] = useState<analyticsData>({
        apps_per_company: {},
        apps_by_status: {},
        avg_salary_min: 0,
        avg_salary_max: 0
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get('/api/applications/dashboard/analytics');
                const data = response.data;
                setAnalyticsData(data);
            } catch (error) {
                setIsError(true);
                toast.error('There was an error fetching the analytics');
            } finally {
                setIsLoaded(true);
            }
        }

        fetchMetrics();
    }, [])

    if (!isLoaded) {
        return <div>Loading Analytics...</div>
    }

    if (isError) {
        return <div>There was an error fetching the analytics</div>
    }

    let company_data;
    let company_options;
    let status_data;
    let status_options;

    if (analyticsData.apps_per_company) {
        company_data = {
            labels: Object.keys(analyticsData.apps_per_company),
            datasets: [
                {
                    label: 'Applications',
                    data: Object.values(analyticsData.apps_per_company),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                    ],
                },
            ],
        };

        company_options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: 'Applications Per Company',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Company',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Applications',
                    },
                },
            },
        };
    }

    if (analyticsData.apps_by_status) {
        status_data = {
            labels: Object.keys(analyticsData.apps_by_status),
            datasets: [
                {
                    label: 'Applications',
                    data: Object.values(analyticsData.apps_by_status),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                    ],
                },
            ],
        };

        status_options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: 'Applications By Status',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Status',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Applications',
                    },
                },
            },
        };
    }

    return (
        <div className="flex flex-col xl:flex-row">
            <div className="w-full xl:w-1/2">
                <h2>Applications Per Company</h2>
                <MyChart data={company_data} options={company_options} />
            </div>
            <div className="w-full xl:w-1/2">
                <h2>Applications By Status</h2>
                <MyChart data={status_data} options={status_options} />
            </div>
        </div>
    )
}
