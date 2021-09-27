import LobbyActions from "../../LobbyActions";

export default function useFormUILogic() {
    let firstName: string;
    let lastName: string;
  
    function onChangeFirstName(event: any) {
        firstName = event.target.value;
    }

    function onChangeLastName(event: any) {
        lastName = event.target.value;
    }

    function onSubmit() {
        if(firstName && lastName) {
            const username = firstName.trim().toLowerCase() + lastName.trim().toLowerCase();
            LobbyActions.enter(username);
        }
    }

    return {
        functions: {
            onChangeFirstName,
            onChangeLastName,
            onSubmit
        }
    }
}