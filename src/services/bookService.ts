import api from "./api";

export const uploadBook = async (
  formData: FormData
) => {
  return await api.post(
    "/books/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};

export const getBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};