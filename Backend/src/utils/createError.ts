export const createError = (status: number, message: string) => {
    const err = new Error();
    err.message = message;
    err['status'] = status;
    err['success'] = false;
    return err;
};
