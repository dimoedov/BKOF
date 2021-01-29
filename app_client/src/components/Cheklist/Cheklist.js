import React, {Component} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf-with-html2canvas';
import {Image} from "react-bootstrap";
import './pdf.css'


class Cheklist extends Component{
    constructor(props) {
        super(props);
        this.state= {
            id_new_fix: localStorage.getItem('fix_id'),
            client: '',
            object: '',
            products: [],
            columns: [
                {
                    dataField: '_id',
                    isKey: true,
                    hidden: true
                },
            ]
        }
    }
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("download.pdf");
                localStorage.removeItem('fix_id');
                // window.location.assign('http://localhost:3000/my-fix/');
            })
        ;
    }

    handleRedirect() {
        localStorage.removeItem('fix_id');
        // window.location.assign('http://localhost:3000/my-fix/');
    }
    componentDidMount() {
        // if (this.state.id_new_fix === null){
        //     window.location.assign('http://localhost:3000/');
        // }
        let formBody = [];
        for (let prop in this.state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(this.state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('/api/check', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({products: data}));
        fetch('/api/check/names', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => {
                this.setState({object: data[0]})
            })

    };

    render() {
        return (
            <div>
                <div className="mb5">
                    <button onClick={this.printDocument} className='btn-outline-primary'>Сохранить акт</button>
                    <button onClick={this.handleRedirect} className='btn-outline-danger'>Не сохранять акт</button>
                </div>
                <div id="divToPrint" className="mt4">
                    <table className={'own_table'}>
                        <tr>
                            <td className={'td_left'}>
                                <p>
                                    «BKOF » Ltd.
                                </p>
                                <p>
                                    Nizhniy Novgorod,
                                </p>
                                <p>
                                    Rozhdestvenskaya street 16,6
                                </p>
                                <p>
                                    Phone: +7 (831) 435 13 06
                                </p>
                                <p>
                                    e-mail: ooobkof@gmail.com
                                </p>
                            </td>
                            <td className={'td_logo'}>
                                <Image src='/images/Auth/Auth_err.jpg' width='100' rounded/>
                            </td>
                            <td className={'td_right'}>
                                <p>
                                    ООО «БКОФ»
                                </p>
                                <p>
                                    603001 г. Нижний Новгород, ул.
                                </p>
                                <p>
                                    603001 г. Нижний Новгород, ул.
                                </p>
                                <p>
                                    Тел. +7 (831) 435 13 06
                                </p>
                                <p>
                                    e-mail: ooobkof@gmail.com
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td className={'td_mid_photo'}>
                                <p>s</p>
                                <p>s</p>
                                <p>s</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default Cheklist;

