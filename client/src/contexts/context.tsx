import React, { useReducer, ReactElement, ReactNode } from 'react';
import { initialState, AuthReducer, Action } from './reducer';

const AuthStateContext = React.createContext(initialState);
const AuthDispatchContext = React.createContext((_: Action) => { });

interface RequireType {
	children: ReactNode | ReactElement;
}

export function useAuthState() {
	const context = React.useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}

	return context;
}

export function useAuthDispatch() {
	const context = React.useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}

	return context;
}

export const AuthProvider = ({ children }: RequireType) => {
	const [user, dispatch] = useReducer(AuthReducer, initialState);

	return (
		<AuthStateContext.Provider value={user}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};
