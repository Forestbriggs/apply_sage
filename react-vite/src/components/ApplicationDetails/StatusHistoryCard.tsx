import formatDate from '../../utils/formatDate';

export default function StatusHistoryCard({ status, date }: { status: string, date: Date }) {
    return (
        <div className='flex border rounded justify-between items-center gap-2 p-2'>
            <p>{status}:</p>
            <p>{formatDate(date)}</p>
        </div>
    )
}