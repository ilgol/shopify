import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ShippingItem from './shippingItem/ShippingItem';
import * as ShippingsActions from './ShippingsActions';
import SpinnerGrid from '../spinner/SpinnerGrid';
import './Shippings.css';
import { parseAddress, canPerformAction } from '../../services/Helper';
import { withRouter } from 'react-router-dom';
import * as checkoutActions from '../../checkout/CheckoutActions';
import CustomButton from '../customButton/CustomButton';

class Shippings extends Component {
  componentDidMount() {
    const { shippingsActions, locationsReducer } = this.props;
    const { selectedId, locations } = locationsReducer;

    shippingsActions.getShippingsRequest(
      parseAddress(locations
        .find(item => item.id === selectedId)
        .ebox_location
      )
    );
  }

  checkout = (e) => {
    if(canPerformAction(e)) {
      const { shippingsReducer, locationsReducer, checkoutActions } = this.props;
      const { selectedId: selectedShippingId } = shippingsReducer || {};
      const { selectedId: selectedLocationId, locations } = locationsReducer;

      const location = locations
        .find(item => item.id === selectedLocationId)
        .ebox_location;

      checkoutActions.postCheckoutRequest(location, selectedShippingId);
    }
  };

  handleSelectShipping = (id) => {
    const { shippingsActions } = this.props;

    shippingsActions.selectShipping(id);
  };

  renderShippings = (selectedId, shippings) => shippings.map((item, key) => (
    <ShippingItem
      { ...item }
      key={ key }
      active={ item.code === selectedId }
      onClick={ this.handleSelectShipping }
    />
  ));

  render() {
    const { shippingsReducer, checkoutReducer } = this.props;
    const { selectedId, loading: shippingLoading, shippings } = shippingsReducer;
    const { loading: checkoutLoading, isRedirected } = checkoutReducer;
    const empty = !shippingLoading && !shippings.length;

    return (
      <div className={ classNames('shippings', { 'm-empty': empty }) }>
        { shippingLoading || !isRedirected
          ? (
            <SpinnerGrid isShow />
          ) : (
            <Fragment>
              { this.renderShippings(selectedId, shippings) }
              { empty &&
                <div>
                  Looks like there are no available shipping methods for your address.
                </div>
              }
              {
                <CustomButton
                  text='Checkout'
                  className="submit"
                  fontFamily="RobotoRegular"
                  width='auto'
                  height={ 50 }
                  disabled={ !selectedId || checkoutLoading }
                  clickHandler={ this.checkout }
                  onKeyDown={ this.checkout }
                  spinnerBtn={ checkoutLoading }
                />
              }
            </Fragment>
          )
        }
      </div>
    );
  }
}

Shippings.propTypes = {
  shippingsActions: PropTypes.object,
  shippingsReducer: PropTypes.object,
  locationsReducer: PropTypes.object,
  checkoutReducer: PropTypes.object.isRequired,
  checkoutActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    shippingsReducer: state.shippingsReducer,
    locationsReducer: state.locationsReducer,
    checkoutReducer: state.checkoutReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shippingsActions: bindActionCreators(ShippingsActions, dispatch),
    checkoutActions: bindActionCreators(checkoutActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Shippings));
