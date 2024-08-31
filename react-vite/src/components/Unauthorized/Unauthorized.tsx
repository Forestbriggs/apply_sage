import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";

export default function Unauthorized() {
    return (
        <div id="unauthorized" className="flex flex-col justify-center items-center gap-4 py-8 px-4">
            <h1 className="text-4xl font-bold">Unauthorized</h1>
            <p className="text-xl">You are not authorized to access this page.</p>
            <p className="text-xl">Please <OpenModalButton
                buttonText={'Log In'}
                className={'bg-btn-main hover:bg-btn-main-hover'}
                modalComponent={<LoginFormModal />}
            /> to continue.</p>
        </div>
    )
}