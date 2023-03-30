import React from 'react'
import NoResultWithText from '../../assets/img/no_result_with_text.svg'
import './index.css'
const NoResultFound = () => {
    return (
        <div className="no_result">
            <img src={NoResultWithText} alt="" />
        </div>
    )
}

export default NoResultFound