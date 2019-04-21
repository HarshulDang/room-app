import React from 'react';
import Plus from '../icons/plus.svg';
import Minus from '../icons/minus.svg';
import './button.css';

class NumberButton extends React.PureComponent {

    render() {
        const { disabledPlus, disabledMinus, max, value, handleClick, min } = this.props;
        return(
            <div className="d-flex align-items-center">
                <button 
                    onClick={(e) => handleClick(false, max, min)} 
                    disabled={disabledMinus}
                >
                    <img alt="-" src={Minus}/>
                </button>
                <span className="px-2">{value}</span>
                <button 
                    onClick={(e) => handleClick(true, max, min)} 
                    disabled={disabledPlus}
                >
                    <img alt="+" src={Plus}/>
                </button>
            </div>
        );
    }
}

export default NumberButton;