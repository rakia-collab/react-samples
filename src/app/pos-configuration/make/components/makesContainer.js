'use strict'
import React from 'react'
import {Row, Col, OverlayTrigger,} from "react-bootstrap";
import {MAKE} from '../../index'
import {logos} from '../../Constantes/SelectFields'
import {hashHistory} from "react-router";


class MakesContainer extends React.Component {

    constructor(props) {
        super(props);

    }


    handleSelectMake = (event) => {
        let {make,showRemove, fetchFullMake} = this.props;
        if(!showRemove) {
            if ( make.makeGeneralData.brandRef &&  make.makeGeneralData&&  make.makeGeneralData.brandRef) {

                hashHistory.push(MAKE + '/' +  make.makeGeneralData.brandRef);
            }
        }
    }

    render() {

        let {make,showRemove} = this.props;
        let path='src/www/img/make/DACIA.png';
        if(make && make.makeGeneralData && make.makeGeneralData.brandRef) {
            logos.map(logo => {
                if (logo.code === make.makeGeneralData.brandRef) {
                    path =  logo.path;
                }
            })
        }

        return (


            <Col  className='make' xs={12} sm={8} md={4} lg={2}  key={'make' + make.makeGeneralData.brandRef}   >
                <a onClick={this.handleSelectMake} >

                    <header  className='mainLayout-header'>
                        <Row  className='navbar'>

                            <Col xs={5}  >

                                <img src={path}/>

                            </Col>
                            <Col xs={5} className='text-gray text-bold' >
                                {make.makeGeneralData.brandRef }

                            </Col>

                        </Row>

                    </header>

                    <div className='make-content text-black'>
                        <Row >
                            {showRemove && <button type="button" className="btn-primary btn-box-tool  pull-right" >
                                <i className="fa fa-remove"></i>
                            </button>
                            }
                            <Col className='make-content'>
                                <img src={"src/www/img/make/network.png"} />
                                 Network:
                                {make.makeOtherData.oemClassification }
                            </Col>
                        </Row>
                        <Row >
                            <Col className='make-content'>
                                <img src={"src/www/img/make/AssetTypes.png"} />
                                Asset type:
                                {make.makeOtherData.variantClassification }
                            </Col>
                        </Row>
                        <Row>
                            <Col className='make-content'>
                                <img src={"src/www/img/make/concession.png"} />
                               Concession:
                                {make.makeOtherData.dealer }
                            </Col>
                        </Row>

                    </div>
                    <div className='border text-black text-bold'>
                        <img src={"src/www/img/make/modules.png"} />   {make.makeGeneralData.modelsCount } Models attached
                    </div>

                </a>
            </Col>

        );
    }

}

export default (MakesContainer);