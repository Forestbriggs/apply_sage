export default function Footer() {
    return (
        <div
            className='
            h-16 flex items-center justify-between px-[35px]
            sm:h-[96px]
            '
        >
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