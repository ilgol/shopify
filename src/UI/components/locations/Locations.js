import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import LocationItem from './locationItem/LocationItem';
import * as LocationsActions from './LocationsActions';
import SpinnerGrid from '../spinner/SpinnerGrid';
import './Locations.css';
import { LOCATION_CREATE_URL } from './LocationsConstants';
import CustomButton from '../customButton/CustomButton';
import { canPerformAction } from '../../services/Helper';
import { withRouter } from 'react-router-dom';

class Locations extends Component {
  componentDidMount() {
    const { locationsActions } = this.props;

    locationsActions.getUserLocationsRequest();
    locationsActions.getCartItemsRequest();
  }

  handleSelectLocation = (id) => {
    const { locationsActions } = this.props;

    locationsActions.selectLocation(id);
  };

  shipping = (e) => {
    const { history } = this.props;

    if(canPerformAction(e))
      history.push('/checkout');
  };

  continueShopping = (e) => {
    if(canPerformAction(e))
      window.location.href = '/';
  };

  renderLocations = (selectedId, locations) => locations.map((item, key) => (
    <LocationItem
      { ...item }
      key={ key }
      active={ item.id === selectedId }
      onClick={ this.handleSelectLocation }
    />
  ));

  render() {
    const { locationsReducer } = this.props;
    const { selectedId, loading, locations, cartItemsCount } = locationsReducer;
    const empty = !loading && !locations.length;

    return (
      <div className={ classNames('ebox-locations', { 'm-empty': empty }) }>
        { loading
          ? (
            <SpinnerGrid isShow />
          ) : (
            <Fragment>
              { this.renderLocations(selectedId, locations) }
              { empty &&
                <div>
                  Looks like you have not created locations.
                  <br />
                  <a className='ebox-locations-link' href={ LOCATION_CREATE_URL }>
                    Please create at least one.
                  </a>
                </div>
              }
              {
                <div className='bottom-navigation'>
                  <CustomButton
                    text='Continue shopping'
                    className="submit"
                    fontFamily="RobotoRegular"
                    width='45%'
                    height={ 50 }
                    clickHandler={ this.continueShopping }
                    onKeyDown={ this.continueShopping }
                  />
                  <CustomButton
                    text='Proceed to shipping method'
                    className="submit"
                    fontFamily="RobotoRegular"
                    width='45%'
                    height={ 50 }
                    disabled={ !selectedId || !cartItemsCount }
                    clickHandler={ this.shipping }
                    onKeyDown={ this.shipping }
                  />
                </div>
              }
            </Fragment>
          )
        }
      </div>
    );
  }
}

Locations.propTypes = {
  history: PropTypes.object,
  locationsActions: PropTypes.object,
  locationsReducer: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    locationsReducer: state.locationsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    locationsActions: bindActionCreators(LocationsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Locations));
