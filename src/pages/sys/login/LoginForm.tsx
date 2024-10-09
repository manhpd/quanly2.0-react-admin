import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillGithub, AiFillGoogleCircle, AiFillWechat } from 'react-icons/ai';

// import { DEFAULT_USER, TEST_USER } from '@/_mock/assets';
import { SignInReq } from '@/api/services/userService';
import { useSignIn } from '@/store/userStore';
import { useThemeToken } from '@/theme/hooks';

import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';

function LoginForm() {
  const { t } = useTranslation();
  const themeToken = useThemeToken();
  const [loading, setLoading] = useState(false);

  const { loginState, setLoginState } = useLoginStateContext();
  const signIn = useSignIn();

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async ({ email, password }: SignInReq) => {
    setLoading(true);
    try {
      await signIn({ email, password });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">{t('sys.login.signInFormTitle')}</div>
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: false,
          username: '',
          password: '',
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t('sys.login.accountPlaceholder') },
            { type: 'email', message: t('sys.login.emailPlaceholder') },
          ]}
        >
          <Input placeholder={t('sys.login.email')} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t('sys.login.passwordPlaceholder') }]}
        >
          <Input.Password type="password" placeholder={t('sys.login.password')} />
        </Form.Item>
        <Form.Item>
          <Row align="middle">
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('sys.login.rememberMe')}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <Button
                type="link"
                className="!underline"
                onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
                size="small"
              >
                {t('sys.login.forgetPassword')}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            {t('sys.login.loginButton')}
          </Button>
        </Form.Item>

        <Row align="middle" gutter={8}>
          <Col span={9} flex="1">
            <Button
              className="w-full !text-sm"
              onClick={() => setLoginState(LoginStateEnum.MOBILE)}
            >
              {t('sys.login.mobileSignInFormTitle')}
            </Button>
          </Col>
          <Col span={9} flex="1">
            <Button
              className="w-full !text-sm"
              onClick={() => setLoginState(LoginStateEnum.QR_CODE)}
            >
              {t('sys.login.qrSignInFormTitle')}
            </Button>
          </Col>
          <Col span={6} flex="1" onClick={() => setLoginState(LoginStateEnum.REGISTER)}>
            <Button className="w-full !text-sm">{t('sys.login.signUpFormTitle')}</Button>
          </Col>
        </Row>

        <Divider className="!text-xs">{t('sys.login.otherSignIn')}</Divider>

        <div className="flex cursor-pointer justify-around text-2xl">
          <AiFillGithub />
          <AiFillWechat />
          <AiFillGoogleCircle />
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
