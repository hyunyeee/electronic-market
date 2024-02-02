import * as yup from 'yup';
import Messages from './messages';

export const schema = yup.object().shape({
  id: yup.string().required(Messages.ID_REQUIRED),
  password: yup
    .string()
    .required(Messages.PASSWORD_REQUIRED)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      Messages.PASSWORD,
    ),
});