'use strict'
import React from 'react'
import {Row, Col, OverlayTrigger,} from "react-bootstrap";
import {MAKE} from '../../index'
import {hashHistory} from "react-router";


class MakesContainer extends React.Component {

    constructor(props) {
        super(props);

    }


    handleSelectMake = (event) => {
        let {make,showRemove} = this.props;
        if(!showRemove) {
            if ( make.makegeneraldata.brandref &&  make.makegeneraldata&&  make.makegeneraldata.brandref) {
                hashHistory.push(MAKE + '/' +  make.makegeneraldata.brandref);
            }
        }
    }

    render() {

        let {make,showRemove} = this.props;

        return (


            <Col xs={10} sm={4} md={3} lg={2} key={'make' + make.makegeneraldata.brandref}   >
                <a onClick={this.handleSelectMake} >
                    <div className='thumbnail'>
                        <header className='mainLayout-header'>
                            <Row className='navbar navbar-static-top'>

                            <Col xs={5}  >

                                <img src={"src/www/img/make/bmw.png"}/>

                            </Col>
                            <Col xs={5} className='text-gray text-bold' >
                             {make.makegeneraldata.brandref }

                           </Col>

                            </Row>

                          </header>

                        <div className='box-body text-black'>
                                <Row >
                                    {showRemove && <button type="button" className="btn-primary btn-box-tool  pull-right" >
                                        <i className="fa fa-remove"></i>
                                    </button>
                                    }
                                    <Col>
                                        <label>Make: </label>
                                    {make.makegeneraldata.brandref }
                                    </Col>
                                </Row>
                                <Row >
                                    <Col>
                                        <label>Country: </label>
                                    {make.makegeneraldata.countrycode }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Code: </label>
                                    {make.makegeneraldata.currencycode }
                                    </Col>
                                </Row>

                        </div>
                        <div className='box-footer'>

                        </div>

                    </div>
                </a>
            </Col>

        );
    }

}

export default (MakesContainer);