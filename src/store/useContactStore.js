import { create } from "zustand";

const useContactStore = create((set) => ({
  name: '',
  email: '',
  message: '',
  nameError: '',
  emailError: '',
  messageError: '',
  isSending: false,
  successMessage: '',
  errorMessage: '',

  setName: (name) => {
    let nameError = name.length < 3 ? 'Nama harus lebih dari 2 karakter.' : '';
    set({ name, nameError });
  },

  setEmail: (email) => {
    let emailError = '';
    if (!email) {
      emailError = 'Email tidak boleh kosong.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = 'Format email tidak valid.';
    }
    set({ email, emailError });
  },

  setMessage: (message) => {
    let messageError =
      message.length < 10 ? 'Pesan harus lebih dari 10 karakter.' : '';
    set({ message, messageError });
  },

  setIsSending: (isSending) => set({ isSending }),
  setSuccessMessage: (message) => set({ successMessage: message, errorMessage: '' }),
  setErrorMessage: (message) => set({ errorMessage: message, successMessage: '' }),

  resetForm: () =>
    set({
      name: '',
      email: '',
      message: '',
      nameError: '',
      emailError: '',
      messageError: '',
      isSending: false,
    }),
}));

export default useContactStore;
