import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Email must be a valid email').required('Email is a required field'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is a required field'),
});

export const createUserSchema = yup.object().shape({
  name: yup.string().required('name is a required field'),
  email: yup.string().email('Email must be a valid email').required('Email is a required field'),
  gender: yup.object().required('Gender is a required field'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is a required field'),
});

export const createCategorySchema = yup.object().shape({
  name: yup.string().required('name is a required field'),
});
export const createArtistSchema = yup.object().shape({
  name: yup.string().required('name is a required field'),
  image: yup.string().required('image is a required field'),
  title: yup.string().required('title is a required field'),
});
export const updateArtistSchema = yup.object().shape({
  name: yup.string().required('name is a required field'),
  title: yup.string().required('title is a required field'),
});

export const editUserSchema = yup.object().shape({
  name: yup.string().required('name is a required field'),
  email: yup.string().email('Email must be a valid email').required('Email is a required field'),
  gender: yup.object().required('Gender is a required field'),
});

export const createMusicSchema = yup.object().shape({
  name: yup.string().required('name is a required field'),
  categoryId: yup.object().required('category is a required field'),
  source: yup.string().required('source is a required field'),
  image: yup.string().required('image is a required field'),
});
export const editMusicSchema = yup.object().shape({
  name: yup.string().required('name is a required field'),
  categoryId: yup.object().required('category is a required field'),
});
