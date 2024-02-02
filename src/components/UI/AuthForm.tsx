import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../validation/schema';
import AuthInput from './AuthInput';
import { ReactComponent as ID_icon } from '../../assets/id_icon.svg';
import { ReactComponent as PWD_icon } from '../../assets/pwd_icon.svg';

export type FormValues = {
  id: string;
  password: string;
};

const AuthForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <AuthInput
          type="text"
          name="id"
          placeholder="아이디"
          register={register}
          errorMsg={errors?.id?.message ?? ''}
        >
          <ID_ICON />
        </AuthInput>
        <AuthInput
          type="password"
          name="password"
          placeholder="비밀번호"
          register={register}
          errorMsg={errors?.password?.message ?? ''}
        >
          <PWD_ICON />
        </AuthInput>
      </InputContainer>
      <Button type="submit">로그인</Button>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
`;
const InputContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  gap: 10px;
`;
const Button = styled.button`
  width: 100%;
  height: 56px;
  margin-bottom: 40px;
  border-radius: 6px;
  color: white;
  ${({ theme }) => theme.typographies.BIG_TXT};
  background-color: ${({ theme }) => theme.colors.BLUE_2};
`;
const ID_ICON = styled(ID_icon)`
  width: 24px;
`;
const PWD_ICON = styled(PWD_icon)`
  width: 24px;
`;
export default AuthForm;
