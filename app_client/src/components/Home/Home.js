import React , {Component} from 'react';
import './Home.css';
class Main extends Component{

    render(){
        return(
            <div>
                <h1 className='upper_text'>
                    <div className="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                        О нас
                    </div>
                </h1>
                <div className='content'>
                я не придумал что тут будет
                </div>
            </div>
        );
    }

}
export default Main;
