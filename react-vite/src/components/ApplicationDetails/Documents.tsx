import handleFutureFeatureClick from '../../utils/handleFutureFeatureClick';
import { FaRegFile, FaRegFileAlt } from 'react-icons/fa';
export default function Documents() {
    return (
        <div className='gap-2 px-4 justify-between h-full
            '
        >
            {/* Documents */}

            <h2 className='text-2xl font-bold py-2'>Documents:</h2>
            <div id='resume_cv'>

                {/* Resume */}
                <div>
                    <h3>Resume:</h3>
                    <div>
                        <FaRegFile fontSize={80} />
                    </div>
                    <div className='resume_cv_buttons'>
                        {/* TODO View button */}
                        <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                        <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                    </div>
                </div>
                <div>
                    <h3>Cover Letter:</h3>
                    <div>
                        <FaRegFileAlt fontSize={80} />
                    </div>
                    <div className='resume_cv_buttons'>
                        {/* TODO view button */}
                        <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                        <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}