import './App.css';
import React, { Component, Fragment } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '',
      day: '',
    };
  }

  renderTableData() {
    const { data } = this.props;
    return data.map((item, index) => {
      const { coin, price, dailyDiff, weeklyDiff, monthlyDiff, dailyVolume, dailyMktCap } = item;
      return (
        <tr key={item + '_' + index}>
          <td>{coin}</td>
          <td>${price}</td>
          <td
            style={{ color: dailyDiff < 0 ? "red" : "green" }}>
            {
              dailyDiff ?
                <Fragment>{dailyDiff} %</Fragment> :
                '/'
            }
          </td>
          <td
            style={{ color: weeklyDiff < 0 ? "red" : "green" }}>
            {
              weeklyDiff ?
                <Fragment>{weeklyDiff} %</Fragment> :
                '/'
            }
          </td>
          <td
            style={{ color: monthlyDiff < 0 ? "red" : "green" }}>
            {
              monthlyDiff ?
                <Fragment>{monthlyDiff} %</Fragment> : '/'
            }
          </td>
          <td>${dailyVolume}</td>
          <td>${dailyMktCap}</td>
        </tr>
      )
    })
  }

  handleMonth = (e) => {
    this.setState({
      month: e.target.value,
    })
  }

  handleDay = (e) => {
    this.setState({
      day: e.target.value,
    })
  }

  handleSubmit = (e) => {
    const { month, day } = this.state;
    e.preventDefault();
    this.props.submitForm([month, day]);
  }

  render() {
    const { month, day } = this.state;
    return (
      <div className="App">
        <h3 className='header'>Enter a date to retrive data</h3>
        <form onSubmit={this.handleSubmit} className='form'>
          <label>Month</label>
          <div className='month'>
            <label>
              <input
                type="radio"
                value="Oct"
                checked={month === "Oct"}
                onChange={this.handleMonth}
              />
              Oct
            </label>
            <label>
              <input
                type="radio"
                value="Nov"
                checked={month === "Nov"}
                onChange={this.handleMonth}
              />
              Nov
            </label>
            <label>
              <input
                type="radio"
                value="Dec"
                checked={month === "Dec"}
                onChange={this.handleMonth}
              />
              Dec
          </label>
          </div>
          <div className='day'>
            <label>Day</label>
            <input
              type='text'
              name='day'
              onChange={this.handleDay}
            />
            <input
              type='submit' disabled={(month === 'Nov' && (day > 30 || day < 1)) || (day > 31 || day < 1)}
            />
          </div>
        </form>
        {
          this.props.data && this.props.data.length !== 0 &&
          <table className='table'>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Price</th>
                <th>24h</th>
                <th>7d</th>
                <th>1m</th>
                <th>24h Volume</th>
                <th>Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
          </table>
        }
        {
          this.props.data && this.props.data.length === 0 &&
          <h3 style={{ "color": "red" }}>Lack of data</h3>
        }
        {
          !this.props.data &&
          <h3>Pick a date</h3>
        }
      </div>
    );
  }
}

export default App;