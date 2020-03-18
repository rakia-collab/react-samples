import React from 'react';

class SkinItem extends React.Component {

    render(){
        let {name, skinClass, onClick} = this.props;

        return (
            <li className={`${skinClass} skin-item`} onClick={() => onClick(skinClass)}>
                <div>
                    <div>
                        <div className='bg-logo'/>
                        <div className='bg-navbar'/>
                    </div>
                    <div>
                        <div className='bg-sidebar'/>
                        <div className='bg-content'/>
                    </div>
                </div>
                <p className='text-center no-margin' style={{fontSize: '12px'}}>{name}</p>
            </li>
        );
    }
}

export default SkinItem;