import React from 'react';
import './styles.scss';

export default function BasePageLayout (props) {
    const { iconClass, viewName, children } = props;
    return (
        <div className={`${viewName}-view view`}>
            <div className="page-icon">
                <i className={iconClass}></i>
            </div> 
            {children}
        </div>
    );
}