export type ActionData<T> =
  | {
      success: true;
      message?: string;
      data?: T;
    }
  | { success: false; message: string };
