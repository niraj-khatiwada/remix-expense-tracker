export type LoaderData<T> =
  | {
      success: true;
      data: T;
    }
  | { success: false; message: string };
