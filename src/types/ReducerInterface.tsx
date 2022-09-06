export interface StateInterface {
  open: boolean;
  openError: boolean;
  image: File | null;
  fileDataURL: string | ArrayBuffer | null | undefined;
}

export interface ActionInterface {
  type: ActionKindInterface;
  payload?: any;
}

export enum ActionKindInterface {
  toggleSuccessMessage = 'toggleSuccessMessage',
  toggleErrorMessage = 'toggleErrorMessage',
  setImage = 'setImage',
  setFileURL = 'setFileURL'
}
