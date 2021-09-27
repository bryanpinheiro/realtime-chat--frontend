import { fireEvent, render } from "@testing-library/react";
import { Provider } from 'react-redux';

import store from '../../../../infrastructure/state-management/store';

import ContactList from "./ContactList";

test("renders a contact list", () => {
    const contacts = [{
        userID:     "123xyz",
        name:       "Bryan",
        isOnline:   true
    }, {
        userID:     "456abc",
        name:       "Souza",
        isOnline:   true
    }];

    let [selectedUser, setSelectedUser] = [contacts[0].userID, (value: any) => { console.log(`contact ${value} - has been selected!`) }];

    const { getAllByTestId } = render(
        <>
            <Provider store={store}>
                <ContactList
                    contacts={contacts}
                    selectedUser={selectedUser}
                    handleSelectContact={setSelectedUser} />
            </Provider>
        </>
    );

    const contactElements = getAllByTestId(/contact/);

    contactElements.forEach((contact, index) => {
        fireEvent.click(contactElements[index]);

        const contactName = contact.querySelector(".contactName");
        expect(contactName).toHaveTextContent(contacts[index].name);

        const contactStatus = contact.querySelector(".contactStatus");
        expect(contactStatus).toHaveTextContent(contacts[index].isOnline ? /online/ : /offline/);
    });

    const selectedContact = contactElements.find((el) => el.className === "contactBg selected");

    expect(selectedContact).toBeTruthy();

});