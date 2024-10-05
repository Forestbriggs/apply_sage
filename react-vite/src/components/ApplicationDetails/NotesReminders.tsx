import handleFutureFeatureClick from '../../utils/handleFutureFeatureClick';

export default function NotesReminders() {
    return (
        <div className='flex flex-col gap-2 px-4 justify-between h-full
                md:flex-row
            '
        >
            {/* Reminders */}
            < div className='md:w-1/2' >
                <h2 className='text-2xl font-bold py-2'>Reminders:</h2>
                <div id='app_reminders'>
                    <h3>Feature coming soon...</h3>
                    <h4>Example below (Not actual data)</h4>
                    <div id='reminder__container'>
                        <div className='reminder_card'>
                            <div><p>10:00 am 11/10/24</p> <p>Negotiation</p></div>
                            {/* TODO OpenModalButton for details modal */}
                            <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                            <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                        </div>
                        <div className='reminder_card'>
                            <div><p>10:00 am 11/10/24</p> <p>Negotiation</p></div>
                            {/* TODO OpenModalButton for details modal */}
                            <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                            <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                        </div>
                    </div>
                </div>
            </div >

            {/* Notes */}
            <div className='md:w-1/2'>
                <h2 className='text-2xl font-bold py-2'>Notes:</h2>
                <div id='app_notes'>
                    <h3>Feature coming soon...</h3>
                    <h4>Example below</h4>
                    <div className='note_card__container'>
                        <div>
                            <div className='note_card'>
                                <p>Note about job application</p>
                            </div>
                            <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                            <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                        </div>
                        <div>
                            <div className='note_card'>
                                <p>Note about job application</p>
                            </div>
                            <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                            <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}