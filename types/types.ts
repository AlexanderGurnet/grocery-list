export interface IModel {
  id: string;
  text: string;
  amount: number;
  isFinished: boolean;
  isTextShowed?: boolean;
}

export interface IFormProps {
  inputLabel?: string;
}

export interface IGroceryItemProps {
  data: IModel;
}

export interface ICustomAlertProps {
  trigger: boolean;
  timeout?: number;
  text: string;
  type: 'error' | 'info' | 'success';
  styles?: { [key: string]: number };
}

export interface IStateProps {
  handleOnToggleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnEdit: () => void;
  handleDeleteButton: () => void;
  isTaskCompleted: boolean;
  isFocused: boolean;
  isTextError: {
    text: string;
    isShow: boolean;
  };
}

export interface IControlButtonsProps {
  stateProps: IStateProps;
}

export interface ILoadingContainerProps {
  stateProps: { [key: string]: boolean };
}

export interface IAnimatedListProps {
  data: IModel[] | undefined;
}

export interface ICompletionParameters {
  defaultValue: boolean;
  id: string;
}

export interface IUpdatingAmountParameters {
  amount: number;
  id: string;
}

export interface IInputValidation {
  defaultValue?: string;
  resetInput?: boolean;
}

export interface IUpdatingEntry {
  text: string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
}
