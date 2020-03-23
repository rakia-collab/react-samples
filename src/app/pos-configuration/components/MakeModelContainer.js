'use strict'
import React from 'react'
import { Row} from "react-bootstrap";
import  MakesContainer from '../make/components/makesContainer'
import  {makeModel}from '../Constantes/makes'
import {injectIntl} from 'react-intl';
import ToolbarMakeModel from "./ToolbarMakeModel";
import SearchMakeModelContainer from "./SearchMakeModelContainer";
import { NEWMAKEMODEL} from '../index'
import {hashHistory} from "react-router";
import  {showSearchMAkeBox, showMakeRemove, fetchMakes} from "../reducers/actions";
import {connect} from 'react-redux';
import {
    newAccessKeysSelector,
    AccessKeysContext,
    EMPTY_OBJECT,
    Form
} from 'cassiopae-core';
import {reduxForm,change, formValueSelector, getFormValues} from 'redux-form';

const FORM ='marqueForm'
class MakeModelContainer extends React.Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        const {fetchMakes} = this.props;
        fetchMakes();
    }

    handleShowSearch = (event) =>
    {
        const {showMakeRemove, showSearchMAkeBox} = this.props;
        showSearchMAkeBox(true);
        showMakeRemove(false);

    }


    handleShowRemove = (event) =>
    {
        const {showMakeRemove, showSearchMAkeBox} = this.props;
        showSearchMAkeBox(false);
        showMakeRemove(true);

    }


    handleShowAdd = (event) =>
    {

        hashHistory.push(NEWMAKEMODEL);
    }

    handleClose= () =>
    {
        const {fetchMakes, showSearchMAkeBox} = this.props;
        fetchMakes();
        showSearchMAkeBox(false);
    }


    render() {

        const {intl: {formatMessage},isMakeSearchLoade, form, id="makeModel", isMakesRemoveLoade, makesList, accessKeys} = this.props;

        return (

                <AccessKeysContext accessKeys={accessKeys} >
                    <Form  name={form} >
                <Row className="toolbar-make box-header">

                    <ToolbarMakeModel handleShowSearch={this.handleShowSearch}  handleShowAdd={this.handleShowAdd}  handleShowRemove={this.handleShowRemove}/>

                </Row>


                <Row xs={8} className="make-marge" >
                    { isMakeSearchLoade &&
                        <SearchMakeModelContainer handleClose={this.handleClose} />
                    }

                    {makesList && makesList.map((makeModel) => {
                        return <MakesContainer showRemove={isMakesRemoveLoade} make={makeModel}/>

                    })
                    }

                </Row>
            </Form>
           </AccessKeysContext>
        );
    }
}

const accessKeysSelector = newAccessKeysSelector();
const selector = formValueSelector(FORM);
const formValues = getFormValues(FORM);
const mapStateToProps = (state, props) => {
    const values = formValues(state) || EMPTY_OBJECT;
    const {pathname} = props;
    const {authentication} = state;

    const accessKeys = accessKeysSelector(pathname, authentication.accesskeys, EMPTY_OBJECT, authentication.showHiddenField);

    return {

        values,
        isMakeSearchLoade: state.makes.isMakeSearchLoade,
        isMakesRemoveLoade: state.makes.isMakesRemoveLoade,
        makesList: state.makes && state.makes.makes,
        accessKeys
    };
};

const mapDispatchToProps = {
    showSearchMAkeBox,
    showMakeRemove,
    fetchMakes
};
export default connect(mapStateToProps, mapDispatchToProps)  (injectIntl(MakeModelContainer));