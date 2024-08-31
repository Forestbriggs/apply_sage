export default function determineStatusClass(status: string):string {
    switch (status) {
        case 'Applied':
            return 'applied'
        case 'Interviewed':
            return 'interviewed'
        case 'Offer Received':
            return 'offer'
        case 'Accepted':
            return 'accepted'
        case 'Rejected':
            return 'rejected'
        case 'Withdrawn':
            return 'withdrawn'
        default:
            return 'applied'
    }
}