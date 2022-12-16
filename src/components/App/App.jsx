import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ListContacts from '../ListContacts';
import SearchContact from '../SerchContact/SearchContact';
import ContactForm from '../ContactForm';
import { Wrapper, TitleText } from './App.style';
// import contacts from '../contacts/contacts.json';

export default function App() {
  const [contact, setContact] = useState(() => {
    const contact = localStorage.getItem('userContact');
    const parseContact = JSON.parse(contact);
    if (parseContact) {
      return parseContact;
    }
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('userContact', JSON.stringify(contact));
  }, [contact]);

  const handleSubmit = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    console.log(newContact);

    for (const contacts of contact) {
      if (newContact.name.toLowerCase() === contacts.name.toLowerCase()) {
        alert(`${newContact.name} is already in contacts`);
        return;
      }
    }

    setContact(prevState => [newContact, ...prevState]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilterContact = () => {
    const toNormalazedFilter = filter.toLowerCase();

    return contact.filter(contact =>
      contact.name.toLowerCase().includes(toNormalazedFilter)
    );
  };

  // const deleteContact = contactId => {
  //   setContact(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  //   }));
  // };

  const deleteContact = contactId => {
    setContact(contact.filter(contact => contact.id !== contactId));
  };

  return (
    <Wrapper>
      <TitleText>Phonebook</TitleText>
      <ContactForm handleSubmit={handleSubmit} />
      <SearchContact value={filter} onChange={changeFilter} />
      <h2>Contacts</h2>
      <ListContacts
        filter={getFilterContact()}
        onDeleteContacts={deleteContact}
      />
    </Wrapper>
  );
}

// class App extends Component {
//   state = {
//     contacts,
//     filter: '',
//   };

//   componentDidMount() {
//     const contact = localStorage.getItem('contacts');
//     const parseContact = JSON.parse(contact);

//     if (parseContact) {
//       this.setState({
//         contacts: parseContact,
//       });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   handleSubmit = data => {
//     const { name, number } = data;
//     const { contacts } = this.state;

//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     for (const contact of contacts) {
//       if (newContact.name.toLowerCase() === contact.name.toLowerCase()) {
//         alert(`${newContact.name} is already in contacts`);
//         return;
//       }
//     }

//     this.setState(prevState => ({
//       contacts: [newContact, ...prevState.contacts],
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getFilterContact = () => {
//     const { contacts, filter } = this.state;

//     const toNormalazedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(toNormalazedFilter)
//     );
//   };

//   deleteContact = contactsId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactsId),
//     }));
//   };

//   render() {
//     const { filter } = this.state;
//     const filteredContact = this.getFilterContact();
//     return (
//       <Wrapper>
//         <TitleText>Phonebook</TitleText>
//         <ContactForm handleSubmit={this.handleSubmit} />
//         <SearchContact value={filter} onChange={this.changeFilter} />
//         <h2>Contacts</h2>
//         <ListContacts
//           filter={filteredContact}
//           onDeleteContacts={this.deleteContact}
//         />
//       </Wrapper>
//     );
//   }
// }

// export default App;
