// useOrdererStore.js
import { create } from 'zustand';

const useOrdererStore = create((set, get) => ({
  ordererName: '',
  ordererPhone: '',
  ordererEmail: '',
  errors: {
    ordererName: '',
    ordererPhone: '',
    ordererEmail: '',
  },

  // Setters for the fields
  setOrdererName: (name) => {
    set({ ordererName: name });
    set((state) => ({
      errors: {
        ...state.errors,
        ordererName: validateName(name),
      },
    }));
  },

  setOrdererPhone: (phone) => {
    set({ ordererPhone: phone });
    set((state) => ({
      errors: {
        ...state.errors,
        ordererPhone: validatePhone(phone),
      },
    }));
  },

  setOrdererEmail: (email) => {
    set({ ordererEmail: email });
    set((state) => ({
      errors: {
        ...state.errors,
        ordererEmail: validateEmail(email),
      },
    }));
  },

  // Clear errors
  clearErrors: () => {
    set({
      errors: {
        ordererName: '',
        ordererPhone: '',
        ordererEmail: '',
      },
    });
  },

  // Reset all state
  reset: () => {
    set({
      ordererName: '',
      ordererPhone: '',
      ordererEmail: '',
      errors: {
        ordererName: '',
        ordererPhone: '',
        ordererEmail: '',
      },
    });
  },

  // Check if the form is valid
  isValid: () => {
    const state = get(); // Get the current state
    const nameError = validateName(state.ordererName);
    const phoneError = validatePhone(state.ordererPhone);
    const emailError = validateEmail(state.ordererEmail);

    // Update errors in the state
    set({
      errors: {
        ordererName: nameError,
        ordererPhone: phoneError,
        ordererEmail: emailError,
      },
    });

    // Return true if there are no errors
    return !nameError && !phoneError && !emailError;
  },
}));

// Validation functions
const validateName = (name) => {
  if (!name) return 'Nama lengkap wajib diisi';
  if (name.trim().length < 3) return 'Nama harus memiliki minimal 3 karakter';
  return '';
};

const validatePhone = (phone) => {
  if (!phone) return 'Nomor telepon wajib diisi!';

  let normalizedPhone = phone.trim();
  if (normalizedPhone.startsWith('0')) {
    normalizedPhone = '+62' + normalizedPhone.slice(1);
  } else if (normalizedPhone.startsWith('62')) {
    normalizedPhone = '+' + normalizedPhone;
  }

  if (!normalizedPhone.startsWith('+62')) {
    return 'Nomor telepon harus diawali dengan 62 atau 0';
  }

  const phoneNumber = normalizedPhone.replace('+62', '');
  if (!/^\d+$/.test(phoneNumber)) {
    return 'Nomor telepon hanya boleh berisi angka!';
  }
  if (phoneNumber.length < 9 || phoneNumber.length > 12) {
    return 'Nomor telepon harus memiliki panjang 9-12 digit setelah kode negara';
  }
  return '';
};

const validateEmail = (email) => {
  if (!email) return 'Alamat email wajib diisi';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Masukkan alamat email yang valid';
  return '';
};

export default useOrdererStore;
