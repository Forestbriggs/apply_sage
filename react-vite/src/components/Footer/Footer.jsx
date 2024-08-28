export default function Footer() {
    return (
        <div className='h-[100px] flex items-center justify-between px-[35px]'>
            <div>
                <p>© 2024 ApplySage</p>
            </div>
            <div className='flex gap-[20px]'>
                <a
                    target='_blank'
                    rel='noreferrer noopener'
                    href='https://www.linkedin.com/in/forest-briggs'
                >
                    LinkedIn
                </a >
                <a
                    target='_blank'
                    rel='noreferrer noopener'
                    href='https://github.com/Forestbriggs/apply_sage'
                >
                    GitHub
                </a >
            </div>
        </div>
    )
}