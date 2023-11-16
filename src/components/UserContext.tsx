import {
	useContext,
	createContext,
	useState,
	useEffect,
	JSXElementConstructor,
	ReactElement,
	ReactPortal,
} from 'react';

interface IUser {
	userName: string;
}

type IUserContext = [
	user: IUser | undefined,
	setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
];

const UserContext = createContext<IUserContext>([undefined, () => null]);

export function UserContextProvider(props: {
	children:
		| string
		| number
		| boolean
		| ReactElement<any, string | JSXElementConstructor<any>>
		| ReactPortal
		| null
		| undefined;
}) {
	const [user, setUser] = useState<IUser | undefined>(undefined);

	// Loads previous data from user storage
	useEffect(() => {}, []);

	return (
		<UserContext.Provider value={[user, setUser]}>
			{props.children}
		</UserContext.Provider>
	);
}

export const useUserContext = () => useContext(UserContext);
