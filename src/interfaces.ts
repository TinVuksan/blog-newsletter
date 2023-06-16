export interface Item<T> {
  id: number;
  values: T;
}

export interface Thought {
  id: number;
  values: ThoughtValues[];
}

export interface ThoughtValues {
  fieldId?: string;
  fieldName?: string;
  value: string;
}

export interface User {
  username?: string;
  email: string;
  password: string;
  phone?: string;
}
