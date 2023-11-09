/*
 * @Author: star Yxc5260031
 * @Date: 2023-11-09 13:35:00
 * @LastEditors: star Yxc5260031
 * @LastEditTime: 2023-11-09 16:27:13
 * @FilePath: \star\src\pages\User\Login\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AlipayOutlined, LockOutlined, MobileOutlined, QqOutlined, UserOutlined, WechatOutlined } from "@ant-design/icons";
import { LoginFormPage, ProConfigProvider, ProFormCaptcha, ProFormCheckbox, ProFormText } from "@ant-design/pro-components";
import { Divider, message, Space, Tabs, theme } from "antd";
import { CSSProperties, useState } from "react";
import  './style.less';


type LoginType = 'phone' | 'account';
const iconStyles: CSSProperties = {
  color: 'rgba(0,0,0,0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer'
};
const Login: React.FC = () => {
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const { token } = theme.useToken();
  return (
    <div style={{
      backgroundColor: 'white',
      height: '100vh'
    }}>
      <LoginFormPage
        backgroundVideoUrl={require('@/assets/video/backgroundVideo.mp4')}
        title="Star"
        subTitle="My first System"
        actions={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Divider plain>
              <span
                style={{ color: token.colorTextPlaceholder, fontWeight: 'normal', fontSize: 14 }}>
                其他登录方式
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: 40,
                width: 40,
                border: `1px solid ` + token.colorPrimaryBorder,
                borderRadius: '50%'
              }}>
                <WechatOutlined style={{ ...iconStyles, color: '#4ae879' }}></WechatOutlined>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: 40,
                width: 40,
                border: '1px solid' + token.colorPrimaryBorder,
                borderRadius: '50%'
              }}>
                <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }}></AlipayOutlined>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: 40,
                width: 40,
                border: '1px solid' + token.colorPrimaryBorder,
                borderRadius: '50%'
              }}>
                <QqOutlined style={{ ...iconStyles, color: '#000000' }}></QqOutlined>
              </div>
            </Space>

          </div>
        }
      >
        <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />

          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' && (<>
          <ProFormText name='username'
            fieldProps={{
              size: 'large',
              prefix: (
                <UserOutlined style={{ color: token.colorText }} className={'prefixIcon'}></UserOutlined>
              )
            }}
            placeholder={'请输入用户名'}
            rules={[
              {
                required: true,
                message: '请输入用户名!'
              }
            ]}
          />
          <ProFormText.Password
            name='password'
            fieldProps={{
              size: 'large',
              prefix: (<LockOutlined style={{ color: token.colorText }} className={'prefixIcon'}></LockOutlined>)
            }}
            placeholder={'请输入密码'}
            rules={[{
              required: true,
              message: '请输入密码'
            }]}
          />

        </>)}
        {
          loginType === 'phone' && (<>
            <ProFormText name='mobile' fieldProps={{
              size: 'large',
              prefix: (<MobileOutlined style={{ color: token.colorText }} className={'prefixIcon'}></MobileOutlined>)
            }}
              placeholder={'请输入手机号'}
              rules={[{
                required: true,
                message: '请输入手机号'
              },
              {
                pattern: /^\d{10}$/,
                message: '手机号格式错误'
              }
              ]}
            />
            <ProFormCaptcha 
            fieldProps={{ size: "large",
             prefix: (<LockOutlined style={{ color: token.colorText }} className={'prefixIcon'}></LockOutlined>) }} 
             captchaProps={{ size: 'large' }}
              placeholder='请输入验证码'
              captchaTextRender={(timing,count)=>{
                if(timing)
                {
                  return `${count}${'获取验证码'}`
                }
                return '获取验证码'
              }}
              name='captcha'
              rules={[{
                required:true,
                message:'请输入验证码!'
              }]}
              onGetCaptcha={async ()=>{
                message.success('获取验证码成功');
              }}
              />

          </>)
        }
        <div style={{marginBlockEnd:24}}>
                 <ProFormCheckbox noStyle name={'autoLogin'}>自动登录</ProFormCheckbox>
                 <a style={{float:'right'}}>忘记密码</a>
        </div>
      </LoginFormPage>

    </div>
  )
}
export default ()=>{
  return(
    <ProConfigProvider dark>
      <Login />
    </ProConfigProvider>
  )
};