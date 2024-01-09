import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Email không đúng định dạng').required('Email không được để trống'),
  password: yup
    .string()
    .min(6, 'Mật khẩu không được nhỏ hơn 6 ký tự')
    .max(20, 'Mật khẩu không được lớn hơn 20 ký tự')
    .required('Mật khẩu không được để trống'),
});

export const ChangePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(6, 'Mật khẩu không được nhỏ hơn 6 ký tự')
    .max(20, 'Mật khẩu không được lớn hơn 20 ký tự')
    .required('Mật khẩu không được để trống'),
  password: yup
    .string()
    .min(6, 'Mật khẩu không được nhỏ hơn 6 ký tự')
    .max(20, 'Mật khẩu không được lớn hơn 20 ký tự')
    .required('Mật khẩu không được để trống'),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
});

export const SignUpSchema = yup.object().shape({
  name: yup.string().required("Tên không được để trống"),
  email: yup.string().email('Email không đúng định dạng').required('Email không được để trống'),
  password: yup
    .string()
    .min(6, 'Mật khẩu không được nhỏ hơn 6 ký tự')
    .max(20, 'Mật khẩu không được lớn hơn 20 ký tự')
    .required('Mật khẩu không được để trống'),
  day: yup.number().min(0, 'Ngày không thể nhỏ hơn 0').max(31, 'Ngày  không thể lớn hơn 31').required("Ngày không được để trống"),
  year: yup.number().min(0, 'Năm không thể nhỏ hơn 0').max(2024, 'Năm không thể lớn hơn năm hiện tại').required("Năm không được để trống"),
 

})