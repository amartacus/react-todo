import React from 'react';
import { connect } from 'react-redux';
import setVisibilityFilter from './actions';
import Link from '../../components/Link';

const mapStateToProps = (state, ownProps) => {
  return {
      active: ownProps.filter === state.visibilityFilter
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      onClick: () => {
          dispatch(setVisibilityFilter(ownProps.filter));
      }
  };
};
const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

const Footer = () => (
  <p>
  {' '}
  <FilterLink 
      filter="SHOW_ALL">
      All
  </FilterLink>
  {' '}
  <FilterLink 
      filter="SHOW_ACTIVE">
      Active
  </FilterLink>
  {' '}
  <FilterLink 
      filter="SHOW_COMPLETED">
      Completed
  </FilterLink>
  {' '}
</p>
);

export default Footer;