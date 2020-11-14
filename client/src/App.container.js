import { connect } from 'react-redux';
import { requestApiData, submitForm } from './actions';
import App from './App';

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = {
  requestApiData: requestApiData.create,
  submitForm: submitForm.create,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);