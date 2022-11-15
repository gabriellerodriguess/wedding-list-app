import './styles.css'

export default function Loading(props) {
    return (
        <>
        {props.type === 'mosaic' &&
            <section className='loading_home'>
                <div className='content_loading'>
                    <div className='loading_md'>
                    </div>
                    <div className='loading_sm'>
                    </div>

                </div>
                <div className='content_loading'>
                    <div className='loading_sm'>
                    </div>
                    <div className='loading_md'>
                    </div>
                </div>
            </section>
        }
        {props.type === 'category' &&
            <section className='loading_category'>
                <div className='loading_lg'>
                </div>
                <div className='loading_list'>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
            </section>
        }
        </>
    )
}
