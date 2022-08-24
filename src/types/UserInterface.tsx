export interface UserInterface {
  auth: boolean;
}

export interface UserContextInterface {
  user?: UserInterface;
  setUser: (a: UserInterface) => void;
}
