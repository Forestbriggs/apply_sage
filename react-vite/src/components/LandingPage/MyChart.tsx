import { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MyChart = ({ data, options }: { data: any; options: any }) => {
    useEffect(() => {
        // Cleanup on component unmount to prevent canvas issues
        return () => {
            ChartJS.getChart('myChartId')?.destroy(); // Destroy the chart instance if it exists
        };
    }, []);

    return <Bar id="myChartId" data={data} options={options} />;
};

export default MyChart;
