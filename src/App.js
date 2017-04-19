import React, { Component } from 'react';
import './App.css';

class StaticInfo extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.num}) </td>
        <td>{this.props.info.name}</td>
        <td>{this.props.info.email}</td>
        <td>{this.props.info.phone}</td>
        <td>
          <button onClick={() => this.props.remove(this.props.info.id)}>X</button>
          <button onClick={this.props.toggleIsEditing}>edit</button>
        </td>
      </tr>
    )
  }
}

class EditableInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: this.props.info.name || '',
      email: this.props.info.email || '',
      phone: this.props.info.phone || '',
    }
  }

  handleChange (field, value) {
    this.setState({
      [field]: value
    });
  }

  restoreAndUpdate() {
    if (this.validEntry(this.state)) {
      this.props.updateAndClose(this.state);
      this.setState({
        name: this.props.info.name || '',
        email: this.props.info.email || '',
        phone: this.props.info.phone || '',
      });
    } else {
        alert('I don\'t think so');
    }
  }

  validEntry(data) {
    if (!data.name || !data.email || !data.phone) return false;
    if (data.name.length < 2) return false;
    if (!data.email.includes('@') || !data.email.includes('.')) return false;
    if ((data.phone.match(/\d/g) || []).length !== 10 || /[A-z]/.test(data.phone)) return false;
    return true;
  }

  render () {
    return (
      <tr>
        <td>{this.props.num ? this.props.num + ') ' : ''} </td>
        <td><input type="text" value={this.state.name} onChange={(e) => this.handleChange('name', e.target.value)} placeholder="name"/></td>
        <td><input type="email" value={this.state.email} onChange={(e) => this.handleChange('email', e.target.value)} placeholder="email"/></td>
        <td><input type="tel" value={this.state.phone} onChange={(e) => this.handleChange('phone', e.target.value)} placeholder="phone"/></td>
        <td>
          <button onClick={this.restoreAndUpdate.bind(this)}>{this.props.info.id ? 'update' : 'add'}</button>
          { this.props.info.id ? <button onClick={this.props.toggleIsEditing}>nevermind</button> : null }
        </td>
      </tr>
    )
  }
}

class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  toggleIsEditing() {
    this.setState((prevState, props) => ({isEditing: !prevState.isEditing }));
  }

  updateAndClose (updatedItem) {
    updatedItem['id'] = this.props.info.id;
    this.props.update(updatedItem);
    this.toggleIsEditing();
  }

  render() {
    if (this.state.isEditing) {
      return (
        <EditableInfo
          info={this.props.info}
          num={this.props.num}
          toggleIsEditing={this.toggleIsEditing.bind(this)}
          updateAndClose={this.updateAndClose.bind(this)}
        />)
    } else {
      return (
        <StaticInfo
          info={this.props.info}
          num={this.props.num}
          toggleIsEditing={this.toggleIsEditing.bind(this)}
          remove={this.props.remove}
        />)
    }
  }

}

class App extends Component {

  constructor(props) {
    super(props);

    // data should be sanitized before it arrives to the front-end
    var parsedList = props.list.slice().map((item) => {
      item['id'] = this.generateId(15);
      item['phone'] = this.formatPhoneNumber(item.phone);
      return item;
    });

    this.state = {
      list: parsedList,
      sortField: null
    };

  }

  formatPhoneNumber (number) {
    return number.replace(/\D+/g, '').split('').map((num,i) => i === 3 || i === 6 ? '-' + num : num).join('');
  }

  generateId (len) {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(len).keys()].map(() => possible.charAt(Math.floor(Math.random() * possible.length))).join('');
  }

  createItem (newItem) {
    newItem.id = this.generateId(15);
    newItem.phone = this.formatPhoneNumber(newItem.phone);
    this.setState((prevState) => ({
      list: prevState.list.concat([newItem])
    }));
  }

  removeItem (id) {
    this.setState((prevState) => ({
      list: prevState.list.filter((item) => item.id !== id)
    }));
  }

  updateItem (updatedItem) {
    this.setState((prevState) => ({
      list: prevState.list.map((item) => item.id === updatedItem.id ? updatedItem : item)
    }));
  }

  sortBy (field) {
    if (field === this.state.sortField) {
      this.setState((prevState) => ({
        list: prevState.list.reverse()
      }));
    } else {
      this.setState((prevState) => ({
        list: prevState.list.sort((a,b) => a[field] > b[field])
      }));
    }
    this.setState({ sortField: field });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            { this.props.tableHeaders.map((header, i) =>
              <th key={i.toString()} onClick={() => this.sortBy(header)}>{header}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {
            this.state.list.map((contact,i) =>
              (<ContactInfo
                key={contact.id}
                num={(i+1).toString()}
                info={contact}
                remove={this.removeItem.bind(this)}
                update={this.updateItem.bind(this)}
              />)
            )
          }
          {
            (<EditableInfo
              info={{}}
              num={''}
              toggleIsEditing={() => null}
              updateAndClose={this.createItem.bind(this)}
            />)
          }
        </tbody>
      </table>
    );
  }
}

export {
  App,
  ContactInfo,
  StaticInfo,
  EditableInfo
}
