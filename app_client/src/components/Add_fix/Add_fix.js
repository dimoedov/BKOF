import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Select from 'react-select';
const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};
const d = new Date();
const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

class Add_fix extends Component{
    constructor(props) {
        super(props);
        this.state= {
            service: '',
            object: '',
            srv_spec: '',
            dateStart: `${ye}-${mo}-${da}`,
            print: '',
            port_obs: '',
            text_body: '',
            time: '',
            equiment: '',
            serial_nomber: '',
            materials_name: '',
            materials_units: '',
            materials_qty: '',
            objects_list: null,
            srv_spec_list: null,
            selectedOption_objects: null,
            selectedOption_srv_spec: null,
            serverOtvet: ''
        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };
    handleChange_objects = selectedOption_objects => {
        this.setState({ selectedOption_objects });
        let formBody=[];
        for (let prop in selectedOption_objects){
            if (prop === 'value')
                formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_objects[prop]));
        }
        formBody = formBody.join("&");
        fetch('/api/objects/list', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({object: data}))
            .catch(err => console.log("err: =" + err));
    };
    handleChange_srv_spec = selectedOption_srv_spec => {
        this.setState({ selectedOption_srv_spec });
        let formBody=[];
        for (let prop in selectedOption_srv_spec){
            formBody.push(encodeURIComponent('FI'+prop)+ "=" +encodeURIComponent(selectedOption_srv_spec[prop]['value']));
        }
        formBody = formBody.join("&");
        fetch('/api/srv_spec/list', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({srv_spec: data}))
            .catch(err => console.log("err: =" + err));
    };
    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
    };
    handleSubmit = (e) =>{
        this.handleChange_srv_spec();
        e.preventDefault();
        let formBody = [];
        for (let prop in this.state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(this.state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log(formBody);
        fetch('/api/fix', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({serverOtvet: data}))
            .catch(err => console.log("err: =" + err));
    };
    render() {
        const { selectedOption_objects } = this.state;
        const { selectedOption_srv_spec } = this.state;
        if (this.state.objects_list === null){
            fetch('/api/objects/list').then(res => res.json())
                .then(data => this.setState({objects_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        if (this.state.srv_spec_list === null){
            fetch('/api/srv_spec/list').then(res => res.json())
                .then(data => this.setState({srv_spec_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        if (get_cookie('Authorized') === null){
            return <Redirect to="/" />;
        }else
        if (this.state.serverOtvet.success){
            localStorage.setItem('fix_id',this.state.serverOtvet._id);
            return (<Redirect to="/get-check"/>);
        }else {
            return (
                <div>
                    <div>
                        <h1  className='text-center text-dark'>Добавление услуги</h1>
                    </div>
                    <div>
                        <form id='divToPrint' className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group input-group`}>
                                <label htmlFor="object" className='col-sm-3'>Объект обслуживания </label>
                                   <Select
                                        className='col-sm-8'
                                        placeholder="Выберите объект"
                                        value={selectedOption_objects}
                                        onChange={this.handleChange_objects}
                                        options={this.state.objects_list}
                                    />
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="srv_spec" className='col-sm-3'>Сервисные специалисты </label>
                                   <Select
                                        isMulti
                                        className='col-sm-8'
                                        placeholder="Сервисный специалист"
                                        value={selectedOption_srv_spec}
                                        onChange={this.handleChange_srv_spec}
                                        options={this.state.srv_spec_list}
                                    />
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="dateStart" className='col-sm-3'>Дата</label>
                                <input type="date" required className="form-control col-sm-8" name="dateStart"
                                       value={this.state.dateStart}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="print" className='col-sm-3'>Номер печати</label>
                                <input type="number" className="form-control col-sm-8" name="print"
                                       placeholder="Номер печати"
                                       value={this.state.print}
                                       onChange={this.handleUserInput}/>
                            </div><div className={`form-group input-group`}>
                                <label htmlFor="port_obs" className='col-sm-3'>Порт обслуживания</label>
                                <input type="text" className="form-control col-sm-8" name="port_obs"
                                       placeholder="Порт обслуживания"
                                       value={this.state.port_obs}
                                       onChange={this.handleUserInput}/>
                            </div><div className={`form-group input-group`}>
                                <label htmlFor="text_body" className='col-sm-3'>Тело акта</label>
                                <textarea className="form-control col-sm-8" name="text_body"
                                       placeholder="Тело акта"
                                       value={this.state.text_body}
                                       onChange={this.handleUserInput}/>
                            </div><div className={`form-group input-group`}>
                                <label htmlFor="time" className='col-sm-3'>Потраченнное время</label>
                                <input type="time" className="form-control col-sm-8" name="time"
                                       placeholder="Потраченнное время"
                                       value={this.state.time}
                                       onChange={this.handleUserInput}/>
                            </div><div className={`form-group input-group`}>
                                <label htmlFor="equiment" className='col-sm-3'>equiment</label>
                                <textarea  className="form-control col-sm-8" name="equiment"
                                       placeholder="Оборудование"
                                       value={this.state.equiment}
                                       onChange={this.handleUserInput}/>
                            </div><div className={`form-group input-group`}>
                                <label htmlFor="materials" className='col-sm-3'>Использованные материалы</label>
                                <textarea  className="form-control col-sm-8" name="materials"
                                       placeholder="Использованные материалы"
                                       value={this.state.materials}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <input type="submit" className="btn btn-primary btn-dark" onSubmit={this.handleSubmit}
                                   value='Отправить'/>
                        </form>
                    </div>
                </div>

            );
        }
    }

}
export default Add_fix;
