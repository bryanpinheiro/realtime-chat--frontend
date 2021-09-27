import { Fragment } from "react";
import "./ContactList.css";
import useContactListUILogic from "./ContactListUILogic";
import Contact from "../Contact/Contact";

export default function ContactList(props: any) {
    const { contacts } = useContactListUILogic(props.contacts, props.selectedUser);

    return (
        <div className="contactListBg">
            {
                contacts.map((contact: any, index) => {
                    return (
                        <Fragment key={index}>
                            <Contact
                                username={contact.name}
                                status={contact.status}
                                isSelected={contact.isSelected}
                                onSelect={
                                    () => {
                                        props.handleSelectContact(contact.id);
                                    }
                                }
                            />
                        </Fragment>
                    );
                })
            }
        </div>
    )
}